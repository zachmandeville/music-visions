const html = require('choo/html')

module.exports = view

function view (state, emit) {
  var song = state.songs.find(song => song.title == state.params.song.replace(/-/g,' '))
  console.log({song})
  return html`
      <div class='wrapper'>
        <div class='paper'>
          <h1>${song.title}</h1>
	  <div id='text'>
            ${song.post.map(function (post){ return html`<p>${post}</p>`})}
          </div>
          <a href='#songbook'>x close x</a>
	 </div>
      </div>
  `
}
