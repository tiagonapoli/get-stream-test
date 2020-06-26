const http = require('http')
const { promisify } = require('util')
const { finished } = require('stream')
const getStream = require('get-stream')

const handleWithGetStream = async (res) => {
    try {
        const data = await getStream(res)
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

const handleWithFinished = async (res) => {
    try {
        let data = ''
        res.on('data', (buf) => data += buf.toString())
        await promisify(finished)(res)
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

const req = http.get('http://localhost:3000', (res) => {
    console.log(res.statusCode)
    handleWithGetStream(res)
    setTimeout(() => req.abort(), 100)
})