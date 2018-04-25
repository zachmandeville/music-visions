module.exports = store

function store (state,emitter) {
  var songs = require('../songs.json')
  state.songs = songs.songs
  state.currentSong = ''

  emitter.on('DOMContentLoaded', function () {
    emitter.on('changeSong', function (song) {
      song = song.replace(/\s+/g, '-').toLowerCase()
     emitter.emit('pushState', '/#songbook/'+song)
     setTimeout("document.getElementById('track').classList.toggle('change-color')", 1500)
    })
})
  emitter.on('DOMContentLoaded', function (){
    emitter.on('close', function (song) {
      state.lastSong = song
    })
  })

}

