const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const archiver = require('archiver');
const R = require('ramda');

let zipPackage = function({ origin, target }) {
    return new Promise((resolve, reject) => {
        // const zipPath = path.resolve(savePath, `${projectName}.zip`)
        const output = fs.createWriteStream(target);
        const archive = archiver("zip");

        output.on("close", function() {
            resolve(target);
        });

        archive.on("warning", function(err) {
            if (err.code === "ENOENT") {
                // log warning
            } else {
                reject(err);
            }
        });

        archive.on("error", function(err) {
            reject(err);
        });

        archive.directory(`${origin}/`, false);

        archive.pipe(output);
        archive.finalize();
    });
};

let copyConfig = function({ origin, target }) {
    return new Promise((resolve, reject) => {
        try {
            fse.copySync(
                path.join(origin, "plugin.properties"),
                path.join(target, "plugin.properties")
            );
            fse.copySync(
                path.join(origin, "config.properties"),
                path.join(target, "www", "config.properties")
            );
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

let build = function({ projectInfo, projectRootPath, savePath, projectName }) {
    projectName = projectName || path.basename(projectRootPath);
    const target = path.resolve(savePath, `${projectName}.zip`);
    if (R.has("frame", projectInfo)) {
        return copyConfig({
            origin: path.join(projectRootPath, "config"),
            target: path.join(projectRootPath, "dist")
        }).then(() =>
            zipPackage({
                target,
                origin: path.join(projectRootPath, "dist")
            })
        );
    } else {
        return zipPackage({
            target,
            origin: projectRootPath
        });
    }
};

const projPath = process.cwd()

build({
    projectInfo: {frame: 'vue'},
    projectRootPath: projPath,
    savePath: projPath + '/build/output'
})
