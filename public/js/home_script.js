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
		rcmd_section.innerHTML = "waiting...."
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
	console.log(info_about_song['artists'][0]['id'],info_about_song['id'])
	window.location.href = `/songs/${info_about_song['artists'][0]['id']}&${info_about_song['id']}`
	similar_songs_section.innerHTML = "weiting"

	
})



 

const body = document.getElementsByTagName('head')[0]
async function hello(name){
	const test = await fetch(`/test/:${name}`)
	// console.log(test)
	var result = await test.json()
	// console.log(result["pidico"])

	var dom = new DOMParser()
	var doc = dom.parseFromString(result["page"], 'text/html')
	var jam = doc.querySelectorAll('script')[32]['text']
	// console.log(jam.slice(20,-1))
	var id = JSON.parse(jam.slice(20,-1))
	console.log(id['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['videoRenderer']['videoId'])
	// await body.appendChild(doc.querySelectorAll('script')[32])

	// console.log(ytInitialData)
}


similar_songs_section.addEventListener('click',(e) => {

		//storing all the parent and child elements
		var attributes = e.path
		let name 

		attributes.forEach(element => {
		element.className ==="display_details" ? name = element.id : null
		// element.id === "similar_songs" ? (name = element.innerText) : null 	
		})

		console.log(name)
		hello(name)
		// console.log(e.target.attributes[1]['value'])
		// console.log(e.target.children[1]['children'][0].innerHTML)
		// let display_details = document.getElementsByClassName('display_details')
		// console.log(display_details)
		// var target = e.target
		
		// if(target.className === "display_similar_songs"){

		// 	// hello(target.innerHTML)
		// 	console.log(target.innerHTML)
		// }
})

// const amartha = document.getElementById('amarth')
// const vid = document.getElementById('sam')

// amartha.addEventListener('click', () => {
// 	vid.play()
// })