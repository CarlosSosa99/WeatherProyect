const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
 // console.log(req.body.cityName);
  // console.log("Post request recieved.");
 const query = req.body.cityName;
 const apikey = "f69df071428d11f3a181c3542199aa23";
 const unit = "metric"
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey+"&units="+ unit;
    
 https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data);
       // console.log(weatherData);
      //});
      /*   const object= {
            name:"Carlos",
            favouriteFood: "Pizza"
        }
        console.log(JSON.stringify(object)); */

     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/"+ icon+ "@2x.png";
     res.write("<p>the Weather is currently"+ weatherDescription+"</p>"); 
     res.write("<h1>the temperature in "+ query + "is"+ temp+" degrees celsius</h1>");
     res.write("<img src="+ imageURL+">");
     res.send();
    });
    

});
   // res.send("server is up and running.!!!");


})


app.listen(3000, function(){

    console.log("Server is running on port 3000.");
});