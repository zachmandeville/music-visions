// Bring in our outdoor modules
const choo = require('choo')

// Bring in our indoor modules
const cover = require('../cassette/components/cover')
const song = require('../cassette/components//song')
const songbook = require('../cassette/components/songbook')

// Initialize choo
const app = choo()

app.use(require('./stores/songs'))
app.use(require('./stores/songNavigation'))

app.mount('body')
app.route('/', cover)
app.route('#songbook', songbook)
app.route('#songbook/:song', song)
