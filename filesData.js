const https = require('https')

/**
 * Muestra la lista de archivos.
 *
 * @returns {object}
 */
async function getFiles () {
  return new Promise((response, reject) => {
    const returnResponse = {
      code: 0,
      status: false,
      message: '',
      data: {}
    }
    const options = {
      hostname: 'echo-serv.tbxnet.com',
      path: '/v1/secret/files',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer aSuperSecretKey'
      }
    }
    https.get(options, res => {
      const data = []

      if (res.statusCode === 200) {
        res.on('data', chunk => {
          data.push(chunk)
        })

        res.on('end', () => {
          const files = JSON.parse(Buffer.concat(data).toString())
          returnResponse.code = 200
          returnResponse.status = true
          returnResponse.message = 'OK'
          returnResponse.data = files.files
        })
      } else {
        returnResponse.code = 400
        returnResponse.status = false
        returnResponse.message = 'ERROR'
        returnResponse.data = {}
      }
      response(returnResponse)
    }).on('error', err => {
      returnResponse.code = 500
      returnResponse.status = false
      returnResponse.message = 'Error: ' + err.message
      returnResponse.data = {}
      response(returnResponse)
    })
  })
}

/**
 * Muestra la información de un archivo.
 *
 * @returns {object}
 */
async function getFileInfo (fileName) {
  return new Promise((response, reject) => {
    const returnResponse = {
      code: 0,
      status: false,
      message: '',
      data: {}
    }

    const options = {
      hostname: 'echo-serv.tbxnet.com',
      path: '/v1/secret/file/' + fileName,
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        authorization: 'Bearer aSuperSecretKey'
      }
    }

    https.get(options, res => {
      const data = []
      const result = {
        file: fileName,
        lines: []
      }

      if (res.statusCode === 200) {
        res.on('data', chunk => {
          data.push(chunk)
        })

        res.on('end', () => {
          const fileData = Buffer.concat(data).toString()
          const lines = fileData.split('\n')

          const headers = lines[0].split(',')

          for (let i = 1; i < lines.length; i++) {
            const currentline = lines[i].split(',')
            const lineInfo = {}

            for (let j = 0; j < headers.length; j++) {
              if (headers[j] !== 'file') {
                if (currentline[j] !== '' && currentline[j] !== null && currentline[j]) {
                  lineInfo[headers[j]] = currentline[j]
                }
              }
            }
            result.lines.push(lineInfo)
          }
          returnResponse.code = 200
          returnResponse.status = true
          returnResponse.message = 'OK'
          returnResponse.data = result
          // response(result);
        })
      } else {
        returnResponse.code = 400
        returnResponse.message = 'ERROR'
      }
      response(returnResponse)
    }).on('error', err => {
      returnResponse.code = 500
      returnResponse.message = 'Error: ' + err.message
      response(returnResponse)
    })
  })
}

/**
 * Muestra la información de los archivos listados y la formatea.
 *
 * @returns {object}
 */
async function getDataFiles () {
  const filesResponse = await getFiles()
  const result = []
  const returnResponse = {
    code: 0,
    status: false,
    message: '',
    data: {}
  }

  if (filesResponse.code === 200) {
    for (let i = 0; i < filesResponse.data.length; i++) {
      const fileData = await getFileInfo(filesResponse.data[i])
      if (fileData.code === 200) {
        if (fileData.data.lines.length > 0) {
          for (let j = 0; j < fileData.data.lines.length; j++) {
            if (Object.keys(fileData.data.lines[j]).length < 3) {
              fileData.data.lines.splice(j, 1)
            }
          }
          result.push(fileData.data)
          returnResponse.code = 200
          returnResponse.status = true
          returnResponse.message = 'OK'
          returnResponse.data = result
        }
      } else {
        returnResponse.code = 400
        returnResponse.message = 'Error obteniendo la información de los archivos'
      }
    }
  } else {
    returnResponse.code = 400
    returnResponse.message = 'Error al obtener la lista de archivos'
  }

  return returnResponse
}

module.exports = { getFiles, getFileInfo, getDataFiles }
