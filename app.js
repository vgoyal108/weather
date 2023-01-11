//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, function() {
  console.log("server started on port 3000");
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="9825f9cc1619ca2f7debc999f652d920";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p><center> The Weather is currently "+description+"</center></p>");
      res.write("<h1><center>The Temperature in "+ query + " is "+temp+" Degree celcuis.</center></h1>");
      res.write("<center><img src="+imageURL+"></center>");
      res.send();
    });
  });

});
