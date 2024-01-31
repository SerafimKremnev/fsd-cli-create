import dedent from 'dedent-js';
import {saveKeyValue} from '../utils/fileUtils.js';
import {LogServices} from './log.service.js';

class OptionServiceClass {
  async setStyle(style: string) {
    if (style === 'cc' || style == 'kc') {
      try {
        await saveKeyValue('style', style)
        LogServices.printSuccess(
          dedent`Стиль успешно установлен
          fsd config - посмотреть конфиг`)
      } catch (e: any) {
        LogServices.printError(e?.message ?? e)
      }
    }else {
      LogServices.printError('Нельзя установить такой стиль написания')
    }
  }
  async setFileName(filename: string) {
    if (filename === 'component' || filename == 'index') {
      try {
        await saveKeyValue('filename', filename)
        LogServices.printSuccess(
          dedent`Имя файла успешно установлено 
          fsd config - посмотреть конфиг`)
      } catch (e: any) {
        LogServices.printError(e?.message ?? e)
      }
    } else {
      LogServices.printError('Нет такого варианта назвать файл')
    }
  }
  async setExport(exportVariant: string) {
    if (exportVariant === 'default' || exportVariant == 'const') {
      try {
        await saveKeyValue('export', exportVariant)
        LogServices.printSuccess(
          dedent`Вариант экспорта установлен 
          fsd config - посмотреть конфиг`)
      } catch (e: any) {
        LogServices.printError(e?.message ?? e)
      }
    } else {
      LogServices.printError('Нет такого варианта экспорта')
    }
  }

}

export const OptionServices = new OptionServiceClass()