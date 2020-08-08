/**
 * Responsible for creating overlay container and handling buttons.
 */
export class OverlayGallery {
  /**
   * Event/method called on previous image button click.
   */
  private previousImageAction: any;
  /**
   * Event/method called on next image button click.
   */
  private nextImageAction: any;

  /**
   * @param previousImageAction Event/method called on previous image button click.
   * @param nextImageAction Event/method called on next image button click.
   */
  constructor(previousImageAction: any, nextImageAction: any, images: HTMLImageElement[]) {
    images.forEach((image) => image.addEventListener("click", this.onImageClickEvent.bind(this)));
    this.previousImageAction = previousImageAction;
    this.nextImageAction = nextImageAction;
  }

  /**
   * Create an overlay with image on full screen.
   */
  public onImageClickEvent(event: MouseEvent) {
    const image = event.target as HTMLImageElement;

    const overlayContainer = this.createOverlay(image);

    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    body.prepend(overlayContainer);

    document.querySelector(".overlay-container").classList.add("overlay--visible");

    this.addOverlaySwipedActions();
  }

  /**
   * Create overlay container with buttons.
   */
  public createOverlay(image: HTMLImageElement): HTMLDivElement {
    const overlayContainer = document.createElement("div");
    overlayContainer.classList.add("overlay-container");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.addEventListener("click", this.removeOverlayElement);

    const overlayImage = document.createElement("img");
    overlayImage.src = image.src;
    overlayImage.setAttribute("data-id", image.getAttribute("data-id"));

    overlayContainer.append(...[overlay, overlayImage]);

    this.createOverlayButtons(overlayContainer);

    return overlayContainer;
  }

  /**
   * Create buttons that navigate the user through the gallery.
   */
  private createOverlayButtons(container: HTMLDivElement) {
    const closeButton = this.createButtonElement(
      "overlay__close-button",
      "fa-times-circle",
      this.removeOverlayElement.bind(this)
    );
    const previousButton = this.createButtonElement(
      "overlay__next-button",
      "fa-chevron-circle-left",
      this.previousImageAction
    );
    const nextButton = this.createButtonElement(
      "overlay__previous-button",
      "fa-chevron-circle-right",
      this.nextImageAction
    );

    container.append(...[closeButton, previousButton, nextButton]);
  }

  /**
   * Create an overlay button.
   */
  private createButtonElement(buttonClass: string, iconClass: string, event: any) {
    const button = document.createElement("button");
    button.classList.add(buttonClass);
    button.append(this.createIconElement(iconClass, event));
    return button;
  }

  /**
   * Create an overlay icon and add event listener for 'click' event.
   */
  private createIconElement(iconClass: string, event: any): HTMLElement {
    const iconElement = document.createElement("i");
    iconElement.classList.add(...["fa", iconClass]);
    iconElement.addEventListener("click", event);
    return iconElement;
  }

  /**
   * Remove the overlay container and set body overflow back to visible.
   */
  private removeOverlayElement() {
    document.querySelector(".overlay-container").remove();
    document.querySelector("body").style.overflow = "visible";
  }

  /**
   * Add events for swipe left and right.
   */
  private addOverlaySwipedActions() {
    const overlayContainer = document.querySelector(".overlay-container");
    overlayContainer.addEventListener("swiped-left", (event: Event) => {
      event.stopPropagation();
      this.previousImageAction();
    });
    overlayContainer.addEventListener("swiped-right", () => {
      event.stopPropagation();
      this.nextImageAction();
    });
  }
}
