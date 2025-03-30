const colourinput = document.querySelector(".colourbox");
const colourvalue = document.querySelector(".colourvalue");
const copybtn = document.querySelector(".copy");
const complimentary = document.querySelector(".complimentary");
const savebtn = document.querySelector(".save");

colourinput.addEventListener("change", (e) => {
  const colourvalueInput = e.target.value;
  colourvalue.textContent = colourvalueInput;
  copybtn.style.backgroundColor = colourvalueInput;

  //complimentary colour picker business logic

  // remove the # from value
  const hexvalue = colourvalueInput.slice(1);

  const decimalvalue = parseInt(hexvalue, 16);

  const xorvalue = decimalvalue ^ 0xfffff;

  const complimentaryvalue = xorvalue.toString(16).padStart(6, 0);

  const resulthex = `#${complimentaryvalue}`;

  // now add it to complementary thing

  complimentary.value = resulthex;
  savebtn.style.backgroundColor = resulthex;
});

copybtn.addEventListener("click", () => {
  const currentValue = colourinput.value; // Get the latest value
  navigator.clipboard
    .writeText(currentValue)
    .then(() => {
      console.log("copied to clipboard");
    })
    .catch((err) => {
      console.log(err);
    });
});
