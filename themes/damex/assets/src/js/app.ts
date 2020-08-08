import { DotGalleryService } from './services/dot-gallery-service';
import { HamburgerMenuService } from './services/hamburger-menu-service';
import { MainGalleryService } from './services/main-gallery-service';
import { PartnersService } from './services/partners.service';
import { RedirectionService } from './services/redirection-service';
import { StandardGalleryService } from './services/standard-gallery-service';

/**
 * Main part of the application starting all the services to listen to any changes.
 */
export class App {
  /**
   * Start the initialization of services.
   */
  constructor() {
    this.init();
  }

  /**
   * Initialize the services based on the current location of the user.
   */
  private init() {
    this.initRedirectionService();
    this.initPartnersBlocks();
    this.initStandardGalleryService();
    this.initDotGallery();
    this.initMainGallery();
    this.initHamburger()
  }

  /**
   * Initialize the hamburger menu service.
   */
  private initHamburger() {
    const hamburgerMenuService = new HamburgerMenuService();
    hamburgerMenuService.init();
  }

  /**
   * Initialize main gallery service.
   */
  private initMainGallery() {
    const isMainGalleryUsed = document.querySelector(".wp-block-gallery") !== null;

    if (isMainGalleryUsed) {
      const mainGalleryService = new MainGalleryService();
      mainGalleryService.init();
    }
  }

  /**
   * Initialize redirection service which is responsible for actions regarding contact information.
   */
  private initRedirectionService() {
    const redirectionService = new RedirectionService();
    redirectionService.init();
  }

  /**
   * Initialize partners block service, which is responsible for changing the currently visible partners.
   */
  private initPartnersBlocks() {
    const isTherePartnersBlock = document.querySelector(".wp-block-cgb-damex-about-us-partners");
    if (isTherePartnersBlock) {
      const partnersService = new PartnersService();
      partnersService.init();
    }
  }

  /**
   * Initialize standard gallery.
   */
  private initStandardGalleryService() {
    const isThereStandardGalleryService = document.querySelector(".normal-gallery");
    if (isThereStandardGalleryService) {
      const standardGalleryService = new StandardGalleryService();
      standardGalleryService.init();
    }
  }

  /**
   * Initialize dot gallery service.
   */
  private initDotGallery() {
    const isThereDotGallery = document.querySelector(".dot-gallery");
    if (isThereDotGallery) {
      const dotGalleryService = new DotGalleryService();
      dotGalleryService.init();
    }
  }
}
