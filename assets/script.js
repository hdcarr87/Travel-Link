
//Take user imput of date (Confirm that API keys can search by date and the format required)
  //future dev... date range

//onclick function that captures the user input and inserts it into the API request URL

//AJAX function to send the request 
$("#search-button").on("click", function () {
    event.preventDefault();

    var location = $("#zipcode").val().trim();
    var APIrestKey = "8f8ab57d29msh63cc59e803ae456p1ed3e0jsnfc15d00e1331";
    var hostAPI = "us-restaurant-menus.p.rapidapi.com";
    var queryURLrest = "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/90210?page=1" + location + APIrestKey + hostAPI;

  $.ajax({
    url: queryURLrest,
    method: "GET"
  })

  .then(function (response){
    console.log(queryURLrest);
    console.log(response);
    var restList = responst.list[0];
    $("#localEats").text("Local Eats:" + restList)
  })  
  

});






//Get the results back from the API

//dynamically updating the DOM with the search results
  //each result should have a check box next to it

//On click function that takes the checked event or restaurant and updates the intinerary with the event or restuarant

//Extra Credit... create a modal that pops up with a message depending on what the user adds to their list
  //"that looks delicious" for a restaurangt
  //"don't forget to check the weather" if it's an outdoor event
  //"that looks fun" for another envet
  //"you have great taste in music" for a musical event

