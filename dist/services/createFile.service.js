var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dataTemplate, hooksTemplate, styleTemplate, tsxTemplate, typesTemplate } from "../utils/template.js";
import { LogServices } from "./log.service.js";
import fs from 'fs';
import { getKeyValue } from '../utils/fileUtils.js';
export const createName = (name, styleParent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const style = styleParent !== null && styleParent !== void 0 ? styleParent : (yield getKeyValue('style'));
        const s = style !== null && style !== void 0 ? style : 'cc';
        if (s === 'kc') {
            return name;
        }
        if (name.includes(('-'))) {
            return name.split('-').map(char => char.charAt(0).toUpperCase() + char.slice(1)).join('');
        }
        else {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }
    catch (_a) {
        LogServices.printError('Неверное название компонента должно быть: example-component');
        process.exit(1);
    }
});
const getAdditional = (add) => {
    if (add) {
        const additional = add.split('');
        return additional;
    }
    return [];
};
const getFolder = (folder = 'f') => {
    const lib = {
        f: 'features',
        e: 'entities',
        w: 'widgets'
    };
    if (lib[folder]) {
        return lib[folder];
    }
    else {
        LogServices.printError('Такой папки не существует');
        process.exit(1);
    }
};
const createDirectory = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs.promises.mkdir(path, { recursive: true });
    }
    catch (error) {
        LogServices.printError(`Ошибка при создании директории: ${path}`);
        process.exit(1);
    }
});
const componentDirectory = (f = 'f', name) => __awaiter(void 0, void 0, void 0, function* () {
    const n = yield createName(name);
    const currentPath = process.cwd();
    const haveLayer = currentPath.includes('features') || currentPath.includes('widgets') || currentPath.includes('shared') || currentPath.includes('entities');
    if (haveLayer) {
        return `${process.cwd()}/${name ? n : ''}`;
    }
    return `${process.cwd()}/src/${getFolder(f)}/${name ? n : ''}`;
});
const checkExist = (f = 'f', name) => __awaiter(void 0, void 0, void 0, function* () {
    const dir = yield componentDirectory(f, name);
    if (fs.existsSync(dir)) {
        console.log(`Компонент ${name} уже существует в ${dir}`);
        process.exit(1);
    }
});
export const createModule = (n, f = 'f', additional) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const add = getAdditional(additional);
        const name = yield createName(n);
        const exportVariant = yield getKeyValue('export');
        const filename = yield getKeyValue('filename');
        const newName = yield createName(n, 'cc');
        const dir = yield componentDirectory(f, n);
        yield checkExist(f, name);
        const tsx = yield tsxTemplate(name, exportVariant === 'default', add.includes('c'));
        const files = [
            { url: `${dir}/ui/${filename === 'index' ? 'index' : name}.tsx`, template: tsx }
        ];
        if (add.includes('c')) {
            files.push({ url: `${dir}/ui/${name}${name.includes('-') ? '-s' : 'S'}tyles.ts`, template: styleTemplate(newName) });
        }
        if (add.includes('t')) {
            files.push({ url: `${dir}/types/type${newName}.ts`, template: typesTemplate(newName) });
        }
        if (add.includes('h')) {
            files.push({ url: `${dir}/hooks/use${newName}.ts`, template: hooksTemplate(newName, exportVariant === 'default') });
        }
        if (add.includes('d')) {
            files.push({ url: `${dir}/data/mock${newName}.ts`, template: dataTemplate(newName) });
        }
        for (const file of files) {
            const dir = file.url.substring(0, file.url.lastIndexOf('/'));
            yield createDirectory(dir);
            yield fs.promises.writeFile(file.url, file.template);
        }
        LogServices.printSuccess(`Компонент создан по пути ${dir}/ui/${filename === 'index' ? 'index' : name}.tsx`);
    }
    catch (e) {
        LogServices.printError('Произошла ошибка');
        console.error((_b = e === null || e === void 0 ? void 0 : e.message) !== null && _b !== void 0 ? _b : e);
    }
});
