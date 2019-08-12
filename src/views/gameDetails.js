var game = new Game();

game.id = getUrlParameter("id");

getGame();

function getGame() {
  game.getGameDetails().then(function() {
    console.log("Game details: ", game);
    displayGameDetails();
  });
}

function displayGameDetails() {
  var template = document.getElementById("template");
  var gameContainer = document.getElementById("game");

  var gameTitle = template.querySelector(".this-game-title");
  gameTitle.innerHTML = game.title;

  var gameIdElement = template.querySelector(".this-game-id");
  gameIdElement.innerHTML = "Game ID: " + game.id;

  var gameImageElement = template.querySelector(".this-game-img");
  gameImageElement.innerHTML = "<img src=" + game.imageUrl + ">";

  var gameDescriptionElement = template.querySelector(".this-game-description");
  gameDescriptionElement.innerHTML = game.description;

  var gameReleaseDate = template.querySelector(".release-date");
  gameReleaseDate.innerHTML = "Release date: " + game.releaseDate;

  var gameGenre = template.querySelector(".game-genre");
  gameGenre.innerHTML = "Genre: " + game.genre;

  var gamePublisher = template.querySelector(".game-publisher");
  gamePublisher.innerHTML = "Publisher: " + game.publisher;

  var editButton = template.querySelector(".this-game-edit");
  editButton.addEventListener("click", updateGameOnClick);

  var deleteButton = template.querySelector(".game-delete");
  deleteButton.addEventListener("click", deleteGameOnClick);

  gameContainer.appendChild();
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
