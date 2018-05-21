const html = require('choo/html')

module.exports = view

function view (state, emit) {
  var song = state.songs.find(song => song.title == state.params.song.replace(/-/g,' '))
  console.log({song})
  return html`
      <div class='wrapper'>
        <div id='track' class='track'>
          <h1>${song.title}</h1>
	  <div id='text'>
            ${song.post.map(function (post){ return html`<p>${post}</p>`})}
          </div>
          <a href='/#songbook' onclick=${close}>x close x</a>
	 </div>
      </div>
  `

  function close () {
    emit('close',song.title)
  }
}
