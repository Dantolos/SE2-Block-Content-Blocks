import React, { Component, useState } from 'react'
import apiFetch from '@wordpress/api-fetch';


export default class SessionCard extends Component {
    constructor(props){
        super(props)
        this.state = { 
            sessiondata : this.props.sessiondata, 
            appaereancestyle : this.props.appaereancestyle 
        } 
    }

    componentDidUpdate(prevProps){
        if( this.props.sessiondata != prevProps.sessiondata || this.props.appaereancestyle != prevProps.appaereancestyle ){
            this.setState({ 
                sessiondata : this.props.sessiondata,
                appaereancestyle : this.props.appaereancestyle
            }) 
            
        }
        
    }

    sessionContent(){
        var fullText = this.state.sessiondata.acf.session_text
        var shortText = fullText.substring(0, 250).concat('...')
        return shortText;
    }

    render(){
        console.log(this.props.appaereancestyle)
        return (
            <div class="session-card">
                { this.state.sessiondata &&
                    <div>
        
                        {/* SESSION IMAGE */}
                        <div 
                            class="session-keyvisual" 
                            style={{
                                backgroundImage: `url( ${this.state.sessiondata.acf.session_bild} )`, 
                                height:   this.state.appaereancestyle.image.height,
                                borderRadius:  this.state.appaereancestyle.image.borderRadius.top +' '+ this.state.appaereancestyle.image.borderRadius.right +' '+ this.state.appaereancestyle.image.borderRadius.bottom +' '+ this.state.appaereancestyle.image.borderRadius.left,
                             
                            }}>
                        </div>
                        <div 
                            class="session-content"
                            style={{
                                padding: this.state.appaereancestyle.content.padding.top +' '+ this.state.appaereancestyle.content.padding.right +' '+ this.state.appaereancestyle.content.padding.bottom +' '+ this.state.appaereancestyle.content.padding.left
                            }}
                            >
                            <h3 style={{fontSize: this.state.appaereancestyle.title.fontSize }}>
                                { this.state.sessiondata.acf.titel }
                            </h3>
                            <p>{ this.sessionContent() }</p>
                        </div>
                        
                    </div> 
                }
            </div>
        )
    }
}