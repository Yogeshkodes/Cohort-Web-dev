/**
 * Write your challenge solution here
 */

const accordian = document.querySelectorAll(".accordion-item");

const button = document.querySelectorAll(".accordion-button");

const arrow = document.querySelectorAll(".arrow");

accordian.forEach((accord) => {
  accord.addEventListener("click", (event) => {
    const button = event.target.closest(".accordion-button");

    if (!button) return;

    const parentItem = button.closest(".accordion-item");
    const content = parentItem.querySelector(".accordion-content");

    const arrow = button.querySelector(".arrow");

    const isOpen = content.classList.toggle("active");
    content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : "0";
    arrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0)";

    accordian.forEach((accord) => {
      if (accord !== parentItem) {
        accord.classList.remove("active");
        accord.querySelector(".accordion-content").style.maxHeight = "0";
        accord.querySelector(".arrow").style.transform = "rotate(0)";
      }
    });
  });
});
