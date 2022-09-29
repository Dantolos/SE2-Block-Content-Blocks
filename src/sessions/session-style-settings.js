import React, { useState, useEffect } from 'react'
import { useSessionStyle, useSessionStyleUpdate } from './session-style-context';


const {
    PanelBody,
    FontSizePicker
} = wp.components;
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';


//const sessionStyle = useSessionStyle()
export default function SessionStyleSettings() {

    const styleUpdate = useSessionStyleUpdate()
    const sessionStyle = useSessionStyle()

    const [ style, setStyle ] = useState({ sessionStyle });

    useEffect( () => { 
        console.log('UPDATE SETTINGS: ', style)
    }, [style]);

    return (
        
        <fragment>
            {/* IMAGE */}
            <PanelBody title={'Image'} initialOpen={false} >
                <UnitControl 
                    label= 'Image Height'
                    value={ sessionStyle.style.image.height }
                    onChange={ value => ( styleUpdate('image', 'height', value), setStyle({ sessionStyle } )  ) } 
                    style={{width: '25%'}}
                    labelPosition= 'top'
                />  
                <BoxControl 
                    label="Border Radius" 
                    values={ sessionStyle.style.image.borderRadius } 
                    onChange={ (value) => { styleUpdate( 'image', 'borderRadius', value )  }}
                    style={{ width: '48%', float: 'left', margin: '10px 1%' }} 
                />
            </PanelBody>

            {/* CONTENT */}
            <PanelBody title={'Content'} initialOpen={false} > 
                <BoxControl 
                    label="Padding" 
                    values={ sessionStyle.style.content.padding } 
                    onChange={ (value) => { styleUpdate( 'content', 'padding', value )  }}
                    style={{ width: '48%', float: 'left', margin: '10px 1%' }} 
                />

                <FontSizePicker
                    fontSizes={[
                        {
                            name: 'Small',
                            slug: 'small',
                            size: 12,
                        },
                        {
                            name: 'Big',
                            slug: 'big',
                            size: 26,
                        },
                    ]}
                    value={ sessionStyle.style.title.fontSize }
                    fallbackFontSize={ 26 }
                    onChange={ (value) => { styleUpdate( 'title', 'fontSize', value )  }}
                    withSlider
                /> 
            </PanelBody>

        </fragment>
    
    )
}
