function Game(options = {}) {
  this.id = options._id;
  this.title = options.title;
  this.description = options.description;
  this.releaseDate = options.releaseDate;
  this.genre = options.genre;
  this.publisher = options.publisher;
  this.imageUrl = options.imageUrl;
}

var gamesRootUrl = "https://games-world.herokuapp.com";
Game.prototype.getGameDetails = function() {
  var thisGame = this;
  return $.get(gamesRootUrl + "/games/" + thisGame.id).then(function(response) {
    thisGame.id = response._id;
    thisGame.title = response.title;
    thisGame.description = response.description;
    thisGame.releaseDate = response.releaseDate;
    thisGame.genre = response.genre;
    thisGame.publisher = response.publisher;
    thisGame.imageUrl = response.imageUrl;
  });
};

Game.prototype.updateGames = function(gameId, inputTitle, inputDescription) {
  return $.ajax({
    url: gamesRootUrl + "/games/" + gameId,
    method: "PUT",
    data: {
      title: inputTitle,
      description: inputDescription
    }
  });
};

Game.prototype.deleteGame = function(gameId) {
  return $.ajax({
    url: gamesRootUrl + "/games/" + gameId,
    method: "DELETE"
  });
};

Game.prototype.addGame = function(
  inputNewTitle,
  inputNewDescription,
  inputRelease,
  inputGenre,
  inputPublisher,
  inputUrl
) {
  return $.ajax({
    url: gamesRootUrl + "/games",
    method: "POST",
    data: {
      title: inputNewTitle,
      description: inputNewDescription,
      releaseDate: inputRelease,
      genre: inputGenre,
      publisher: inputPublisher,
      imageUrl: inputUrl
    }
  });
};
