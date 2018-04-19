const choo = require('choo')
const html = require('choo/html')
const cool = require('../dots.json')

module.exports = (state, emit) => {
  return html`
  <div class='wrapper'>
    <h1 class='title'>Music Visions</h1>
    <div class=paper>
      <ul>
       ${state.dots.map(function (dot) {
          return html`<li onclick=${change}>${dot.title}</li>`
       })
       }
      </ul>
    </div>
  </div>
  `
  function change (data) {
    var goods = data.path[0].innerHTML
    emit('changeSong', goods)

  }
}


