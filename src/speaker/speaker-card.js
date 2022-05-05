import React, { Component, useState } from 'react'


export default class SpeakerCard extends Component {
    constructor(props) {
        super(props);
        this.state = { speakerdata : this.props.speakerdata }
    }

    componentDidUpdate(prevProps){
        if( this.props.speakerdata != prevProps.speakerdata ){
            this.setState({ speakerdata : this.props.speakerdata }) 
        }
        
    }

    speakerName(){
        var speakerName = `${this.state.speakerdata.acf.speaker_vorname} ${this.state.speakerdata.acf.speaker_nachname}`
        if( this.state.speakerdata.acf.speaker_degree ){
            speakerName = `${this.state.speakerdata.acf.speaker_degree} ${speakerName}`
        }
        return speakerName;
    }
    speakerBezeichnung(){
        var speakerBezeichnung =  `${this.state.speakerdata.acf.speaker_firma}`
        if( this.state.speakerdata.acf.speaker_funktion ){
            speakerBezeichnung = `${this.state.speakerdata.acf.speaker_funktion}, ${speakerBezeichnung}`
        }
        return speakerBezeichnung;
    }

    render() {

        return (
            <div class="speaker-card">
            {this.state.speakerdata  &&    
                    <div>   
                    <div class="speaker-image" style={{ backgroundImage: `url( ${this.state.speakerdata.acf.speaker_bild} )` }}></div>
                    <h4>{this.speakerName()}</h4> 
                    <h6>{this.speakerBezeichnung()}</h6>  
                        
                    </div>  
            }
            </div>
           
        )
    }
}



