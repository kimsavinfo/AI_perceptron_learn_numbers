/**=================================================================================
 * CROP
 =================================================================================*/

QUnit.test( "Matrix : crop selection tested with a 7 : 10x10 -> 5x5", function( assert ) {
    var nbLin = 10;
    var nbCol = 10;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[3][3] = 1;
    matrix.values[3][4] = 1;
    matrix.values[3][5] = 1;
    matrix.values[4][5] = 1;
    matrix.values[5][5] = 1;
    matrix.values[6][5] = 1;
    matrix.values[7][5] = 1;
    // middle bar
    matrix.values[5][3] = 1;
    matrix.values[5][4] = 1;
    matrix.values[5][6] = 1;
    matrix.values[5][7] = 1;

    matrix.crop();

    assert.equal(matrix.nbLines, 5, "Crop Lines OK");
    assert.equal(matrix.nbColumns, 5, "Crop columns OK");
});

QUnit.test( "Matrix : crop selection tested with a 1 : 10x10 -> 6x1", function( assert ) {
    var nbLin = 10;
    var nbCol = 10;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[3][5] = 1;
    matrix.values[4][5] = 1;
    matrix.values[5][5] = 1;
    matrix.values[6][5] = 1;
    matrix.values[7][5] = 1;
    matrix.values[8][5] = 1;

    matrix.crop();

    assert.equal(matrix.nbLines, 6, "Crop lines OK");
    assert.equal(matrix.nbColumns, 1, "Crop columns OK");
});

QUnit.test( "Matrix : crop selection with a 8 : 10x10 -> 5x3", function( assert ) {
    var nbLin = 10;
    var nbCol = 6;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[3][3] = 1;
    matrix.values[3][4] = 1;
    matrix.values[3][5] = 1;
    matrix.values[4][3] = 1;
    matrix.values[4][5] = 1;
    matrix.values[5][3] = 1;
    matrix.values[5][4] = 1;
    matrix.values[5][5] = 1;
    matrix.values[6][3] = 1;
    matrix.values[6][5] = 1;
    matrix.values[7][3] = 1;
    matrix.values[7][4] = 1;
    matrix.values[7][5] = 1;
    matrix.crop();

    assert.equal(matrix.nbLines, 5, "Crop line OK");
    assert.equal(matrix.nbColumns, 3, "Crop columns OK");
});
