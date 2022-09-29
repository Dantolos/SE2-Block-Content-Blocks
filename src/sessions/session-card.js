import React, { useState, useEffect } from 'react'
import { useSessionStyle } from './session-style-context';
import { useSessionGeneral } from './session-general-context';

import  TagCloud from '../components/tag-cloud';

export default function SessionCard(props) {

    const sessionStyle = useSessionStyle()
    const [ style, setStyle ] = useState({ sessionStyle });

    const sessionGeneral = useSessionGeneral();
    const [ general, setGeneral ] = useState({ sessionGeneral });


    useEffect( () => {
        console.log('CARD UPDATE: , ', sessionStyle)
        console.log(props.sessiondata)
    } );
    

    return (
        <div class="session-card">
        { props.sessiondata &&
            <div>

                {/* SESSION IMAGE */}
                { sessionGeneral.general.views.headerImage && 
                    <div 
                        class="session-keyvisual" 
                        style={{
                            backgroundImage: `url( ${props.sessiondata.acf.session_bild} )`, 
                            height:  sessionStyle.style.image.height,
                            borderRadius:  sessionStyle.style.image.borderRadius.top +' '+ sessionStyle.style.image.borderRadius.right +' '+ sessionStyle.style.image.borderRadius.bottom +' '+ sessionStyle.style.image.borderRadius.left,
                        
                        }}>
                    </div>
                } 

                {/* SESSION CONTENT */}
                <div 
                    class="session-content"
                    style={{
                        padding: sessionStyle.style.content.padding.top +' '+ sessionStyle.style.content.padding.right +' '+ sessionStyle.style.content.padding.bottom +' '+ sessionStyle.style.content.padding.left
                    }}
                    >
                    <h3 style={{fontSize: sessionStyle.style.title.fontSize }}>
                        { props.sessiondata.acf.titel }
                    </h3>

                    { sessionGeneral.general.views.description &&
                        <p>{ sessionContent( props.sessiondata.acf.session_text ) }</p>
                    }

                 
                        <TagCloud tagType="speaker" tagData={ props.sessiondata.acf.referenten } />                        
                    

                </div>
                
            </div> 
        }
        </div>
    );    
}


function sessionContent(fullText){
    var shortText = fullText.substring(0, 250).concat('...')
    return shortText;
}

