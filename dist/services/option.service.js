var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dedent from 'dedent-js';
import { saveKeyValue } from '../utils/fileUtils.js';
import { LogServices } from './log.service.js';
class OptionServiceClass {
    setStyle(style) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (style === 'cc' || style == 'kc') {
                try {
                    yield saveKeyValue('style', style);
                    LogServices.printSuccess(dedent `Стиль успешно установлен
          fsd config - посмотреть конфиг`);
                }
                catch (e) {
                    LogServices.printError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e);
                }
            }
            else {
                LogServices.printError('Нельзя установить такой стиль написания');
            }
        });
    }
    setFileName(filename) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (filename === 'component' || filename == 'index') {
                try {
                    yield saveKeyValue('filename', filename);
                    LogServices.printSuccess(dedent `Имя файла успешно установлено 
          fsd config - посмотреть конфиг`);
                }
                catch (e) {
                    LogServices.printError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e);
                }
            }
            else {
                LogServices.printError('Нет такого варианта назвать файл');
            }
        });
    }
    setExport(exportVariant) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (exportVariant === 'default' || exportVariant == 'const') {
                try {
                    yield saveKeyValue('export', exportVariant);
                    LogServices.printSuccess(dedent `Вариант экспорта установлен 
          fsd config - посмотреть конфиг`);
                }
                catch (e) {
                    LogServices.printError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e);
                }
            }
            else {
                LogServices.printError('Нет такого варианта экспорта');
            }
        });
    }
}
export const OptionServices = new OptionServiceClass();
