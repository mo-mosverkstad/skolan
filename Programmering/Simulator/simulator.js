//http://koda.nu/labbet/5157059

<script src="https://koda.nu/simple.js">
  var stateNull = -1;
  var stateHome = 0;
  var stateFaceBook = 1;
  var stateChrome = 2;
  var stateMessager = 3;
  var stateGmail = 4;
  var stateMessageEdit = 5;
  var stateAIweather = 6;
  
  var months = ["January",
      "Febrary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ];
  
  var weekday = ["Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  ];
  
  var drawIconBase = function(x, y, color = "#aa33f2") {
      var r = 5;
      var l = 50;
      circle(x + r, y + r, r, color);
      circle(x + l - r, y + r, r, color);
      circle(x + r, y + l - r, r, color);
      circle(x + l - r, y + l - r, r, color);
      rectangle(x + r, y, l - 2 * r, l, color);
      rectangle(x, y + r, l, l - 2 * r, color);
  };
  var shade = function(x, y) {
      var r = 5;
      var l = 50;
      rectangle(x + r, y, l - 2 * r, l, "rgba(0, 0, 0, 0.2)");
  };
  
  var overcast = "overcast";
var cloud = "cloud";
var rain = "rain";
var weatherData = [overcast, overcast, overcast, cloud, overcast, overcast, overcast, overcast, overcast, cloud, overcast, overcast, overcast, overcast, overcast, overcast, cloud, cloud, overcast, rain, rain, cloud, rain, cloud, cloud, cloud, overcast, overcast, overcast, overcast, overcast, overcast, overcast, overcast, overcast, overcast];

class BayesNet {
  constructor(weatherData) {
    this.weatherData = weatherData;
    this.weatherStructure = this.convertWeatherData(weatherData);
	this.reasonData = this.getReasonData(weatherData);
    
    this.rowNumber = this.weatherStructure.length;
    this.pA = [{overcast:this.calculatePa(0, overcast), cloud:this.calculatePa(0, cloud), rain:this.calculatePa(0, rain)},
               {overcast:this.calculatePa(1, overcast), cloud:this.calculatePa(1, cloud), rain:this.calculatePa(1, rain)},
               {overcast:this.calculatePa(2, overcast), cloud:this.calculatePa(2, cloud), rain:this.calculatePa(2, rain)},
               {overcast:this.calculatePa(3, overcast), cloud:this.calculatePa(3, cloud), rain:this.calculatePa(3, rain)}];
    this.pB  = {overcast:this.calculatePa(4, overcast), cloud:this.calculatePa(4, cloud), rain:this.calculatePa(4, rain)};
    this.pAB = {overcast:[{overcast:this.calculatePab(0,overcast,overcast),
                           cloud:   this.calculatePab(0,cloud,overcast),
                           rain:    this.calculatePab(0,rain,overcast)},
                          {overcast:this.calculatePab(1,overcast,overcast),
                           cloud:   this.calculatePab(1,cloud,overcast),
                           rain:    this.calculatePab(1,rain,overcast)},
                          {overcast:this.calculatePab(2,overcast,overcast),
                           cloud:   this.calculatePab(2,cloud,overcast),
                           rain:    this.calculatePab(2,rain,overcast)},
                          {overcast:this.calculatePab(3,overcast,overcast),
                           cloud:   this.calculatePab(3,cloud,overcast),
                           rain:    this.calculatePab(3,rain,overcast)}],
                
                cloud:   [{overcast:this.calculatePab(0,overcast,cloud),
                           cloud:   this.calculatePab(0,cloud,cloud),
                           rain:    this.calculatePab(0,rain,cloud)},
                          {overcast:this.calculatePab(1,overcast,cloud),
                           cloud:   this.calculatePab(1,cloud,cloud),
                           rain:    this.calculatePab(1,rain,cloud)},
                          {overcast:this.calculatePab(2,overcast,cloud),
                           cloud:   this.calculatePab(2,cloud,cloud),
                           rain:    this.calculatePab(2,rain,cloud)},
                          {overcast:this.calculatePab(3,overcast,cloud),
                           cloud:   this.calculatePab(3,cloud,cloud),
                           rain:    this.calculatePab(3,rain,cloud)}],

                rain:    [{overcast:this.calculatePab(0,overcast,rain),
                           cloud:   this.calculatePab(0,cloud,rain),
                           rain:    this.calculatePab(0,rain,rain)},
                          {overcast:this.calculatePab(1,overcast,rain),
                           cloud:   this.calculatePab(1,cloud,rain),
                           rain:    this.calculatePab(1,rain,rain)},
                          {overcast:this.calculatePab(2,overcast,rain),
                           cloud:   this.calculatePab(2,cloud,rain),
                           rain:    this.calculatePab(2,rain,rain)},
                          {overcast:this.calculatePab(3,overcast,rain),
                           cloud:   this.calculatePab(3,cloud,rain),
                           rain:    this.calculatePab(3,rain,rain)}]
                         };
  }
  
  convertWeatherData(weatherData) {
    var weatherStructure = [];
    for (var i = 0; i < weatherData.length - 5; i++) {
      weatherStructure.push([weatherData[i],
                             weatherData[i + 1],
                             weatherData[i + 2],
                             weatherData[i + 3],
                             weatherData[i + 4]
                            ]);
    }
    return weatherStructure;
  }

  getReasonData(weatherData) {
    return weatherData.slice(Math.max(weatherData.length - 4, 0));
  }
  
  calculatePa(column, type) {
    var count = 0;
    for (var i = 0; i < this.weatherStructure.length; i++) {
      if (this.weatherStructure[i][column] == type) count++;
    }
    return count / this.rowNumber;
  }
  
  calculatePab(column, type, result) {
    var count = 0;
    var row = 0;
    for (var i = 0; i < this.weatherStructure.length; i++) {
      if (this.weatherStructure[i][4] == result) {
        row++;
        if (this.weatherStructure[i][column] == type) count++;
      }
    }
    return count / row;
  }

  reason() {
    let results = new Map([[overcast, this.calculateResult(overcast)],
                           [cloud,this.calculateResult(cloud)],
                           [rain,this.calculateResult(rain)]]);
    var value = Math.max(...results.values());
    console.log("Max:", value)
    let keys = [...results.entries()]
        .filter(({ 1: v }) => v === value)
        .map(([k]) => k);
    console.log(results);
    return keys!=null?keys[0]:overcast;
  }
  
  multiplePab(result) {
    var pabData = this.pAB[result];
    var pab = 1;
    for (var i = 0; i < pabData.length; i++) {
      pab = pab * pabData[i][this.reasonData[i]];
    }
    return pab;
  }
  
  multiplePa() {
    var pa = 1;
    for (var i = 0; i < this.pA.length; i++) {
      pa = pa * this.pA[i][this.reasonData[i]];
    }
    return pa;
  }
  
  calculateResult(result) {
    return this.multiplePab(result) * this.pB[result] / this.multiplePa();
  }
  
}

let bayes = new BayesNet(weatherData);
//console.log(bayes.reason());
  
  var sys = {
      home: {
          state: stateHome,
          dateTimeView: {
              x: 50,
              y: 250,
              hyperlink: stateNull,
              color: "green",
              draw: function() {
                  var date = new Date();
                  var hours = date.getHours().toString();
                  var minutes = date.getMinutes().toString();
                  var dateNow = date.getDate().toString();
                  var weekDay = weekday[date.getDay()];
                  var month = months[date.getMonth()];
                  if (minutes.length == 1) {
                      minutes = "0" + minutes;
                  }
                  text(this.x, this.y + 30, 30, hours + " : " + minutes, this.color);
                  text(this.x + 15, this.y + 12 + 30 + 15, 12,
                      weekDay + ", " + dateNow + " of " + month, this.color);
              },
              shade: function() {
  
              },
              sensor: function(x, y) {
                  return false;
              }
          },
          faceBookButton: {
              x: 350,
              y: 100,
              hyperlink: stateFaceBook,
              draw: function() {
                  drawIconBase(this.x, this.y, "rgb(74, 116, 186)");
                  text(this.x + 12, this.y + 30 + 5, 30, "f", "white");
                  text(this.x, this.y + 60, 8, "Facebook", "black");
              },
              shade: function() {
                  this.draw();
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              },
          },
          chromeButton: {
              x: 350 + 1 * 70,
              y: 100,
              hyperlink: stateChrome,
              draw: function() {
                  drawIconBase(this.x, this.y, "white");
                  circle(this.x + 25, this.y + 25, 20, "red");
                  circle(this.x + 25, this.y + 25, 8, "rgb(66, 133, 254)");
                  text(this.x + 5, this.y + 60, 8, "Chrome", "black");
              },
              shade: function() {
                  this.draw();
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              }
          },
          messagerButton: {
              x: 350 + 2 * 70,
              y: 100,
              hyperlink: stateMessager,
              draw: function() {
                  drawIconBase(this.x, this.y, "white");
                  circle(this.x + 25, this.y + 20, 15, "blue");
                  triangle(this.x + 15, this.y + 20, this.x + 10,
                      this.y + 40, this.x + 30, this.y + 30);
                  text(this.x, this.y + 60, 8, "Messager", "black");
              },
              shade: function() {
                  this.draw();
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              }
          },
          gmailButton: {
              x: 350 + 3 * 70,
              y: 100,
              hyperlink: stateGmail,
              draw: function() {
                  var x = this.x;
                  var y = this.y;
                  drawIconBase(x, y, "white");
                  line(x + 8, y + 8, x + 8, y + 40, 4, "red");
                  line(x + 40, y + 8, x + 40, y + 40, 4, "red");
                  line(x + 8, y + 8, x + 24, y + 26, 4, "red");
                  line(x + 24, y + 26, x + 40, y + 8, 4, "red");
                  line(x + 8, y + 8, x + 40, y + 8, 0.1, "black");
                  line(x + 8, y + 40, x + 40, y + 40, 0.1, "black");
                  line(x + 8, y + 40, x + 24, y + 26, 0.1, "black");
                  line(x + 40, y + 40, x + 24, y + 26, 0.1, "black");
                  circle(x + 24, y + 26, 2, "red");
                  text(x + 10, y + 60, 8, "Gmail", "black");
              },
              shade: function() {
                  this.draw();
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              }
          },
          AIweather: {
              x: 350,
              y: 100 + 80,
              hyperlink: stateAIweather,
              draw: function() {
                  var x = this.x;
                  var y = this.y;
                  drawIconBase(x, y, "white");
                  circle(x + 24, y + 26, 5, "yellow");
                  text(x-6, y + 60, 8, "AI weather", "black");
              },
              shade: function() {
                  this.draw();
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              }
          }
      },
      facebook: {
          state: stateFaceBook,
          welcomeText: {
              x: 40,
              y: 200,
              hyperlink: stateNull,
              draw: function() {
                  text(this.x, this.y + 15, 15, 
                       "Facebook helps you stay", "black");
                  text(this.x, this.y + 2*15+10, 15, 
                       "in touch with friends", "black");
                  text(this.x, this.y + 3*15+2*10, 15, 
                       "and family.", "black");
                  
              },
              shade: function() {
  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          login: {
              x: 200,
              y: 300,
              hyperlink: stateHome,
              draw: function() {
                  drawIconBase(this.x, this.y, "grey");
              },
              shade: function() {
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              },
          },
          authenticationRect: {
              x: 410,
              y: 180,
              hyperlink: stateNull,
              draw: function() {
                  rectangle(this.x, this.y, 290, 230, "white");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          emailEditText: {
              x: 430,
              y: 200,
              hyperlink: stateNull,
              draw: function() {
                  rectangle(this.x, this.y, 250, 40, "black");
                  rectangle(this.x+5, this.y+5, 240, 30, "white");
                  text(this.x + 5, this.y+20+10, 20, "E-mail", "grey");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          passWordEditText: {
              x: 430,
              y: 260,
              hyperlink: stateNull,
              draw: function() {
                  rectangle(this.x, this.y, 250, 40, "black");
                  rectangle(this.x+5, this.y+5, 240, 30, "white");
                  text(this.x + 5, this.y+20+10, 20, "Password", "grey");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          loginButton: {
              x: 430,
              y: 330,
              hyperlink: stateNull,
              draw: function() {
                  rectangle(this.x, this.y, 250, 40, "lightblue");
                  text(this.x + 75, this.y+20+10, 20, "Log in", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 250, 40, "rgba(0, 0, 0, 0.1)");
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 250) &&
                          this.y < y && y < (this.y + 40));
              },
          }
      },
      chrome: {
          state: stateChrome,
          login: {
              x: 150,
              y: 300,
              hyperlink: stateHome,
              draw: function() {
                  drawIconBase(this.x, this.y, "grey");
              },
              shade: function() {
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              },
          },
      },
      messager: {
          state: stateMessager,
          login: {
              x: 400,
              y: 300,
              hyperlink: stateHome,
              draw: function() {
                  drawIconBase(this.x, this.y, "grey");
              },
              shade: function() {
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              },
          },
          edit: {
              x: 5,
              y: 30,
              hyperlink: stateHome,
              draw: function() {
                  text(this.x, this.y+12, 12, "Edit", "black");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          chats: {
              x: 260,
              y: 30,
              hyperlink: stateHome,
              draw: function() {
                  text(this.x, this.y+15, 15, "Chats", "black");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          chatroom1: {
              x: 25,
              y: 75,
              hyperlink: stateNull,
              draw: function() {
                  text(this.x, this.y+15, 15, "Frijo", "black");
                  text(this.x, this.y+15+10+9, 10, "Hi, are you still awake?", "black");
                  text(this.x+550, this.y+15+5+9, 14, "2:30", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 600, 40, "rgb(0, 0, 0, 0.2)")
              },
              sensor: function(x, y) {
                 return false;
              },
          },
          chatroom2: {
              x: 25,
              y: 125,
              hyperlink: stateNull,
              draw: function() {
                  text(this.x, this.y+15, 15, "Paulo Londra", "black");
                  text(this.x, this.y+15+10+9, 10, 
                       "Pretty strange that I got blackout in the middle of the night", 
                       "black");
                  text(this.x+425, this.y+15+5+9, 14, "23:30 yesterday", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 600, 40, "rgb(0, 0, 0, 0.2)")
              },
              sensor: function(x, y) {
                  return false ;
              },
          },
        
      },
      gmail: {
          state: stateGmail,
          login: {
              x: 200,
              y: 360,
              hyperlink: stateHome,
              draw: function() {
                  drawIconBase(this.x, this.y, "grey");
              },
              shade: function() {
                  shade(this.x, this.y);
              },
              sensor: function(x, y) {
                  return (this.x < x && x < (this.x + 50) &&
                      this.y < y && y < (this.y + 50));
              },
          },
          gmailLogo: {
              x: 5,
              y: 5,
              hyperlink: stateMessageEdit,
              draw: function() {
                  var x = this.x;
                  var y = this.y;
                  line(x + 8, y + 8, x + 8, y + 40, 4, "red");
                  line(x + 40, y + 8, x + 40, y + 40, 4, "red");
                  line(x + 8, y + 8, x + 24, y + 26, 4, "red");
                  line(x + 24, y + 26, x + 40, y + 8, 4, "red");
                  line(x + 8, y + 8, x + 40, y + 8, 0.1, "black");
                  line(x + 8, y + 40, x + 40, y + 40, 0.1, "black");
                  line(x + 8, y + 40, x + 24, y + 26, 0.1, "black");
                  line(x + 40, y + 40, x + 24, y + 26, 0.1, "black");
                  text(x + 40+20, y+10+20, 20, "Gmail", "black");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              },
          },
          mailSign: {
              x: 150,
              y: 75,
              hyperlink: stateMessageEdit,
              draw: function() {
                  var x = this.x;
                  var y = this.y;
                  text(x, y+15, 15, "My mails", "black");
              },
              shade: function() {
                  
              },
              sensor: function(x, y) {
                  return false;
              }
          },
          mail1: {
              x: 150,
              y: 100,
              hyperlink: stateMessageEdit,
              draw: function() {
                  text(this.x, this.y+10, 10, "N9", "black");
                  text(this.x+200, this.y+10, 10, "2:20", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 300, 10, "rgb(0, 0, 0,0.2)");
              },
              sensor: function(x, y) {
                  return (this.x < x && x < this.x + 300 &&
                          this.y < y && y < this.y + 10);
              }
          },
          mail2: {
              x: 150,
              y: 115,
              hyperlink: stateMessageEdit,
              draw: function() {
                  text(this.x, this.y+10, 10, "DDS", "black");
                  text(this.x+200, this.y+10, 10, 
                       "23:20 yesterday", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 300, 10, "rgb(0, 0, 0,0.2)");
              },
              sensor: function(x, y) {
                  return (this.x < x && x < this.x + 300 &&
                          this.y < y && y < this.y + 10);
              }
          },
          mail3: {
              x: 150,
              y: 130,
              hyperlink: stateMessageEdit,
              draw: function() {
                  text(this.x, this.y+10, 10, "L33", "black")
                  text(this.x+200, this.y+10, 10, 
                       "11:50 3 days ago", "black");
              },
              shade: function() {
                  rectangle(this.x, this.y, 300, 10, "rgb(0, 0, 0,0.2)");
              },
              sensor: function(x, y) {
                  return (this.x < x && x < this.x + 300 &&
                          this.y < y && y < this.y + 10);
              }
          }
          
      },
      mailEdit:{
        state: stateMessageEdit,
        text: {
          x: 100,
          y: 100,
          hyperlink: stateNull,
          draw: function(){
            text(this.x, this.y + 10, 10, "Contents of my mails", "black");
          },
          shade: function(){},
          sensor: function(x, y){return false;}
        }
      },
      AIweather:{
        state: stateAIweather,
        welcomeText: {
          x: 100,
          y: 100,
          hyperlink: stateNull,
          draw: function(){
            text(this.x, this.y + 20, 20, "Welcome to AI weather prediction", "black");
            //text(this.x, this.y + 20 + 30, 20, bayes.reason(), "black");
          },
          shade: function(){},
          sensor: function(x, y){return false;}
        },
        resultText: {
          x: 100,
          y: 100 + 20 + 30,
          hyperlink: stateNull,
          draw: function(){
            text(this.x, this.y + 15, 15, 
                 "The weather will be " + bayes.reason() + " 6 hours from now.",
                 "black");
          },
          shade: function(){},
          sensor: function(x, y){return false;}
        }
      }
  };
  


  class system {
      constructor() {
          this.state = stateHome;
      }
      
      draw() {
          for (var value1 of Object.values(sys)) {
              if (this.state == value1.state) {
                  fill("#f5f5f5");
                  for (var value2 of Object.values(value1)) {
                      if (typeof value2 == "object") {
                          value2.draw();
                      }
                  }
              }
          }
      }
      
      sensorTouch() {
          for (var value1 of Object.values(sys)) {
              if (this.state == value1.state) {
                  for (var value2 of Object.values(value1)) {
                      if (typeof value2 == "object") {
                          if (value2.sensor(mouse.x, mouse.y)) {
                              value2.shade();
                          }
                      }
                  }
              }
          }
      }
      
      sensorClick() {
          if (keyboard.space) {
              this.state = stateHome;
          }
          for (var value1 of Object.values(sys)) {
              if (this.state == value1.state) {
                  for (var value2 of Object.values(value1)) {
                      if (typeof value2 == "object") {
                          if (value2.sensor(mouse.x, mouse.y) && mouse.left) {
                              this.state = value2.hyperlink;
                          }
                      }
                  }
              }
          }
      }
  }
  
  var s = new system();
  s.state = stateAIweather;
  s.draw();
  
  function update() {
      clearScreen();
      s.draw();
      s.sensorClick();
      s.sensorTouch();
      //text(0, 30, 30, s.state, "black");
  }
</script>