const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')


const dotenv = require('dotenv')
dotenv.config()

const details = {
	grant_type: 'client_credentials',
	client_id : process.env.CLIENT_IDE,
	client_secret : process.env.CLIENT_SECT
}

// console.log(details)


const bady = {
	grant_type : 'client_credentials'
}

//keys
var samples

//converting the client id and password to base 64 
var encodedData = 'Basic '+ Buffer.from(details.client_id + ':' + details.client_secret).toString('base64')

//function to get an authorization code
async function fetching_auth(){

const result = await fetch('https://accounts.spotify.com/api/token',{method : "POST",

	headers :{

		'Authorization': encodedData,
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body :'grant_type=client_credentials'

	}
	)

	const info = await result.json()

	return info.access_token

}

//function to fetch songs
async function fetching_details(temp,link ){

	let tracks = await fetch(link,{
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'Bearer '+ temp
		}
	})


	return(tracks)

}

//temp to store the auth code
var temp = "BQC55VvMp7P6Rl108Zz8UG1mc_ufdP-9KO_yUdAW131N_2kFfdEuREr464Da5a45tugXrpbFmgHHC_zaSj8"
//fetch the song of an artist 

router.get('/artist/:name',async(req,res) => {

try {
	// statements
	var songs
	// sample = await fetching()
	//fetching the tracks with the given name
	var tracks = await fetching_details(temp,`https://api.spotify.com/v1/search?q=${req.params.name}&type=track&limit=5`)
	.catch(err => console.log("numma main aane : ",err))

	// console.log("this is track : ", tracks)
	if(tracks.ok){

	//tracks	
	songs = await tracks.json()

	res.json(songs['tracks']['items'])

	}

	else{

		//creating new token and continuing the search
		sample = await fetching_auth().catch(err => console.log("this : else ",err))
		
		//fetching the song for recommendation section
		tracks = await fetching_details(sample,`https://api.spotify.com/v1/search?q=${req.params.name}&type=track&limit=5`).catch(err => console.log("this too is else ",err))
		temp = sample
		songs = await tracks.json()
		res.json(songs['albums']['items'])

		}	

	}

catch(e) {
	// statements
	console.log("oops",e);
	res.json({details : ['onnumilla mekkale']})
}

})

//function to make sure the list size of the genre is less than 5
function checking_size_of_array(artist_genre){

	if(artist_genre.length <= 3 )
		return artist_genre
	else{
		for(var i = 0; i <= artist_genre.length; i++){

			if(artist_genre.length <= 3){
				return artist_genre
			}

			artist_genre.pop()

		}
	}

}

//fetching the genre of a particular artist
router.get('/artist_genre/:info',async function(req,res,next){

	//middleware to do the fetching process and everything so as to fast it all up as js in non blocking

	var info = req.params.info.split(',')
	res.locals.info = info
	var result = await fetching_details(temp,`https://api.spotify.com/v1/artists/${info[0]}`).catch(err => console.log("error : ",err))
	
	var genre = await result.json()
	

	// making sure the number of genre is less than or equal to 5
	var precise_genre = checking_size_of_array(genre['genres'])
	
	res.locals.precise_genre = precise_genre
	next()

},async(req,res) => {

	//fetching the similar items

	var genres_of_artist = res.locals.precise_genre	
	
	//url to find the similar songs
	let url = `https://api.spotify.com/v1/recommendations?seed_artists=${res.locals.info[0]}&seed_genres=${res.locals.precise_genre.join(',')}&seed_tracks=${res.locals.info[1]}&limit=6`

	var familiar_songs = await fetching_details(temp,url).catch(err => console.log(err))


	var result_familiar_songs = await familiar_songs.json()

	res.json(result_familiar_songs) 


})

//home
router.get('/',(req,res) => {
	res.render('home')
})

module.exports = router 
