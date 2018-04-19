//Bring in our outdoor modules
const choo = require('choo')
const html = require('choo/html')

//Bring in our indoor modules
const main = require('./views/main')
const awesome = require('./views/awesome')
const works = require('./views/works')
const songbook = require('./views/songbook')
const dots = require('./dots.json')

//Initialize choo
const app = choo()

app.use(function (state, emitter) {
  //initialize state
  state.dots = dots.dots

  //display song
  emitter.on('changeSong', function (choice) {
    var song = state.dots.find(dot => dot.title == choice)
    emitter.emit('pushState','/'+song.link)
  })
function changeSong (data) {
  page = state.dots.find(dot => dot.title == data)
  awesome(page)
 }
})

app.route('/', main)
app.route('/:title', changeSong)
app.route('#songbook', songbook)
app.mount('div')






