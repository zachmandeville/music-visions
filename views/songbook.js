const choo = require('choo')
const html = require('choo/html')

module.exports = view

function view (state, emit) {
    emit('DOMTitleChange', 'Songbook')
    return trackListing(state)

  function trackListing(state, emit) {
    console.log({songList: state.songList})
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
    console.log('listin tracks')
      return html`
        <li>${song.title}</li>
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


