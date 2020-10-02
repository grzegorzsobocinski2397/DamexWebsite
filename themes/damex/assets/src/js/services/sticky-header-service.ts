/**
 * Responsible for handling sticky and relative header classes for top bar address when scrolling.
 */
export class StickyHeaderService {
  /**
   * Initialize the service by listening to the scroll event. 
   */
  public init() {
    this.addEventListener();
  }

  /**
   * Add event listener to the window for scroll.
   */
  private addEventListener() {
    window.addEventListener("scroll", this.onScroll);
  }

  /**
   * Toggle the sticky class based on the scroll position.
   */
  private onScroll() {
    const topBarElement = document.querySelector(".top-bar") as HTMLElement;
    const headerElement = document.querySelector("#header") as HTMLElement;

    if (window.scrollY >= topBarElement.offsetHeight) {
      headerElement.classList.add("header-sticky");
    } else {
      headerElement.classList.remove("header-sticky");
    }
  }
}
