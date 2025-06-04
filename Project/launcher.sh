#!/bin/bash

# launcher.sh - Bash equivalent of launcher.js
# Compatible with both macOS and Linux

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Global variable to store preview process PID
PREVIEW_PID=""

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to execute commands with logging
run_command() {
    local cmd="$1"
    shift
    local args=("$@")
    
    echo
    print_info "Executing: $cmd ${args[*]}"
    
    if ! "$cmd" "${args[@]}"; then
        print_error "Error executing $cmd"
        return 1
    fi
    
    print_info "Command completed successfully: $cmd"
    return 0
}

# Function to sleep with countdown
sleep_with_countdown() {
    local seconds=$1
    local message="$2"
    
    print_info "$message"
    for ((i=seconds; i>0; i--)); do
        printf "\rWaiting... %d seconds remaining" "$i"
        sleep 1
    done
    printf "\rWaiting... Done!                    \n"
}

# Function to cleanup on exit
cleanup() {
    print_warning "Cleaning up..."
    if [[ -n "$PREVIEW_PID" ]] && kill -0 "$PREVIEW_PID" 2>/dev/null; then
        print_info "Terminating preview process (PID: $PREVIEW_PID)..."
        kill "$PREVIEW_PID" 2>/dev/null || true
        wait "$PREVIEW_PID" 2>/dev/null || true
        print_info "Preview process terminated."
    fi
    exit 0
}

# Function to deploy contracts with retry logic
deploy_contracts() {
    local retry_intervals=(1 2 5)  # Retry intervals in seconds
    local success=false
    local original_dir=$(pwd)
    
    cd "hardhat" || {
        print_error "Failed to change to hardhat directory"
        return 1
    }
    
    for i in "${!retry_intervals[@]}"; do
        local attempt=$((i + 1))
        print_info "Deployment attempt $attempt..."
        
        if run_command "npx" "hardhat" "run" "deploy/deploy.js" "--network" "besu"; then
            success=true
            break
        else
            print_error "Attempt $attempt failed"
            if [[ $attempt -lt ${#retry_intervals[@]} ]]; then
                local wait_time=${retry_intervals[$i]}
                print_warning "Retrying in $wait_time seconds..."
                sleep "$wait_time"
            fi
        fi
    done
    
    cd "$original_dir" || {
        print_error "Failed to return to original directory"
        return 1
    }
    
    if [[ "$success" == false ]]; then
        print_error "Failed to deploy contracts after multiple attempts."
        return 1
    fi
    
    print_info "Contracts deployed successfully!"
    return 0
}

# Function to start preview process
start_preview() {
    local original_dir=$(pwd)
    
    cd "client" || {
        print_error "Failed to change to client directory"
        return 1
    }
    
    print_info "Starting Vite preview process..."
    npm run preview &
    PREVIEW_PID=$!
    
    cd "$original_dir" || {
        print_error "Failed to return to original directory"
        return 1
    }
    
    print_info "Vite Preview process started with PID: $PREVIEW_PID"
    return 0
}

# Function to wait for user input
wait_for_termination() {
    print_info "Press 'X' to terminate the preview process."
    print_info "Docker processes should be terminated separately."
    
    # Set terminal to raw mode for single character input
    if command -v stty >/dev/null 2>&1; then
        local old_stty_cfg=$(stty -g)
        stty raw -echo
        
        while true; do
            local char
            char=$(dd if=/dev/stdin bs=1 count=1 2>/dev/null)
            if [[ "$char" == "x" ]] || [[ "$char" == "X" ]]; then
                stty "$old_stty_cfg"
                echo
                break
            fi
        done
    else
        # Fallback for systems without stty
        print_warning "stty not available, using read instead"
        while true; do
            echo -n "Enter 'x' or 'X' to terminate: "
            read -r char
            if [[ "$char" == "x" ]] || [[ "$char" == "X" ]]; then
                break
            fi
        done
    fi
}

# Main function
main() {
    print_info "Starting deployment script..."
    
    # Set up signal handlers for cleanup
    trap cleanup SIGINT SIGTERM EXIT
    
    # Start Besu via its docker-compose file
    print_info "Starting Besu network..."
    run_command "docker" "compose" "-f" "Besu/docker-compose.yml" "up" "--build" "-d"
    
    # Wait for the network to initialize
    sleep_with_countdown 10 "Waiting for the network to initialize..."
    
    # Build the server Dockerfile
    print_info "Building server Docker image..."
    run_command "docker" "build" "-t" "fsc-server" "server"
    
    # Deploy contracts using the Hardhat deploy script with retry logic
    print_info "Deploying contracts..."
    if ! deploy_contracts; then
        print_error "Deployment script terminated due to contract deployment errors"
        exit 1
    fi
    
    # Start the remaining services via the root docker-compose file
    print_info "Starting remaining services..."
    run_command "docker" "compose" "-f" "docker-compose.yml" "up" "-d"
    
    # Start the preview process
    if ! start_preview; then
        print_error "Failed to start preview process"
        exit 1
    fi
    
    print_info "All commands executed successfully."
    
    # Wait for user input to terminate
    wait_for_termination
    
    # Cleanup will be handled by the trap
}

# Check if required commands are available
check_dependencies() {
    local missing_deps=()
    
    for cmd in docker npm npx; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            missing_deps+=("$cmd")
        fi
    done
    
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        print_error "Missing required dependencies: ${missing_deps[*]}"
        print_error "Please install the missing dependencies and try again."
        exit 1
    fi
}

# Run dependency check and main function
check_dependencies
main "$@"