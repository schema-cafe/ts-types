const fs = require("fs");
const { execSync } = require("child_process");

// Build typescript files
execSync("npm run build");

// Write new version to package.json
const packageFile = fs.readFileSync("package.json", "utf8");
const version = JSON.parse(packageFile).version;
const versionNumber = parseInt(version.split(".")[2]);
const newVersionNumber = versionNumber + 1;
const newVersion = version.split(".")[0] + "." + version.split(".")[1] + "." + newVersionNumber;
const lines = packageFile.split("\n");
const versionLine = lines.findIndex((line) => line.includes('"version":'));
lines[versionLine] = '  "version": "' + newVersion + '",';
const newPackageFile = lines.join("\n");
fs.writeFileSync("package.json", newPackageFile);

// Commit changes and push
execSync("git add package.json");
execSync('git commit -m "v' + newVersion + '"');
execSync("git push");

// Publish to npm
execSync("npm publish --access public");
