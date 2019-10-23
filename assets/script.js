//on page load populate itinerary with items from local storage.

// This is the on click event that gets search results from our three APIs
$("#search-button").on('click', function () {
  event.preventDefault();
  var zipCode = $('#zipcode').val().trim();
  var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?city=" + zipCode + ",us&units=imperial&appid=00604984263164d160d696afed305b97";
  var startDate = $('#arrival-date').val().trim();
  //console.log(startDate);
  var endDate = $('#departure-date').val().trim();

    // This is the API call from Open Weather
  $.ajax({
    url: weatherURL,
    method: "GET"
  })
  .then(function (response) {
    // console.log(response);    
    var currentTemp = response.list[0].main.temp;
    // The current temperature is added to the page
    $("#weather").text("Weather: " + currentTemp +"°");
  });

    //This is the API call from TicketMaster
  $.ajax({
    type:"GET",
    url:"https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.jason?postalCode=" + zipCode + "&radius=30&unit=miles&locale=*&startDateTime=" + startDate + "T00:00:00Z&endDateTime=" + endDate + "T12:00:00Z&includeTBA=yes&includeTBD=yes&sort=date,name,asc&source=%20tmr&source=%20frontgate&source=%20universe&source=ticketmaster&apikey=3lnAM350kKFnvBTJoQKYZc9ksm0IPfOY",

    async:true,
    dataType: "json",
    success: function(response) {
      // Filtering the envents by event name so that if the API returns an event with the same name, it get's excluded from the eventNames array
      var eventNames = [];
      var filteredEvents = response._embedded.events.filter(function(event) {
        if(eventNames.includes(event.name)) {
          return false 
          } 
        else {
          eventNames.push(event.name);
          return true 
         }
      });
      //console.log(filteredEvents);
        // Looping through the filteredEvents to get start date, time, event name and image.  Returning at max, 5 results.
      for(i = 0; i < 5; i++) {
        var event = filteredEvents[i].name
        var eventDate = filteredEvents[i].dates.start.localDate
        var eventTime = filteredEvents[i].dates.start.localTime
        var foundImage = filteredEvents[i].images.find(function(image) {
          return image.ratio === "3_2";
        });
        // Creating new HTML elements with my serch results and adding them to the page
        var eventImageUrl = foundImage.url;
        var newLink = $("<a>").attr({
          href: filteredEvents[i].url,
          target: "_blank"});
        var newImage = $("<img>").attr("src", eventImageUrl);
        var newDiv = $("<div>").attr("id", "results-"+i)

        newImage.css("width", "300px")
        newDiv.append(event + " " + eventDate +" "+eventTime);
        newDiv.append(newLink);
        newLink.append(newImage);
        $("#events").append(newDiv); 
      }
             },
      error: function(xhr, status, err) {
                // This time, we do not end up here! 
            }
  });  

  var citySearch = $("#zipcode").val().trim();
  //var APIrestKey = "f9a5acdea9259dd8ef4a0a2a9868c19a";
  //var URLrest = "http://developers.zomato.com/api/v2.1/search?entity_id=" + citySearch + "&entity_type=city&apikey=f9a5acdea9259dd8ef4a0a2a9868c19a",

  $.ajax({
    method:"GET",
    crossDomain: true,
    url: "http://developers.zomato.com/api/v2.1/search?entity_id=" + citySearch + "&entity_type=city",
    dataType : "json",
    asynd: true,
    headers: {
      "user-key": "f9a5acdea9259dd8ef4a0a2a9868c19a"
    },
    success: function(data) {
        var Eats = [];
        var restName = response._embedded.restaurant.name(function(event) {
         if(restName.includes(restaurant.name)) {
          return false 
           } 
          else {
          eventNames.push(event.name);
          return true 
         };

       for(var i = 0; i < 5; i++) {
        var newDiv = $("<div>").attr("id", "results-"+i)
         results = restName[i].name;
           $("#localEats").append(newDiv);
        }
      })
    },

      error: function(xhr, status, err) {
      // This time, we do not end up here! 
      }
   }),

});
  //curl -X GET --header "Accept: application/json" --header "user-key: f9a5acdea9259dd8ef4a0a2a9868c19a" "https://developers.zomato.com/api/v2.1/search?entity_id=Broomfield&entity_type=city"

  $(".itineraryButtonEvents").on("click", function (){
    var data =  $(this).data();
    var event = filteredEvents[data.index];
    console.log(event);
    var newDiv = $("<div>").text(event.name);
    $("#iten-box").append(newDiv);
  })

  //$(".itineraryButtonEats").on("click", function (){
    //var data =  $(this).data();
    // this will change based on eats ajax var resturants = filteredEvents[data.index];
    //console.log(event);
    //var newDiv = $("<div>").text(event.name);
   // $("#iten-box").append(newDiv);
  //})
//On click function that takes the checked event or restaurant and updates the intinerary with the event or restuarant then saves it to local storage

//Extra Credit... create a modal that pops up with a message depending on what the user adds to their list
  //"that looks delicious" for a restaurangt
  //"don't forget to check the weather" if it's an outdoor event
  //"that looks fun" for another event
  //"you have great taste in music" for a concert
