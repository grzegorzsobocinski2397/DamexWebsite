<?php
/**
 * Plugin Name: Damex Lakiernia - bloki
 * Plugin URI: https://github.com/grzegorzsobocinski2397/Damex-Plugin
 * Description: Bloki Damex do poszczególnych stron.
 * Author: Grzegorz Sobociński
 * Author URI: https://github.com/grzegorzsobocinski2397
 * Version: 0.9.0
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
