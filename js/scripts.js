function DestinationBook(){
    this.destinations = {};
    this.currentId = 0;
}

DestinationBook.prototype.addDestination = function(destination) {
  destination.id = this.assignId();
  this.destinations[destination.id] = destination;
}

DestinationBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

DestinationBook.prototype.findDestination = function(id) {
  if(this.destinations[id] != undefined) {
    return this.destinations[id]
  }
  return false
};

DestinationBook.prototype.deleteDestination = function(id) {
  if (this.destinations[id] === undefined) {
    return false;
  }
  delete this.destinations[id];
  return  true;
};

function Destination(location, landmark, toy, notes) {
  this.location = location;
  this.landmark = landmark;
  this.toy = toy;
  this.notes = notes;
}

//UI Logic
let destinationBook = new DestinationBook();

function displayDestinationDetails(destinationBookToDisplay) {
  let destinationList = $("ul#destinations");
  let htmlForDestinationInfo = "";
  Object.keys(destinationBookToDisplay.destinations).forEach(function(key) {
    const destination = destinationBookToDisplay.findDestination(key);
    htmlForDestinationInfo += "<li id=" + destination.id + ">" + "it will be " + destination.toy + "in " + destination.location + "</li>";
  });
  destinationList.html(htmlForDestinationInfo);
}

function showDestination(destinationId) {
  const destination = destinationBook.findDestination(destinationId);
  $("#show-destination").show();
  $(".location").html(destination.location);
  $(".landmark").html(destination.landmark);
  $(".toy").html(destination.toy);
  $(".notes").html(destination.notes);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + destination.id + ">Delete</button>");
}

function attachDestinationListeners() {
  $("ul#destinations").on("click", "li", function() {
    showDestination(this.id);
  });
    $("#buttons").on("click", ".deleteButton", function() {
      destinationBook.deleteDestination(this.id);
      $("#show-destination").hide();
      displayDestinationDetails(destinationBook);
    });
}

$(document).ready(function() {
  attachDestinationListeners();
  $("form#destination-info").submit(function(event) {
    event.preventDefault();
    let inputtedLocation = $("#location").val();
    let inputtedLandmark = $("#landmark").val();
    let inputtedToy = $("#toy").val();
    let inputtedNotes = $("#notes").val();

    $("#location").val("");
    $("#landmark").val("");
    $("#toy").val("");
    $("#notes").val("");

    let newDestination = new Destination(inputtedLocation, inputtedLandmark, inputtedToy, inputtedNotes);
    console.log(newDestination);
    destinationBook.addDestination(newDestination);
    displayDestinationDetails(destinationBook);
  })
})