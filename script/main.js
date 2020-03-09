/*
Copyright (C) 2020 Giulio Foresto

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
