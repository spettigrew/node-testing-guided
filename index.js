const express = require("express")
const hobbitsModel = require("./hobbits/hobbits-model")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
  })
})

server.get("/hobbits", async (req, res, next) => {
  try {
    const hobbits = await hobbitsModel.list()
    return res.status(200).json(hobbits)
  } catch (err) {
    next(err)
  }
})

server.post("/hobbits", async (req, res, next) => {
  try {
    const hobbit = await hobbitsModel.insert(req.body)
    return res.status(201).json(hobbit)
  } catch (err) {
    next(err)
  }
})

server.use((err, req, res, next) => {
  console.log("Error:", err)
  return res.status(500).json({
    message: "Something went wrong",
  })
})

// keeps the port from listening while running tests. code won't run while testing.
if(!module.parent) {
  server.listen(port, () => {
    console.log(`\n=> Server up at http://localhost:${port}\n`)
  })
}

module.exports = server