const express = require('express')
const app = express()
const router = require('./pages/home_files')


const PORT = process.env.PORT || 8080

app.use(express.static(__dirname+'/public'))

app.set('view engine','ejs')

app.use('/',router)

app.listen(PORT, () => {
	console.log("listening to 8080")
})