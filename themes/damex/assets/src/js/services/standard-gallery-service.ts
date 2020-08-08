import { OverlayGallery } from "../helpers/overlay-gallery";

/**
 * Service responsible for galleries that use plain buttons.
 */
export class StandardGalleryService {
  /**
   * Currently selected dot.
   */
  private currentIndex: number = 0;
  /**
   * Images corresponding to the dots elements.
   */
  private images: HTMLImageElement[];
  /**
   * Currently selected image.
   */
  private currentImage: HTMLImageElement;
  /**
   * Image before the currently selected one. Goes around the array if the index is 0.
   */
  private previousImage: HTMLImageElement;
  /**
   * Image after the currently selected one
   */
  private nextImage: HTMLImageElement;

  /**
   * Initialize the buttons, images and add overlay container handler.
   */
  public init() {
    const container = document.querySelector(".normal-gallery");

    this.images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];

    new OverlayGallery(this.choosePreviousOverlayImage.bind(this), this.chooseNextOverlayImage.bind(this), this.images);

    this.findImages();
    this.addEvents();
  }

  /**
   * Add event listeners to swipe and click actions.
   */
  private addEvents() {
    this.addButtonsEvents();
    this.addOverlaySwipedActions();
  }

  /**
   * Add events for the buttons (not in overlay).
   */
  private addButtonsEvents() {
    const nextButton = document.querySelector(".next-button");
    const previousButton = document.querySelector(".previous-button");

    nextButton.addEventListener("click", this.onNextImageChange.bind(this));
    previousButton.addEventListener("click",  this.onPreviousImageChange.bind(this));
  }

  /**
   * Invoked on button click change.
   */
  private onPreviousImageChange() {
    const index = Number(this.currentImage.getAttribute("data-id")) - 1;
    this.currentIndex = index === -1 ? this.images.length - 1 : index;
    this.selectNewImages();
  }

  /**
   * Invoked on button click change.
   */
  private onNextImageChange() {
    const index = Number(this.currentImage.getAttribute("data-id")) + 1;
    this.currentIndex = index === this.images.length ? 0 : index;
    this.selectNewImages();
  }

  /**
   * Add events for swipe left and right.
   */
  private addOverlaySwipedActions() {
    const container = document.querySelector(".normal-gallery");
    container.addEventListener("swiped-left", this.onPreviousImageChange.bind(this));
    container.addEventListener("swiped-right", this.onNextImageChange.bind(this));
  }

  /**
   * Choose previous image in the array.
   */
  private choosePreviousOverlayImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    const index = Number(currentImage.getAttribute("data-id")) - 1;
    this.currentIndex = index === -1 ? this.images.length - 1 : index;
    this.selectNewImages();

    currentImage.src = this.currentImage.src;
    currentImage.setAttribute("data-id", this.currentImage.getAttribute("data-id"));
  }

  /**
   * Choose next image in the array.
   */
  private chooseNextOverlayImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    const index = Number(currentImage.getAttribute("data-id")) + 1;
    this.currentIndex = index === this.images.length ? 0 : index;
    this.selectNewImages();

    currentImage.src = this.currentImage.src;
    currentImage.setAttribute("data-id", this.currentImage.getAttribute("data-id"));
  }

  /**
   * Remove classes from previous images and add to new ones.
   */
  private selectNewImages() {
    this.removePreviousClasses();

    this.findImages();
    this.addClasses();
  }

  /**
   * Find the images based on the currently selected dot.
   */
  private findImages() {
    const counter = document.querySelector(".counter");
    counter.innerHTML = `${this.currentIndex + 1}/${this.images.length}`;
    this.currentImage = this.images.find((image) => Number(image.getAttribute("data-id")) === this.currentIndex);

    const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.nextImage = this.images.find((image) => Number(image.getAttribute("data-id")) === nextIndex);

    const previousIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.previousImage = this.images.find((image) => Number(image.getAttribute("data-id")) === previousIndex);
  }

  /**
   * Remove all the classes from previous visible elements.
   */
  private removePreviousClasses() {
    [this.currentImage, this.nextImage, this.previousImage].forEach((image) => {
      image.classList.remove(...["image--next", "image--previous"]);
      image.classList.add(...["image--hidden", "image--small"]);
    });
  }

  /**
   * Select new visible images.
   */
  private addClasses() {
    const removableClasses = ["image--hidden", "image--small"];

    this.currentImage.classList.remove(...removableClasses);

    this.nextImage.classList.remove(...removableClasses);
    this.nextImage.classList.add(...["image--next", "image--small"]);

    this.previousImage.classList.remove(...removableClasses);
    this.previousImage.classList.add(...["image--previous", "image--hidden"]);
  }
}
