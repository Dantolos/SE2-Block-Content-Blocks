import React, { Component, useState } from 'react'
import apiFetch from '@wordpress/api-fetch';


export default class SessionCard extends Component {
    constructor(props){
        super(props)
        this.state ={ sessiondata : this.props.sessiondata}
    }

    componentDidUpdate(prevProps){
        if( this.props.sessiondata != prevProps.sessiondata ){
            this.setState({ sessiondata : this.props.sessiondata }) 
        }
    }

    sessionContent(){
        var fullText = this.state.sessiondata.acf.session_text
        var shortText = fullText.substring(0, 250).concat('...')
        return shortText;
    }

    render(){
        return (
            <div class="session-card">
                { this.state.sessiondata &&
                    <div>
                        <div class="session-keyvisual" style={{backgroundImage: `url( ${this.state.sessiondata.acf.session_bild} )`}}></div>
                        <h3>{this.state.sessiondata.acf.titel}</h3>
                        <p>{ this.sessionContent() }</p>
                    </div>
                }
            </div>
        )
    }
}