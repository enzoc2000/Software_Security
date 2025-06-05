# launcher.ps1 - PowerShell equivalent of launcher.js
# Compatible with Windows PowerShell 5.1+ and PowerShell Core 6+

param(
    [switch]$Verbose
)

# Set error action preference to stop on errors
$ErrorActionPreference = "Stop"

# Global variable to store preview process
$script:PreviewProcess = $null

# Function to write colored output
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

# Function to execute commands with logging
function Invoke-Command-Safe {
    param(
        [string]$Command,
        [string[]]$Arguments = @(),
        [string]$WorkingDirectory = $null
    )
    
    $argString = $Arguments -join " "
    Write-Host ""
    Write-Info "Executing: $Command $argString"
    
    $processParams = @{
        FilePath = $Command
        ArgumentList = $Arguments
        Wait = $true
        NoNewWindow = $true
        PassThru = $true
    }
    
    if ($WorkingDirectory) {
        $processParams.WorkingDirectory = $WorkingDirectory
    }
    
    try {
        $process = Start-Process @processParams
        
        if ($process.ExitCode -ne 0) {
            throw "Command failed with exit code: $($process.ExitCode)"
        }
        
        Write-Info "Command completed successfully: $Command"
        return $true
    }
    catch {
        Write-Error-Custom "Error executing $Command`: $($_.Exception.Message)"
        throw
    }
}

# Function to sleep with countdown
function Start-Sleep-WithCountdown {
    param(
        [int]$Seconds,
        [string]$Message
    )
    
    Write-Info $Message
    for ($i = $Seconds; $i -gt 0; $i--) {
        Write-Host "`rWaiting... $i seconds remaining" -NoNewline
        Start-Sleep -Seconds 1
    }
    Write-Host "`rWaiting... Done!                    "
}

# Function to cleanup on exit
function Invoke-Cleanup {
    Write-Warning-Custom "Cleaning up..."
    
    if ($script:PreviewProcess -and !$script:PreviewProcess.HasExited) {
        Write-Info "Terminating preview process (PID: $($script:PreviewProcess.Id))..."
        try {
            $script:PreviewProcess.Kill()
            $script:PreviewProcess.WaitForExit(5000)  # Wait up to 5 seconds
            Write-Info "Preview process terminated."
        }
        catch {
            Write-Warning-Custom "Failed to terminate preview process cleanly: $($_.Exception.Message)"
        }
    }
}

# Function to deploy contracts with retry logic
function Deploy-Contracts {
    $retryIntervals = @(1, 1.5, 3)  # Retry intervals in seconds
    $success = $false
    $originalLocation = Get-Location
    
    try {
        Set-Location "hardhat"

        Write-Info "Installing npm dependencies..."
        Invoke-Command-Safe "npm.cmd" @("install")
        
        for ($i = 0; $i -lt $retryIntervals.Count; $i++) {
            $attempt = $i + 1
            Write-Info "Deployment attempt $attempt..."
            
            try {
                Invoke-Command-Safe "npx.cmd" @("hardhat", "run", "deploy/deploy.js", "--network", "besu")
                $success = $true
                break
            }
            catch {
                Write-Error-Custom "Attempt $attempt failed: $($_.Exception.Message)"
                if ($attempt -lt $retryIntervals.Count) {
                    $waitTime = $retryIntervals[$i]
                    Write-Warning-Custom "Retrying in $waitTime seconds..."
                    Start-Sleep -Seconds $waitTime
                }
            }
        }
    }
    finally {
        Set-Location $originalLocation
    }
    
    if (-not $success) {
        throw "Failed to deploy contracts after multiple attempts."
    }
    
    Write-Info "Contracts deployed successfully!"
    return $true
}

# Function to start preview process
function Start-Preview {
    $originalLocation = Get-Location
    
    try {
        Set-Location "client"
        
        Write-Info "Starting Vite preview process..."
        
        $processParams = @{
            FilePath = "npm"
            ArgumentList = @("run", "preview")
            PassThru = $true
            NoNewWindow = $false
        }
        
        $script:PreviewProcess = Start-Process @processParams
        
        Write-Info "Vite Preview process started with PID: $($script:PreviewProcess.Id)"
        return $true
    }
    catch {
        Write-Error-Custom "Failed to start preview process: $($_.Exception.Message)"
        throw
    }
    finally {
        Set-Location $originalLocation
    }
}

# Function to wait for user input
function Wait-ForTermination {
    Write-Info "Press 'X' to terminate the preview process."
    Write-Info "Docker processes should be terminated separately."
    
    do {
        $key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        $char = $key.Character.ToString().ToUpper()
    } while ($char -ne "X")
    
    Write-Host ""
}

# Function to check dependencies
function Test-Dependencies {
    $requiredCommands = @("docker", "npm", "npx")
    $missingDeps = @()
    
    foreach ($cmd in $requiredCommands) {
        try {
            $null = Get-Command $cmd -ErrorAction Stop
        }
        catch {
            $missingDeps += $cmd
        }
    }
    
    if ($missingDeps.Count -gt 0) {
        Write-Error-Custom "Missing required dependencies: $($missingDeps -join ', ')"
        Write-Error-Custom "Please install the missing dependencies and try again."
        
        # Provide installation hints
        Write-Host ""
        Write-Info "Installation hints:"
        if ($missingDeps -contains "docker") {
            Write-Host "  - Docker: Install Docker Desktop from https://www.docker.com/products/docker-desktop"
        }
        if ($missingDeps -contains "npm" -or $missingDeps -contains "npx") {
            Write-Host "  - Node.js/npm: Install from https://nodejs.org/ or use winget install OpenJS.NodeJS"
        }
        
        exit 1
    }
}

# Main function
function Invoke-Main {
    Write-Info "Starting deployment script..."
    
    # Check dependencies first
    Test-Dependencies
    
    try {
        # Start Besu via its docker-compose file
        Write-Info "Starting Besu network..."
        Invoke-Command-Safe "docker" @("compose", "-f", "Besu/docker-compose.yml", "up", "--build", "-d")
        
        # Wait for the network to initialize
        Start-Sleep-WithCountdown -Seconds 10 -Message "Waiting for the network to initialize..."
        
        # Build the server Dockerfile
        Write-Info "Building server Docker image..."
        Invoke-Command-Safe "docker" @("build", "-t", "fsc-server", "server")
        
        # Deploy contracts using the Hardhat deploy script with retry logic
        Write-Info "Deploying contracts..."
        Deploy-Contracts
        
        # Start the remaining services via the root docker-compose file
        Write-Info "Starting remaining services..."
        Invoke-Command-Safe "docker" @("compose", "-f", "docker-compose.yml", "up", "-d")
        
        # Start the preview process
        Start-Preview
        
        Write-Info "All commands executed successfully."
        
        # Wait for user input to terminate
        Wait-ForTermination
    }
    catch {
        Write-Error-Custom "Deployment script terminated due to errors: $($_.Exception.Message)"
        if ($Verbose) {
            Write-Host $_.Exception.StackTrace -ForegroundColor Red
        }
        exit 1
    }
    finally {
        Invoke-Cleanup
    }
}

# Register cleanup on script exit
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action {
    Invoke-Cleanup
} | Out-Null

# Handle Ctrl+C gracefully
$null = Register-ObjectEvent -InputObject ([Console]) -EventName CancelKeyPress -Action {
    $Event.SourceEventArgs.Cancel = $true
    Invoke-Cleanup
    exit 0
}

# Run the main function
try {
    Invoke-Main
}
catch {
    Write-Error-Custom "Script execution failed: $($_.Exception.Message)"
    exit 1
}