const html = require('choo/html')
const _ = require('lodash')

module.exports = view

function view (state, emit) {
  emit('DOMTitleChange', 'Songbook')
  return trackListing(state)

  function trackListing (state, emit) {
    return html`
      <body onkeydown=${hotKeys}>
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
      </body>
      `
  }
  function listTracks (song) {
    return html`
      <li tabindex='0' onkeydown=${hotKeys} onclick=${() => change(song)}>${song.title}<span>●</span></li> `
  }

  function change (song) {
    emit('changeSong', song.title)
  }

  function hotKeys (e) {
    if (e.key === 'Enter') {
      var song = {title: _.trim(e.target.innerText, '●')}
      change(song)
    }
  }
}
