<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

require_once 'supports/date.php';

use SE2\Supports\Date;

function se2_content_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'se2_content_blocks-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'se2_content_blocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'se2_content_blocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'se2_content_blocks-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'se2/block-speaker', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'se2_content_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'se2_content_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'se2_content_blocks-cgb-block-editor-css',

			'render_callback' => 'simplevent_speaker_render',
		)
	);

	register_block_type(
		'se2/block-events', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'se2_content_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'se2_content_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'se2_content_blocks-cgb-block-editor-css',

			'render_callback' => 'simplevent_events_render',
		)
	);
}

function simplevent_speaker_render($selectedSpeaker){
	$speakerCard = '';
	
	
	if( $selectedSpeaker['selectedSpeaker'] ){
		$speakerID = $selectedSpeaker['selectedSpeaker'];
		$speakerCard .= '<div class="speaker-card speaker-lb-trigger" data-speakerid="'.$speakerID.'">';
			
				
				$speakerName = get_field('speaker_vorname', $speakerID). ' ' .get_field('speaker_nachname', $speakerID);
				$speakerFunktion = get_field('speaker_firma', $speakerID);

				$speakerCard .= '<div>';
				$speakerCard .= '<div class="speaker-image" style="background-image: url(' .get_field('speaker_bild', $speakerID) .');"></div>';
				$speakerCard .= '<h5>'.$speakerName.'</h5>';
				$speakerCard .= '<p>'.$speakerFunktion.'</p>';
				$speakerCard .= '</div>';
			
		$speakerCard .= '</div>';
	}

	return $speakerCard;

}

function simplevent_events_render( $selectedEvent ){
	$eventCard = '';
	if( $selectedEvent['selectedEvent'] ){
		$eventID = $selectedEvent['selectedEvent'];

		$introtext = get_field( 'content', $eventID );
               
		$introtext = str_replace( '<h3>', '<b>', $introtext ); 
		$introtext = str_replace( '</h3>', '</b><br />', $introtext ); 
		$introtext = str_replace( '<i>', '', $introtext ); 
		$introtext = str_replace( '</i>', '', $introtext ); 
		$tagEliminations = array("<p>", "</p>", '<div>', '</div>');
		$introtext = str_replace( $tagEliminations, '', $introtext ); 
		$introtext_length = strpos( $introtext , '.', 200 ) + 1;
		
		$eventCard .= '<div class="event-card ">';
			$eventCard .= '<div class="event-keyvisual" style="background-image: url(' .get_field('keyvisual', $eventID) .');"></div>';
			$eventCard .= '<h3>'.get_field('titel', $eventID).'</h3>';
			$eventCard .= '<h5>'.SE2\Supports\Date\Date_Format::formating_Date_Language(get_field('eckdaten', $eventID)['date'], 'date').'</h5>';
			$eventCard .= '<p>'. substr( $introtext, 0, $introtext_length ).'</p>';
			$eventCard .= '<div class="event-card-buttons">';
				$eventCard .= '<div class="se2-btn-m event-card-button-more" postid="'.$eventID.'" lb="event_lightbox">'.__('mehr', 'SimplEvent').'</div>';
				if( $selectedEvent['allEventLink']['url'] && !$selectedEvent['allEventLink']['buttonHidden'] === true){
					$target = $selectedEvent['allEventLink']['opensInNewTab'] ? '_blank' : '';
					$eventCard .= '<a href="'.$selectedEvent['allEventLink']['url'].'" target="'.$target.'" class="se2-btn-m secondary-btn event-card-button-events">'.__('alle Events', 'SimplEvent').'</a>';
				}
			$eventCard .= '</div>';
		$eventCard .= '</div>';
	}

	return $eventCard;
}

// Hook: Block assets.
add_action( 'init', 'se2_content_blocks_cgb_block_assets' );
