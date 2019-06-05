// Some starter items to be turned to search buttons.
var searchTerm = ["cat", "lemur", "chinchilla"]
 
// The primary function that is in charge of gathering the response data and using it to generate gifs
function displayGif() {

     var animal = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    //  Will limit the number of gifs displayed to 10
        animal + "/&api_key=AfdI1lf80chzr14HBrGalDPpGz4aECNQ&limit=10";

// Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

  var results = response.data;
  console.log(response);

for (var i = 0; i < results.length; i++) {

// Creating a div tag for the gif image data to be stored.
  var animalDiv = $("<div>");
    animalDiv.addClass("gif-layout");
  var title = "Title: " + results[i].title;

// Creating a paragraph tag with the result item's title
  var p = $("<p>").text(title);

// Creating and storing an image tag for the div
  var animalImage = $("<img>");
// Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr('data-animate', results[i].images.fixed_height.url);
      animalImage.attr('data-still', results[i].images.fixed_height_still.url);
      animalImage.addClass('gif');
  
// <!-- sets the data-state to still or animate based on a click.--> 
// By default, the gifs will be still since the instructions wanted that
  $(".gif").on("click", function() {   
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  
  // The appends will gather the results data for it to be displayed in the generated div
  animalDiv.append(animalImage);
  animalDiv.append(p);
  // prepending the generated animalDiv to the html class gifs-view lets the user see new gifs above the previously generated gifs.
  // Note: when clicking the same tag again, the gifs generated will be the same. Setting the query url to random does not solve it.
  $("#gifs-view").prepend(animalDiv);
    }
  });
}

// Renders buttons that contain the data pulled
function renderButtons() {
// will prevent buttons previously entered in the array from becoming buttons
    $("#buttons-view").empty();
// Looping through the array of gifs
    for (var i = 0; i < searchTerm.length; i++) {
    var a = $("<button>");
  // Adding a class animal-btn
    a.addClass("animal-btn");
    // gives bootstrap class 
    a.addClass("btn btn-info");
  // Adding a data-attribute
    a.attr("data-name", searchTerm[i]);
  // Providing the initial button text
    a.text(searchTerm[i]);
  // Adding the button to the buttons-view div
    $("#buttons-view").append(a);

  }
 }

 
// This function when a button containing an animal name is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
// This line grabs the input from the textbox
  var animal = $("#gifs-input").val().trim();
// Adding animal from the textbox to our array
  searchTerm.push(animal);
  renderButtons();
});


// Adding .onclick for .animal-btn
  $(document).on("click", ".animal-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
  renderButtons();



