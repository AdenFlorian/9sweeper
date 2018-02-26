import * as React from 'react'

class Square extends React.Component<{index: number}, {on}> {
    state = {on: false}

    render() {
        return (
            <td
                key={this.props.index}
                className="square"
                onClick={() => this.setState({on: !this.state.on})}
                style={{backgroundColor: this.state.on ? 'green' : 'blue'}}
            />
        )
    }
}

const Row = (props) =>
    <tr>
        {Array.from(Array(props.width)).map((x, index) => <Square key={index} index={index} />)}
    </tr>

class Board extends React.Component<{size: number}, {}> {
    render() {
        const {size} = this.props

        return Array.from(Array(size)).map((x, index) => <Row key={index} width={size} />)
    }
}

export class App extends React.Component {
    state = {
        mouse: {
            x: 0,
            y: 0
        },
        movable: {
            x: 100,
            y: 100
        },
        isMouseDown: false
    }

    constructor(props) {
        super(props)
    }

    handleMouseMove = (event) => {
        if (this.state.isMouseDown) {
            this.setState({
                movable: {
                    x: this.state.movable.x + event.clientX - this.state.mouse.x,
                    y: this.state.movable.y + event.clientY - this.state.mouse.y
                }
            })
        }
        this.setState({mouse: {x: event.clientX, y: event.clientY}})
    }

    render() {
        const {movable: {x, y}, mouse, isMouseDown} = this.state;

        return (
            <div>
                <p>Hello world?</p>
                <div
                    className="unselectable"
                    style={{height: '100%'}}
                    onMouseMove={this.handleMouseMove}
                >
                    <div
                        onMouseDown={() => this.setState({isMouseDown: true})}
                        onMouseUp={() => this.setState({isMouseDown: false})}
                        id="movable"
                        style={{left: x + 'px', top: y + 'px'}}
                    >
                        <table>
                            <tbody>
                                <Board size={10} />
                            </tbody>
                        </table>
                    </div>
                    <p>movable ({x}, {y})</p>
                    <p>mouse ({mouse.x}, {mouse.y})</p>
                    <p>mouseDown ({isMouseDown.toString()})</p>
                </div>
            </div>
        )
    }
}
