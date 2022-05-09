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

import { FormTokenField } from '@wordpress/components';
import SpeakerCard from './speaker-card';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('se2/block-speaker', {

	title: __('Speaker (dyn)'),
	icon: {
		background: 'rgba(0, 0, 0, 0)',
		foreground: '#00f692',
		src: <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080 1080" >
			<path d="M177.6,952.4c0-92.5,75.2-167.7,167.7-167.7h321h84.7c8.1,0,16.1,0.6,24,1.7c81.1,11.7,143.7,81.6,143.7,166 V1080h108.7V952.4c0-73.6-28.8-142.9-81.1-195.2c-46.8-46.8-107.3-74.8-172.2-80.2c-7.6-0.6-15.3-1-23-1h-86.4H345.2 c-73.6,0-142.9,28.8-195.2,81.1c-52.3,52.3-81.1,121.6-81.1,195.2V1080h108.7V952.4z" />
			<path d="M548.1,603c-71.1,0-137.8-27.7-188.1-77.9s-77.9-117-77.9-188.1s27.7-137.8,77.9-188.1S477,71,548.1,71 c71.1,0,137.8,27.7,188.1,77.9c50.2,50.2,77.9,117,77.9,188.1s-27.7,137.8-77.9,188.1C685.9,575.3,619.1,603,548.1,603z M548.1,171 c-91.5,0-166,74.5-166,166s74.5,166,166,166c91.5,0,166-74.5,166-166S639.6,171,548.1,171z" />
		</svg>,
	},
	category: 'se2',
	keywords: ['se2', 'speaker', 'card'],
	attributes: {
		speakers: {
			type: 'object',
		},
		selectedSpeaker: {
			type: 'string'
		},
		speakerDataTrans: {
			type: 'object'
		}
	},
	edit: (props) => {

		//speaker fetching
		if (!props.attributes.speakers) {
			wp.apiFetch({
				url: '/SimplEvent_v2/wp-json/wp/v2/speakers?per_page=-1'
			}).then(speakers => {
				props.setAttributes({
					speakers: speakers
				})
			})
		}

		//fetching fallbacks
		if (!props.attributes.speakers) {
			return message(' Loading ...');

		}
		if (props.attributes.speakers && props.attributes.speakers.length === 0) {
			return 'No speakers found!';
		}

		function updateSpeaker(e) {
			var speakerData = props.attributes.speakers.find(speaker => {
				return speaker.id == e.target.value
			})
			props.setAttributes({
				selectedSpeaker: e.target.value
			})
			props.setAttributes({
				speakerDataTrans: speakerData
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
				<div class="se2-block-backend-settings">
					<select class="se2-block-selection" onChange={updateSpeaker} value={props.attributes.selectedSpeaker}>
						{
							props.attributes.speakers.map(speaker => {
								return (
									<option value={speaker.id}>{speaker.title.rendered}</option>
								)
							})
						}
					</select>
				</div>
				{props.attributes.selectedSpeaker &&
					<SpeakerCard speaker={props.attributes.selectedSpeaker} speakerdata={props.attributes.speakerDataTrans} />
				}
			</div>
		);
	},


	save: () => { return null },
});
