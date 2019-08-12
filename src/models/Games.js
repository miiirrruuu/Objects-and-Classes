function Games() {
  this.items = [];
}

var gamesRootUrl = "https://games-world.herokuapp.com";

Games.prototype.getAllGames = function() {
  var display = this;
  return $.get(gamesRootUrl + "/games").then(function(response) {
    display.items = [];
    for (var i = 0; i < response.length; i++) {
      var game = new Game(response[i]);
      display.items.push(game);
    }
  });
};

Games.prototype.refreshApi = function() {
  return $.ajax({
    url: gamesRootUrl + "/regenerate-games",
    method: "GET"
  });
};
