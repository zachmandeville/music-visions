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
        <h1><span>M U S I C</span><span>V I S I O N S</span> </h1>
        <div id='tracklist'>
	  <ul>
	   ${state.songList.map(listTracks)}
	  </ul>
	</div>
        <h1 id='last-track'>Last Track: ${state.lastSong}</h1>
      </div>
    </div>
    `
  }
  function listTracks (song) {
      return html`
        <li onclick=${() => change(song)}>${song.title}<span>●</span></li> `
  }

  function change (song) {
    emit('changeSong',song.title)
  }
  function close (data) {
    console.log(data)
  }
}


