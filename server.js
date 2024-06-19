const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()
app.listen(3000, () => console.log('Your app listening on port 3000'))

app.get('/', (req, res) => {
  res.send('Oh wow! this is working =)')
})

app.get("/joyas", (req, res) =>{
  const joyasRespuesta = HATEOAS(joyas.results)
  res.send(joyasRespuesta)
})

// localhost:3000/joyas/3
app.get("/joyas/:id", (req, res) => {
  const { id } = req.params

  const joyaResultado = joyas.results.filter(joya => joya.id == id)
  if (joyaResultado.length) {
    res.send(joyaResultado)
  } else {
    res.status(404).json({
      message: 'Record not found',
      status: 404
    })
  }
})

// localhost:3000/joyas/categoria/:categoria
app.get("/joyas/categoria/:categoria", (req, res) => {
  const { categoria } = req.params

  const joyaResultado = joyas.results.filter(joya => joya.category == categoria)
  if (joyaResultado.length) {
    res.send(joyaResultado)
  } else {
    res.status(404).json({
      message: 'Record not found',
      status: 404
    })
  }
})

//tomar todas las joyas y crear una URL para que sea visitada
function HATEOAS(joyas) {
  const joyasHATEOAS = joyas.map(joya => {
    const joyaMapeada = {
      name: joya.name,
      url: `http://localhost:3000/joyas/${joya.id}`
    }

    return joyaMapeada
  })

  return joyasHATEOAS
}