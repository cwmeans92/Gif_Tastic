$(document).ready(function() {
  
var topics = ["happy", "anxious", "hungry", "tired", "excited", "sleepy", "embarassed", "proud", "good", "bad","impressed", "sick"]

function displayButton(){
$("#buttonsection").empty();

for (var i =0; i<topics.length; i++){
    var newButton = $("<button>").text(topics[i]);
          newButton.addClass("newbutton");
          newButton.attr("data-name", topics[i]);
          $("#buttonsection").append(newButton);
    }
};


$("#add-topic").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#topic-input").val().trim();
    topics.push(newTopic);
    displayButton();
    // $("#topic-input").val("");
})


displayButton();
$(document).on("click", ".newbutton", displayGif);

function displayGif(){
  $(".gifdirections").text("Now click on a picture to see the gif move!");

clearImages();
var topic = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + topic + "&api_key=LKzsQCgYiaMuZmtzZg2ycFxMCgqjHS8H";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i =0; i<10;i++){
       var topicDiv = $("<div>")
        var stilltopicImage = $("<img>");
        var topicRating = $("<div>");

        stilltopicImage.attr("src", results[i].images.fixed_height_still.url);
        stilltopicImage.attr("data-still", results[i].images.fixed_height_still.url);
        stilltopicImage.attr("data-animate", results[i].images.fixed_height.url);
        stilltopicImage.attr("data-state", "still");
        stilltopicImage.addClass("gif");

        topicDiv.addClass("topicDiv");

        topicRating.text("Rating: " + results[i].rating)

        topicDiv.append(stilltopicImage, topicRating)
        $("#images").append(topicDiv);
      
    }
  });
}

    $(document).on("click", ".gif", function() {
     
        var state = $(this).attr("data-state");
      
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        
        }
      });
    


function clearImages(){

  $("#images").empty();

}

});