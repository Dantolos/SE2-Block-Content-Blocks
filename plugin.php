<?php
/**
 * Plugin Name: SE2 Blocks | Content
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: SE2 Block Section — Show the Custom Post Types for the SimplEvent v2 Wordpress Theme everywhere. Included: Speaker, Events, Companies, Partners
 * Author: Aaron
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
