import * as React from 'react'

class Square extends React.PureComponent<{index: number}, {on}> {
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

class Board extends React.PureComponent<{size: number}, {}> {
    render() {
        const {size} = this.props

        return Array.from(Array(size)).map((x, index) => <Row key={index} width={size} />)
    }
}

const Debug = ({movableX, movableY, mouseX, mouseY, isMouseDown}) =>
    <div
        className="unselectable"
    >
        <p>movable ({movableX}, {movableY})</p>
        <p>mouse ({mouseX}, {mouseY})</p>
        <p>mouseDown ({isMouseDown.toString()})</p>
    </div>


export class App extends React.PureComponent {
    state = {
        mouseX: 0,
        mouseY: 0,
        movableX: 100,
        movableY: 100,
        isMouseDown: false
    }

    constructor(props) {
        super(props)
    }

    handleMouseMove = (event) => {
        if (this.state.isMouseDown) {
            this.setState({
                movableX: this.state.movableX + event.clientX - this.state.mouseX,
                movableY: this.state.movableY + event.clientY - this.state.mouseY
            })
        }
        this.setState({mouseX: event.clientX, mouseY: event.clientY})
    }

    render() {
        const {movableX, movableY, mouseX, mouseY, isMouseDown} = this.state;

        return (
            <div>
                <p>Hello world?</p>
                <Debug {...this.state} />
                <div
                    style={{height: '100%'}}
                    onMouseMove={this.handleMouseMove}
                >
                    <div
                        onMouseDown={() => this.setState({isMouseDown: true})}
                        onMouseUp={() => this.setState({isMouseDown: false})}
                        id="movable"
                        style={{left: movableX + 'px', top: movableY + 'px'}}
                    >
                        <table>
                            <tbody>
                                <Board size={10} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
