function generateSudoku() {

	var hiddenGrid;
	this.grid = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9], 
		[4, 5, 6, 7, 8, 9, 1, 2, 3], 
		[7, 8, 9, 1, 2, 3, 4, 5, 6], 
		[2, 3, 4, 5, 6, 7, 8, 9, 1], 
		[5, 6, 7, 8, 9, 1, 2, 3, 4], 
		[8, 9, 1, 2, 3, 4, 5, 6, 7], 
		[3, 4, 5, 6, 7, 8, 9, 1, 2], 
		[6, 7, 8, 9, 1, 2, 3, 4, 5], 
		[9, 1, 2, 3, 4, 5, 6, 7, 8]
		];

	this.shuffle(grid);
	this.hideTiles(grid);

	this.shuffe = function(grid) {

		//swap the same columns of each subsquare
		for(var i = 0; i < 25; i++) {
			var col = Math.floor(Math.random()*3);
			var sub1 = Math.floor(Math.random()*3);
			var sub2 = Math.floor(Math.random()*3);
			for(var j = 0; j < grid.length; j++) {
				var temp = grid[j][col + sub1*3];
				grid[j][col + sub1*3] = grid[j][col + sub2*3];
				grid[j][col + sub2*3] = temp;
			}
		}

		//swap all columns within each subsquare
		for(var i = 0; i < 25; i++) {
			var sub = Math.floor(Math.random()*3);
			var col1 = Math.floor(Math.random()*3);
			var col2 = Math.floor(Math.random()*3);
			while(col1 == col2) col2 = Math.floor(Math.random()*3);
			for(var j = 0; j < grid.length; j++) {
				var temp = grid[j][sub*3 + col1];
				grid[j][sub*3 + col1] = grid[j][sub*3 + col2];
				grid[j][sub*3 + col2] = temp;
			}
		}

		//swap all rows within each subsquare
		for(var i = 0; i < 25; i++) {
			var sub = Math.floor(Math.random()*3);
			var row1 = Math.floor(Math.random()*3);
			var row2 = Math.floor(Math.random()*3);
			while(row1 == row2) row2 = Math.floor(Math.random()*3);
			for(var j = 0; j < grid.length; j++) {
				var temp = grid[sub*3 + row1][j];
				grid[sub*3 + row1][j] = grid[sub*3 + row2][j];
				grid[sub*3 + row2][j] = temp;
			}
		}

		//swap one number with another
		for(var i = 0; i < 25; i++) {
			var num1 = Math.floor(Math.random()*9 + 1);
			var num2 = Math.floor(Math.random()*9 + 1);
			while(num1 == num2) num2 = Math.floor(Math.random()*9 + 1);
			for(var j = 0; j < grid.length; j++) {
				for(var k = 0; k < grid[j].length; k++) {
					if(grid[j][k] == num1)
						grid[j][k] = num2;
					else if(grid[j][k] == num2)
						grid[j][k] = num1;
				}
			}
		}
	}

	this.hideTiles = function(aGrid) {

		// Randomly hide tiles, no guarantee for a unique solution
		hiddenGrid = aGrid;

			for(var i = 0; i < 4; i++) {
				var numTiles = Math.floor(Math.random()*8 + 5);
				while(numTiles > 0) {
					var k = Math.floor(Math.random()*9);
					hiddenGrid[i][k] = 0;
					hiddenGrid[8-i][8-k] = 0;
					numTiles--;
				}
			}
		var numTiles = 2;
		while(numTiles > 0) {
			var k = Math.floor(Math.random()*4);
			hiddenGrid[4][k] = 0;
			hiddenGrid[4][8-k] = 0;
			numTiles--;
		}
		

		/*
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				var temp = grid[i][j];
				grid[i][j] = "";
				for(var k = 0; k < 9; k++) {
					if( solver() ) {
						var pos = [i][j];
						hiddenGrid.push(pos);
					}
					else {// not unique
						grid[i][j] = temp;
					}
				}
			}
		}

		*/
	}

	this.solver = function(aGrid) {
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				if(aGrid[i][j] == "") {
					for(var k = 1; k < 10; k++) {
						if(this.isValid(aGrid, i, j, k)) {
							k = 10;
						}
						else {

						}
					}
				}
			}
		}
	}

	this.isValid = function(aGrid, row, col, num) {
		if(aGrid[row].indexOf(num) == -1
			&& this.columnToArray(aGrid, col).indexOf(num) == -1
			&& this.subsquareToArray(aGrid, row, col).indexOf(num) == -1) {
			return true;
		}
		else {
			return false;
		}
	}

	this.columnToArray = function(aGrid, col) {
		var colArray;
		for(var i = 0; i < 9; i++) {
			colArray.push(aGrid[i][col]);
		}
		return colArray;
	}

	//Convert a subsquare to a 1D array, top left to bottom right
	this.subsquareToArray = function(aGrid, row, col) {
		var subArray;
		var subrow = row - (row % 3);
		var subcol = col - (col % 3);
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				subArray.push(aGrid[i+subrow][j+subcol]);
			}
		}
		return subArray;
	}

	this.getTileNumber = function(row, col) {
		return hiddenGrid[row][col];
	}

	this.setNumber = function(row, col, num) {
		hiddenGrid[row][col] = num;
	}

	this.getGrid = function() {
		return grid;
	}

	this.getHiddenGrid = function() {
		return hiddenGrid;
	}
}