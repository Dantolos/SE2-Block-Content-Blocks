import React, { Component, useState } from 'react'
import apiFetch from '@wordpress/api-fetch';

const { __ } = wp.i18n;

export default class EventCard extends Component {
    constructor(props) {
        super(props)
        this.state = { eventdata: this.props.eventdata }
    }

    componentDidUpdate(prevProps) {
        if (this.props.eventdata != prevProps.eventdata) {
            this.setState({ eventdata: this.props.eventdata })
        }
    }

    eventContent() {
        var fullText = this.state.eventdata.acf.content.replace(/(<([^>]+)>)/ig, '')
        var shortText = fullText.substring(0, 250).concat('...')
        return shortText;
    }

    render() {
        return (
            <div class="event-card">
                {this.state.eventdata &&
                    <div class="event-card-fragment">
                        {this.state.eventdata.acf.keyvisual &&
                            <div class="event-keyvisual" style={{ backgroundImage: `url( ${this.state.eventdata.acf.keyvisual} )` }}></div>
                        }
                        <h3>{this.state.eventdata.acf.titel}</h3>
                        <p>{this.eventContent()}</p>
                        <div class="event-card-buttons">
                            <div class="se2-btn-m event-card-button-more" postid={this.state.eventdata.id} lb="event_lightbox">{__('mehr', 'SimplEvent')}</div>
                            <a class="se2-btn-m event-card-button-events">{__('alle Events', 'SimplEvent')}</a>
                        </div>

                    </div>
                }
            </div>
        )
    }
}