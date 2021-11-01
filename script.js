const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const header = document.querySelector('header');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

let numSquares = 6;
let colors = [];
let pickedColor;

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this === modeButtons[0] ? (numSquares = 3) : (numSquares = 6);

            // if (modeButtons[0]) {
            //     numSquares = 3;
            // } else {
            //     numSquares = 6;
            // }
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add click listener to squares
        squares[i].addEventListener('click', function () {
            // grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            // compare clicked color with picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct!';
                changeColor(clickedColor);
                header.style.backgroundColor = clickedColor;
                resetButton.textContent = 'Play Again?';
            } else {
                messageDisplay.textContent = 'Try Again';
                this.style.backgroundColor = '#272727';
            }
        });
    }
}

resetButton.addEventListener('click', function () {
    reset();
});

function reset() {
    // generate new colors
    colors = generateRandomColors(numSquares);
    // pick new pickedColor
    pickedColor = pickColor();
    // change colorDisplay to new pickedColor
    colorDisplay.textContent = pickedColor;
    // change squares to new colors
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].classList.remove('hide');
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].classList.add('hide');
        }
    }
    // change message display to empty
    messageDisplay.textContent = '';
    // change header background
    header.style.backgroundColor = 'steelblue';
    // change Play Again? to New Colors
    resetButton.textContent = 'New Colors';
}

function changeColor(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    // pick random number to access colors array
    let num = Math.floor(Math.random() * colors.length);
    return colors[num];
}

function generateRandomColors(num) {
    // create a empty array
    let arr = [];
    // create and push num number of colors to array
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    // return arr
    return arr;
}

function randomColor() {
    // generate random number from 0 - 255
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    // return rgb(r, g, b)
    return `rgb(${r}, ${g}, ${b})`;
}
