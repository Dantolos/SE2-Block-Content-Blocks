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
const { __experimentalLinkControl: LinkControl } = wp.blockEditor;
import { Panel, PanelBody, PanelRow, PanelHeader } from '@wordpress/components';
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
} from '@wordpress/block-editor';

import EventCard from './event-card';


registerBlockType('se2/block-events', {
	title: __('Event (dyn)'),
	icon: {
		background: 'rgba(0, 0, 0, 0)',
		foreground: '#00f692',
		src: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080 1080">
			<path d="M27.9,431.9c15.6,10.2,23.7,27.5,22.8,44.9c5.1-0.9,10.4-1.4,15.8-1.4c5.6,0,10.1-4.5,10.1-10 c0-32.6,17.2-61.2,43.1-77.3c1.9-1.2,2.4-3.8,1.1-5.6c0,0,0,0,0-0.1l132.2-201.7c44.2,10.8,91.4,1,127.7-26.6l336.2,220.4h184 L400.9,47c-23.3-15.3-54.5-8.8-69.8,14.5c-15.2,23.2-46.5,29.8-69.8,14.5c-23.3-15.3-54.6-8.8-69.8,14.5L13.8,361.7 C-1.5,385,4.5,416.7,27.9,431.9z" />
			<path d="M1048.9,523.8c-7.9-5.1-17.2-8-27.3-8c-27.8,0-50.4-22.6-50.4-50.4c0-27.8-22.6-50.4-50.4-50.4H778.4h-611 c-9.2,0-17.8,2.5-25.2,6.8c-15.1,8.7-25.2,25-25.2,43.7c0,27.8-22.6,50.4-50.4,50.4c-12.2,0-23.5,4.4-32.2,11.6 c-11.1,9.2-18.2,23.2-18.2,38.8V891c0,27.8,22.6,50.4,50.4,50.4c27.8,0,50.4,22.6,50.4,50.4c0,27.8,22.6,50.4,50.4,50.4h753.4 c27.8,0,50.4-22.6,50.4-50.4c0-27.8,22.6-50.4,50.4-50.4c27.8,0,50.4-22.6,50.4-50.4V673.4v-62.9v-44.3 C1072,548.4,1062.8,532.8,1048.9,523.8z M951,858.1c-33.3,17.7-59.3,47.4-72,83.3H621.2H209.2c-15.2-42.9-49.3-77-92.2-92.2V610.9 V608c33.6-11.9,61.7-35.3,79.7-65.5c5-8.4,9.2-17.4,12.5-26.7h669.8c11.4,32.2,33.5,59.4,61.9,77.5c9.4,6,19.6,11,30.3,14.8v219.3 L951,858.1z" />
			<path d="M951,622v-0.4c-0.1,0-0.2-0.1-0.2-0.1C950.8,621.6,950.9,621.8,951,622z" />
		</svg>,
	},
	category: 'se2',
	keywords: ['se2', 'events', 'labs'],
	attributes: {
		events: {
			type: 'object',
		},
		selectedEvent: {
			type: 'string'
		},
		eventDataTrans: {
			type: 'object'
		},
		allEventLink: {
			type: 'object',

		}
	},

	edit: (props) => {

		//event fetching
		if (!props.attributes.events) {
			wp.apiFetch({
				url: '/wp-json/wp/v2/event?per_page=-1'
			}).then(events => {
				props.setAttributes({
					events: events
				})

			})
		}

		//fetching fallbacks
		if (!props.attributes.events) {
			return message(' Loading ...');

		}
		if (props.attributes.events && props.attributes.events.length === 0) {
			return 'No events found!';
		}

		function updateEvent(e) {
			var eventData = props.attributes.events.find(event => {
				return event.id == e.target.value
			})
			props.setAttributes({
				selectedEvent: e.target.value
			})
			props.setAttributes({
				eventDataTrans: eventData
			})
		}

		function message(msg) {
			return (
				<div class="se2-block-backend-msg">
					{/* <div class="speaker-image-placeholder"></div> */}
					<h6>{msg}</h6>
				</div>
			)
		}

		return (
			<div className={props.className}>
				<div {...useBlockProps()}>
					<InspectorControls>
						<Panel header="Link" >
							<PanelHeader>Link</PanelHeader>

							<PanelBody
								title="My Block Settings"

								initialOpen={true}
								onToggle={(e) => console.log("toggled", e)}
							><p>Link for the "all Events"-Button</p>
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={props.attributes.allEventLink}
									settings={[
										{
											id: 'opensInNewTab',
											title: 'New tab?',
										},
										{
											id: 'buttonHidden',
											title: 'Hide the Button to all Events'
										}
									]}
									onChange={(newLink) => props.setAttributes({ allEventLink: newLink })}

								>
								</LinkControl>
							</PanelBody>
						</Panel>
					</InspectorControls>
				</div>
				<div class="se2-block-backend-settings">
					<select class="se2-block-selection" onChange={updateEvent} value={props.attributes.selectedEvent}>
						{
							props.attributes.events.map(event => {
								return (
									<option value={event.id}>{event.title.rendered}</option>
								)
							})
						}
					</select>
				</div>
				{props.attributes.selectedEvent &&
					<EventCard eventdata={props.attributes.eventDataTrans} />
				}
			</div>
		);
	},

	save: () => { return null },
});
