const fs = require("fs");
const cp = require("child_process");
const path = require("path");

const protoGenPath = path.resolve("./src/protogen");

console.log(`${protoGenPath} will be created...`);

if (fs.existsSync(protoGenPath))
  fs.rmSync(protoGenPath, { recursive: true, force: true });
fs.mkdirSync(protoGenPath, { recursive: true });

const buildToolPath = path.resolve(
  "./node_modules/.bin/grpc_tools_node_protoc"
);

const jsBuildPluginPath = path.resolve(
  process.platform === "win32"
    ? "./node_modules/.bin/grpc_tools_node_protoc_plugin.cmd"
    : "./node_modules/.bin/grpc_tools_node_protoc_plugin"
);

const tsBuildPluginPath = path.resolve(
  process.platform === "win32"
    ? "./node_modules/.bin/protoc-gen-ts.cmd"
    : "./node_modules/.bin/protoc-gen-ts"
);

if (!fs.existsSync(buildToolPath))
  return console.log(
    `${buildToolPath} does not exist! please run "yarn" at source root path!`
  );

const protoDirPath = path.resolve("./src/proto");

console.log(`.js code will be created at ${protoDirPath}...`);

const buildJsResult = cp.spawnSync(
  `${buildToolPath}\
 --js_out=import_style=commonjs,binary:${protoGenPath}\
 --grpc_out=${protoGenPath}\
 --plugin=protoc-gen-grpc=${jsBuildPluginPath}\
 -I ${protoDirPath}\
  ${path.join(protoDirPath, "*.proto")}`,
  { shell: true }
);

if (buildJsResult.status === 0)
  console.log(`*.js files have created at ${protoGenPath}`);
else return console.log(buildJsResult.stderr.toString());

console.log(`.d.ts code will be created at ${protoDirPath}...`);

const buildTypeResult = cp.spawnSync(
  `${buildToolPath}\
 --plugin=protoc-gen-ts=${tsBuildPluginPath}\
 --ts_out=${protoGenPath}\
 -I ${protoDirPath}\
  ${path.join(protoDirPath, "*.proto")}`,
  { shell: true }
);

if (buildTypeResult.status === 0)
  console.log(`*.d.ts files have created at ${protoGenPath}`);
else return console.log(buildTypeResult.stderr.toString());
