// Grid property
var PREVIEW_PIXEL_SIZE = 50;
var PREVIEW_GRID_WIDTH = 0;
var PREVIEW_GRID_HEIGHT = 0;
var previewCanvas;

var previewMatrix = new Matrix(5, 3);

initPreviewCanvas();

function initPreviewCanvas()
{
    previewCanvas = document.getElementById("previewCanvas");
    PREVIEW_GRID_WIDTH = Math.floor(previewCanvas.width/PREVIEW_PIXEL_SIZE);
    PREVIEW_GRID_HEIGHT = Math.floor(previewCanvas.height/PREVIEW_PIXEL_SIZE);

    drawPreviewMatrix();
}

function drawPreviewMatrix()
{
    var context = previewCanvas.getContext("2d");
    context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    for(var y = 0; y < PREVIEW_GRID_HEIGHT; y++)
    {
        for(var x = 0; x < PREVIEW_GRID_WIDTH; x++)
        {
            context.beginPath();
            context.rect(x*PREVIEW_PIXEL_SIZE, y*PREVIEW_PIXEL_SIZE, PREVIEW_PIXEL_SIZE, PREVIEW_PIXEL_SIZE);
            context.fillStyle = previewMatrix.values[y][x] ? '#2D2' : '#555';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#000';
            context.stroke();
        }
    }
}

function clearPreviewCanvas()
{
    previewMatrix.clear();
    drawPreviewMatrix();
}

function getPreviewMatrix1N()
{
    var matrix1N = [];

    for(var y = 0; y < PREVIEW_GRID_HEIGHT; y++)
    {
        for(var x = 0; x < PREVIEW_GRID_WIDTH; x++)
        {
            matrix1N.push(previewMatrix.values[y][x]);
        }
    }

    return matrix1N;
}