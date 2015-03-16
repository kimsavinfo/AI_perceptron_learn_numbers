// Grid property
var USER_GRID_WIDTH = 300;
var USER_GRID_HEIGHT = 500;
var USER_PIXEL_SIZE = 50;
var userCanvas;
var userPixels = [];

var mousePressed = false;
var mousePixelIndex = -1;

initUserCanvas();

function initUserCanvas()
{
    userCanvas = document.getElementById("userCanvas");

    resetUserCanvas();

    userCanvas.addEventListener("click", function(e)
    {
        var mousePoint = mouseUserCanvasPosition(e);
        togglePixelAtPoint(mousePoint);
        drawUserPixels();
    });

    userCanvas.addEventListener("mousedown", function(e)
    {
        mousePressed = true;
    }, false);
    userCanvas.addEventListener("mouseup", function(e)
    {
        mousePressed = false;
    }, false);

    userCanvas.addEventListener("mousemove", function(e)
    {
        if(mousePressed)
        {
            var mousePoint = mouseUserCanvasPosition(e);
            var pixelIndex = pixelIndexAtPoint(e);

            if(pixelIndex != mousePixelIndex)
            {
                setPixelValueAtPoint(mousePoint, true);
                drawUserPixels();
                mousePixelIndex = pixelIndex;
            }
        }
    })
}

function getPixelSize()
{
    USER_PIXEL_SIZE = $("#pixelSize").val();
}

function mouseUserCanvasPosition(e) {
    var rect = userCanvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function pixelIndexAtPoint(point) {
    var pixelIndex = -1;
    var x = Math.floor(point.clientX/USER_PIXEL_SIZE);
    var y = Math.floor(point.clientY/USER_PIXEL_SIZE);
    if(x < USER_GRID_WIDTH && y < USER_GRID_HEIGHT) {
        pixelIndex = y * USER_GRID_WIDTH + x;
    }
    return pixelIndex;
}

function togglePixelAtPoint(point) {
    var x = Math.floor(point.x/USER_PIXEL_SIZE);
    var y = Math.floor(point.y/USER_PIXEL_SIZE);
    if(x < USER_GRID_WIDTH && y < USER_GRID_HEIGHT) {
        userPixels[y][x] = !userPixels[y][x];
    }
}

function setPixelValueAtPoint(point, value) {
    var x = Math.floor(point.x/USER_PIXEL_SIZE);
    var y = Math.floor(point.y/USER_PIXEL_SIZE);
    if(x < USER_GRID_WIDTH && y < USER_GRID_HEIGHT) {
        userPixels[y][x] = value;
    }
}

function resetUserCanvas() {
    getPixelSize();
    USER_GRID_WIDTH = Math.floor(userCanvas.width/USER_PIXEL_SIZE);
    USER_GRID_HEIGHT = Math.floor(userCanvas.height/USER_PIXEL_SIZE);

    resetUserPixels();
    drawUserPixels();
}

function resetUserPixels()
{
    for(var y = 0; y < USER_GRID_HEIGHT; y++)
    {
        userPixels[y] = [];
        for(var x = 0; x < USER_GRID_WIDTH; x++)
        {
            userPixels[y][x] = false;
        }
    }
}

function drawUserPixels() {
    var context = userCanvas.getContext("2d");
    context.clearRect(0, 0, userCanvas.width, userCanvas.height);

    for(var y = 0; y < USER_GRID_HEIGHT; y++) {
        for(var x = 0; x < USER_GRID_WIDTH; x++) {
            context.beginPath();
            context.rect(x*USER_PIXEL_SIZE, y*USER_PIXEL_SIZE, USER_PIXEL_SIZE, USER_PIXEL_SIZE);
            context.fillStyle = userPixels[y][x] ? '#2D2' : '#555';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#000';
            context.stroke();
        }
    }
}