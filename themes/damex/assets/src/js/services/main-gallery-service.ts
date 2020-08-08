import { convertDashString } from "../helpers/convert-dash-string";
import { OverlayGallery } from "../helpers/overlay-gallery";

/**
 * Service responsible for handling image view for main gallery page.
 */
export class MainGalleryService {
  /**
   * List of gallery blocks.
   */
  private images: HTMLImageElement[];
  /**
   * Current index of the picture.
   */
  private index: number = null;

  /**
   * Initialize the service by adding click events to the blocks.
   */
  public init() {
    this.initializeSelectElement();
    this.images = Array.from(document.querySelectorAll(".blocks-gallery-item img")) as HTMLImageElement[];

    new OverlayGallery(this.choosePreviousImage.bind(this), this.chooseNextImage.bind(this), this.images);
  }

  private initializeSelectElement() {
    const galleries = Array.from(document.querySelectorAll(".wp-block-gallery"));
    const options = galleries.map((gallery) => Array.from(gallery.classList)[gallery.classList.length - 1]);

    const selector = document.querySelector(".gallery-select-element") as HTMLSelectElement;
    const optionElements = options.map((option) => {
      const element = document.createElement("option");
      element.value = option;
      element.innerText = convertDashString(option);
      return element;
    });

    selector.append(...optionElements);
    selector.addEventListener("change", this.toggleSelection.bind(this));
    selector.value = options[0];
    galleries.forEach((gallery, index) => {
      if (index !== 0) {
        gallery.classList.add("gallery--hidden");
      }
    });
  }

  private toggleSelection(event: MouseEvent) {
    const value = (event.target as any).value;
    const options = Array.from(document.querySelectorAll(".gallery-select-element option")) as HTMLOptionElement[];
    const currentIndex = options.findIndex((option) => option.value === value);

    const galleries = Array.from(document.querySelectorAll(".wp-block-gallery"));
    galleries.forEach((gallery, index) => {
      if (index === currentIndex) {
        gallery.classList.remove("gallery--hidden");
        return;
      }

      gallery.classList.add("gallery--hidden");
    });
  }

  /**
   * Choose previous image in the array.
   */
  private choosePreviousImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    this.index = this.index - 1 < 0 ? this.images.length - 1 : this.index - 1;
    currentImage.src = this.images[this.index].src;
  }

  /**
   * Choose next image in the array.
   */
  private chooseNextImage() {
    const currentImage = document.querySelector(".overlay-container img") as HTMLImageElement;
    this.index = this.index + 1 === this.images.length ? 0 : this.index + 1;
    currentImage.src = this.images[this.index].src;
  }
}
