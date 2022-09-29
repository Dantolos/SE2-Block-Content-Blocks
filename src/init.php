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

	register_block_type(
		'se2/block-session', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'se2_content_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'se2_content_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'se2_content_blocks-cgb-block-editor-css',

			'render_callback' => 'simplevent_session_render',
		)
	);
}

function simplevent_speaker_render($selectedSpeaker){
	$speakerCard = '';
	
	if( $selectedSpeaker['selectedSpeaker'] ){
		$speakerID = $selectedSpeaker['selectedSpeaker'];
		$speakerCard .= '<div class="speaker-card speaker-lb-trigger" data-speakerid="'.$speakerID.'">';

				$speakerName = get_field('speaker_vorname', $speakerID). ' ' .get_field('speaker_nachname', $speakerID);
				$speaker_funktion = '';
				if(get_field('speaker_funktion', $speakerID) && get_field('speaker_firma', $speakerID)){ 
					$speaker_funktion .= get_field('speaker_funktion', $speakerID) . ', ' . get_field('speaker_firma', $speakerID); 
				} else {
					$speaker_funktion .= get_field('speaker_firma', $speakerID);
				}

				$speakerCard .= '<div>';
				$speakerCard .= '<div class="speaker-image" style="background-image: url(' .get_field('speaker_bild', $speakerID) .');"></div>';
				$speakerCard .= '<h4 style="font-size:1.33rem;"><b>'.$speakerName.'</b></h4>';
				$speakerCard .= '<p>'.$speaker_funktion .'</p>';
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
		
		$eventCard .= '<div class="event-card">';
			$eventCard .= '<div class="event-keyvisual" style="background-image: url(' .get_field('keyvisual', $eventID) .');"></div>';
			$eventCard .= '<h3>'.get_field('titel', $eventID).'</h3>';
			$eventCard .= '<h5>'.SE2\Supports\Date\Date_Format::formating_Date_Language(get_field('eckdaten', $eventID)['date'], 'date').'</h5>';
			$eventCard .= '<p>'. substr( $introtext, 0, $introtext_length ).'</p>';
			$eventCard .= '<div class="event-card-buttons">';
				$eventCard .= '<div class="se2-btn-m event-card-button-more" postid="'.$eventID.'" lb="event_lightbox">'.__('mehr', 'SimplEvent').'</div>';
				if( isset($selectedEvent['allEventLink']['url'] )){
					$hide = true;
					if( isset($selectedEvent['allEventLink']['buttonHidden']) ){
						$hide = (!$selectedEvent['allEventLink']['buttonHidden'] === true) ? true : false;
					}
					if($hide){
						$target = $selectedEvent['allEventLink']['opensInNewTab'] ? '_blank' : '';
						$eventCard .= '<a href="'.$selectedEvent['allEventLink']['url'].'" target="'.$target.'" class="se2-btn-m secondary-btn event-card-button-events">'.__('alle Events', 'SimplEvent').'</a>';
					}
				}
			$eventCard .= '</div>';
		$eventCard .= '</div>';
	}

	return $eventCard;
}

function simplevent_session_render( $SessionSettings ){
	$sessionCard = '';

	if($SessionSettings['selectedSession']){
		$sessionID = $SessionSettings['selectedSession'];

		$sessionCard .= '<section class="session-card session-lb-trigger" sessionid="'.$sessionID.'">';

				/* SESSION IMAGE */
				$sessionCard .= '<div class="session-keyvisual" style="';
					$sessionCard .= 'background-image:url('.get_field('session_bild', $sessionID).');';
					$sessionCard .= 'height:'.$SessionSettings['sessionStyle']['image']['height'].';';
					$sessionCard .= 'border-radius:'.$SessionSettings['sessionStyle']['image']['borderRadius']['top'].' '.$SessionSettings['sessionStyle']['image']['borderRadius']['right'].' '.$SessionSettings['sessionStyle']['image']['borderRadius']['bottom'].' '.$SessionSettings['sessionStyle']['image']['borderRadius']['left'].';';
				$sessionCard .= '">'; 
				$sessionCard .= '</div>';

				/* SESSION CONTENT */
				$sessionCard .= '<div class="session-content" style="';
					$sessionCard .= 'padding:'.$SessionSettings['sessionStyle']['content']['padding']['top'].' '.$SessionSettings['sessionStyle']['content']['padding']['right'].' '.$SessionSettings['sessionStyle']['content']['padding']['bottom'].' '.$SessionSettings['sessionStyle']['content']['padding']['left'].';';
				$sessionCard .= '">'; 
				
					$sessionCard .= '<h4 style="font-size:'. $SessionSettings['sessionStyle']['title']['fontSize'] .' !important;">';
					$sessionCard .= get_field('titel', $sessionID);
					$sessionCard .= '</h4>';

					$sessionText = get_field('session_text', $sessionID);
					$sessionEx = str_replace( '<h3>', '<b>', $sessionText ); 
					$sessionEx = str_replace( '</h3>', '</b><br />', $sessionEx ); 
					$sessionEx = str_replace( '<i>', '', $sessionEx ); 
					$sessionEx = str_replace( '</i>', '', $sessionEx ); 
					$tagEliminations = array("<p>", "</p>", '<div>', '</div>');
					$sessionEx = str_replace( $tagEliminations, '', $sessionEx ); 
					$sessionEx_length = (str_contains( $sessionEx , '.' )) ? strpos( $sessionEx , '.', 150 ) + 1 : 1;
					if( $sessionEx_length < 20 ){
						$sessionEx_length = (str_contains( $sessionEx , '?' )) ? strpos( $sessionEx , '?', 150 ) + 1 : 1;
					}
					$sessionCard .= '<p>'.substr( $sessionEx, 0, $sessionEx_length ).' <span class="primary-txt"> ...more</span></p>';
					
				$sessionCard .= '</div>';
				
		$sessionCard .= '</section>';
}
	return $sessionCard;
}

// Hook: Block assets.
add_action( 'init', 'se2_content_blocks_cgb_block_assets' );
