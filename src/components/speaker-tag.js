import React, { useState, useEffect } from 'react'

export default function SpeakerTag(props) {
    

    const [ speaker, setSpeaker ] = useState({ raw: true,data: props.speakerData });
    //useEffect(()=> console.log('speakertag: ', speaker.data.speaker))
    //spekaer fetching

    
    /* if(speaker.raw && props.speakerData.type === 'Speaker' ) {
        const apiURL = 'http://simplevent-v2.local//wp-json/wp/v2/speakers/'+speaker.data.speaker
        fetch(apiURL)
            .then((res) => res.json())
            .then((json) => {
                setSpeaker({ raw: false, data: json }) 
            })
        
        console.log(speaker)
    }

    //fetching fallbacks
    if (!speaker) {
        return message('LOADING');
        
    }
    if (speaker && speaker === 0) {
        return 'No Session found!';
    }  
 */

    return (
        <div class="speaker-tag" >
            <h5>SpeakerTag</h5>
        </div>
    )
    
}
