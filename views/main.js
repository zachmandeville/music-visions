const html = require('choo/html') 

var TITLE = 'm u s i c v i s i o n s'

module.exports = (state,emit) => {
  return html`
  <div class='paper-splash'>
    <h1>music</h1>
    <h1>visions</h1> 
    <a href='#songbook'>~enter~</a>
  </div>
  `
}
