const OSS = require("ali-oss");
const path = require("path");
const fs = require("fs");
const localPath = "./build/";

const packageJSON = JSON.parse(fs.readFileSync("package.json", "utf8"));
const remotePath = `friday`;

const client = new OSS({});

function readDir(currentDirPath, callback) {
  fs.readdir(currentDirPath, function (err, files) {
    if (err) {
      throw new Error(err);
    }
    files.forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        readDir(filePath, callback);
      }
    });
  });
}

async function upload(file) {
  try {
    // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
    // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    let formatRile = path.normalize(file).replace(/\\/g, "/");
    let newPath = formatRile.replace(/build/g, "");
    newPath = newPath.replace(/\//g, "/");
    const remotePaths = remotePath + newPath;
    const result = await client.put(remotePaths, formatRile);
    if (result.res.status === 200) {
      console.log("UPLOAD SUCCESS:" + packageJSON.version + "+" + file);
      // 上传成功后删除
      // fs.unlinkSync(file);
    }
  } catch (e) {
    console.log(e);
  }
}

// 上传单个文件
async function uploadSingleFile(file, remotefileName) {
try {
    // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
    // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const remotePaths = remotePath + remotefileName;
    const result = await client.put(remotePaths, file);
    if (result.res.status === 200) {
    console.log("UPLOAD SUCCESS:" + file);
    // 上传成功后删除
    fs.unlinkSync(file);
    }
} catch (e) {
    console.log(e);
}
}

async function deleteAll () {
    const result = await client.list({
        prefix: remotePath
    });
    result.objects.forEach(item => {
      console.log("DELETE SUCCESS:" + item.name);
      client.delete(item.name);
    });
    uploadAllFile();
}

function uploadAllFile() {
    
    readDir(localPath, function (filePath, stat) {
        upload(filePath);
    });
}

deleteAll();
