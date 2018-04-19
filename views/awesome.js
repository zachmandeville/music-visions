const html = require('choo/html')

module.exports = (song) => {
  console.log(song)
  return html`
  <div>
    <h1>YOU!  YOU ARE ${song.title}.</h1>
    <p>${song.post}</p>
    <a href='${song.link}'>This is a link</a>
    
    <a href='/'>go  back home</a>
  </div>
  `
}
