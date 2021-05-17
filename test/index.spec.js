const request = require('supertest')
const expect = require('chai').expect
require('../index.js')

const api = request('http://localhost:3000')

describe('GET /iecho?text=test', function () {
  it('Respuesta con el parámetro text lleno', async function () {
    const response = await api.get('/iecho?text=test')
    console.log(response.body)
    expect(response.status).to.eql(200)
  })
})

describe('GET /iecho?text=', function () {
  it('Respuesta con el parámetro text vacio', async function () {
    const response = await api.get('/iecho?text=')
    console.log(response.body)
    expect(response.status).to.eql(200)
  })
})

describe('GET /iecho', function () {
  it('Respuesta sin el parámetro text', async function () {
    const response = await api.get('/iecho')
    console.log(response.body)
    expect(response.status).to.eql(200)
  })
})
