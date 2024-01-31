#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from 'commander';
import { LogServices } from './services/log.service.js';
import { OptionServices } from './services/option.service.js';
import { createModule } from './services/createFile.service.js';
const program = new Command();
program
    .command('set-style <style>')
    .description('установить стиль наименования (CamelCase или kebab-case) [cc | kc] - по умолчанию cc')
    .action(OptionServices.setStyle);
program
    .command('set-filename <filename>')
    .description('установить наименование файла (component или index - по умолчанию component)')
    .action(OptionServices.setFileName);
program
    .command('set-export <export>')
    .description('установить вариант экспорта (default или const - по умолчанию const)')
    .action(OptionServices.setExport);
program
    .command('config')
    .description('Показать текущий конфиг')
    .action(LogServices.printInfo);
program
    .description('Создание компонента в папке (по умолчанию features)')
    .arguments('<name>')
    .option('-add, --additional <additional>', 'Дополнительные фичи (types, hooks, data, cvaStyles(в папке ui) - thdс)')
    .option('-f, --features', 'Место создания компонента')
    .option('-e, --entities', 'Место создания компонента')
    .option('-w, --widgets', 'Место создания компонента')
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = options.features ? 'f' : options.entities ? 'e' : options.widgets ? 'w' : 'f';
    yield createModule(name, folder, options.additional);
}));
program.parse(process.argv);
// const options = program.opts();
