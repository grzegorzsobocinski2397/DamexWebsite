<!DOCTYPE html>
<html dir="ltr" lang="pl">

<head>
    <title>Damex Lakiernia</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="Description" content="Lakierowanie tworzyw, lakierowanie mebli, efekty specjalne. Lakier, kolory oraz efekty. Kraków.">

    <!-- Stylesheets
	============================================= -->

    <?php wp_head(); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

</head>

<body <?php body_class("stretched no-transition"); ?>>

    <!-- Document Wrapper
  ============================================= -->
    <div id="wrapper" class="clearfix">

        <!-- TOP BAR 
  ============================================= -->


        <header id="header">
            <div class="header__top-bar">
                <span class="top-bar__address"><i
                        class="far fa-envelope top-bar__icon"></i><?php echo get_option('mail_address'); ?></span>
                <span class="top-bar__phone-number"><i
                        class="fas fa-phone top-bar__icon"></i><?php echo get_option('phone_number'); ?></span>
            </div>
            <div class="header__content">

                <img class="logo" alt="Damex logo"
                    src="<?php bloginfo('template_directory')?>/assets/images/Logo.png" />

                <?php 

if (has_nav_menu('primary')) {
wp_nav_menu([
'theme_location'  => "primary",
"container"       => false,
"fallback_cb"     => false,
"depth"           => 4,
'items_wrap' => '<ul id="%1$s" class="%2$s">
%3$s 
',
]);
}

?>

                <li class="menu-link menu-link__contact">
                    <a>Kontakt</a>
                    <ul class="sub-menu sub-menu--long">
                        <li class="sub-menu-link sub-menu-link--long">
                            <div id="header-contact-phone" class="sub-menu-link__block">
                                <span class="block__header">Kontakt</span>
                                <div class="block__content">
                                    <i class="fas fa-phone"></i><span><?php echo get_option('phone_number'); ?></span>
                                </div>
                            </div>
                        </li>
                        <li class="sub-menu-link sub-menu-link--long">
                            <div id="header-contact-phone-production" class="sub-menu-link__block">
                                <span class="block__header">Kontakt - produkcja</span>
                                <div class="block__content">
                                    <i
                                        class="fas fa-phone"></i><span><?php echo get_option('phone_production_number'); ?></span>
                                </div>
                            </div>
                        </li>
                        <li class="sub-menu-link sub-menu-link--long">
                            <div id="header-contact-mail" class="sub-menu-link__block">
                                <span class="block__header">E-mail</span>
                                <div class="block__content">
                                    <i
                                        class="far fa-envelope"></i><span><?php echo get_option('mail_address'); ?></span>
                                </div>
                            </div>
                        </li>
                        <li class="sub-menu-link sub-menu-link--long">
                            <div id="header-contact-localization" class="sub-menu-link__block">
                                <span class="block__header">Lokalizacja</span>
                                <div class="block__content">
                                    <i
                                        class="fa fa-map-marker"></i><span><?php echo get_option('location_address'); ?></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                </ul>
                <div id="hamburger">
                    <button aria-label="Navigation">
                        <i class="fa fa-bars"></i>
                    </button>
                </div>
            </div>




        </header><!-- #header end -->