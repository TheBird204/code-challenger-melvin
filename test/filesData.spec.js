const expect = require('chai').expect
const filesData = require('../filesData.js')

describe('Función para listar archivos y obtener su información', function () {
  it('Listar archivos', async function () {
    const fileList = await filesData.getFiles()
    console.log(fileList)
    expect(fileList.code).to.eql(200)
  })

  it('Obtener información de los archivos listado', async function () {
    const dataFiles = await filesData.getDataFiles()
    console.log(dataFiles)
    expect(dataFiles.code).to.eql(200)
  })
})
