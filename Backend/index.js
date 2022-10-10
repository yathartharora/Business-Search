const express = require('express')
const app = express()
const https = require('https')
const port = 3000

app.get('/', (req, res) => {
  let request = https.get('http://universities.hipolabs.com/search?country=United+States',(res) => {
    if(res.statusCode!==200){
      console.log("Error fetching data")
      res.resume();
      return;
    }

    let data = '';
    res.on('data', (chunk) => {
    data += chunk; });

    res.on('close', () => {
      console.log('Retrieved all data');
      console.log(JSON.parse(data));
    });

   res.on('data', (chunk) => {
      data += chunk;
    });

    request.on('error', (err) => {
      console.error(`Encountered an error trying to make a request: ${err.message}`);
      })
    })

});



app.get('/',(req,res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})