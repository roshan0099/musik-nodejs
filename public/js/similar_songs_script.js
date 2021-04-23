//loding yt embed controls
var tag = document.createElement("script");
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



//display all the songs
const similar_songs_section = document.getElementById('similar_songs') 

async function fetching_info(){

    console.log("workiing")
    var similar_songs = await fetch(`/artist_genre`)

   
    //similar songs 
    var result = await similar_songs.json()

    var tracks = result['tracks']
    //fetching similar songs 

    console.log("soman",tracks)

    //clearing up the loding part 

    similar_songs_section.innerHTML = " "

    for(var i = 0; i< tracks.length;i++){
    
    //to encapsule both song and artist information
    var display_details = document.createElement('div')
    display_details.setAttribute('class','display_details')

    //div for all the title and info
    var display_song_info = document.createElement('div')
    display_song_info.setAttribute('class','display_song_info')

    //div for photos of album
    var display_photo = document.createElement('div')
    display_photo.setAttribute('class','display_photo')

    //img tag for the pic
    var photo = document.createElement('img')
    photo.setAttribute('class','photo')
    photo.src = tracks[i]['album']['images'][2]['url']

   
    var display_similar_songs = document.createElement('li')
    var display_artist_name = document.createElement('li')
    display_similar_songs.setAttribute('class','display_similar_songs')
    display_artist_name.setAttribute('class','display_artist_name')
    // tracks[i]['artists'].forEach(elm => (console.log("number : ",i,elm['name'])))

    display_artist_name.innerHTML = tracks[i]['artists'][0]['name']

    //name of similar song
    var name = tracks[i]['name']
    display_similar_songs.innerHTML = name
    display_details.setAttribute('id',name)

    display_song_info.appendChild(display_similar_songs)
    display_song_info.appendChild(display_artist_name)

    display_photo.appendChild(photo)

    display_details.appendChild(display_photo)
    display_details.appendChild(display_song_info)

    similar_songs_section.appendChild(display_details)
        
}


}

similar_songs_section.innerHTML = "waiting.."
fetching_info()




const body = document.getElementsByTagName('head')[0]

//function to fetch the youtube id from the given url
async function youtube_id(name){
	const test = await fetch(`/test/:${name}`)
	// console.log(test)
	var result = await test.json()
	// console.log(result["pidico"])

	var dom = new DOMParser()
	var doc = dom.parseFromString(result["page"], 'text/html')
	var jam = doc.querySelectorAll('script')[32]['text']
	// console.log(jam.slice(20,-1))
	var id = JSON.parse(jam.slice(20,-1))

    return id['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['videoRenderer']['videoId']

}


const player = document.getElementById('player')


//controlling the youtube iframe
var embeded_player

function onYouTubeIframeAPIReady() {
  
    embeded_player = new YT.Player('frame_i', {
        videoId: `video-id`,
        events: {
          'onReady': onPlayerReady,
        //   'onStateChange': onPlayerStateChange
        }
      });
    
}

function onPlayerReady() {

    console.log(1)
    // console.log('duration : ',embeded_player.getDuration())
    
}

const icon_pp = document.getElementById('embed_player')
icon_pp.style.display = "none"
var temp
similar_songs_section.addEventListener('click',async (e) => {

      icon_pp.style.display = "block"

		//storing all the parent and child elements
		var attributes = e.path
		let name 

    if(temp)
      temp.style.backgroundColor = ""

		attributes.forEach(element => {
		element.className ==="display_details" ? name = element.id : null
		// element.id === "similar_songs" ? (name = element.innerText) : null 	
		})
      var elm = document.getElementById(name)
      elm.style.backgroundColor = "rgb(0,0,0,0.2)"
      temp = elm

         //grabbing the play pic to change it into pause/play
         const play_pic = document.getElementById(name)
        //  console.log("play pic : ",play_pic.childNodes[0].childNodes[1].childNodes[0])


        let vid_id = await youtube_id(name)
		// console.log(vid_id)

        const iframe_vid = document.getElementById('frame_i')
        iframe_vid.src = `https://www.youtube.com/embed/${vid_id}?enablejsapi=1&autoplay=1`
        // console.log(embeded_player)
        // console.log('duration : ',embeded_player.getDuration())
        


})

let toggle = true
const pp_btn = document.getElementById('pp_btn')

pp_btn.addEventListener('click',() => {
    
    if(!toggle){
     
        pp_btn.src = "/css/pause.png"
        embeded_player.playVideo()
        toggle = true
    }
    else{
       
        pp_btn.src = "/css/play.png"
        embeded_player.pauseVideo()
        toggle = false
    }
})

const query = document.getElementById('query')

query.addEventListener('click',() => {
  window.location.href = "/"
})