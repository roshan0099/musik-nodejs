//getting all the elements
const text_field = document.getElementById('song_name')
var rcmd_section = document.getElementById('rcmd')


//grabbing div where similar songs are to be displayed 
var similar_songs_section = document.getElementById('similar_songs')

//array to have all the fetched elements
var details



text_field.addEventListener('input',async() => {

	if(text_field.value !==''){

		similar_songs_section.innerHTML = " "
		rcmd_section.innerHTML = "weiting...."
		song_name.style.border = 'none'
		const sam = await fetch(`/artist/${text_field.value}`,{method : 'GET'})
		details = await sam.json()

		//clearing the suggestion section
		rcmd_section.innerHTML = " "
		// console.log(details)
		for(var i = 0; i < details.length ; i++)
		{	
			// console.log(details[i]['name'])
			//creating a list
			var rec_list = document.createElement('li')
			rec_list.setAttribute('class','option')
			rec_list.innerHTML = details[i]['name']
			rcmd_section.appendChild(rec_list)	 
		}


	}

	else {
		rcmd_section.innerHTML =" "	
		song_name.style.borderBottom = '1px solid black'
	}


})


//function to grab the details of the clicked element 
function clicked_element(elm){

	for(var i =0; i < details.length; i++){
		if(elm === details[i]['name']){

			 return details[i]
		}


	}
 	

}


//grabbing all the options
rcmd_section.addEventListener('click',async (e) => {

	//id of the artist of the selected track
	var info_about_song = clicked_element(e.target.innerHTML)
	
	similar_songs_section.innerHTML = "weiting"
	// console.log(info_about_song['id'])

	var similar_songs = await fetch(`/artist_genre/${info_about_song['artists'][0]['id']},${info_about_song['id']}`)

	similar_songs_section.innerHTML = " "
	//similar songs 
	var result = await similar_songs.json()
	
	var tracks = result['tracks']
	//fetching similar songs 

	for(var i = 0; i< tracks.length;i++){
		
		var display_similar_songs = document.createElement('li')
		display_similar_songs.setAttribute('class','display_similar_songs')
		display_similar_songs.innerHTML = tracks[i]['name']
		similar_songs_section.appendChild(display_similar_songs)
	}


	
})
 
	// btn.addEventListener('click',async (e) => {

					
	// 	const sam = await fetch(`/artist/${text_field.value}`,{method : 'GET'})
	// 	const details = await sam.json()
	// 	for(var i = 0; i < details.length ; i++)
	// 		console.log(details[i]['name'])

	// })
