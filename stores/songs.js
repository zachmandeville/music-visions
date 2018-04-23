module.exports = store

function store (state,emitter) {
  var songs = require('../songs.json')
  state.songs = songs.songs
  state.currentSong = ''

  emitter.on('changeSong', function (song) {
    song = song.replace(/\s+/g, '-').toLowerCase()
    emitter.emit('pushState', '/#songbook/'+song)
  })
} 

