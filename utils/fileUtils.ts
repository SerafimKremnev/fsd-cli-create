import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

export const saveKeyValue = async (key: string, value: string) => {
  let data: Record<string, string> = {}
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file as any)
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file as any)
    return data[key]
  }
  return undefined
}

const isExist = async(path: string) => {
  try {
    await promises.stat(path)
    return true
  } catch {
    return false
  }
}

