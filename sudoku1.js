var grid;

function generateSudoku() {

	grid = [
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

	shuffle(grid);
	return grid;
}

function shuffle(grid) {

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

function hideTiles(grid) {

	var hiddenGrid = grid;

	//subsquare row
	for (var i = 0; i < 3; i++) {
		//subsquare column
		for (var j = 0; j < 3; j++) {
			numTiles = Math.floor(Math.random()*8 + 4);
		}
	}

}

function getTileNumber(row, column) {
	return grid[row][column];
}