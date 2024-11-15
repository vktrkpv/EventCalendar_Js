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

document.addEventListener("DOMContentLoaded", getTasks);
calendar.addEventListener('click', addTask);
btnModal.addEventListener('click',submitModal);

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = "none";


})

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


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

        const eventName = document.createElement('div');
        eventName.classList.add('small');

        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);

        day.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
        })

        calendar.appendChild(day);
    }

    eventSaver = document.querySelectorAll(".small");
    arrEventSaver = [...eventSaver];
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
    modal.style.display = "block";

}

function submitModal(e) {
    e.preventDefault();

    const description = document.querySelector('#input-description');

    const dayTask = document.createElement('div');        
    dayTask.classList.add("day-task-box");

    const taskDescription = document.createElement('p');        
    taskDescription.classList.add('description-par');
    taskDescription.innerHTML = description.value;

    dayTask.appendChild(taskDescription);
    saveLocalTask( taskDescription.innerHTML);

    document.querySelector('#input-description').value = "";

    const selectedDay = calendar.querySelector('.day.selected');
        if (selectedDay) {
            selectedDay.appendChild(dayTask);
        }

    modal.style.display = "none";
    }

function saveLocalTask(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeLocalTask(){

}

function getTasks() {

    console.log("it works ")

    let tasks;

    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }

    tasks.forEach(function (task) {

    const dayTask = document.createElement('div');        
    dayTask.classList.add("day-task-box");

    const taskDescription = document.createElement('p');        
    taskDescription.classList.add('description-par');
    taskDescription.innerHTML = task;

    dayTask.appendChild(taskDescription);

    const selectedDay = calendar.querySelector('.day.selected');
    selectedDay.appendChild(dayTask);


})
}







// Function calls 
createCalendarElements();
updateCalendar(currentMonth, currentYear);

