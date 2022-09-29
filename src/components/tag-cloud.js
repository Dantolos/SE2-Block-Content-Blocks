import React, { useEffect } from 'react'
import SpeakerTag from './speaker-tag'

export default function TagCloud(props) {
    
    const tagArray = props.tagData

    useEffect(()=> console.log('TAGCLOUD: ', props))

    return (
        <div>
        { props.tagType === 'speaker' &&
            tagArray.map(speakerData => {
                <SpeakerTag speakerData={speakerData} />
            })
        }
        </div>
    )
    
}
