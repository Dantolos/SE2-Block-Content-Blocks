import React, { Component, useState } from 'react'
import apiFetch from '@wordpress/api-fetch';


export default class EventCard extends Component {
    constructor(props){
        super(props)
        this.state ={ eventdata : this.props.eventdata}
    }

    componentDidUpdate(prevProps){
        if( this.props.eventdata != prevProps.eventdata ){
            this.setState({ eventdata : this.props.eventdata }) 
        }
    }

    eventContent(){
        var fullText = this.state.eventdata.acf.content
        var shortText = fullText.substring(0, 250).concat('...')
        return shortText;
    }

    render(){
        return (
            <div class="event-card">
                { this.state.eventdata &&
                    <div>
                        <div class="event-keyvisual" style={{backgroundImage: `url( ${this.state.eventdata.acf.keyvisual} )`}}></div>
                        <h3>{this.state.eventdata.acf.titel}</h3>
                        <p>{ this.eventContent() }</p>
                    </div>
                }
            </div>
        )
    }
}