import React from 'react'

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id={this.props.id} className="Tile" style={{backgroundColor: this.props.bgcolor, color: this.props.numcolor}}>{this.props.num}</div>
        )
    }
}