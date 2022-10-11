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
  
  res.json(({
    "statusCode":200,
    "statusMessage": "Success"
  }))
  var keyword = req.query.keyword
  var distance = req.query.distance
  var location = req.query.location
  var category = req.query.category
  console.log(keyword)
  console.log(distance)
  console.log(location)
  console.log(category)

  var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+distance+'&latitude=40.7127753&longitude=-74.0059728'
  console.log(yelpURL)
  fetch(yelpURL,{
    method: 'get',
    headers: {
      'Authorization': 'Bearer gzrK__dxK-vIHd7wejGW4TuHvno-nTGwvf-hpfF2sDLTmS1Jt6RWu54a8S7mkch_iMHta13T3BxB2dZG5c7QeEvFR5QWIsQcoOqa5pfcfuEr4coCX06bdG2Ik30bY3Yx'
    },
    mode:'cors',
    cache: 'default'
  })
  .then(response => response.json())
  .then(json=> console.log(json))
});

app.get('/',(req,res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})