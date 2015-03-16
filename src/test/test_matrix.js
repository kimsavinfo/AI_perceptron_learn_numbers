QUnit.test( "Matrix : initialize a 5x3 previewMatrix with the value 0", function( assert ) {
    var isInit = true;
    var nbLin = 5;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    for(var iLin = 0; iLin < nbLin; iLin++)
    {
        for(var iCol = 0; iCol < nbCol; iCol++)
        {
            if (matrix.values[iLin][iCol] != 0)
                isInit = false
        }
    }

    assert.ok( isInit, "5x3 previewMatrix initilized with the value 0" );
});

QUnit.test( "Matrix : set value 1 to the cell (2;3)", function( assert ) {
    var nbLin = 5;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[2][3] = 1;

    assert.ok( matrix.values[2][3] == 1, "cell (2;3) is equal to the setted value" );
});

QUnit.test( "Matrix : function getColumn test", function( assert ) {
    var nbLin = 2;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 0;
    matrix.values[1][2] = 1;

    var columnToTest = matrix.getColumn(1);

    assert.ok( columnToTest[0] == 1, "getColmun, 1rst line OK" );
    assert.ok( columnToTest[1] == 0, "getColmun, 2nd line OK" );
});

QUnit.test( "Matrix : function eraseColumn test", function( assert ) {
    var nbLin = 2;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 0;
    matrix.values[0][2] = 1;
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 1;
    matrix.values[1][2] = 0;

    matrix.eraseColumn(1);

    assert.ok( matrix.values[0][0] == 1, "eraseColumn : value line 0, column 0 OK");
    assert.ok( matrix.values[0][1] == 1, "eraseColumn : value line 0, column 1 OK");
    assert.ok( matrix.values[1][0] == 1, "eraseColumn : value line 1, column 0 OK");
    assert.ok( matrix.values[1][1] == 0, "eraseColumn : value line 1, column 1 OK");
    assert.equal(matrix.nbColumns, 2, "eraseColumn : nb columns OK");
});

QUnit.test( "Matrix : compare line, must be false", function( assert ) {
    var nbLin = 2;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 1;
    matrix.values[0][2] = 1;

    var comparison = matrix.compare2Matrix1N(matrix.values[0], matrix.values[1]);

    assert.equal(comparison, false, "Compare false OK");
});

QUnit.test( "Matrix : compare line, must be true", function( assert ) {
    var nbLin = 2;
    var nbCol = 3;

    var matrix = new Matrix(nbLin, nbCol);
    matrix.values[0][0] = 1;
    matrix.values[0][1] = 0;
    matrix.values[0][2] = 1;
    matrix.values[1][0] = 1;
    matrix.values[1][1] = 0;
    matrix.values[1][2] = 1;

    var comparison = matrix.compare2Matrix1N(matrix.values[0], matrix.values[1]);

    assert.equal(comparison, true, "Compare true OK");
});