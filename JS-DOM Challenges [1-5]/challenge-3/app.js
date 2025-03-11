/**
 * Write your challenge solution here
 */

const formElements = document.querySelectorAll(
  ".form-group input , .form-group textarea"
);

// const profileinfo = document.querySelectorAll(".profile-info p");

// profileinfo.forEach((p) => {
//   console.log(p.children[0].textContent);

// });

// console.log(profileinfo);

formElements.forEach((input) => {
  input.addEventListener("input", (e) => {
    // Get corresponding display element ID

    const displayId = input.id.replace("Input", "Display");
    console.log(displayId);
    const displayElement = document.getElementById(displayId);

    // Update display text (handle empty values)
    displayElement.textContent = e.target.value || "Not provided";
  });
});
