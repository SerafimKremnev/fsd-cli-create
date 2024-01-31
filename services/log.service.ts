import chalk from 'chalk';
import dedent from 'dedent-js';
import {getKeyValue} from '../utils/fileUtils.js';
const {bgRed, bgGreen, cyan, magenta, green, yellowBright, bold} = chalk

const t = (l: number) => '-'.repeat(l)
const lib: any = {
  'cc': 'CamelCase',
  'kc': 'kebab-case'
}

class LogServicesClass {
  
  printError(error: string) {
    console.log(bgRed(" ОШИБКА! ") + ' ' + error) 
  }
  printSuccess(success: string) {
    console.log(bgGreen(" УСПЕШНО! ") + ' ' +  success) 
  }
  async printInfo() { 
    const style: any = await getKeyValue('style')
    const filename: any = await getKeyValue('filename')
    const exportVariant: any = await getKeyValue('export')
    const header = t(20) + ' CONFIG ' + t(20)
    console.log(
      dedent`
      
      ${bold(cyan(header))}

      ${bold(green("Cтиль: "))}${lib[style] ?? 'не установлен (по умолчанию CamelCase)'}
      ${bold(green("Название компонента: "))}${filename ?? 'не установлен (по умолчанию component)'}
      ${bold(green("Вариант экспорта: "))}${exportVariant ?? 'не установлен (по умолчанию const)'}

      ${bold(cyan(t(header.length)))}
      
      `
    )
  }
}

export const LogServices = new LogServicesClass()