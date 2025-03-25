const listBooks = document.querySelector(".bookslist");
const elem = document.querySelector(".pagination ul");
const sort = document.querySelector(".sort");
let pages = 1;
const limit = 5;

async function fetchBooks() {
  try {
    const response = await fetch(
      `https://api.freeapi.app/api/v1/public/books?page=${pages}&limit=${limit}`
    );
    const data = await response.json();
    return {
      books: data?.data?.data || [],
      totalPages: data?.data?.totalPages || 1, // Extract total pages
    };
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
  }
}

async function showBooks() {
  const { books, totalPages } = await fetchBooks();

  listBooks.innerHTML = ""; // Clear previous books

  if (books) {
    books.forEach((list) => {
      const formattedAuthors = formatAuthors(list?.volumeInfo?.authors || []);
      const div = document.createElement("div");
      div.innerHTML = `
        <img class="thumbnail" src="${list?.volumeInfo?.imageLinks?.thumbnail}" alt="Book Thumbnail">
        <div>
          <h2>${list?.volumeInfo?.title}</h2>
          <span>${formattedAuthors}</span>
          <span>${list?.volumeInfo?.publisher}</span>
          <span>${list?.volumeInfo?.publishDate}</span>
        </div>
      `;
      listBooks.appendChild(div);
    });

    createPagination(totalPages); // Dynamically update pagination
  }
}

function formatAuthors(authors) {
  if (authors.length > 2) {
    return `${authors[0]}, ${authors[1]}`;
  }
  return authors.join(", ");
}

async function createPagination(totalPages) {
  const maxVisiblePages = 7; // Maximum pages to show at once
  let startPage = Math.max(1, pages - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust the startPage if the range is less than maxVisiblePages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  elem.innerHTML = ""; // Clear existing pagination

  // Add "Previous" button
  if (pages > 1) {
    const prevLi = document.createElement("li");
    prevLi.textContent = "Previous";
    prevLi.classList.add("btn");
    prevLi.addEventListener("click", () => {
      pages--;
      showBooks();
    });
    elem.appendChild(prevLi);
  }

  // Add page numbers dynamically
  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    li.classList.add("numb");
    if (i === startPage) li.classList.add("first");
    if (i === endPage) li.classList.add("last");
    if (i === pages) li.classList.add("active"); // Highlight active page
    li.addEventListener("click", () => {
      pages = i;
      showBooks();
    });
    elem.appendChild(li);
  }

  // Add "Next" button
  if (pages < totalPages) {
    const nextLi = document.createElement("li");
    nextLi.textContent = "Next";
    nextLi.classList.add("btn");
    nextLi.addEventListener("click", () => {
      pages++;
      showBooks();
    });
    elem.appendChild(nextLi);
  }
}



function sortBooksAlphabetically(books) {
  return books.sort((a, b) => {
    const titleA = a.volumeInfo.title.toLowerCase();
    const titleB = b.volumeInfo.title.toLowerCase();
    return titleA.localeCompare(titleB); // Sort alphabetically
  });
}

async function showBooksSorted() {
  const { books } = await fetchBooks();
  const sortedBooks = sortBooksAlphabetically(books);
  listBooks.innerHTML = ""; // Clear existing books
  sortedBooks.forEach((book) => {
    const formattedAuthors = formatAuthors(book?.volumeInfo?.authors || []);
    const div = document.createElement("div");
    div.innerHTML = `
      <img class="thumbnail" src="${book?.volumeInfo?.imageLinks?.thumbnail}" alt="Book Thumbnail">
      <div>
        <h2>${book?.volumeInfo?.title}</h2>
        <span>${formattedAuthors}</span>
        <span>${book?.volumeInfo?.publisher}</span>
        <span>${book?.volumeInfo?.publishDate}</span>
      </div>
    `;
    listBooks.appendChild(div);
  });
}

// Call this on a "Sort" button click
sort.addEventListener("click", showBooksSorted);

// Initial Render
showBooks();
