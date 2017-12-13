import * as FS from 'fs'
import * as Path from 'path'
import * as pug from 'pug'

interface Folder {
  name: string
  filenames: string[]
}

export const getViewsFolder = (): string[] => {
  const viewsPath = Path.resolve(process.cwd(), 'views')
  return FS.readdirSync(viewsPath)
}

export const getTemplateFolder = (foldername: string = 'views'): Folder => {
  const folderPath = Path.resolve(process.cwd(), foldername)
  const filenames = FS.readdirSync(folderPath)

  return {
    name: foldername,
    filenames
  }
}

interface Template {
  path: string
  func?: pug.compileTemplate
}

interface StringIndexedObject<T> {
  [key: string]: T
}
interface CompiledFunc<T> {
  func: (data: StringIndexedObject<T>) => string
}

interface TemplateCollection {
  [key: string]: Template
}

export const getTemplateFilesFromFolder = (folder: Folder): TemplateCollection => {
  const collection: TemplateCollection = { }
  const templateFileNames = folder.filenames.filter(filename => {
    return Path.extname(filename) === '.pug'
  })
  
  templateFileNames.forEach(filename => {
    const templateName = filename.slice(0, filename.length - 4)
    const templatePath = Path.resolve(process.cwd(), 'views', filename)

    collection[templateName] = {
      path: templatePath
    }
  })

  return collection
}

export const compileTemplateCollection = (collection: TemplateCollection): TemplateCollection => {
  const compiled: TemplateCollection = {

  }
  for (const name of Object.keys(collection)) {
    const path = collection[name].path
    const func = pug.compileFile(path)
    compiled[name] = {
      path,
      func
    }
  }
  return compiled
}