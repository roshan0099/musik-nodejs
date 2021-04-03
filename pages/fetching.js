const fetch = require('node-fetch')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

async function sample(req,res){
	console.log(req.params.name,req.params)
	console.log("just checking if this work")
	const html = await fetch(`https://www.youtube.com/results?search_query=${req.params.name}`)
	// const html = await fetch('https://www.youtube.com/results?search_query=rehna+tu')
	// console.log(linki)
	const link = await  html.text()

	// // console.log("this is link : ",link)
	// var sam = "<!DOCTYPE html><script>Hello world</script><script class='check'>kollalo keli</script>"
	// const dom = await new JSDOM(sam,{resources: "usable"})
	// console.log("scrapped info : ",dom.window.document.querySelector("script").textContent)

	
	res.json({"page" : link})
	
	
}

module.exports.sample = sample