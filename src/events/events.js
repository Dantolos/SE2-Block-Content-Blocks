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
registerBlockType('cgb/block-se2-events', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Event (dyn)'), // Block title.
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: 'rgba(0, 0, 0, 0)',
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: '#00f692',
		// Specifying an icon for the block
		src: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080 1080">
			<path d="M27.9,431.9c15.6,10.2,23.7,27.5,22.8,44.9c5.1-0.9,10.4-1.4,15.8-1.4c5.6,0,10.1-4.5,10.1-10 c0-32.6,17.2-61.2,43.1-77.3c1.9-1.2,2.4-3.8,1.1-5.6c0,0,0,0,0-0.1l132.2-201.7c44.2,10.8,91.4,1,127.7-26.6l336.2,220.4h184 L400.9,47c-23.3-15.3-54.5-8.8-69.8,14.5c-15.2,23.2-46.5,29.8-69.8,14.5c-23.3-15.3-54.6-8.8-69.8,14.5L13.8,361.7 C-1.5,385,4.5,416.7,27.9,431.9z" />
			<path d="M1048.9,523.8c-7.9-5.1-17.2-8-27.3-8c-27.8,0-50.4-22.6-50.4-50.4c0-27.8-22.6-50.4-50.4-50.4H778.4h-611 c-9.2,0-17.8,2.5-25.2,6.8c-15.1,8.7-25.2,25-25.2,43.7c0,27.8-22.6,50.4-50.4,50.4c-12.2,0-23.5,4.4-32.2,11.6 c-11.1,9.2-18.2,23.2-18.2,38.8V891c0,27.8,22.6,50.4,50.4,50.4c27.8,0,50.4,22.6,50.4,50.4c0,27.8,22.6,50.4,50.4,50.4h753.4 c27.8,0,50.4-22.6,50.4-50.4c0-27.8,22.6-50.4,50.4-50.4c27.8,0,50.4-22.6,50.4-50.4V673.4v-62.9v-44.3 C1072,548.4,1062.8,532.8,1048.9,523.8z M951,858.1c-33.3,17.7-59.3,47.4-72,83.3H621.2H209.2c-15.2-42.9-49.3-77-92.2-92.2V610.9 V608c33.6-11.9,61.7-35.3,79.7-65.5c5-8.4,9.2-17.4,12.5-26.7h669.8c11.4,32.2,33.5,59.4,61.9,77.5c9.4,6,19.6,11,30.3,14.8v219.3 L951,858.1z" />
			<path d="M951,622v-0.4c-0.1,0-0.2-0.1-0.2-0.1C950.8,621.6,950.9,621.8,951,622z" />
		</svg>,
	},
	category: 'se2', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('se2-content-blocks — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		// Creates a <p class='wp-block-cgb-block-se2-content-blocks'></p>.
		return (
			<div className={props.className}>
				<p>— Hello from the backend.</p>
				<p>
					CGB BLOCK: <code>se2-content-blocks</code> is a new Gutenberg block
				</p>
				<p>
					It was created via{' '}
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		return (
			<div className={props.className}>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>se2-content-blocks</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{' '}
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
});
