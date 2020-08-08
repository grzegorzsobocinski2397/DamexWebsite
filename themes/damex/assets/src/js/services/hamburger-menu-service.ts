import { HAMBURGER_IDS } from "./../models/redirection/hamburger-redirection";
import { RedirectionService } from "./redirection-service";

/**
 * Service responsible for moving the header menu to a different position.
 */
export class HamburgerMenuService {
  /**
   * Whether the menu is currently open.
   */
  private isOpen: boolean = false;

  /**
   * Initialize the hamburger menu by adding the click event.
   */
  public init() {
    const button = document.querySelector("#hamburger button");
    button.addEventListener("click", this.handleClickEvent.bind(this));
  }

  /**
   * Decide whether to open menu or close it depending on the current state.
   */
  private handleClickEvent() {
    this.isOpen ? this.closeMenu() : this.createMenu();
    this.isOpen = !this.isOpen;
    this.changeIcon();
  }

  /**
   * Remove menu overlay from DOM.
   */
  private closeMenu() {
    const overlay = document.querySelector(".menu-overlay");
    document.querySelector(".header").classList.remove("header--edit-mode")
    overlay.remove();
  }

  /**
   * Create new element which overtakes an entire screen.
   */
  private createMenu() {
    document.querySelector(".header").classList.add("header--edit-mode")
    const overlay = document.createElement("div");
    overlay.classList.add("menu-overlay");

    const body = document.querySelector("body");
    body.appendChild(overlay);

    const menu = document.querySelector("#menu-header-menu");
    overlay.appendChild(menu.cloneNode(true));

    this.moveContactInformation();
    this.addArrows();
  }

  /**
   * Toggle the icon in hamburger menu.
   */
  private changeIcon() {
    const icon = document.querySelector("#hamburger i");

    const newIcon =  this.isOpen ? "fa-times" : "fa-bars";
    const lastIcon = this.isOpen ? "fa-bars" : "fa-times";

    icon.classList.add(newIcon);
    icon.classList.remove(lastIcon);
  }

  /**
   * Move the contact information to fit with the new style.
   */
  private moveContactInformation() {
    const overlay = document.querySelector(".menu-overlay");
    const contactList = overlay.querySelector(".sub-menu--long");
    Array.from(contactList.querySelectorAll(".sub-menu-link__block")).forEach(
      (child) => (child.id = `${child.id}-hamburger`)
    );

    overlay.appendChild(contactList.cloneNode(true));

    const menuLink = overlay.querySelector(".menu-link__contact");
    menuLink.remove();

    const redirectionService = new RedirectionService();
    redirectionService.addContactRedirection(HAMBURGER_IDS);
  }

  /**
   * Create chevron icons next to the header elements that have children.
   */
  private addArrows() {
    const overlay = document.querySelector(".menu-overlay");
    const menuLinks = Array.from(overlay.querySelectorAll(".menu-link"));
    const menusWithChildren = menuLinks.filter((menuLink) =>
      Array.from(menuLink.children).some((child) => child.tagName === "UL")
    );
    menusWithChildren.forEach((menu) => {
      const icon = document.createElement("i");
      icon.classList.add(...["fa", "fa-chevron-down", "menu-link__icon"]);
      icon.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        menu.classList.toggle("menu-children-visible")
        menu.querySelector("ul").classList.toggle("sub-menu--visible")
      });
      menu.querySelector("a").append(icon);
    });
  }
}
