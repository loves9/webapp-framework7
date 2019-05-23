const fs = require('fs');
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

const logRed = (msg) => {
    console.log(chalk.red(msg));
};

const logGreen = (msg) => {
    console.log(chalk.green(msg));
};

const logCyan = (msg) => {
    console.log(chalk.cyan(msg));
};

let argv = require('optimist').argv;
// src 相对目录
let resolveSrc = (dir) => {
    return path.resolve(__dirname, '../src', dir);
};

let writeTemplateFile = (filename, modulePath) => {
    logCyan(`creating ${filename}`)
    fs.readFile(path.resolve(__dirname, 'template', filename), "utf-8", (error, data) => {
        if (error) {
            return logRed(error);
        }
        fs.writeFile(`${modulePath}/${filename}`, data, (err) => {
            if (err) {
                return logRed(err);
            }
            logGreen(`The ${filename} was saved!`);
        })
    })
}

const modulePath = resolveSrc('module');

if (argv.module && argv.module.length != 0 && typeof argv.module === 'string') {
    const moduleName = argv.module;
    let spinner = ora(`building module(${moduleName})...\n`)
    spinner.start()
    if (!fs.existsSync(modulePath)) {
        fs.mkdirSync(modulePath)
    }
    const createModulePath = resolveSrc(`module/${moduleName}`)
    if (!fs.existsSync(createModulePath)) {
        fs.mkdirSync(createModulePath)
    }

    writeTemplateFile('App.vue', createModulePath)
    // writeTemplateFile('main.js', createModulePath)
    writeTemplateFile('router.js', createModulePath)

    logCyan('creating store/index.js')
    const moduleStorePath = path.resolve(createModulePath, 'store')
    if (!fs.existsSync(moduleStorePath)) {
        fs.mkdirSync(moduleStorePath)
    }
    fs.writeFile(`${moduleStorePath}/index.js`, `
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './${moduleName}State'


Vue.use(Vuex);

const store = {
    state,
    getters,
    actions,
    mutations,
}

export default store
    `, (err) => {
            if (err) {
                logRed(err);
            } else {
                logGreen('The store/index.js was saved!');
            }
        })

    fs.writeFile(`${moduleStorePath}/actions.js`, `import * as types from './types.js'`, (err) => {
        if (err) {
            logRed(err);
        } else {
            logGreen('The store/actions.js was saved!');
        }
    })

    fs.writeFile(`${moduleStorePath}/getters.js`, ``, (err) => {
        if (err) {
            logRed(err);
        } else {
            logGreen('The store/getters.js was saved!');
        }
    })

    fs.writeFile(`${moduleStorePath}/mutations.js`, `
import * as types from './types.js'

export default {
    // [types.AUTH_LOGIN](state, payload) {
    //     state.user = payload;
    // }
}
    `, (err) => {
        if (err) {
            logRed(err);
        } else {
            logGreen('The store/mutations.js was saved!');
        }
    })

    fs.writeFile(`${moduleStorePath}/${moduleName}State.js`, `
const state = {

}

// init state
if (window.localStorage['VUE_DEMO_USER']) {
    // state.user = JSON.parse(window.localStorage['VUE_DEMO_USER']);
}
    
export default state;
    `, (err) => {
        if (err) {
            logRed(err);
        } else {
            logGreen(`The store/${moduleName}State.js was saved!`);
        }
    })

    fs.writeFile(`${moduleStorePath}/types.js`, `
// export const AUTH_LOGIN = 'Auth login';
    `, (err) => {
        if (err) {
            logRed(err);
        } else {
            logGreen('The store/types.js was saved!');
        }
    })

    // 创建views文件夹
    const viewsPath = path.resolve(createModulePath, 'views')
    fs.mkdirSync(viewsPath)

    spinner.stop()
} else if (argv.view && argv.view.length != 0 && typeof argv.view === 'string') {
    const array = argv.view.split('/');
    if (array.length < 2) {
        logRed('输入的参数非法，比如 moduleName/viewName')
        return
    }
    const moduleName = array[0]
    const tempViewName = array[1]
    const viewName = tempViewName.split('@')[0]
    const hasChild = Boolean(tempViewName.split('@')[1])
    if (viewName.indexOf('.') > -1) {
        logRed('view 名称非法，不能存在"." ')
        return
    }

    let spinner = ora(`building view(${argv.view})...\n`)
    spinner.start()

    if (!fs.existsSync(modulePath)) {
        fs.mkdirSync(modulePath)
    }

    const targetModulePath = resolveSrc(`module/${moduleName}`)

    if (!fs.existsSync(targetModulePath)) {
        logRed(`目标module不存在，请先创建${moduleName}模块`)
        spinner.stop();
        return;
    }

    const targetModuleViewDirPath = `${targetModulePath}/views`
    if (!fs.existsSync(targetModuleViewDirPath)) {
        fs.mkdirSync(targetModuleViewDirPath)
    }

    const targetViewPath = `${targetModuleViewDirPath}/${viewName}`

    if (fs.existsSync(targetViewPath)) {
        logRed(`已经存在要创建的view(${viewName})`)
        spinner.stop();
        return;
    }

    // 不存在子文件，那么直接创建 .vue文件
    if (!hasChild) {
        logCyan(`creating ${targetViewPath}.vue`)
        fs.readFile(path.resolve(__dirname, 'template/Vue.vue'), "utf-8", (error, data) => {
            if (error) {
                spinner.stop()
                return logRed(error);
            }
            fs.writeFile(`${targetViewPath}.vue`, data, (err) => {
                if (err) {
                    logRed(err);
                } else {
                    logGreen(`The ${viewName}.vue was saved!`);
                }
                spinner.stop()
            })
        })
    }
    // 创建 view 目录，然后创建 .html .js. vue. css 文件
    else {
        logCyan(`creating ${viewName}`)
        fs.mkdirSync(targetViewPath)
        const targetViewName = tempViewName.split('@')[1]


        fs.writeFile(`${targetViewPath}/${targetViewName}.css`, '', (err) => {
            if (err) {
                return logRed(err);
            }
            logGreen(`The ${targetViewName}.css was saved!`);
        })

        fs.writeFile(`${targetViewPath}/${targetViewName}.html`, `<div>
</div>`, (err) => {
                if (err) {
                    return logRed(err);
                }
                logGreen(`The ${targetViewName}.html was saved!`);
            })

        fs.writeFile(`${targetViewPath}/${targetViewName}.js`, `export default{
    data(){
        return {

        }
    },
    mounted(){

    },
    methods: {

    },
    components: {

    }
}`, (err) => {
                if (err) {
                    return logRed(err);
                }
                logGreen(`The ${targetViewName}.js was saved!`);
            })

        fs.writeFile(`${targetViewPath}/${targetViewName}.vue`, `<template src='./${targetViewName}.html' />
<style scoped src='./${targetViewName}.css' />
<script src="./${targetViewName}.js"></script>`, (err) => {
                if (err) {
                    return logRed(err);
                }
                logGreen(`The ${targetViewName}.vue was saved!`);
            })
    }
    spinner.stop()

} else {
    logRed('请输入如下参数：')
    logRed('--module {moduleName}')
    logRed('--view {moduleName/viewName}')
    logRed('--view {moduleName/viewDirName@viewName}')
    logRed('example:')
    logRed('npm run createModule -- {moduleName}')
    logRed('npm run createView -- {moduleName/viewName}')
    logRed('npm run createView -- {moduleName/viewDirName@viewName}')
    logRed('node cmd/module.js --module {moduleName}')
    logRed('node cmd/module.js --view {moduleName/viewName}')
    logRed('node cmd/module.js --view {moduleName/viewDirName@viewName}')
}




