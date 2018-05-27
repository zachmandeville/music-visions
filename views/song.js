const html = require('choo/html')
const _ = require('lodash')
const md = require('marked')

const icon = require('../styles/assets/icons')

module.exports = view

function view (state, emit) {
  //I don't like this if, then but am not sure how else to have the page render when brought by
  //direct link.  this is a big TODO
  if (state.songList.length == 0){
    var song = {post:[]}
    var posts = [] 
  }else{
    var chosenSong = state.params.song.replace(/-/g,' ')
    var song = state.songList.find(song => song.title == chosenSong)
    var posts = _.split(song.post, '~~*')
    emit('DOMTitleChange', chosenSong)

    return html`
      <div class='wrapper'>
	<section id='track' class='paper'>
	  <header>
            <h1>${song.title}</h1>
          </header>
          <article id='text'>
	    ${renderParagraph(posts[state.index])}
	  </article>
	  <footer id='track-buttons'>
	    ${previous()}
	    ${stop()}
	    ${next()}
	  </footer>
	</section>
      </div>
  `
  }

  function renderParagraph (post) {
    return html(`<div>${md(post)}</div>`)
  }

//
//Functions to render the track navigation buttons
//
  function previous () {
    if (state.index > 0){
      return html`
        <a href='javascript:void(0);' onclick=${prevPhrase}>
	  ${icon.previous('active')}
        </a>`
    }else{
      return html`
	<p>${icon.previous('grayed')} </p>
	`
    }
  }

  function stop () {
    return html`
      <a href='/#songbook' onclick=${close}>
        ${icon.stop()}
      </a>`
  }

  function next () {
    if ((state.index + 1) < posts.length){
      return html`
	<a href='javascript:void(0);' onclick=${nextPhrase}>
	  ${icon.next('active')}
        </a>
      `
    }else{
      return html`
	<p>${icon.next('grayed')}</p>
      `
    }
  }
  
//Functions to emit the right messages to our store, which will make magic happen.
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
