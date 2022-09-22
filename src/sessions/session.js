/**
 * BLOCK: se2-content-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    RichText,
    InspectorControls,
    ColorPalette
    
} = wp.blockEditor;
const {
    PanelBody,
    TabPanel,
    ColorPicker,
    SelectControl,
    Button,
    RangeControl,
    GradientPicker,
    Spinner,
    FontSizePicker
} = wp.components;


import SessionCard from './session-card';

import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';


registerBlockType('se2/block-session', {
	title: __('Session (dyn)'), 
	icon: {
		background: 'rgba(0, 0, 0, 0)',
		foreground: '#00f692',
		src: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080 1080">
			<path d="M417.7,674.9H228.8c-102,0-185,79.8-185,177.9V1032h90V852.8c0-48.5,42.6-87.9,95-87.9h188.9c52.4,0,95,39.4,95,87.9V1032 h90V852.8C602.8,754.7,519.7,674.9,417.7,674.9z"/>
			<path d="M323.2,646.3c100,0,181.4-81.4,181.4-181.4s-81.4-181.4-181.4-181.4s-181.4,81.4-181.4,181.4S223.2,646.3,323.2,646.3z M323.2,373.5c50.4,0,91.4,41,91.4,91.4s-41,91.4-91.4,91.4s-91.4-41-91.4-91.4S272.9,373.5,323.2,373.5z"/>
			<path d="M883.5,83.9H348c-81.7,0-148.2,66.5-148.2,148.2h90c0-32.1,26.1-58.2,58.2-58.2h535.5c32.1,0,58.2,26.1,58.2,58.2v409.5 c0,32.1-26.1,58.2-58.2,58.2H661v90h222.5c81.7,0,148.2-66.5,148.2-148.2V232.1C1031.8,150.4,965.3,83.9,883.5,83.9z"/>
		</svg>,
	},
	category: 'se2', 
	keywords: [ 'se2', 'session', 'labs'	],
	attributes: {
		sessions: {
			type: 'object',
		},
		selectedSession: {
			type: 'string'
		},
		sessionDataTrans: {
			type: 'object'
		},
        sessionStyle: {
            type: 'object'
        }
	},

	edit: (props) => {
		
        let sessionStyle = props.attributes.sessionStyle ? props.attributes.sessionStyle 
                            : {
                                image: {
                                    height: '50px',
                                    borderRadius: { top: 0, right: 0, bottom: 0, left: 0 }
                                },
                                content: {
                                    padding:  { top: 0, right: 0, bottom: 0, left: 0 }
                                },
                                title: {
                                    fontSize:  '' 
                                }
                            };
       
        props.setAttributes({sessionStyle: sessionStyle})

        const { attributes } = props;
		//Session fetching
		if (!props.attributes.sessions) {
			wp.apiFetch({
				url: '/wp-json/wp/v2/sessions?per_page=-1'
			}).then(sessions => {
				props.setAttributes({
					sessions: sessions
				})
				
			})
		}

		//fetching fallbacks
		if (!props.attributes.sessions) {
			return message('LOADING');
			
		}
		if (props.attributes.sessions && props.attributes.sessions.length === 0) {
			return 'No Session found!';
		}

		function updateSession(e) {
			var sessionData = props.attributes.sessions.find( session => {
				return session.id == e.target.value
			})
			props.setAttributes({
				selectedSession: e.target.value
			})
			props.setAttributes({
				sessionDataTrans: sessionData
			})
		}

		function message(msg){
           
			return (
				<div class="speaker-backend-msg">
					{/* <div class="speaker-image-placeholder"></div> */}
                    <Spinner />
					<h5>{msg}</h5>
				</div>
			)
		}

        function changeStyle( target, key, value ) {
            sessionStyle[target][key] = value;          
			props.setAttributes({
				sessionStyle: sessionStyle
			})
		}

		return (
            <div>
                {/* SETTING PANEL */}
                <InspectorControls style={{ marginBottom: '40px' }} >

                    {/* Appearance */}
                    
                        <TabPanel
                            className="se2-tab-panel"
                            activeClass="active-tab"
                            orientation="horizontal"
                            initialTabName="appearance"
                            onSelect={ (tabName) => console.log( 'Selecting tab', tabName ) }
                            tabs={ [
                                {
                                    name: 'appearance',
                                    title: 'Appearance',
                                    className: 'tab-appearance',
                                },
                                {
                                    name: 'tab2',
                                    title: 'Tab 2',
                                    className: 'tab-two',
                                },
                            ] }>
                            {
                            ( tab ) => (
                                <div class="se2-tab-content">
                                    
                                    {   /* Appearance */
                                            tab.name === 'appearance' &&
                                            <fragment>
                                                <PanelBody title={'Image'} initialOpen={false} >
                                                    <UnitControl 
                                                        label= 'Image Height'
                                                        value={ props.attributes.sessionStyle.image.height }
                                                        onChange={ (value) => { changeStyle( 'image', 'height', value )  }} 
                                                        style={{width: '25%'}}
                                                        labelPosition= 'top'
                                                    />
                                                    <BoxControl 
                                                        label="Border Radius" 
                                                        values={props.attributes.sessionStyle.image.borderRadius} 
                                                        onChange={ (value) => { changeStyle( 'image', 'borderRadius', value )  }}
                                                        style={{ width: '48%', float: 'left', margin: '10px 1%' }} 
                                                    />

                                                </PanelBody>
                                                <PanelBody title={'Content'} initialOpen={false} >
                                                    
                                                    <BoxControl 
                                                        label="Padding" 
                                                        values={props.attributes.sessionStyle.content.padding} 
                                                        onChange={ (value) => { changeStyle( 'content', 'padding', value )  }}
                                                        style={{ width: '48%', float: 'left', margin: '10px 1%' }} 
                                                    />

                                                    <FontSizePicker
                                                        fontSizes={[
                                                            {
                                                                name: __( 'Small' ),
                                                                slug: 'small',
                                                                size: 12,
                                                            },
                                                            {
                                                                name: __( 'Big' ),
                                                                slug: 'big',
                                                                size: 26,
                                                            },
                                                        ]}
                                                        value={ props.attributes.sessionStyle.title.fontSize }
                                                        fallbackFontSize={ 26 }
                                                        onChange={ (value) => { changeStyle( 'title', 'fontSize', value )  }}
                                                        withSlider
                                                    />

                                                </PanelBody>
                                            </fragment>
                                    }
                                </div>
                            )
                            }
                        </TabPanel>
        
                </InspectorControls>


                <div className={props.className}>
                    <div class="speaker-backend-settings">
                        <select class="speaker-selection" onChange={updateSession} value={props.attributes.selectedSession}>
                            {
                                props.attributes.sessions.map(session => {
                                    return (
                                        <option value={session.id}>{session.title.rendered}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    { props.attributes.selectedSession &&
                        <SessionCard sessiondata={props.attributes.sessionDataTrans} appaereancestyle={props.attributes.sessionStyle} />
                    }
                </div>
            </div>
		);
	},

	save: () => { return null },
});
