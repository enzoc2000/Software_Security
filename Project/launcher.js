// launcher.js
import { execFile } from "child_process";

/**
 * Executes a shell command and returns a promise that resolves with the output.
 * @param {string} command The command to execute.
 * @param {string[]} args Optional array of arguments to pass to the command.
 * @returns {Promise<string>} Promise resolving to the command output.
 */
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`\nExecuting: ${command} ${args.join(" ")}`);
    execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${command}:`, error.message);
        console.error(stderr);
        return reject(error);
      }
      console.log(`Output from ${command}:\n${stdout}`);
      resolve(stdout);
    });
  });
}

async function main() {
  try {
    // Start Besu via its docker-compose file
    await runCommand("docker", ["compose", "-f", "Besu/docker-compose.yml", "up", "--build", "-d"]);

    // Wait for the network to initialize 10s
    console.log("Waiting 10 seconds for the network to initialize...");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Build the server Dockerfile
    await runCommand("docker", ["build", "-t", "fsc-server1", "server"]);

    // Deploy contracts using the Hardhat deploy script with retry logic
    const retryIntervals = [1000, 1500, 3000]; // Retry intervals in milliseconds
    let success = false;

    for (let i = 0; i < retryIntervals.length; i++) {
        process.chdir("hardhat");
      try {
        await runCommand("npx", ["hardhat", "run", "deploy/deploy.js", "--network", "besu"]);
        success = true;
        process.chdir("..");
        break; // Exit loop if successful
    } catch (err) {
        console.error(`Attempt ${i + 1} failed:`, err.message);
        if (i < retryIntervals.length) {
            console.log(`Retrying in ${retryIntervals[i] / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryIntervals[i]));
        }
    }
    }

    if (!success) {
      throw new Error("Failed to deploy contracts after multiple attempts.");
    }

    // Start the remaining services via the root docker-compose file and npm script
    await runCommand("docker", ["compose", "-f", "docker-compose.yml", "up", "-d"]);
    process.chdir("client");
    //await runCommand("npm", ["run", "preview"]);
    // Extract the PID of the process running the "npm run preview" command
    const previewProcess = execFile("npm", ["run", "preview"]);
    console.log(`Vite Preview process started with PID: ${previewProcess.pid}`);
    process.chdir("..");

    console.log("\nAll commands executed successfully.");

    // Listen for the 'X' button press to kill the preview process
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    console.log("Press 'X' to terminate the preview process. \nDocker processes should be terminated separately.");

    process.stdin.on("data", (key) => {
        if (key.toLowerCase() === "x") {
            console.log("\nTerminating the preview process...");
            previewProcess.kill();
            console.log("Preview process terminated.");
            process.exit(0);
        }
    });
  } catch (err) {
    console.error("\nDeployment script terminated due to errors:", err);
    process.exit(1);
  }
}

main();