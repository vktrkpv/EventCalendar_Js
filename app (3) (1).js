// Selectors 

const calendar = document.querySelector('#calendar');
const monthEl = document.querySelector('#monthName');
const previousMonth = document.querySelector('#previousMonth');
const nextMonth = document.querySelector('#nextMonth');


const modal = document.querySelector('#myModal');
const form = document.querySelector('.modal-content');
const btnModal = document.querySelector('.submit');
const closeModal = document.querySelector('.close-modal');

let eventSaver;
let arrEventSaver = [];

// Arrays

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// Event Listenrs 

previousMonth.addEventListener("click", ()=> {
    if (currentMonth === 0 ){
        currentMonth = 12;
        currentYear--;


    }
    updateCalendar(--currentMonth, currentYear);
   

});

nextMonth.addEventListener("click", ()=> {
    if (currentMonth === 11 ){
        currentMonth = -1;
        currentYear++;
    }

    updateCalendar(++currentMonth, currentYear);
   
});

calendar.addEventListener('click', addTask);
btnModal.addEventListener('click',submitModal);
// closeModal.addEventListener('click',closeModalWindow);



const today = new Date();
// let currentDay = today.getDate()
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

console.log(today);

// Functions 

function createCalendarElements() {
    for (let i = 0; i < 35; i++) {
        const day = document.createElement('div');
        day.classList.add('day');

        const dayText = document.createElement('p');
        dayText.classList.add('day-text');
        dayText.innerText = days[i % 7];

        const dayNumber = document.createElement('p');
        dayNumber.classList.add('day-number');

        const eventName = document.createElement('p');
        eventName.classList.add('small');

        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);

        calendar.appendChild(day);
    }

    eventSaver = document.querySelectorAll(".small");
    arrEventSaver = [...eventSaver];
    console.log(arrEventSaver);
}

function updateCalendar(month, year) {
    const dayElements = document.querySelectorAll('.day');

    const todayDate = new Date();
    todayDate.setMonth(month);
    todayDate.setFullYear(year);
    todayDate.setDate(1);

    const theFirstDayWeek = todayDate.getDay();
    const monthName = months[month];
    monthEl.innerText = `${year} - ${monthName}`;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayCounter = 1;

    dayElements.forEach(day => {
        const dayNumber = day.querySelector('.day-number');
        dayNumber.innerText = "";
    });

    for (let i = theFirstDayWeek; dayCounter <= daysInMonth; i++) {
        const day = dayElements[i];
        const dayNumber = day.querySelector('.day-number');
        dayNumber.innerText = dayCounter;
        dayCounter++;
    }
}

function addTask(e) {
    console.log("added");
    modal.style.display = "block";

}

    function submitModal(e) {
        e.preventDefault();

        const title = document.querySelector('#input-title').value;
        console.log(title);
        const description = document.querySelector('#input-description').value;
        console.log(description);

        // створюю куди мають зберегтись дані 

        const dayTask = document.createElement('div');
        dayTask.classList.add("day-task-box");

        const taskTitle = document.createElement('p');
        taskTitle.classList.add('title-par');
        taskTitle.innerHTML = title.value;


        const taskDescription = document.createElement('p');
        taskDescription.classList.add('description-par');
        taskDescription.innerHTML = description.value;


        dayTask.appendChild(taskTitle);
        dayTask.appendChild(taskDescription);

        title.value = "";
        description.value = "";

        calendar.appendChild(dayTask);
        modal.style.display = "none";













    }


// function closeModalWindow(e){

//     const item = e.target;

//     if(item.classList[0] === 'close-modal') {
//         modal.style.display = "none";
//     }
//     //  // When the user clicks on (x), close the modal

//  if (e.target === closeModal ){
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it

// else if (e.target === modal) {
//     modal.style.display = "none";
// }

// }




// Function calls 
createCalendarElements();
updateCalendar(currentMonth, currentYear);

