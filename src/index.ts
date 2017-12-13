import * as FS from 'fs'
import * as Path from 'path'

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