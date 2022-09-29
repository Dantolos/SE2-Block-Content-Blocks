import React, { useState, useEffect } from 'react'
import { useSessionGeneral, useSessionGeneralUpdate } from './session-general-context';


const {
    PanelBody,
    FormToggle
} = wp.components;
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';


//const sessionGeneral = useSessionGeneral()
export default function SessionGeneralSettings() {

    const generalUpdate = useSessionGeneralUpdate()
    const sessionGeneral = useSessionGeneral()

    const [ general, setGeneral ] = useState({ sessionGeneral });

    useEffect( () => { 
        console.log('UPDATE SETTINGS: ', general)
    }, [general]);

    return (
        
        <fragment>
            {/* View */}
            <PanelBody title={'View'} initialOpen={true} >
                <div class="se2-checkbox-list">
                    <label style={{margin: '4px 0'}}><i>Show/Hide content elements</i></label>

                    {/* IMAGE */}
                    <div class="se2-checkbox-list-element">
                        <FormToggle
                            checked={ sessionGeneral.general.views.headerImage }
                            onChange={ (value) => { generalUpdate( 'views', 'headerImage', value.target.checked )  }}
                        />
                        <label>Header Image</label>
                    </div>

                    {/* DESCRIPTION */}
                    <div class="se2-checkbox-list-element">
                        <FormToggle
                            checked={ sessionGeneral.general.views.description }
                            onChange={ (value) => { generalUpdate( 'views', 'description', value.target.checked )  }}
                        />
                        <label>Description</label>
                    </div>
                </div>

            </PanelBody>
        </fragment>
    
    )
}
