/**=================================================================================
 * THINNING
 =================================================================================*/

QUnit.test( "Matrix : full previewMatrix 1xN true, must be false", function( assert ) {
    var nbLin = 1;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 0;
    matrix.values[0][2] = 1;

    var comparison = matrix.isMatrix1NFullTrue(matrix.values[0]);

    assert.equal(comparison, false, "Compare false OK");
});

QUnit.test( "Matrix : full previewMatrix 1xN true, must be true", function( assert ) {
    var nbLin = 1;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;

    var comparison = matrix.isMatrix1NFullTrue(matrix.values[0]);

    assert.equal(comparison, true, "Compare true OK");
});

QUnit.test( "Matrix : thinning 8 vertically : 10x6 -> 7x6", function( assert ) {
    var nbLin = 10;
    var nbCol = 6;

    var matrix = new Matrix(nbLin, nbCol);
    // 1rst line
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;
    matrix.values[0][3] = 1;
    matrix.values[0][4] = 1;
    matrix.values[0][5] = 1;
    // 2nd line
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 1;
    matrix.values[1][2] = 1;
    matrix.values[1][3] = 1;
    matrix.values[1][4] = 1;
    matrix.values[1][5] = 1;
    // 3rd line
    matrix.values[2][0] = 1;
    matrix.values[2][1] = 1;
    matrix.values[2][2] = 0;
    matrix.values[2][3] = 0;
    matrix.values[2][4] = 1;
    matrix.values[2][5] = 1;
    // 4th line
    matrix.values[3][0] = 1;
    matrix.values[3][1] = 1;
    matrix.values[3][2] = 0;
    matrix.values[3][3] = 0;
    matrix.values[3][4] = 1;
    matrix.values[3][5] = 1;
    // 5th line
    matrix.values[4][0] = 1;
    matrix.values[4][1] = 1;
    matrix.values[4][2] = 1;
    matrix.values[4][3] = 1;
    matrix.values[4][4] = 1;
    matrix.values[4][5] = 1;
    // 6th line
    matrix.values[5][0] = 1;
    matrix.values[5][1] = 1;
    matrix.values[5][2] = 1;
    matrix.values[5][3] = 1;
    matrix.values[5][4] = 1;
    matrix.values[5][5] = 1;
    // 7th line
    matrix.values[6][0] = 1;
    matrix.values[6][1] = 1;
    matrix.values[6][2] = 0;
    matrix.values[6][3] = 0;
    matrix.values[6][4] = 1;
    matrix.values[6][5] = 1;
    // 8th line
    matrix.values[7][1] = 1;
    matrix.values[7][2] = 0;
    matrix.values[7][3] = 0;
    matrix.values[7][4] = 1;
    matrix.values[7][5] = 1;
    // 9th line
    matrix.values[8][0] = 1;
    matrix.values[8][1] = 1;
    matrix.values[8][2] = 1;
    matrix.values[8][3] = 1;
    matrix.values[8][4] = 1;
    matrix.values[8][5] = 1;
    // 10th line
    matrix.values[9][0] = 1;
    matrix.values[9][1] = 1;
    matrix.values[9][2] = 1;
    matrix.values[9][3] = 1;
    matrix.values[9][4] = 1;
    matrix.values[9][5] = 1;

    matrix.thinningVertically();

    assert.equal(matrix.nbLines, 7, "Thinning vertically OK");
});

QUnit.test( "Matrix : thinning 8 horizontally : 10x6 -> 10x4", function( assert ) {
    var nbLin = 10;
    var nbCol = 6;

    var matrix = new Matrix(nbLin, nbCol);
    // 1rst line
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;
    matrix.values[0][3] = 1;
    matrix.values[0][4] = 1;
    matrix.values[0][5] = 1;
    // 2nd line
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 1;
    matrix.values[1][2] = 1;
    matrix.values[1][3] = 1;
    matrix.values[1][4] = 1;
    matrix.values[1][5] = 1;
    // 3rd line
    matrix.values[2][0] = 1;
    matrix.values[2][1] = 1;
    matrix.values[2][2] = 0;
    matrix.values[2][3] = 0;
    matrix.values[2][4] = 1;
    matrix.values[2][5] = 1;
    // 4th line
    matrix.values[3][0] = 1;
    matrix.values[3][1] = 1;
    matrix.values[3][2] = 0;
    matrix.values[3][3] = 0;
    matrix.values[3][4] = 1;
    matrix.values[3][5] = 1;
    // 5th line
    matrix.values[4][0] = 1;
    matrix.values[4][1] = 1;
    matrix.values[4][2] = 1;
    matrix.values[4][3] = 1;
    matrix.values[4][4] = 1;
    matrix.values[4][5] = 1;
    // 6th line
    matrix.values[5][0] = 1;
    matrix.values[5][1] = 1;
    matrix.values[5][2] = 1;
    matrix.values[5][3] = 1;
    matrix.values[5][4] = 1;
    matrix.values[5][5] = 1;
    // 7th line
    matrix.values[6][0] = 1;
    matrix.values[6][1] = 1;
    matrix.values[6][2] = 0;
    matrix.values[6][3] = 0;
    matrix.values[6][4] = 1;
    matrix.values[6][5] = 1;
    // 8th line
    matrix.values[7][0] = 1;
    matrix.values[7][1] = 1;
    matrix.values[7][2] = 0;
    matrix.values[7][3] = 0;
    matrix.values[7][4] = 1;
    matrix.values[7][5] = 1;
    // 9th line
    matrix.values[8][0] = 1;
    matrix.values[8][1] = 1;
    matrix.values[8][2] = 1;
    matrix.values[8][3] = 1;
    matrix.values[8][4] = 1;
    matrix.values[8][5] = 1;
    // 10th line
    matrix.values[9][0] = 1;
    matrix.values[9][1] = 1;
    matrix.values[9][2] = 1;
    matrix.values[9][3] = 1;
    matrix.values[9][4] = 1;
    matrix.values[9][5] = 1;

    matrix.thinningHorizontally();

    assert.equal(matrix.nbColumns, 4, "Thinning horizontally OK");
});

QUnit.test( "Matrix : thinning 8 : 10x6 -> 7x4", function( assert ) {
    var nbLin = 10;
    var nbCol = 6;

    var matrix = new Matrix(nbLin, nbCol);
    // 1rst line
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;
    matrix.values[0][3] = 1;
    matrix.values[0][4] = 1;
    matrix.values[0][5] = 1;
    // 2nd line
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 1;
    matrix.values[1][2] = 1;
    matrix.values[1][3] = 1;
    matrix.values[1][4] = 1;
    matrix.values[1][5] = 1;
    // 3rd line
    matrix.values[2][0] = 1;
    matrix.values[2][1] = 1;
    matrix.values[2][2] = 0;
    matrix.values[2][3] = 0;
    matrix.values[2][4] = 1;
    matrix.values[2][5] = 1;
    // 4th line
    matrix.values[3][0] = 1;
    matrix.values[3][1] = 1;
    matrix.values[3][2] = 0;
    matrix.values[3][3] = 0;
    matrix.values[3][4] = 1;
    matrix.values[3][5] = 1;
    // 5th line
    matrix.values[4][0] = 1;
    matrix.values[4][1] = 1;
    matrix.values[4][2] = 1;
    matrix.values[4][3] = 1;
    matrix.values[4][4] = 1;
    matrix.values[4][5] = 1;
    // 6th line
    matrix.values[5][0] = 1;
    matrix.values[5][1] = 1;
    matrix.values[5][2] = 1;
    matrix.values[5][3] = 1;
    matrix.values[5][4] = 1;
    matrix.values[5][5] = 1;
    // 7th line
    matrix.values[6][0] = 1;
    matrix.values[6][1] = 1;
    matrix.values[6][2] = 0;
    matrix.values[6][3] = 0;
    matrix.values[6][4] = 1;
    matrix.values[6][5] = 1;
    // 8th line
    matrix.values[7][0] = 1;
    matrix.values[7][1] = 1;
    matrix.values[7][2] = 0;
    matrix.values[7][3] = 0;
    matrix.values[7][4] = 1;
    matrix.values[7][5] = 1;
    // 9th line
    matrix.values[8][0] = 1;
    matrix.values[8][1] = 1;
    matrix.values[8][2] = 1;
    matrix.values[8][3] = 1;
    matrix.values[8][4] = 1;
    matrix.values[8][5] = 1;
    // 10th line
    matrix.values[9][0] = 1;
    matrix.values[9][1] = 1;
    matrix.values[9][2] = 1;
    matrix.values[9][3] = 1;
    matrix.values[9][4] = 1;
    matrix.values[9][5] = 1;

    matrix.thinning();

    assert.equal(matrix.nbLines, 7, "Thinning vertically OK");
    assert.equal(matrix.nbColumns, 4, "Thinning horizontally OK");
    assert.ok( matrix.values[0][0] == 1, "Value line 0, column 0 OK");
    assert.ok( matrix.values[0][1] == 1, "Value line 0, column 1 OK");
    assert.ok( matrix.values[0][2] == 1, "Value line 0, column 2 OK");
    assert.ok( matrix.values[0][3] == 1, "Value line 0, column 3 OK");
    assert.ok( matrix.values[1][0] == 1, "Value line 1, column 0 OK");
    assert.ok( matrix.values[1][1] == 0, "Value line 1, column 1 OK");
    assert.ok( matrix.values[1][2] == 0, "Value line 1, column 2 OK");
    assert.ok( matrix.values[1][3] == 1, "Value line 1, column 3 OK");
    assert.ok( matrix.values[2][0] == 1, "Value line 2, column 0 OK");
    assert.ok( matrix.values[2][1] == 0, "Value line 2, column 1 OK");
    assert.ok( matrix.values[2][2] == 0, "Value line 2, column 2 OK");
    assert.ok( matrix.values[2][3] == 1, "Value line 2, column 3 OK");
    assert.ok( matrix.values[3][0] == 1, "Value line 3, column 0 OK");
    assert.ok( matrix.values[3][1] == 1, "Value line 3, column 1 OK");
    assert.ok( matrix.values[3][2] == 1, "Value line 3, column 2 OK");
    assert.ok( matrix.values[3][3] == 1, "Value line 3, column 3 OK");
    assert.ok( matrix.values[4][0] == 1, "Value line 4, column 0 OK");
    assert.ok( matrix.values[4][1] == 0, "Value line 4, column 1 OK");
    assert.ok( matrix.values[4][2] == 0, "Value line 4, column 2 OK");
    assert.ok( matrix.values[4][3] == 1, "Value line 4, column 3 OK");
    assert.ok( matrix.values[5][0] == 1, "Value line 4, column 0 OK");
    assert.ok( matrix.values[5][1] == 0, "Value line 4, column 1 OK");
    assert.ok( matrix.values[5][2] == 0, "Value line 4, column 2 OK");
    assert.ok( matrix.values[5][3] == 1, "Value line 4, column 3 OK");
    assert.ok( matrix.values[6][0] == 1, "Value line 5, column 0 OK");
    assert.ok( matrix.values[6][1] == 1, "Value line 5, column 1 OK");
    assert.ok( matrix.values[6][2] == 1, "Value line 5, column 2 OK");
    assert.ok( matrix.values[6][3] == 1, "Value line 5, column 3 OK");
});

