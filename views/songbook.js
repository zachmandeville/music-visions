const choo = require('choo')
const html = require('choo/html')
const cool = require('../dots.json')

module.exports = view

function view (state, emit) {
  if(state.currentSong == ''){
    return trackListing(state)
  }
  else{
    return song(state)
  }

  function trackListing(state, emit) {
    return html`
    <div class='wrapper'>
      <div class='paper'>
      <div class='text'>
	<ul>
	 ${state.songs.map(listTracks)}
	</ul>
      <div class='fadingAnimation'></div>
      </div>
      </div>
    </div>
    `
  }
  function listTracks (song) {
    return html`<li onclick=${change}>${song.title}</li>`
  }

  function song(state,emit) {
    var song = state.songs.find(song => song.title == state.currentSong)
    console.log(song)
    return html`
      <div class='wrapper'>
        <div class='paper'>
          <h1>${song.title}</h1>
          <p>${song.post}></p>
          <p onclick=${close}>x close x</a>
        </div>
    </div>
    `
  }
 

  
  function change (data) {
    console.log(data.target.innerHTML)
    song = data.target.innerHTML
    emit('changeSong',song)
  }
  function close (data) {
    console.log(data)
  }


}



