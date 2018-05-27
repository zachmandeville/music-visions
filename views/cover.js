const html = require('choo/html') 
const icon = require('../styles/assets/icons')

var TITLE = 'm u s i c v i s i o n s'

module.exports = (state,emit) => {
  return html`
  <div class='wrapper'>
    <div class='paper cover'>
	<h1>music</h1>
	<h1>visions</h1> 
      <a href='#songbook'>${icon.play()}</a>
    </div>
  </div>
  `
}
