import React, { useState, useEffect } from 'react'

export default function SpeakerTag(props) {
    useEffect(()=> console.log('speakertag: ', props))
    return (
        <div class="speaker-tag" >
            <h5>SpeakerTag</h5>
        </div>
    )
    
}
