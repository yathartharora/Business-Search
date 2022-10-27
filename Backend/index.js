const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
var https = require('https')
const { url } = require('inspector')
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.get('/search', (req, res) => {
  
  var keyword = req.query.keyword
  var distance = req.query.distance
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var category = req.query.category

  // distance = parseInt(distance) * 1609.34
  var y = parseInt(distance) * 1609.34
  y = Math.round(y)
  console.log(y)

  var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+y+'&latitude='+ latitude+'&longitude='+longitude
  console.log(yelpURL)
  fetch(yelpURL,{
    method: 'get',
    headers: {
      'Authorization': 'Bearer gzrK__dxK-vIHd7wejGW4TuHvno-nTGwvf-hpfF2sDLTmS1Jt6RWu54a8S7mkch_iMHta13T3BxB2dZG5c7QeEvFR5QWIsQcoOqa5pfcfuEr4coCX06bdG2Ik30bY3Yx'
    },
    mode:'cors',
  })
  .then(response => response.json())
  .then(json=> {
    res.json(({
      "statusCode":200,
      "statusMessage": "Success",
      "data": json
    }))
  }
  )
});

app.get('/autosuggestion',(req, res) => {
  var keyword = req.query.value
  var yelpURL = "https://api.yelp.com/v3/autocomplete?text="+keyword
  console.log(yelpURL)
  fetch(yelpURL,{
    method: 'get',
    headers: {
      'Authorization': 'Bearer gzrK__dxK-vIHd7wejGW4TuHvno-nTGwvf-hpfF2sDLTmS1Jt6RWu54a8S7mkch_iMHta13T3BxB2dZG5c7QeEvFR5QWIsQcoOqa5pfcfuEr4coCX06bdG2Ik30bY3Yx'
    },
    mode: 'cors'
  })
  .then(response => response.json())
  .then(json => {
    res.json(({
      "data": json
    }))
  })
})

app.get('/',(req,res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})