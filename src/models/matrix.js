/**
 * Object : Matrix
 * Will always come back to a 5x3 dimensions
 * 5 lines
 * 3 columns
 *
 * @param p_lin : number of lines
 * @param p_col : number of columns
 * @constructor
 */
function Matrix(p_lin, p_col)
{
    this.nbLinesMin = 5;
    this.nbColumnsMin = 3;

    this.nbLines = p_lin;
    this.nbColumns = p_col;
    this.values = [];
    for(var iLine = 0; iLine < this.nbLines; iLine++)
    {
        this.values[iLine] = [];
        for(var iColumn = 0; iColumn < this.nbColumns; iColumn++)
        {
            this.values[iLine][iColumn] = 0;
        }
    }

    /**=================================================================================
     * FUNCTIONS
     =================================================================================*/

    this.getColumn = function(iColumn)
    {
        var column = [];

        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            column[iLine] = this.values[iLine][iColumn];
        }

        return column;
    };

    this.updateDimension = function()
    {
        this.nbLines = this.values.length;
        this.nbColumns = this.values[0].length;
    };

    this.eraseLine = function(iLine)
    {
        this.values.splice(iLine,1);
        this.updateDimension();
    };

    this.eraseColumn = function(iColumn)
    {
        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            this.values[iLine].splice(iColumn,1);
        }

        this.updateDimension();
    };

    this.addLine = function(toTheBeginning)
    {
        var newLine = [];
        for(var iColumn = 0; iColumn < this.nbColumns; iColumn++)
        {
            newLine[iColumn] = 0;
        }

        if(toTheBeginning)
            this.values.unshift(newLine);
        else
            this.values.push(newLine);

        this.updateDimension();
    };

    this.addColumn = function(toTheLeft)
    {
        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            if(toTheLeft)
                this.values[iLine].unshift(0);
            else
                this.values[iLine].push(0);
        }

        this.updateDimension();
    };

    this.clear = function()
    {
        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            this.values[iLine] = [];
            for(var iColumn = 0; iColumn < this.nbColumns; iColumn++)
            {
                this.values[iLine][iColumn] = 0;
            }
        }
    };

    /**
     * Are 2 previewMatrix 1 line N columns the same ?
     * @param matrix1
     * @param matrix2
     * @returns {boolean}
     */
    this.compare2Matrix1N = function(matrix1, matrix2)
    {
        var nbColumnsLimit = matrix1.length;
        var iColumn = 0;
        var isMatrixTheSame = true;

        do
        {
            if(matrix1[iColumn] !=  matrix2[iColumn])
                isMatrixTheSame = false;

            iColumn++
        }while(isMatrixTheSame == true && iColumn < nbColumnsLimit);

        return isMatrixTheSame;
    };

    /**
     * Is the previewMatrix 1 line N colmuns with only true values ?
     * @param matrixToTest
     * @returns {boolean}
     */
    this.isMatrix1NFullTrue = function(matrixToTest)
    {
        var nbColumnsLimit = matrixToTest.length;
        var iColumn = 0;
        var isFullTrue = true;

        do
        {
            if(matrixToTest[iColumn] == 0)
                isFullTrue = false;

            iColumn++
        }while(isFullTrue == true && iColumn < nbColumnsLimit);

        return isFullTrue;
    };


    /**================================== MINIMIZE ==================================*/

    /**
     * Clean the matrix from userCanvas
     */
    this.minimizeFromCanvas = function()
    {
        this.crop();
        this.thinning();
        this.shave();

        this.minimize();
    };

    /**
     * Transform the previewMatrix into a 5x3
     */
    this.minimize = function()
    {
        var modLine = Maths_moduloGetQuotientAndRemainder(this.nbLines, this.nbLinesMin);
        var modColumn = Maths_moduloGetQuotientAndRemainder(this.nbColumns, this.nbColumnsMin);

        // IF it is already a 5x3, we don't have to do anything
        if(!(modLine.quotient == 1 && modColumn.quotient == 1
            && modLine.remainder == 0 && modColumn.remainder == 0))
        {
            // IF the previewMatrix has got less lines than the 5
            // THEN we complete it adding line(s) with 0
            if(modLine.quotient < 1)
            {
                var nbLineToAdd = this.nbLinesMin - modLine.remainder;
                for(var iLineToAdd = 0; iLineToAdd < nbLineToAdd; iLineToAdd++)
                {
                    this.addLine(false);
                }
            }

            // IF the previewMatrix has got less columns than the 3
            // THEN we complete it adding column(s) with 0
            if(modColumn.quotient < 1)
            {
                var nbColumnsToAdd = this.nbColumnsMin - modColumn.remainder;
                for(var iColumnToAdd = 0; iColumnToAdd < nbColumnsToAdd; iColumnToAdd++)
                {
                    this.addColumn(true);
                }
            }

            modLine = Maths_moduloGetQuotientAndRemainder(this.nbLines, this.nbLinesMin);
            modColumn = Maths_moduloGetQuotientAndRemainder(this.nbColumns, this.nbColumnsMin);

            // IF the previewMatrix is not proportional to a 5x3
            // THEN deal with it so we obtain a proportional one
            if(modLine.remainder > 0 || modColumn.remainder > 0)
            {
                this.prepareMatrixToReduce(modLine, modColumn);

                // Update modulo
                modLine = Maths_moduloGetQuotientAndRemainder(this.nbLines, this.nbLinesMin);
                modColumn = Maths_moduloGetQuotientAndRemainder(this.nbColumns, this.nbColumnsMin);
            }

            // At this point, the previewMatrix must be proportional
            // It's proportional and one of the proportion is greater than 1
            if( (modLine.remainder == 0 && modColumn.remainder == 0)
                && (modLine.quotient > 1 || modColumn.quotient > 1) )
            {
                this.values = this.reduceMatrixProportionnaly(modLine.quotient, modColumn.quotient);
                this.updateDimension();
            }
        }
    };

    /**
     * Change previewMatrix dimension so we obtain a proportional one to 5x3
     * @param modLine
     * @param modColumn
     */
    this.prepareMatrixToReduce = function(modLine, modColumn)
    {
        this.prepareColumnsMatrixToReduce(modColumn);
        this.prepareLinesMatrixToReduce(modLine);
    };

    /**
     * Change column dimension to be proportional to 3
     * Add a line to the left and if needed to the right
     * @param modColumn
     */
    this.prepareColumnsMatrixToReduce = function(modColumn)
    {
        if(modColumn.remainder > 0)
        {
            this.addColumn(true);

            if(modColumn.remainder == 1)
            {
                this.addColumn(false);
            }
        }
    };

    /**
     * Change line dimension to be proportional to 5
     * - modulo 1 : erase the line with the weakest value
     * - modulo 2 : erase 2 lines with the weakest value
     * - modulo 3 : add 1 line at the bottom and the top
     * - modulo 4 : add 1 line at the bottom
     * @param modLine
     */
    this.prepareLinesMatrixToReduce = function(modLine)
    {
        if(modLine.remainder > 0)
        {
            if(modLine.remainder <= 2)
            {
                // Remainder == 1 OR 2
                for(var iEraseLine = 0; iEraseLine < modLine.remainder; iEraseLine++)
                {
                    var iWeakestLine = this.findWeakestLine();
                    this.eraseLine(iWeakestLine);
                }
            }
            else
            {
                // Remainder == 3 OR 4
                this.addLine(false);

                if(modLine.remainder == 3)
                    this.addLine(true);
            }
        }
    };

    /*
     Si égalité choisir le plus loin de la valeur du milieu
     car si extrémité n'a pas le plus de poids alors c'est un segment qui peut être rétréci
     SI c'ets nbLigne est pair lors prednre le milieu suppérieur, alongement plus propice à être à la fin/en bas qu'en haut
     */
    /**
     * Find the weakest line index
     * Weakest line = line with the least sum of 1
     * Predicate : digit number 's main axe tends to be on the right so the farthest will be on the left if odd number
     * -> Middle 's line index : nbLines / 2 and if it's a odd number then we take the superior
     * Predicate : an extremity has more chance to be an elongation
     * -> If sums are equal, we take the farthest of the middle 's line
     * @returns {*|number}
     */
    this.findWeakestLine = function()
    {
        var middleRef = this.nbLines % 2;
        var sumLine = 0;
        var initValue = this.nbLines * this.nbColumns; // init : to be sure to have a weaker value
        var weakestLine = {
            sum : initValue,
            iLine : middleRef
        };
        var weakerLine = false;

        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            sumLine = 0;
            weakerLine = false;

            for(var iColumn = 0; iColumn < this.nbColumns; iColumn++)
            {
                if(this.values[iLine][iColumn] == 1)
                    sumLine++
            }

            if(sumLine == weakestLine.sum)
            {
                if( Math.abs(middleRef - iLine) > Math.abs(middleRef - weakestLine.iLine) )
                    weakerLine = true;
            }
            else if(sumLine < weakestLine.sum)
            {
                weakerLine = true;
            }

            if(weakerLine)
            {
                weakestLine.sum = sumLine;
                weakestLine.iLine = iLine;
            }
        }

        return weakerLine.iLine;
    };

    /**
     * Reduce a greater previewMatrix to a 5x3
     * Used only if number of lines and number of columns are proportional and greater of course
     * @param lineProportion
     * @param columnProportion
     * @returns {Array}
     */
    this.reduceMatrixProportionnaly = function(lineProportion, columnProportion)
    {
        var reducedMatrix = [];
        var threshold = ((lineProportion * columnProportion) / 2 >> 0);

        var rankLine = 0;
        var rankColumn = 0;
        var sum = 0;

        for(var iLineProportion = 0; iLineProportion < this.nbLines; iLineProportion+=lineProportion)
        {
            reducedMatrix[rankLine] = [];

            for(var iColumnProportion = 0; iColumnProportion < this.nbColumns; iColumnProportion+=columnProportion)
            {
                sum = 0;

                for(var iLine = 0; iLine < lineProportion; iLine++)
                {
                    for(var iColumn = 0; iColumn < columnProportion; iColumn++)
                    {
                        sum += this.values[iLineProportion + iLine][iColumnProportion + iColumn];
                    }
                }

                if(sum >= threshold)
                    reducedMatrix[rankLine][rankColumn] = 1;
                else
                    reducedMatrix[rankLine][rankColumn] = 0;

                rankColumn++;
            }

            rankLine++;
            rankColumn = 0;
        }

        return reducedMatrix;
    };

    /**================================== CROP ==================================*/

    /**
     * Equivalent of "Crop to selection"
     * Crop the previewMatrix to keep the smallest possible.
     * Delete blank spaces
     */
    this.crop = function()
    {
        var frameToCrop = this.getFrameToCrop();

        // Crop to selection
        var iLineNew = 0;
        var iColumnNew = 0;
        var matrixCrop = [];

        for(var iLineOrigin = frameToCrop.yMin; iLineOrigin <= frameToCrop.yMax; iLineOrigin++)
        {
            matrixCrop[iLineNew] = [];
            iColumnNew = 0;
            for(var iColumnOrigin = frameToCrop.xMin; iColumnOrigin <= frameToCrop.xMax; iColumnOrigin++)
            {
                matrixCrop[iLineNew][iColumnNew] = this.values[iLineOrigin][iColumnOrigin];
                iColumnNew++;
            }
            iLineNew++;
        }

        this.values = matrixCrop;
        this.updateDimension();
    };

    /**
     * Delimit the frame/selection to crop
     */
    this.getFrameToCrop = function()
    {
        var frame = {
            xMin : this.nbColumns,
            yMin : this.nbLines,
            xMax : 0,
            yMax : 0
        };

        for(var iLine = 0; iLine < this.nbLines; iLine++)
        {
            for(var iColumn = 0; iColumn < this.nbColumns; iColumn++)
            {
                if(this.values[iLine][iColumn] == 1)
                {
                    if(iLine < frame.yMin)
                        frame.yMin = iLine;
                    if(iLine > frame.yMax)
                        frame.yMax = iLine;

                    if(iColumn < frame.xMin)
                        frame.xMin = iColumn;
                    if(iColumn > frame.xMax)
                        frame.xMax = iColumn;
                }
            }
        }

        return frame;
    };

    /**================================== THINNING ==================================*/

    /**
     * Make the previewMatrix thinner to avoid consecutive full line/column redundancy
     * and to get near the final previewMatrix 5x3 dimensions
     */
    this.thinning = function()
    {
        if(this.nbColumns > this.nbColumnsMin)
            this.thinningVertically();

        if(this.nbLines > this.nbLinesMin)
            this.thinningHorizontally();
    };

    /**
     * Erase redundant line filled with only true value
     */
    this.thinningVertically = function()
    {
        var iLineToErase = 1;
        var isLineErased = false;

        do
        {
            if(this.isMatrix1NFullTrue(this.values[iLineToErase]))
            {
                if(this.compare2Matrix1N(this.values[iLineToErase-1], this.values[iLineToErase]))
                {
                    isLineErased = true;
                    this.eraseLine(iLineToErase);
                    this.thinningVertically();
                }
                else
                {
                    iLineToErase++;
                }
            }
            else
            {
                iLineToErase++;
            }
        }while(isLineErased == false && iLineToErase < this.nbLines);
    };

    /**
     * Erase redundant columns filled with only true value
     */
    this.thinningHorizontally = function()
    {
        var iColumnToErase = 1;
        var columnToTest = [];
        var previousColumn = this.getColumn(0);
        var isColumnErased = false;

        do
        {
            columnToTest = this.getColumn(iColumnToErase);

            if(this.isMatrix1NFullTrue(columnToTest))
            {
                if(this.compare2Matrix1N(previousColumn, columnToTest))
                {
                    isColumnErased = true;
                    this.eraseColumn(iColumnToErase);
                    this.thinningHorizontally();
                }
                else
                {
                    previousColumn = columnToTest;
                    iColumnToErase++;
                }
            }
            else
            {
                previousColumn = columnToTest;
                iColumnToErase++;
            }
        }while(isColumnErased == false && iColumnToErase < this.nbColumns);
    };


    /**================================== SHAVE ==================================*/

    /**
     * Shave the previewMatrix to avoid consecutive motif redundancy
     * and to get the final 5x3 dimensions
     */
    this.shave = function()
    {
        this.shaveHorizontally();
        this.shaveVertically();
    };

    /**
     * Erase vertical redundant motif
     */
    this.shaveHorizontally = function()
    {
        if(this.nbLines > this.nbLinesMin)
        {
            var iLineToErase = 1;
            var isLineErased = false;
            var previousMotif = this.values[0];

            do
            {
                isLineErased = this.compare2Matrix1N(this.values[iLineToErase], previousMotif);

                if(isLineErased)
                {
                    isLineErased = true;
                    this.eraseLine(iLineToErase);
                    this.shaveHorizontally();
                }
                else
                {
                    previousMotif = this.values[iLineToErase];
                    iLineToErase++;
                }
            }while(isLineErased == false && iLineToErase < this.nbLines);
        }
    };

    /**
     * Erase horizontal redundant motif
     */
    this.shaveVertically = function()
    {
        if(this.nbColumns > this.nbColumnsMin)
        {
            var iColumnToErase = 1;
            var columnToTest = [];
            var previousColumn = this.getColumn(0);
            var isColumnErased = false;

            do
            {
                columnToTest = this.getColumn(iColumnToErase);

                if (this.compare2Matrix1N(previousColumn, columnToTest))
                {
                    isColumnErased = true;
                    this.eraseColumn(iColumnToErase);
                    this.shaveVertically();
                }
                else {
                    previousColumn = columnToTest;
                    iColumnToErase++;
                }
            } while (isColumnErased == false && iColumnToErase < this.nbColumns);
        }
    };

}