$(document).ready(function(){
    $('.carousel').carousel();

      
//initialization for collasping container
//collapse bar features
    $('.collapsible').collapsible();
    $(".results").hide();
    $("#search-button").on("click", function(){
      $(".results").show();
    });

//carousel features
  $('.carousel').carousel();

  $(".datepicker").datepicker({
    // add date range?

  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();
     $("#search-event").val().trim();

     var query = $("#search-event").val().trim();
     var queryURl = "https://api.stubhub.com/sellers/search/events/v3?q=" + query +"&city=Atlanta"
     $.ajax({
      method: "GET", 
       url: queryURl,
       Accept: application/JSON,
       headers: {
        Authorization: "Bearer A0cvfZsGTDdB1nyqgQ68SpoGdOWC"
       }
      
       
     })
     
        .then(function(response) {
          var results = response.data;
          console.log(results);
          for (var i = 0; i < 5; i++) {

          }

        })

  });

  //API call for weather//----------------------------------------------------------------------------------------------------------
  
  // This is the API key for Open Weather
 var APIKey = "b7b907c1b8d2d7c447d6c40de9d6cb86";
 var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta,us&mode=json&units=imperial&APPID=" + APIKey

 // AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   .then(function(response) {

// Log the resulting object
  console.log(response);

//for loop to dynamically create and display table with data from API for the weather
for (var i=0; i<=5; i++){

var row = $("<tr>");
row.addClass("row");
row.attr("data-row",[i]);

var rowDisplay= $("<td>");
rowDisplay.addClass("resultsTime");
rowDisplay.attr("time", response.list[i].dt_txt)

var rowtwoDisplay= $("<td>");
rowtwoDisplay.addClass("resultsTemp")
rowtwoDisplay.attr("temp", response.list[i].main.temp)

var rowthreeDisplay=$("<td>");
rowthreeDisplay.addClass("resultsDesc")
  var formatWords = response.list[i].weather[0].description
  var formatWordsUpper = formatWords.toUpperCase();
rowthreeDisplay.attr("desc", formatWordsUpper)

var rowfourDisplay=$("<td>");
rowfourDisplay.addClass("humid")
rowfourDisplay.attr("humid",response.list[i].main.humidity)

//var ashley = document.querySelectorAll('[data-row]')
row.append(rowDisplay)
row.append(rowtwoDisplay)
row.append(rowthreeDisplay)
row.append(rowfourDisplay)
$("#dynamicTable").append(row)

//conversion of time from data payload to readable string in HTML
  var timestamp = response.list[i].dt_txt;
  var formatted = moment(timestamp).format('LL')
  //console.log(formatted);

//show data to table in HTML
var weatherone = $(".resultsTime").text(formatted);
var weathertwo = $(".resultsTemp").text("Temp: " + response.list[i].main.temp + " deg F ");
var weatherthree = $(".resultsDesc").text(formatWordsUpper);
var weatherfour = $(".humid").text("Humidity: " + response.list[i].main.humidity);
}
  
  });
});

