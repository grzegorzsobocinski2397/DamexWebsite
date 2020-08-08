<?php
function theme_settings_page(){	?>
	<div class="wrap">
		<h1>Opcje globalne</h1>
		<p>Tutaj są opcje, które używane są w całej aplikacji.</p>
		<form method="post" action="options.php">
			<?php
			settings_fields("section");
			do_settings_sections("theme-options");
			submit_button();
			?>
		</form>
	</div>
	
	<?php }

/**
 *
 * Next comes the settings fields to display. Use anything from inputs and textareas, to checkboxes multi-selects.
 *
 */

// Phone
function display_phone_element(){ ?>
	
	<input type="tel" name="phone_number" placeholder="Wpisz numer telefonu" value="<?php echo get_option('phone_number'); ?>" size="35">

<?php }

// Phone Production
function display_phone_production_element(){ ?>
	
	<input type="tel" name="phone_production_number" placeholder="Wpisz numer telefonu na produkcję" value="<?php echo get_option('phone_production_number'); ?>" size="35">
	
<?php }


// Location
function display_location_address_element(){ ?>
	
	<input type="text" name="location_address" placeholder="Wpisz lokację" value="<?php echo get_option('location_address'); ?>" size="35">

<?php }

// Email
function display_email_element(){ ?>
	
	<input type="email" name="mail_address" placeholder="Wpisz adres email" value="<?php echo get_option('mail_address'); ?>" size="35">
	
<?php }

// Facebook address
function display_facebook_element(){ ?>
	
	<input type="text" name="facebook_address" placeholder="Wpisz adres Facebook" value="<?php echo get_option('facebook_address'); ?>" size="35">
	
<?php }

/**
 *
 * Here you tell WP what to enqueue into the <form> area. You need:
 *
 * 1. add_settings_section
 * 2. add_settings_field
 * 3. register_setting
 *
 */

function display_custom_info_fields(){	
	add_settings_section("section", "Kontakt", null, "theme-options");

	add_settings_field("phone_number", "Numer telefonu", "display_phone_element", "theme-options", "section");
	add_settings_field("phone_production_number", "Numer telefonu - produkcja", "display_phone_production_element", "theme-options", "section");
	add_settings_field("location_address", "Lokalizacja", "display_location_address_element", "theme-options", "section");
	add_settings_field("mail_address", "Adres mail", "display_email_element", "theme-options", "section");
	add_settings_field("facebook_address", "Adres Facebook", "display_facebook_element", "theme-options", "section");

	register_setting("section", "phone_number");
	register_setting("section", "phone_production_number");
	register_setting("section", "location_address");
	register_setting("section", "mail_address");
	register_setting("section", "facebook_address");
}

add_action("admin_init", "display_custom_info_fields");

/**
 *
 * Tie it all together by adding the settings page to wherever you like. For this example it will appear
 * in Settings > Contact Info
 *
 */

function add_custom_info_menu_item(){
	add_options_page("Contact Info", "Contact Info", "manage_options", "contact-info", "theme_settings_page");
}

add_action("admin_menu", "add_custom_info_menu_item"); 