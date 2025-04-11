const Bill = document.getElementById("Bill");
const Tip = document.getElementById("Tippercentage");
const Persons = document.getElementById("NumberofPeople");
const TotolTip = document.querySelector(".totaltip");
const PerPerson = document.querySelector(".perperson");
const calculate = document.querySelector(".calculate");

calculate.addEventListener("click", () => {
  const billvalue = parseFloat(Bill.value);
  const tipValue = parseFloat(Tip.value);
  const NoofPerson = parseFloat(Persons.value);
  const percentvalue = billvalue * (tipValue / 100);
  const result = billvalue + percentvalue;
  const tipperperson = result / NoofPerson;

  TotolTip.textContent = `Total Tip : ${result.toFixed(2)}`;
  PerPerson.textContent = `Tip per person : ${tipperperson(2)}`;
});
