var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");
var nm = prompt("Please enter your name: ");
document.getElementById("name").innerHTML=nm;
function setClockTime() {
  const day = new Date();
  const hh = day.getHours();
  const mm = day.getMinutes();
  const ss = day.getSeconds();
  var dd = day.getDay();
  var dt = day.getUTCDate();
  if (dd == 1) {
    var d = "Mon";
  }
  if (dd == 2) {
    var d = "Tues";
  }
  if (dd == 3) {
    var d = "Wed";
  }
  if (dd == 4) {
    var d = "Thurs";
  }
  if (dd == 5) {
    var d = "Fri";
  }
  if (dd == 6) {
    var d = "Sat";
  }
  if (dd == 0) {
    var d = "Sun";
  }
  const hourDeg = (hh * 30) + (mm * 0.5); //0-23
  const minuteDeg = (mm * 6) + (ss * 0.1); //0-59
  const secondDeg = (ss * 6); //0-59
  hour.style.transform = `rotateZ(${hourDeg}deg)`;
  minute.style.transform = `rotateZ(${minuteDeg}deg)`;
  second.style.transform = `rotateZ(${secondDeg}deg)`;
  digitalClock.innerText = `${d}, ${dt}`;
}
setClockTime();
setInterval(setClockTime, 1000);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

  // document.body.style.backgroundImage="url('images/img2.jpg')";

}
function showPosition(position) {
  var x = document.getElementById("demo");
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=af095c1bac8fb6ed8c24c7cf694358ba', function (data) {
    var text1 = `${data['weather'][0]['main']}`
    // u can change these names like --- Weather:------ 



    var text2 = `<img src='http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png'>`
    var text3 = `${data['main']['temp']}°C`
    var text4 = `Feels Like:  ${data['main']['feels_like']}°C`
    var text5 = `Humidity:  ${data['main']['humidity']}%`
    var text6 = `Pressure:  ${data['main']['pressure']} hPa`
    var text7 = `Wind speed: ${data['wind']['speed'] * 3600 / 1000} Kmph`
    var tempC = parseFloat(`${data['main']['temp']}`)
    var feellikeC = parseFloat(`${data['main']['feels_like']}`)
    var kph1 = parseFloat(`${data['wind']['speed'] * 3600 / 1000}`);
    var kph2 = kph1.toFixed(3);
    var mphval1 = kph2*0.621371;
    var mphval2 = mphval1.toFixed(2);

    var feelF = feellikeC * 1.8 +32;
    var feellikeF = feelF.toFixed(2);
    var tempFa = tempC * 1.8 + 32;
    var tempF = tempFa.toFixed(3)

    var showfahrenheit = true;

    $("#weather").html(text1);
    $("#img").html(text2);
    $("#temp").html(text3);
    $("#feelslike").html(text4);
    $("#humidity").html(text5);
    $("#pressure").html(text6);
    $("#wind").html(text7);


    $("#temp").html(tempF+' °F');
    $("#feelslike").html("Feels like: "+feellikeF+' °F');
    $("#wind").html("Wind speed: "+mphval2+' mph');

    $('#unit-switch').off('click');

    $('#unit-switch').on('click', function () {
      if (showfahrenheit === false) {
        $("#temp").html(tempF+' °F');
        $("#feelslike").html("Feels like: "+feellikeF+' °F');
        $("#wind").html("Wind speed: "+mphval2+' mph');

        showfahrenheit = true;
      } else {
        $("#temp").html(tempC+' °C');
        $("#feelslike").html("Feels like: "+feellikeC+' °C');
        $("#wind").html("Wind speed: "+kph2+' kmph');
        showfahrenheit = false;
      }

      $("#unit-toggle").toggleClass("toggle");

    });

  });
  $.getJSON('https://api.mapbox.com/geocoding/v5/mapbox.places/' + lon + ',' + lat + '.json?access_token=pk.eyJ1IjoicHJpdGFtYzAxMiIsImEiOiJja2duZzV6OHIwdm80MnpvNmtkaHQzMDB1In0.KbjzB6vMA4LQ8pMSZrDQhA', function (doc) {
    var pos = `${doc['features'][1]['context'][0]['text']}, ${doc['features'][1]['context'][1]['text']}, ${doc['features'][1]['context'][2]['text']}<br>`
    $('#loc').html(pos);
  });


}

// Latitude:${doc['query'][1].toFixed(6)}<br>
// Longitude:${doc['query'][0].toFixed(6)}

// let but = document.querySelector('.btn');

// but.addEventListener('click',() =>{};

