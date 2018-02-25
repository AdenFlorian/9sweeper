import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MousePosition} from './MousePosition'
import './index.sass'

const movable = document.querySelector('#movable')

const mousePosition = new MousePosition()

document.addEventListener('mousemove', handleMouseMove)

function handleMouseMove(event: MouseEvent) {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
}

const desiredFPS = 144
const millisecondsInASecond = 1000

setInterval(moveMoveable, millisecondsInASecond / desiredFPS)

function moveMoveable() {
    movable.setAttribute('style', `top: ${mousePosition.y}px; left: ${mousePosition.x}px;`)
}

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
