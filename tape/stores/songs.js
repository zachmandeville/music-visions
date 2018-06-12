var smarkt = require('smarkt')
var _ = require('lodash')

var archive = new DatArchive(window.location.host)

function store (state, emitter) {
  state.songList = []
  // When the site loads, read the songs directory and add all the textfiles to the songList state
  // object.
  emitter.on('DOMContentLoaded', function () {
    archive.readdir('songs').then(songs => mapToState(songs))
    // When someone clicks on a song title, turn that title into a URL, go to that url path, and make
    // the border flicker.
    emitter.on('changeSong', function (song) {
      song = song.replace(/\s+/g, '-').toLowerCase()
      emitter.emit('clearIndex')// this ensures the text starts at the beginning paragraph or (or index 0)
      emitter.emit('pushState', `/#songbook/${song}`)
      setTimeout(borderSparkle(), 1500)
    })
  })
  function mapToState (songs) {
  // take a directory of songs, map over each one, and add it to the songList state.
    songs.map(song => {
      archive.readFile(`songs/${song}`)
        .then(songText => addToSongList(songText))
    })
  }
  function addToSongList (text) {
  // take a single song, convert it's smark text to an object, then add it to songList's array of song
  // objects.
    state.songList = [...state.songList, smarkt.parse(text)]
    sortTracks(state.songList)
    emitter.emit('replaceState')
  }
  function sortTracks (songList) {
    // sort songList by the given track number
    state.songList = _.orderBy(songList, ['track'], ['asc'])
  }
}

function borderSparkle () {
  var border = document.getElementById('track')
  border.classList.toggle('change-color')
}

module.exports = store
