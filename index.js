// Bring in our outdoor modules
const choo = require('choo')

// Bring in our indoor modules
const cover = require('./views/cover')
const song = require('./views/song')
const songbook = require('./views/songbook')

// Initialize choo
const app = choo()

app.use(require('./stores/songs'))
app.use(require('./stores/songNavigation'))

app.mount('body')
app.route('/', cover)
app.route('#songbook', songbook)
app.route('#songbook/:song', song)
