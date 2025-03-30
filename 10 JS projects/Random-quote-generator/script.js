const quotes = [
  "The journey of a thousand miles begins with a single step. – Lao Tzu",
  "In the middle of difficulty lies opportunity. – Albert Einstein",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  //   "Do not watch the clock. Do what it does. Keep going. – Sam Levenson",
  //   "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  //   "Life is what happens when you’re busy making other plans. – John Lennon",
  //   "Happiness is not by chance, but by choice. – Jim Rohn",
  //   "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
  //   "It always seems impossible until it’s done. – Nelson Mandela",
  //   "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
];

const btn = document.querySelector("button");
const qouteplace = document.querySelector(".quotesplace");

let usedQuotes = []; // Keep track of shown quotes

function generateQuote() {
  // Check if all quotes have been shown
  if (usedQuotes.length === quotes.length) {
    usedQuotes = []; // Reset the array
  }

  let random;
  do {
    random = Math.floor(Math.random() * quotes.length); // Generate random index
  } while (usedQuotes.includes(random)); // Ensure no repetition

  usedQuotes.push(random); // Add to used list
  qouteplace.textContent = quotes[random]; // Display quote

  console.log(usedQuotes); // Debugging purpose
}

btn.addEventListener("click", generateQuote);
