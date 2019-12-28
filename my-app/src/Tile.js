import React from 'react'

export default class Tile extends React.Component {
    render() {
        return (
            <div id={this.props.id} key={this.props.id} className="Tile" style={{backgroundColor: this.props.bgcolor, color: this.props.numcolor, position: "absolute", left: this.props.left + "px", top: this.props.top + "px" }}>{this.props.num}</div>
        )
    }
}