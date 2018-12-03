// intial array of cities
var cities = ["Cleveland", "Los Angeles", "Chicago", "New York"];

// add cities already searched to array below
var citiesUsed = [];

// displays initial cities as example buttons
renderButtons();

// click handler that runs displayGifInfo function to display all 10 relevant gifs for each city
$(document).on("click", ".city-btn", displayGifInfo);

// click handler that runs startPauseGIF to still and animate gifs
$("img").on("click", startPauseGIF);

// click handler that runs addCity function to add city button
$("#inputSubmitButton").on("click", addCity);
b
function renderButtons () {
    for (var i = 0; i < cities.length; i++) {
        var cityButton = $("<button>");
        
        cityButton.addClass("city-btn btn btn-info");
        cityButton.attr("data-name", cities[i]);
        cityButton.text(cities[i]);

        $("#buttons-div").append(cityButton);

        citiesUsed.push(cities[i]);
    } 

    cities = [];
}

// function to grab city name and call GIPHY API with city name as part of query
function displayGifInfo() {
    
    var cityinput = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cityinput + "&api_key=mYMYcYdwV7sCP8ZIP7isZ1s1PDUdHo5y&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            var gifRating = response.data[i].rating;
            var gifAnimatedLink = response.data[i].images.fixed_height_small.url;
            
            // Appending animated gifs to page
            $("#rating" + (i+1)).text("Rating: " + gifRating);
            $("#" + (i+1)).attr("src", gifAnimatedLink);

            //grabbing characteristics for still gif
            var gifStillLink = response.data[i].images.fixed_height_small_still.url;

            //adding all links as attributes
            $("#" + (i+1)).addClass("gif");
            $("#" + (i+1)).attr("data-state", "animated");
            $("#" + (i+1)).attr("data-animated", gifAnimatedLink);
            $("#" + (i+1)).attr("data-still", gifStillLink);
        }
    
    });
}

function startPauseGIF () {
    var state = $(this).attr("data-state");
    
    if (state === "animated") { 
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else { 
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    }
}

// adds new city button by pushing to the cities array and then running the renderButtons function. 
// Makes sure user has not entered a previous city by comparing user input with contents of citiesUsed array.
function addCity () {

    event.preventDefault();
    
    var newCity = $("#userInputtedCity").val();

    if (citiesUsed.indexOf(newCity) === -1 ) {
        cities.push(newCity);
        renderButtons();
    } else {
        alert("You already entered " + newCity + "! Please enter a new city!");
    }
}







