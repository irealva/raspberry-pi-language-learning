import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.show) {
            return null;
        }

        return ( 
            <div className="Modal" >
                {this.props.word}, {this.props.category}
                <br />
                {this.props.definition}                
            </div>
        );
    }
}

export default Modal;