/*
Copyright (C) Giulio Foresto

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

var mergeTiles = function (game, tile) {
	switch (game) {
		case "TFE":
			return 2*tile;
		case "HT":
			return 3-tile;
	}
}

define([], function() {
	
	var initiateTable = function () {
		var table = [[],[],[],[]];
		var i = Math.floor(Math.random()*4);
		var j = Math.floor(Math.random()*4);
		table[i][j] = Math.floor(Math.random()*2)+1;
		return table;
	}
	
	var newTile = function (sTable) {
		var emptyTiles = [];
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i <= 3; i++) {
				if (!sTable[i][j]) {
					emptyTiles.push([i,j]);
				}
			}
		}
		var coords = emptyTiles[Math.floor(Math.random()*emptyTiles.length)]
		Vue.set(sTable[coords[0]], coords[1], Math.floor(Math.random()*2)+1)
	}
	
	var left = function (game, sTable, changed) {
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i <= 3; i++) {
				if (sTable[i][j]) {  
					let k = i+1;
					while (k <= 3) {
						if (sTable[k][j] == sTable[i][j]) {
							Vue.set(sTable[i], j, mergeTiles(game, sTable[i][j]));
							Vue.set(sTable[k], j, null);
							changed = true;
							break;
						}
						else if (sTable[k][j]) {
							break;
						}
						else {
							k++;
						}
					}
				}
			}
			
			for (let i = 0; i <= 3; i++) {
				if (!sTable[i][j]) {
					let k = i+1;
					while (k <= 3) {
						if (sTable[k][j]) {
							Vue.set(sTable[i], j, sTable[k][j]);
							Vue.set(sTable[k], j, null);
							changed = true;
							break;
						}
						else {
							k++;
						}
					}
				}
			}
		}
		return changed;
	}
	
	var right = function (game, sTable, changed) {
		for (let j = 0; j < 4; j++) {
			for (let i = 3; i >= 0; i--) {
				if (sTable[i][j]) {
					let k = i-1;
					while (k >= 0) {
						if (sTable[k][j] == sTable[i][j]) {
							Vue.set(sTable[i], j, mergeTiles(game, sTable[i][j]));
							Vue.set(sTable[k], j, null);
							changed = true;
							break;
						}
						else if (sTable[k][j]) {
							break;
						}
						else {
							k--;
						}
					}
				}
			}
			
			for (let i = 3; i >= 0; i--) {
				if (!sTable[i][j]) {
					let k = i-1;
					while (k >= 0) {
						if (sTable[k][j]) {
							Vue.set(sTable[i], j, sTable[k][j]);
							Vue.set(sTable[k], j, null);
							changed = true;
							break;
						}
						else {
							k--;
						}
					}
				}
			}
		}
		return changed;
	}
	
	var down = function (game, sTable, changed) {
		for (let i = 0; i < 4; i++) {
			for (let j = 3; j >= 0; j--) {
				if (sTable[i][j]) {
					let k = j-1;
					while (k >= 0) {
						if (sTable[i][k] == sTable[i][j]) {
							Vue.set(sTable[i], j, mergeTiles(game, sTable[i][j]));
							Vue.set(sTable[i], k, null);
							changed = true;
							break;
						}
						else if (sTable[i][k]) {
							break;
						}
						else {
							k--;
						}
					}
				}
			}
			
			for (let j = 3; j >= 0; j--) {
				if (!sTable[i][j]) {
					let k = j-1;
					while (k >= 0) {
						if (sTable[i][k]) {
							Vue.set(sTable[i], j, sTable[i][k]);
							Vue.set(sTable[i], k, null);
							changed = true;
							break;
						}
						else {
							k--;
						}
					}
				}
			}
		}
		return changed;
	}

	var up = function (game, sTable, changed) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j <= 3; j++) {
				if (sTable[i][j]) {
					let k = j+1;
					while (k <= 3) {
						if (sTable[i][k] == sTable[i][j]) {
							Vue.set(sTable[i], j, mergeTiles(game, sTable[i][j]));
							Vue.set(sTable[i], k, null);
							changed = true;
							break;
						}
						else if (sTable[i][k]) {
							break;
						}
						else {
							k++;
						}
					}
				}
			}
			
			for (let j = 0; j <= 3; j++) {
				if (!sTable[i][j]) {
					let k = j+1;
					while (k <= 3) {
						if (sTable[i][k]) {
							Vue.set(sTable[i], j, sTable[i][k]);
							Vue.set(sTable[i], k, null);
							changed = true;
							break;
						}
						else {
							k++;
						}
					}
				}
			}
		}
		return changed;
	}
	
	return {
		initiateTable: initiateTable,
		newTile: newTile,
		left: left,
		up: up,
		right: right,
		down: down
	}
});
