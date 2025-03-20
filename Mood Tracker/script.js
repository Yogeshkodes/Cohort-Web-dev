const moods = document.querySelectorAll(".moods");
const date = document.querySelector(".time");
const statusMood = document.querySelector(".status");
const data = JSON.parse(localStorage.getItem("Moods")) || [];
const section = document.querySelector(".section");
const month = document.querySelector(".month");
const week = document.querySelector(".week");

const state = {
  "☺️": "Wow, you're happy ☺️ today!",
  "😐": "Good that you're neutral 😐 today.",
  "😔": "Sorry that you're sad 😔 today.",
  "😃": "I'm happy that you're excited 😃 today!",
};

function loadState() {
  const todaydate = date.textContent;

  const todayMood = data.find((entry) => entry.date === todaydate);

  if (todayMood) {
    statusMood.textContent = state[todayMood.mood];
  }

  data.forEach((data) => {
    const div = document.createElement("div");
    const spandate = document.createElement("span");
    const spanmood = document.createElement("span");

    div.classList.add("showdates");
    spandate.classList.add("showdate");
    spanmood.classList.add("showmood");

    spandate.textContent = `${data.date}`;
    spanmood.textContent = state[data.mood];
    div.appendChild(spandate);
    div.appendChild(spanmood);
    section.appendChild(div);
  });
}

const dates = new Date();
const monthName = dates.toLocaleString("default", { month: "long" });
const year = dates.getFullYear();

month.textContent = `${monthName}-${year}`;

function displayTime() {
  const now = new Date();
  const todaydate = now.getDate();

  date.textContent = todaydate;
}
displayTime();
loadState();
moods.forEach((mood) => {
  mood.addEventListener("click", (e) => {
    const selectedMood = e.target.textContent;
    const selectedDate = date.textContent;
    const existingEntryIndex = data.findIndex(
      (entry) => entry.date === selectedDate
    );

    if (existingEntryIndex !== -1) {
      data[existingEntryIndex].mood = selectedMood;
    } else {
      data.push({ date: selectedDate, mood: selectedMood });
    }

    statusMood.textContent = state[selectedMood];
    localStorage.setItem("Moods", JSON.stringify(data));
    // Re-render the updated state
    loadState();
  });
});

month.addEventListener("click", () => {
  const existingCalendar = month.querySelector(".active"); // Check if calendar is already added

  if (existingCalendar) {
    // If calendar exists, remove it
    existingCalendar.remove();
    return;
  }

  const div = document.createElement("div");
  div.innerHTML = ` <table bgcolor="lightgrey" align="center"
        cellspacing="21" cellpadding="21">
         
        <!-- The tr tag is used to enter 
            rows in the table -->
 
        <!-- It is used to give the heading to the
            table. We can give the heading to the 
            top and bottom of the table -->
 
        <caption align="top">
            <!-- Here we have used the attribute 
                that is style and we have colored 
                the sentence to make it better 
                depending on the web page-->
        </caption>
 
        <!-- Here th stands for the heading of the
            table that comes in the first row-->
 
        <!-- The text in this table header tag will 
            appear as bold and is center aligned-->
 
        <thead>
            <tr>
                <!-- Here we have applied inline style 
                     to make it more attractive-->
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>sat</th>
            </tr>
        </thead>
         
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>1</td>
                <td>2</td>
            </tr>
            <tr></tr>
            <tr>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
            </tr>
            <tr>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
            </tr>
            <tr>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
            </tr>
            <tr>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
            </tr>
            <tr>
                <td>31</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
        </tbody>
    </table>`;
  div.classList.add("active");
  month.appendChild(div);

  div.addEventListener("click", (e) => {
    const selectedDate = e.target.textContent;

    // Make sure user clicked on a valid date (not an empty cell)
    if (!selectedDate || isNaN(selectedDate)) return;

    // Update the `.time` element with the selected date

    date.textContent = selectedDate;
    statusMood.textContent = `How are feeling today?`;
    div.remove();
  });
});
