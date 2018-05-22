const html = require('choo/html')
const _ = require('lodash')

module.exports = view

function view (state, emit) {
  var chosenSong = state.params.song.replace(/-/g,' ')
  var song = state.songList.find(song => song.title == chosenSong)
  var posts = _.split(song.post, '~~*')
  return html`
      <div class='wrapper'>
        <div id='track' class='track'>
          <h1>${song.title}</h1>
	  <div id='text'>
            ${posts[state.index]}
            ${next()}
            ${previous()}
          </div>
          <a href='/#songbook' onclick=${close}>x close x</a>
	 </div>
      </div>
  `

  function next () {
    if ((state.index + 1) < posts.length){
      return html`
        <h3 onclick=${nextPhrase}>NEXT</h2>
      `
    }else{
      return
    }
  }
  
  function previous () {
    if (state.index > 0){
      return html`
        <h3 onclick=${prevPhrase}>PREV</h2>
      `
    }else{
      return
    }
  }

  function renderPost (post) {
    return html`
      <p>${post}</p>
    `
  }
  
  function nextPhrase () {
    emit('nextPhrase') 
  }
  
  function prevPhrase () {
    emit('prevPhrase') 
  }

  function close () {
    emit('close',song.title)
  }
}
