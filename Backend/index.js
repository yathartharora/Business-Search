const express = require('express')
const app = express()
const port = process.env.port || 8080
const cors = require('cors')
const fetch = require('node-fetch')
//https://findyourbusiness-367518.wm.r.appspot.com
app.use(cors({
  origin: 'https://findyourbusiness-367518.wm.r.appspot.com'
}));
app.set('trust proxy', true);
app.set('json spaces', 10);

app.get('/okay',(req,res) =>{
  console.log("Hello World")
  res.json("Hello World")
})

app.get('/send', (req, res) => {
  var keyword = req.query.keyword
  var distance = req.query.distance
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var category = req.query.category
  var location = req.query.location

  res.setHeader('Content-Type', 'application/json');

  console.log(distance)
  if(distance==""){
    distance = '10'
  }

  if(latitude==undefined && longitude==undefined){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDb0g13Gt_bspPjhUGPWg6YrAMeUJ_NcEc")
    .catch(error => {
      console.log(error)
    })
    .then(response =>response.json())
    .then(json => {
      try {
        latitude = json["results"][0]["geometry"]["location"]['lat']
      longitude = json["results"][0]["geometry"]["location"]['lng']
      var y = parseInt(distance) * 1609.34
      y = Math.round(y)
      console.log(y)
    
      var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+y+'&latitude='+ latitude+'&longitude='+longitude+ '&limit=10'
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
      })
        
      } catch (error) {
        console.log(error)
      }
      
    })

  } else{
    var y = Math.round(parseInt(distance) * 1609.34)
  y = Math.floor(y)
  console.log(y)

  var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+y+'&latitude='+ latitude+'&longitude='+longitude + '&limit=10'
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
  .catch(error => {
    console.log(error)
  })
  }
  
});

app.get('/autosuggestion',(req, res) => {
  var keyword = req.query.value
  var yelpURL = "https://api.yelp.com/v3/autocomplete?text="+keyword
  res.setHeader('Content-Type', 'application/json');

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
  .catch(error => {
    console.log(error)
  })
})

app.get('/findBusiness',(req,res) => {
  var id = req.query.id
  var yelpURL = "https://api.yelp.com/v3/businesses/" + id
  res.setHeader('Content-Type', 'application/json');

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
      "data":json
    }))
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/getReview',(req,res) => {
  var id = req.query.id
  var yelpURL = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
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
      "data":json
    }))
  })
  .catch(error => {
    console.log(error)
  })
})

// app.get('/',(req,res) => {

// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




app.get('/find', (req, res) => {
  var keyword = req.query.keyword
  var distance = req.query.distance
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var category = req.query.category
  var location = req.query.location

  res.setHeader('Content-Type', 'application/json');

  console.log(distance)
  if(distance==""){
    distance = '10'
  }

  if(latitude==undefined && longitude==undefined){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDb0g13Gt_bspPjhUGPWg6YrAMeUJ_NcEc")
    .catch(error => {
      console.log(error)
    })
    .then(response =>response.json())
    .then(json => {
      try {
        latitude = json["results"][0]["geometry"]["location"]['lat']
      longitude = json["results"][0]["geometry"]["location"]['lng']
      var y = parseInt(distance) * 1609.34
      y = Math.round(y)
      console.log(y)
    
      var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+y+'&latitude='+ latitude+'&longitude='+longitude+ '&limit=10'
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
        res.send(json["businesses"])
      })
        
      } catch (error) {
        console.log(error)
      }
      
    })

  } else{
    var y = Math.round(parseInt(distance) * 1609.34)
  y = Math.floor(y)
  console.log(y)

  var yelpURL = 'https://api.yelp.com/v3/businesses/search?term='+keyword+'&categories='+category+'&radius='+y+'&latitude='+ latitude+'&longitude='+longitude + '&limit=10'
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
    res.send(json["businesses"])
  }
  )
  .catch(error => {
    console.log(error)
  })
  }
  
});


app.get('/getBusiness',(req,res) => {
  var id = req.query.id
  var yelpURL = "https://api.yelp.com/v3/businesses/" + id
  res.setHeader('Content-Type', 'application/json');

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
    res.send(json)
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/Review',(req,res) => {
  var id = req.query.id
  var yelpURL = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
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
    res.send(json["reviews"])
  })
  .catch(error => {
    console.log(error)
  })
})