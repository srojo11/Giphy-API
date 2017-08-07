var topics =["tom", "john", "edward", "julio", "jose", "steven", "joe","bruce","karen","barbra","linda","melissa","philip"];

function gifDisplayInfo() {

	var name = $(this).attr("data-name");

    // Example queryURL for Giphy API
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=214928bdd00a480593f9270da4def3e4&limit=10&rating=G";

    $.ajax({
      url: queryURL,
      method: 'GET'
    })

	//response start
    .done(function(response) {

	$("#topics-view").empty();

	 var results = response.data;
	console.log(results);
	renderButtons();

	for (var i = 0; i < results.length; i++) {

	var topicDiv = $("<div>"); 
	topicDiv.addClass("item");


	var p = $("<p>").text("Rating: " + results[i].rating);

	var topicImage = $("<img>");

	topicImage.attr("src", results[i].images.fixed_height_still.url);
	topicImage.attr("data-still", results[i].images.fixed_height_still.url);
	topicImage.attr("data-animate", results[i].images.fixed_height.url);
	topicImage.attr("state");
	topicImage.addClass("topimg");

	topicDiv.append(p);
	topicDiv.append(topicImage);

	$("#topics-view").prepend(topicDiv);
	
	//pause and play images==============
	$(".topimg").on("click", function() {

      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

	console.log(p);
    console.log(queryURL);

		}
    

  });//response end=====================
 }//end displayinfo=====================


//Function render buttons and append====
function renderButtons(){

    $("#buttons-here").empty();

	for (i = 0; i < topics.length; i++) {
	var a = $("<button>");

	a.addClass("gif");
	a.attr("data-name", topics[i]);
	a.text(topics[i]);
	$("#buttons-here").append(a);
 }

}//=====================================



//Submit button on click================
$("#add-gif").on("click", function(event){

	event.preventDefault();
	var gif = $("#gifs-input").val().trim();
	topics.push(gif);
	
	console.log(topics)

	renderButtons();


});
//=====================================

$(document).on("click", ".gif", gifDisplayInfo);

renderButtons();
