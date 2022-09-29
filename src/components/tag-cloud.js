import React, { useEffect } from 'react'
import SpeakerTag from './speaker-tag'

export default function TagCloud(props) {
    
    const tagArray = props.tagData

    useEffect(()=> console.log('TAGCLOUD: ', tagArray))

    const castSpeaker = props.tagData.map( speakerData => {
        return (
            <SpeakerTag speakerData={speakerData}></SpeakerTag>
        )
    } )

    return (
        <div> 
            { props.tagType === 'speaker' && 
                castSpeaker 
            }
        </div>
    )
    
}
