import { OverlayGallery } from "./../helpers/overlay-gallery";
/**
 * Standard selector for the dot element.
 */
const SELECTOR_CLASS = ".dot";
/**
 * Currently highlighted dot.
 */
const ACTIVE_CLASS = "dot--active";

/**
 * Service responsible for galleries that use dots.
 */
export class DotGalleryService {
  /**
   * Currently selected dot.
   */
  private currentIndex: number;
  /**
   * Images corresponding to the dots elements.
   */
  private images: HTMLImageElement[];
  /**
   * List of visible dots.
   */
  private dots: HTMLDivElement[];
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
   * Add event listeners for all the dot buttons.
   */
  public init() {
    const container = document.querySelector(".dot-gallery");

    this.dots = Array.from(container.querySelectorAll(SELECTOR_CLASS)) as HTMLDivElement[];
    this.images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];

    new OverlayGallery(this.choosePreviousImage.bind(this), this.chooseNextImage.bind(this), this.images);

    this.currentIndex = this.dots.findIndex((dot) => dot.classList.contains(ACTIVE_CLASS));
    this.addEvents();
    this.findImages();
  }

  /**
   * Add click events to all the dots.
   */
  private addEvents() {
    this.dots.forEach((dot) => dot.addEventListener("click", this.onDotClickEvent.bind(this)));
    this.addOverlaySwipedActions();
  }

  /**
   * Choose previous image in the array.
   */
  private choosePreviousImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    const index = Number(currentImage.getAttribute("data-id")) - 1;
    this.currentIndex = index === -1 ? this.images.length - 1 : index;
    this.selectNewImages(this.dots[this.currentIndex]);

    currentImage.src = this.currentImage.src;
    currentImage.setAttribute("data-id", this.currentImage.getAttribute("data-id"));
  }

  /**
   * Choose next image in the array.
   */
  private chooseNextImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    const index = Number(currentImage.getAttribute("data-id")) + 1;
    this.currentIndex = index === this.images.length ? 0 : index;
    this.selectNewImages(this.dots[this.currentIndex]);

    currentImage.src = this.currentImage.src;
    currentImage.setAttribute("data-id", this.currentImage.getAttribute("data-id"));
  }

  /**
   * Add click event to the dot element that will change the currently visible images.
   */
  private onDotClickEvent(event: MouseEvent) {
    this.currentIndex = Number((event.target as HTMLDivElement).getAttribute("data-id"));
    this.selectNewImages(event.target as HTMLDivElement);
  }

  /**
   * Remove classes from previous images and add to new ones.
   */
  private selectNewImages(dot: HTMLDivElement) {
    this.removePreviousClasses();

    this.findImages();
    this.addClasses();

    this.dots.forEach((dot) => dot.classList.remove(ACTIVE_CLASS));
    dot.classList.add(ACTIVE_CLASS);
  }

  /**
   * Find the images based on the currently selected dot.
   */
  private findImages() {
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
    this.previousImage.classList.add(...["image--previous", "image--small"]);
  }

  /**
   * Add events for swipe left and right.
   */
  private addOverlaySwipedActions() {
    const container = document.querySelector(".dot-gallery");
    container.addEventListener("swiped-left", () => {
      const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
      this.onDotClickEvent({ target: this.dots[nextIndex] } as any);
    });
    container.addEventListener("swiped-right", () => {
      const previousIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
      this.onDotClickEvent({ target: this.dots[previousIndex] } as any);
    });
    
  }
}
