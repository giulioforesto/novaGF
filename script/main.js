requirejs(["script/game"], function (game) {
	
	var app = new Vue({
		el : '#app',
		data : {
			sTable: game.initiateTable(),
			games: {
				TFE : {
					code : "TFE",
					name : "2048"
				},
				HT : {
					code : "HT",
					name : "Hodor! Timmy!"
				}
			},
			currentGame: "TFE"
		},
		methods : {
			changeGame (gameCode) {
				this.currentGame = gameCode;
				this.sTable = game.initiateTable();
			}
		}
	});
	
	keyup = function (event) {
		var changed = false;
		switch (event.keyCode) {
			case 37:
				game.left(app.currentGame, app.sTable, changed) ? game.newTile(app.sTable) : null; break;
			case 38:
				game.up(app.currentGame, app.sTable, changed) ? game.newTile(app.sTable) : null; break;
			case 39:
				game.right(app.currentGame, app.sTable, changed) ? game.newTile(app.sTable) : null; break;
			case 40:
				game.down(app.currentGame, app.sTable, changed) ? game.newTile(app.sTable) : null; break;
		}
	}
	
});