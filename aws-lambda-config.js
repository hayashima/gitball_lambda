
var packageJson = require("./package.json")

module.exports = {
  functionName: packageJson.name,
  description: "v" + packageJson.version + ": " + packageJson.description,
  region: "ap-northeast-1",
  role: "arn:aws:iam::761042475476:role/lamjet-test",
  memorySize: 128,
  timeout: 3,
  runtime: "nodejs4.3",
  handler: "index.handler"
}
