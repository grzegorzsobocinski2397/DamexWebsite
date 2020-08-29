<footer id="footer" class="dark">
    <div class="footer__blocks">
        <div class="footer__block">
            <ul class="contact-list">
                <li class="contact-list-item">
                    <div id="footer-contact-phone" class="">
                        <span class="block__footer block__footer--spaced">Kontakt</span>
                        <div class="block__content">
                            <i class="fas fa-phone"></i><span><?php echo get_option('phone_number'); ?></span>
                        </div>
                    </div>
                </li>
                <li class="contact-list-item">
                    <div id="footer-contact-phone-production" class="">
                        <span class="block__footer block__footer--spaced">Kontakt - produkcja</span>
                        <div class="block__content">
                            <i
                                class="fas fa-phone"></i><span><?php echo get_option('phone_production_number'); ?></span>
                        </div>
                    </div>
                </li>
                <li class="contact-list-item">
                    <div id="footer-contact-mail" class="">
                        <span class="block__footer block__footer--spaced">E-mail</span>
                        <div class="block__content">
                            <i class="far fa-envelope"></i><span><?php echo get_option('mail_address'); ?></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer__block footer__block--right">
            <div class="contact-list-item">
                <div id="footer-contact-localization" class="">
                    <span class="block__footer block__footer--spaced">Lokalizacja</span>
                    <div class="block__content">
                        <i class="fa fa-map-marker"></i><span><?php echo get_option('location_address'); ?></span>
                    </div>
                </div>
            </div>
            <iframe title="Mapa Google"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.218680792744!2d20.06183841613847!3d50.1009136794286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47164f88835a08ad%3A0x13327525aa0b0e24!2sKantorowicka%2048%2C%2031-764%20Krak%C3%B3w!5e0!3m2!1sen!2spl!4v1592751069805!5m2!1sen!2spl"
                width="500" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
                tabindex="0"></iframe>
        </div>
    </div>
    <div class="footer__copyright">
        <?php echo currentYear()?> Damex Ryszard Madej Kraków | Wszelkie prawa zastrzeżone | <a href="http://lakiernia-damex.pl/polityka-prywatnosci">Polityka Prywatności</a>
        <a id="facebook-redirection" href="<?php echo get_option('facebook_address'); ?>"> <i id="facebook-icon" class="fab fa-facebook-square">
            </i></a>

    </div>
    <img class="footer-logo" alt="Damex - małe logo"
                    src="<?php bloginfo('template_directory')?>/assets/images/logo-small.png" />
</footer>

</div>

<?php wp_footer(); ?>
</body>

</html>