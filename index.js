//Bring in our outdoor modules
const choo = require('choo')
const html = require('choo/html')

//Bring in our indoor modules
const main = require('./views/main')
const awesome = require('./views/awesome')
const songbook = require('./views/songbook')
const dots = require('./dots.json')

//Initialize choo
const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
} 

app.use(require('./stores/songs'))

app.route('/', main)
app.route('#songbook', songbook)
app.route('#songbook/:song', awesome)
app.mount('div')





