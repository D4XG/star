/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere. Thank you for using
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 * ! If you do not download the source code from the above address, you are using an unknown version and at risk of having your account hacked
 *
 * English:
 * ! Please do not change the below code, it is very important for the project.
 * It is my motivation to maintain and develop the project for free.
 * ! If you change it, you will be banned forever
 * Thank you for using
 *
 * Vietnamese:
 * ! Vui lòng không thay đổi mã bên dưới, nó rất quan trọng đối với dự án.
 * Nó là động lực để tôi duy trì và phát triển dự án miễn phí.
 * ! Nếu thay đổi nó, bạn sẽ bị cấm vĩnh viễn
 * Cảm ơn bạn đã sử dụng
 */
const { spawnSync, spawn } = require("child_process");
const log = require("./logger/log.js");

// Check if the current Node.js version matches 16.20.0
const requiredNodeVersion = "16.20.0";
const currentVersion = process.version.substring(1); // remove the 'v' prefix
if (currentVersion !== requiredNodeVersion) {
  // Use spawnSync to run the nvm command synchronously
  const nvmCommand = `nvm i ${requiredNodeVersion}`;
  const nvmProcess = spawnSync(nvmCommand, [], { shell: true });

  if (nvmProcess.error) {
    console.error(
      "Error while switching Node.js version:",
      nvmProcess.error.message
    );
    process.exit(1);
  }

  // Log the output of the nvm command
  console.log(nvmProcess.stdout.toString());
}

// Continue with starting the project
function startProject() {
  const child = spawn("node", ["Goat.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (code) => {
    if (code == 2) {
      log.info("Restarting Project...");
      startProject();
    }
  });
}

startProject();
const keep_alive = require("./keep_alive.js");
