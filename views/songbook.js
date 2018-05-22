const choo = require('choo')
const html = require('choo/html')

module.exports = view

function view (state, emit) {
    emit('DOMTitleChange', 'Songbook')
    return trackListing(state)

  function trackListing(state, emit) {
    return html`
    <div class='wrapper'>
      <div class='paper'>
      <h1>M U S I C    V I S I O N S </h1>
      <div id='tracklist'>
	<ul>
	 ${state.songList.map(listTracks)}
	</ul>
      </div>
        <h1>Last Track: ${state.lastSong}</h1>
      </div>
    </div>
    `
  }
  function listTracks (song) {
      return html`
        <li onclick=${change}>${song.title}</li>
	`
  }

  function change (data) {
    song = data.target.innerHTML
    emit('changeSong',song)
  }
  function close (data) {
    console.log(data)
  }
}


