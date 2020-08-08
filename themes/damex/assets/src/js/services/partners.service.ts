/**
 * Service responsible for handling the partners tab.
 */
export class PartnersService {
  /**
   * Contains list of all blocks with images.
   */
  private blocks: HTMLDivElement[];
  /**
   * Starting point for the indexes.
   */
  private currentIndex: number = 0;
  /**
   * Hide arrows below and blocks above that number.
   */
  private maximumBlocksCounts: number = 6;

  /**
   * Get the blocks elements and add event listeners to the buttons.
   */
  public init() {
    this.maximumBlocksCounts = window.getComputedStyle(document.querySelector("#hamburger")).display !== "flex" ? 6 : 1;
    this.blocks = Array.from(document.querySelectorAll(".partner-link")) as HTMLDivElement[];
    this.blocks.forEach((block) => block.classList.add("partner-link--hidden"));

    const nextButton = document.querySelector(".wp-block-cgb-damex-about-us-partners .next-button");
    const previousButton = document.querySelector(".wp-block-cgb-damex-about-us-partners .previous-button");

    if (this.blocks.length <= this.maximumBlocksCounts) {
      nextButton.classList.add(".button--hidden");
      previousButton.classList.add(".button--hidden");
    } else {
      nextButton.addEventListener("click", this.getBlocks.bind(this));
      previousButton.addEventListener("click", this.getBlocks.bind(this));
    }
    this.getBlocks({ target: nextButton } as any);
    this.addResizeEvent();
  }

  /**
   * Add on window resize event for blocks
   */
  private addResizeEvent() {
    const nextButton = document.querySelector(".wp-block-cgb-damex-about-us-partners .next-button");

    window.addEventListener("resize", () => {
      const current = this.maximumBlocksCounts;
      this.maximumBlocksCounts =
        window.getComputedStyle(document.querySelector("#hamburger")).display !== "flex" ? 6 : 1;
      if (current !== this.maximumBlocksCounts) {
        this.blocks.forEach((block) => block.classList.add("partner-link--hidden"));
        this.getBlocks({ target: nextButton } as any);
      }
    });
  }

  /**
   * Get this.maximumBlocksCounts next/previous blocks from the array. Loop the array if needed.
   */
  private getBlocks(event: MouseEvent) {
    const shouldShowNext = (event.target as HTMLElement).classList.contains("next-button");
    let newSavedIndex: number;

    for (let i = 0; i < this.maximumBlocksCounts; i++) {
      const index =
        this.currentIndex + i >= this.blocks.length
          ? this.currentIndex + i - this.blocks.length
          : this.currentIndex + i;

      let nextIndex: number;
      if (shouldShowNext) {
        nextIndex =
          index + this.maximumBlocksCounts >= this.blocks.length
            ? index + this.maximumBlocksCounts - this.blocks.length
            : index + this.maximumBlocksCounts;
      } else {
        nextIndex =
          index - this.maximumBlocksCounts < 0
            ? this.blocks.length + i - this.maximumBlocksCounts - 1
            : index - this.maximumBlocksCounts;
      }

      if (i == 0) {
        newSavedIndex = nextIndex;
      }

      this.blocks[index].classList.add("partner-link--hidden");
      this.blocks[nextIndex].classList.remove("partner-link--hidden");
    }

    this.currentIndex = newSavedIndex;
  }
}
