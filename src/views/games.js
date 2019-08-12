var games = new Games();

var game = new Game();

getGames();

function getGames() {
  games.getAllGames().then(function() {
    console.log(games.items);
    displayGames(games.items);
  });
}

function displayGames(response) {
  console.log(response);
  var template = document.getElementById("template");
  var gamesContainer = document.getElementById("games");

  for (var i = 0; i < response.length; i++) {
    var gameClone = template.cloneNode(true);

    var oneGame = games.items;

    gameClone.id = "game_" + oneGame[i].id;

    var gameTitleElement = gameClone.querySelector(".game-title");
    gameTitleElement.innerHTML = oneGame[i].title;

    var gameIdElement = gameClone.querySelector(".game-id");
    gameIdElement.innerHTML = "Game ID: " + oneGame[i].id;

    var gameImageElement = gameClone.querySelector(".game-img");
    gameImageElement.innerHTML = "<img src=" + oneGame[i].imageUrl + ">";

    var gameDescriptionElement = gameClone.querySelector(".game-description");
    gameDescriptionElement.innerHTML = oneGame[i].description;

    gamesContainer.appendChild(gameClone);

    var deleteButton = gameClone.querySelector(".game-delete");
    deleteButton.addEventListener("click", deleteGameOnClick);

    var editButton = gameClone.querySelector(".game-edit");
    editButton.addEventListener("click", updateGameOnClick);
  }
  template.remove();
}

function updateGameOnClick(event) {
  event.target.disabled = true;

  var originalGame = event.target.parentNode.parentNode;
  var originalGameId = originalGame.id;
  var gameId = originalGameId.replace("game_", "");

  var inputTitle = document.createElement("input");
  inputTitle.setAttribute("class", "game-ttl");
  inputTitle.setAttribute("style", "width: 80%");
  inputTitle.value = originalGame.querySelector(".game-title").innerText;
  originalGame.appendChild(inputTitle);

  var inputDescription = document.createElement("textarea");
  inputDescription.setAttribute("class", "new-game-description");
  inputDescription.setAttribute("style", "width: 80%");
  inputDescription.value = originalGame.querySelector(
    ".game-description"
  ).innerText;
  originalGame.appendChild(inputDescription);

  var updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  originalGame.appendChild(updateButton);

  updateButton.addEventListener("click", function() {
    console.log("Input Title", inputTitle.value);
    game
      .updateGames(gameId, inputTitle.value, inputDescription.value)
      .then(function() {
        inputTitle.remove();
        inputDescription.remove();
        updateButton.remove();

        event.target.disabled = false;
        getGames();
      });
  });
}

function deleteGameOnClick(clickedButton) {
  var thisGame = clickedButton.target.parentNode.parentNode;
  var originalGameId = thisGame.id;
  var gameId = originalGameId.replace("game_", "");
  console.log(gameId);

  game.deleteGame(gameId).then(function(response) {
    removeGameFromDOM(response, game);
  });
  getGames();
}

function removeGameFromDOM(response, game) {
  console.log("deleted", response);
  game.remove();
}

var refreshButton = document.querySelector(".refresh-games");
refreshButton.addEventListener("click", refreshGamesOnClick);
function refreshGamesOnClick() {
  games.refreshApi().then (function () {getGames()});
  
}

var addGameButton = document.querySelector(".add-new");
addGameButton.addEventListener("click", addNewGameOnClick);

function addNewGameOnClick(event) {
  var inputNewTitle = document.querySelector(".new-title");
  inputNewTitle.value = document.querySelector(".new-title").innerText;

  var inputNewDescription = document.querySelector(".new-description");
  inputNewDescription.value = document.querySelector(
    ".new-description"
  ).innerText;

  var inputRelease = document.querySelector(".release-date");
  inputRelease.value = document.querySelector(".release-date").innerText;

  var inputGenre = document.querySelector(".genre");
  inputGenre.value = document.querySelector(".genre").innerText;

  var inputPublisher = document.querySelector(".publisher");
  inputPublisher.value = document.querySelector(".publisher").innerText;

  var inputUrl = document.querySelector(".image-url");
  inputUrl.value = document.querySelector(".image-url").innerText;

  game
    .addGame(
      inputNewTitle.value,
      inputNewDescription.value,
      inputRelease.value,
      inputGenre.value,
      inputPublisher.value,
      inputUrl.value
    )
    .then(function() {
      getGames();
    });
}
