const html = require('nanohtml')
const raw = require('nanohtml/raw')
const _ = require('lodash')
const md = require('markdown-it')()

const icon = require('../styles/assets/icons')

module.exports = view

function view (state, emit) {
  // I don't like this if, then but am not sure how else to have the page render when brought by
  // direct link.  this is a big TODO
  if (state.songList.length === 0) {
    var song = {post: []}
    var posts = []
  } else {
    var chosenSong = state.params.song.replace(/-/g, ' ')
    song = state.songList.find(song => song.title.toLowerCase() === chosenSong)
    posts = _.split(song.post, '~~*')
    emit('DOMTitleChange', chosenSong)

    return html`
      <body>
      <div class='wrapper'>
      <section id='track' class='paper'>
      <header>
      <h1>${song.title}</h1>
      </header>
      ${renderParagraph(posts[state.index])}
      <footer id='track-buttons'>
      ${previous()}
    ${stop()}
    ${next()}
      </footer>
      </section>
      </div>
      </body>
      `
  }

  //
  // Functions to render the track navigation buttons
  //
  function previous () {
    if (state.index > 0) {
      return html`
	<a href='javascript:void(0);' onclick=${prevPhrase}>
	${icon.previous('active')}
	</a>
	`
    } else {
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
    if ((state.index + 1) < posts.length) {
      return html`
	<a href='javascript:void(0);' onclick=${nextPhrase}>
	${icon.next('active')}
	</a>
	`
    } else {
      return html`
	<p>${icon.next('grayed')}</p>
	`
    }
  }

  // Functions to emit the right messages to our store, which will make magic happen.
  function nextPhrase () {
    emit('nextPhrase')
  }

  function prevPhrase () {
    emit('prevPhrase')
  }

  function close () {
    emit('close', song.title)
  }
}

function renderParagraph (post) {
  var htmlFromMarkdown = md.render(post)
  var content = raw(htmlFromMarkdown)
  return html`<article>${content}</article>`
}
