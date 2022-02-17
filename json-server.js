const jsonServer = require('json-server')
const dotenv = require('dotenv').config()
const server = jsonServer.create()
const router = jsonServer.router('./data/colors.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
    if (req.method === 'DELETE') {
        return res.sendStatus(401)
    } else if (req.method === 'PUT') {
        return res.sendStatus(401)
    } else {
        next()
    }
  })

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        // VALIDATION ATTEMPT
        // regular expression for all alphanumeric characters
        const format = /^[0-9a-zA-Z]+$/
        if (!req.body) {
            console.log("POST request denied due to empty body.")
            return res.sendStatus(400)
        } else {
            // body has content
            if (Object.keys(req.body).length !== 4) {
                console.log("POST request denied due to object not containing expected 4 keys")
                return res.sendStatus(400)
            }
            // body has object with 4 keys
            if (req.body.colorPrimary.length !== 7) {
                console.log("POST request denied due to first value not being expected length 7")
                return res.sendStatus(400)
            } else {
                if (req.body.colorPrimary.substring(0,1) !== '#') {
                    console.log("POST request denied due to first color not starting with hashtag")
                    return res.sendStatus(400)
                }
                if (!format.test(req.body.colorPrimary.substring(1))) {
                    console.log("POST request denied due to first color not being alphanumeric")
                    return res.sendStatus(400)
                }
            }
            // colorPrimary is formatted correctly
            if (req.body.colorSecondary.length !== 7) {
                console.log("POST request denied due to second value not being expected length 7")
                return res.sendStatus(400)
            } else {
                if (req.body.colorSecondary.substring(0,1) !== '#') {
                    console.log("POST request denied due to second color not starting with hashtag")
                    return res.sendStatus(400)
                }
                if (!format.test(req.body.colorSecondary.substring(1))) {
                    console.log("POST request denied due to second color not being alphanumeric")
                    return res.sendStatus(400)
                }
            }
            // colorSecondary is formatted correctly
            if (req.body.colorTertiary.length !== 7) {
                console.log("POST request denied due to third value not being expected length 7")
                return res.sendStatus(400)
            } else {
                if (req.body.colorTertiary.substring(0,1) !== '#') {
                    console.log("POST request denied due to third color not starting with hashtag")
                    return res.sendStatus(400)
                }
                if (!format.test(req.body.colorTertiary.substring(1))) {
                    console.log("POST request denied due to third color not being alphanumeric")
                    return res.sendStatus(400)
                }
            }
            // colorTertiary is formatted correctly
            // VALIDATION SUCCESSFUL
        }
    }
    // Continue to JSON Server router
    next()
  })
server.use(router)

const port = process.env.JSON_SERVER_PORT || 3004


server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
})