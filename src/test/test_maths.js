QUnit.test( "Maths : 5 mod 0", function( assert ) {
    var nbDivided = 5;
    var nbDivisor = 0;

    var modResult = Maths_moduloGetQuotientAndRemainder(nbDivided, nbDivisor);

    assert.equal( modResult.quotient, 0, "Quotient OK" );
    assert.equal( modResult.remainder, 0, "Remainder OK" );
});

QUnit.test( "Maths : 7 mod 5", function( assert ) {
    var nbDivided = 7;
    var nbDivisor = 5;

    var modResult = Maths_moduloGetQuotientAndRemainder(nbDivided, nbDivisor);

    assert.equal( modResult.quotient, 1, "Quotient OK" );
    assert.equal( modResult.remainder, 2, "Remainder OK" );
});

QUnit.test( "Maths : 5 mod 7", function( assert ) {
    var nbDivided = 5;
    var nbDivisor = 7;

    var modResult = Maths_moduloGetQuotientAndRemainder(nbDivided, nbDivisor);

    assert.equal( modResult.quotient, 0, "Quotient OK" );
    assert.equal( modResult.remainder, 5, "Remainder OK" );
});
