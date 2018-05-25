const html = require('choo/html')
const _ = require('lodash')

module.exports = view

function view (state, emit) {
  var chosenSong = state.params.song.replace(/-/g,' ')
  var song = state.songList.find(song => song.title == chosenSong)
  var posts = _.split(song.post, '~~*')
  return html`
      <div class='wrapper'>
        <div id='track' class='paper track'>
          <h1>${song.title}</h1>
	  <div id='text'>
            ${posts[state.index]}
          </div>
	 <div id='track-buttons'>
	   ${previous()}
	   ${closeButton()}
	   ${next()}
	 </div>
	 </div>
      </div>
  `
//
//render the track navigation buttons
//
  function previous () {
    if (state.index > 0){
      return html`
	<a href='javascript:void(0);'  onclick=${prevPhrase}>
	  <svg width='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"/></svg>
      </a>
      `
    }else{
      return html`
	<p>
	  <svg width='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.5-181C352.1 22.3 384 36.6 384 64v384c0 27.4-31.9 41.7-52.5 24.6L136 292.7V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z"/></svg>
      </p>
      `
    }
  }

  function closeButton () {
    return html`
      <a href='/#songbook' onclick=${close}>
      <svg width='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"/></svg>
      </a>
      `
  }

  function next () {
    if ((state.index + 1) < posts.length){
      return html`
	<a href='javascript:void(0);'  onclick=${nextPhrase}>
	  <svg width='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"/></svg>
      </a>
`
    }else{
      return html`
	<p>
	  <svg width='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.5 181C95.9 489.7 64 475.4 64 448V64c0-27.4 31.9-41.7 52.5-24.6L312 219.3V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z"/></svg>
        </p>
      `
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
