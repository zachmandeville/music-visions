var smarkt = require('smarkt')
var _ = require('lodash')

var archive = new DatArchive(window.location.host)

module.exports = store

function store (state,emitter) {
  state.songList = []

  emitter.on('DOMContentLoaded', function () {
    //When someone clicks on a song title, turn that title into a URL, go to that url path, and make
    //the border flicker.
    emitter.on('changeSong', function (song) {
      song = song.replace(/\s+/g, '-').toLowerCase()
      emitter.emit('clearIndex')//this ensures the text starts at the beginning paragraph or (or index 0)
      emitter.emit('pushState', `/#songbook/${song}`)
      setTimeout("document.getElementById('track').classList.toggle('change-color')", 1500)
    })
  })
  //When the site loads, read the songs directory and add all the textfiles to the songList state
  //object.
  emitter.on('DOMContentLoaded', function () {
    archive.readdir('songs').then(songs => mapToState(songs))
  //This only works if you start at '/'.  TODO would be to make this happen even if you start
  //already on a song page (music.visions/#songbook/the-song)
  })

  //take a directory of songs, map over each one, and add it to the songList state.
  function mapToState (songs) {
    songs.map(song => {
      archive.readFile(`songs/${song}`)
	.then(songText => addToSongList(songText))
    })
  }
  //take a single song, convert it's smarktext to an object, then add it to songlists array of song
  //objects.
  function addToSongList(text) {
    state.songList = [...state.songList, smarkt.parse(text)]
    sortTracks(state.songList)
    emitter.emit('replaceState')
  }
 //sort songList by the track value 
  function sortTracks(songList) {
    state.songList = _.orderBy(songList, ['track'],['asc'])
  }
}



