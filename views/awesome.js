const html = require('choo/html')

module.exports = view

function view (state, emit) {
  song = state.songs.find(song => song.title == state.params.song.replace(/-/g,' '))
  console.log({song})
  return html`
      <div class='wrapper'>
        <div class='paper'>
	<div class='text'>
          <h1>${song.title}</h1>
	  <p>${song.post}</p>
          <a href='#songbook'>x close x</a>
        </div>
	</div>
    </div>
  `
}
