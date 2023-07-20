const express = require('express');
const app = express();

const studentController = require ('./controllers/StudentController.js')
const studentIdGenerator = require ('./util.js')

let output = studentIdGenerator()

app.get('/', (req, res) => {


    res.send(`${output}`)
})

app.use('/students',studentController)


// app.get("/test", (req, res) => {
//     res.json({
//         'test': 'success',
//         'time': '1:00PM'
//     })
// })

module.exports = app;