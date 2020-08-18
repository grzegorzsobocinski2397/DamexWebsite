import { FOOTER_IDS } from "./../models/redirection/footer-redirection";
import { HEADER_IDS } from "./../models/redirection/header-redirection";
import { RedirectionElements } from "./../models/redirection/redirection-elements";
import { ContactActionType } from "../models/contact-action-type";

/**
 * Service that adds all the redirection actions to the header, footer and menu elements.
 */
export class RedirectionService {
  /**
   * Initialize all the redirection in the applications.
   */
  public init() {
    this.addTopBarRedirection();
    this.addContactRedirection(HEADER_IDS);
    this.addContactRedirection(FOOTER_IDS);
    this.addPartnersRedirection();
    this.addLogoRedirection();
    this.addButtonsRedirection();
  }

  /**
   * Create menu redirection to the menu items in the header.
   */
  public addContactRedirection(ids: RedirectionElements) {
    const phoneElement = document.querySelector(ids.phone) as HTMLElement;
    const phoneProductionElement = document.querySelector(ids.phoneProduction) as HTMLElement;
    const mailElement = document.querySelector(ids.mail) as HTMLElement;
    const locationElement = document.querySelector(ids.location) as HTMLElement;

    this.addContactMenuItemRedirection(phoneElement, ContactActionType.Phone);
    this.addContactMenuItemRedirection(phoneProductionElement, ContactActionType.Phone);
    this.addContactMenuItemRedirection(mailElement, ContactActionType.Mail);
    this.addContactMenuItemRedirection(locationElement, ContactActionType.Location);
  }

  /**
   * Add redirection to partners links when they exist.
   */
  private addPartnersRedirection() {
    const doPartnersExist = document.querySelector(".partner-link") !== null;
    if (doPartnersExist) {
      document.querySelectorAll(".partner-link").forEach((partner) => partner.addEventListener("click", this.redirectPartner));
    }
  }

  /**
   * Open a new window with partners website.
   */
  private redirectPartner(event: MouseEvent) {
    location.href = (event.target as HTMLAnchorElement).href;
  }

  /**
   * Create top bar redirection (above the header) actions.
   */
  private addTopBarRedirection() {
    const mailAddressElement = document.querySelector(".top-bar__address") as HTMLElement;
    const phoneNumberElement = document.querySelector(".top-bar__phone-number") as HTMLElement;

    this.addEventListener(mailAddressElement, ContactActionType.Mail, mailAddressElement.innerText);
    this.addEventListener(phoneNumberElement, ContactActionType.Phone, phoneNumberElement.innerText);
  }

  /**
   * Add event listener for the element in the Menu bar by taking the span element, which is populated by the customer.
   */
  private addContactMenuItemRedirection(element: HTMLElement, type: ContactActionType) {
    const spanElement = element.querySelector(".block__content span") as HTMLElement;
    this.addEventListener(element as HTMLElement, type, spanElement.innerHTML);
  }

  /**
   * Add event listener for the HTML element with action specified by the type and value used.
   */
  private addEventListener(element: HTMLElement, type: ContactActionType, value: string) {
    switch (type) {
      case ContactActionType.Location: {
        element.addEventListener("click", () => window.open(`http://maps.google.com/?q=${value}`));
        break;
      }
      case ContactActionType.Mail: {
        element.addEventListener("click", () => (window.location.href = `mailto:${value}`));
        break;
      }
      case ContactActionType.Phone: {
        element.addEventListener("click", () => (window.location.href = `tel:${value}`));
        break;
      }
      default: {
        throw new Error(`This contact action type doesn't exist. ${type}`);
      }
    }
  }

  /**
   * Redirect user on logo click.
   */
  private addLogoRedirection() {
    document.querySelector("#header img").addEventListener("click", () => (window.location.href = "/"));
  }

  /**
   * Add link redirection to the buttons.
   */
  private addButtonsRedirection() {
    const offerButton = document.querySelector(".wp-block-cgb-damex-about-us-summary button");
    const galleryButton = document.querySelector(".wp-block-cgb-damex-offer-common button");
    const homeOfferButton = document.querySelector(".wp-block-cgb-block-damex-block button");

    [offerButton, galleryButton, homeOfferButton].filter((button) => button !== null).forEach((button) => this.addButtonRedirection(button));
  }

  /**
   * Add link redirection to the button link.
   */
  private addButtonRedirection(button: Element) {
    button.addEventListener("click", () => (window.location.href = button.getAttribute("href")));
  }
}
