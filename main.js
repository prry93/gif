var animals = ["cat", "lemur", "chinchilla", "ostrich", "frogs", "giraffe", "batman", "goose"]
  
function displayGif() {

     var animal = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    //  Will limit the number of gifs displayed to 10
        animal + "&api_key=AfdI1lf80chzr14HBrGalDPpGz4aECNQ&limit=10";

// Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

  var results = response.data;
  console.log(results);
  for (var i = 0; i < results.length; i++) {

// Creating and storing a div tag
      var animalDiv = $("<div>");
      animalDiv.addClass("gif-layout");

      var title = "GIF name: " + results[i].title;
      // Creating a paragraph tag with the result item's title
  var p = $("<p>").text(title);

    // Creating and storing an image tag
      var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr('data-animate', results[i].images.fixed_height.url);
      animalImage.attr('data-still', results[i].images.fixed_height_still.url);
      animalImage.addClass('gif');

      animalDiv.append(animalImage);
      animalDiv.append(p);
      
  $(".gif").on("click", function() {
      
        var state = $(this).attr("data-state");
  // <!-- sets the data-state to still or animate.--> 
  // By default, the gifs will be still since the instructions wanted that
  // click on the image to "animate" the gif

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
    $("#gifs-view").prepend(animalDiv);
    }
  });
}

// Renders buttons that contain the data pulled
function renderButtons() {

// will prevent buttons previously entered in the array from becoming buttons
      $("#buttons-view").empty();
// Looping through the array of gifs
    for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
  // Adding a class animal-btn
    a.addClass("animal-btn");
    // gives bootstrap class 
    a.addClass("btn btn-info");
  // Adding a data-attribute
    a.attr("data-name", animals[i]);
  // Providing the initial button text
    a.text(animals[i]);
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
  animals.push(animal);
  renderButtons();
});

// Adding .onclick for .animal-btn
  $(document).on("click", ".animal-btn", displayGif);

// Calling the renderButtons function to display the intial buttons
  renderButtons();



