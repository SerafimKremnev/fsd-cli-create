var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import dedent from 'dedent-js';
import { getKeyValue } from '../utils/fileUtils.js';
const { bgRed, bgGreen, cyan, magenta, green, yellowBright, bold } = chalk;
const t = (l) => '-'.repeat(l);
const lib = {
    'cc': 'CamelCase',
    'kc': 'kebab-case'
};
class LogServicesClass {
    printError(error) {
        console.log(bgRed(" ОШИБКА! ") + ' ' + error);
    }
    printSuccess(success) {
        console.log(bgGreen(" УСПЕШНО! ") + ' ' + success);
    }
    printInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const style = yield getKeyValue('style');
            const filename = yield getKeyValue('filename');
            const exportVariant = yield getKeyValue('export');
            const header = t(20) + ' CONFIG ' + t(20);
            console.log(dedent `
      
      ${bold(cyan(header))}

      ${bold(green("Cтиль: "))}${(_a = lib[style]) !== null && _a !== void 0 ? _a : 'не установлен (по умолчанию CamelCase)'}
      ${bold(green("Название компонента: "))}${filename !== null && filename !== void 0 ? filename : 'не установлен (по умолчанию component)'}
      ${bold(green("Вариант экспорта: "))}${exportVariant !== null && exportVariant !== void 0 ? exportVariant : 'не установлен (по умолчанию const)'}

      ${bold(cyan(t(header.length)))}
      
      `);
        });
    }
}
export const LogServices = new LogServicesClass();
