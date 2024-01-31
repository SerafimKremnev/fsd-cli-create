import { dataTemplate, hooksTemplate, styleTemplate, tsxTemplate, typesTemplate } from "../utils/template.js";
import { LogServices } from "./log.service.js";

import fs from 'fs';
import {getKeyValue} from '../utils/fileUtils.js';
import dedent from "dedent-js";

export const createName = async (name: string, styleParent?: string) => {
  try {
    const style: any = styleParent ?? (await getKeyValue('style'))
    const s = style ?? 'cc'
    if (s === 'kc') {
      return name
    }
    if(name.includes(('-'))) {
      return name.split('-').map(char => char.charAt(0).toUpperCase() + char.slice(1)).join('')
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  } catch {
    LogServices.printError('Неверное название компонента должно быть: example-component')
    process.exit(1);
  }
}

const getAdditional = (add: string) => {
  if (add) {
    const additional = add.split('')
    return additional
  } 
  return []
 
}

const getFolder = (folder: string = 'f') => {
  const lib: Record<string, string> = {
    f: 'features',
    e: 'entities',
    w: 'widgets'
  }
  if (lib[folder]) {
    return lib[folder]
  } else {
    LogServices.printError('Такой папки не существует')
    process.exit(1);
  }
}

const createDirectory = async (path: string) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (error) {
    LogServices.printError(`Ошибка при создании директории: ${path}`);
    process.exit(1);
  }
}

const componentDirectory = async(f: string = 'f', name: string) => {
  const n = await createName(name)
  const currentPath = process.cwd()
  const haveLayer = currentPath.includes('features') || currentPath.includes('widgets') || currentPath.includes('shared') || currentPath.includes('entities')
  if (haveLayer) {
    return `${process.cwd()}/${name ? n : ''}`
  }
  return `${process.cwd()}/src/${getFolder(f)}/${name ? n : ''}`
}

const checkExist = async (f: string = 'f', name: string) => {
  const dir = await componentDirectory(f, name)
  if (fs.existsSync(dir)) {
    console.log(`Компонент ${name} уже существует в ${dir}`);
    process.exit(1);
  }
}

export const createModule = async (n: string, f: string = 'f', additional: string) => {
  try {
    const add = getAdditional(additional)
    const name = await createName(n)
    const exportVariant: any = await getKeyValue('export')
    const filename: any = await getKeyValue('filename')
    const newName = await createName(n, 'cc')
    const dir = await componentDirectory(f, n)

    await checkExist(f, name)

    const tsx = await tsxTemplate(name, exportVariant === 'default', add.includes('c'))

    const files = [
      {url: `${dir}/ui/${filename === 'index' ? 'index'  : name}.tsx`, template: tsx}
    ]
  
    if (add.includes('c')) {
      files.push( {url: `${dir}/ui/${name}${name.includes('-') ? '-s' : 'S'}tyles.ts`, template: styleTemplate(newName)})
    }

    if (add.includes('t')) {
      files.push( {url: `${dir}/types/type${newName}.ts`, template: typesTemplate(newName)})
    }

    if (add.includes('h')) {
      files.push( {url: `${dir}/hooks/use${newName}.ts`, template: hooksTemplate(newName, exportVariant === 'default')})
    }
  
    if (add.includes('d')) {
      files.push( {url: `${dir}/data/mock${newName}.ts`, template: dataTemplate(newName)})
    }
    
    for (const file of files) {
      const dir = file.url.substring(0, file.url.lastIndexOf('/'));
      await createDirectory(dir);
      await fs.promises.writeFile(file.url, file.template);
    }

    LogServices.printSuccess(`Компонент создан по пути ${dir}/ui/${filename === 'index' ? 'index'  : name}.tsx`)

  } catch (e: any) {
    LogServices.printError('Произошла ошибка')
    console.error(e?.message ?? e)
  }
}
