var smarkt = require('smarkt')

var archive = new DatArchive(window.location.host)

module.exports = store

function store (state,emitter) {
  state.songList = []

  emitter.on('DOMContentLoaded', function () {
    emitter.on('changeSong', function (song) {
      song = song.replace(/\s+/g, '-').toLowerCase()
      emitter.emit('clearIndex')
      emitter.emit('pushState', `/#songbook/${song}`)
      setTimeout("document.getElementById('track').classList.toggle('change-color')", 1500)
    })
  })
  emitter.on('DOMContentLoaded', function () {
    archive.readdir('songs').then(songs => mapToState(songs))
  })

  function mapToState (songs) {
    songs.map(song => {
      archive.readFile(`songs/${song}`)
	.then(songText => addToSongList(songText))
    })
  }

  function addToSongList(text) {
    var textObj = smarkt.parse(text)
    state.songList = [...state.songList, textObj]
    emitter.emit('replaceState')
  }
}



