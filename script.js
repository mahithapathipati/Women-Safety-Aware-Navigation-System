// Welcome message when website loads

window.onload = function () {
    alert("Welcome to Women Safety Aware Navigation System");
};


// Emergency alert function

function emergencyAlert() {
    alert("Emergency Alert Activated! Your location will be shared with emergency contacts.");
}
function scrollToAbout() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}
function loginUser() {

    let username = document.querySelector("input[type='text']").value;
    let password = document.querySelector("input[type='password']").value;


    let savedUsername = localStorage.getItem("username");
    let savedPassword = localStorage.getItem("password");


    if(username === savedUsername && password === savedPassword) {

        window.location.href = "dashboard.html";

    }
    else {

        alert("Invalid username or password.");

    }

}
function logoutUser() {

    localStorage.removeItem("username");
    localStorage.removeItem("password");

    alert("Logged out successfully.");

    window.location.href = "login.html";

}
function registerUser() {

    let name = document.querySelector("input[placeholder='Enter Full Name']").value;
    let email = document.querySelector("input[placeholder='Enter Email']").value;
    let username = document.querySelector("input[placeholder='Create Username']").value;
    let password = document.querySelector("input[placeholder='Create Password']").value;


    if(name === "" || email === "" || username === "" || password === "") {

        alert("Please fill all registration details.");
        return;

    }


    localStorage.setItem("username", username);
    localStorage.setItem("password", password);


    alert("Registration Successful! Please Login.");

    window.location.href = "login.html";

}
function showUser() {

    let username = localStorage.getItem("username");

    if(username) {

        let hour = new Date().getHours();

        let greeting = "";

        if(hour < 12){
            greeting = "🌅 Good Morning";
        }
        else if(hour < 17){
            greeting = "☀️ Good Afternoon";
        }
        else if(hour < 20){
            greeting = "🌇 Good Evening";
        }
        else{
            greeting = "🌙 Good Night";
        }

        document.getElementById("welcomeUser").innerHTML =
        greeting + ", " + username;

        document.getElementById("welcomeMessage").innerHTML =
        "🛡️ Your safety is our priority. Have a safe journey!";

        document.getElementById("profileUsername").innerHTML =
        username;

    }

}
function getLocation() {

    let locationText = document.getElementById("location");

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                currentLocation = [latitude, longitude];

                locationText.innerHTML =
                "Latitude: " + latitude +
                "<br>Longitude: " + longitude;
                map.setView([latitude, longitude], 15);

                L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("📍 You are here!")
                .openPopup();

            },

            function() {

                locationText.innerHTML =
                "Unable to access location.";

            }

        );

    } 
    else {

        locationText.innerHTML =
        "Geolocation is not supported by this browser.";

    }

}
var map;
var currentLocation = null;
var routeLine = null;
let timer;

function loadMap() {

    map = L.map('map').setView([14.4426, 79.9865], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        attribution: '&copy; OpenStreetMap contributors'

    }).addTo(map);

}
function searchDestination() {

    let destination = document.getElementById("destination").value.toLowerCase();

    let places = {

        "narayana engineering college": [14.4426, 79.9865],

        "nellore railway station": [14.4428, 79.9860],

        "nellore bus stand": [14.4445, 79.9840]

    };

    if(destination === ""){

        alert("Please enter a destination.");
        return;

    }

    if(places[destination]){

        let location = places[destination];
        if(currentLocation){

            if(routeLine){
                map.removeLayer(routeLine);
            }

            routeLine = L.polyline(
                [currentLocation, location],
                {
                    color: "blue",
                    weight: 5
                }
            ).addTo(map);
        }

        L.marker(location)
            .addTo(map)
            .bindPopup(destination)
            .openPopup();

        map.setView(location, 15);
        let safety = document.getElementById("safetyMessage");

        if(destination === "narayana engineering college"){
            safety.innerHTML = "🟢 Safe Area";
        }
        else if(destination === "nellore railway station"){
        safety.innerHTML = "🟡 Moderate Risk";
        }
        else{
            safety.innerHTML = "🔴 High Risk";
        }
    }
    else{

        alert("Destination not found in demo list.");

    }

}
function sendSOS() {

    let message = document.getElementById("sosMessage");
    let countdown = document.getElementById("countdown");
    let cancelBtn = document.getElementById("cancelSOS");

    if(!currentLocation){

        message.innerHTML =
        "Please click 'Get My Location' before sending an SOS.";

        return;

    }

    let seconds = 5;
    cancelBtn.style.display = "inline-block";

    countdown.innerHTML =
    "Sending SOS in " + seconds + " seconds...";

    timer = setInterval(function(){

        seconds--;

        countdown.innerHTML =
        "Sending SOS in " + seconds + " seconds...";

    if(seconds <= 0){

    clearInterval(timer);

    countdown.innerHTML = "";

    cancelBtn.style.display = "none";

    message.innerHTML =
    "🆘 Emergency Alert Sent!<br><br>" +
    "Latitude: " + currentLocation[0] +
    "<br>Longitude: " + currentLocation[1];

    }
    },1000);

}
function cancelSOS(){

    clearInterval(timer);

    document.getElementById("countdown").innerHTML =
    "SOS Cancelled.";

    document.getElementById("cancelSOS").style.display =
    "none";

}
setInterval(updateDateTime, 1000);
function getWeather(){

    let weather = document.getElementById("weatherInfo");

    if(currentLocation){

        weather.innerHTML =
        "📍 Current Location Weather<br><br>" +
        "🌤 Condition: Sunny<br>" +
        "🌡 Temperature: 30°C<br>" +
        "💧 Humidity: 60%";

    }
    else{

        weather.innerHTML =
        "Please click 'Get My Location' first.";

    }

}
function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeBtn");

    if(document.body.classList.contains("dark-mode")){

        button.innerHTML = "☀️ Light Mode";

        localStorage.setItem("theme","dark");

    }
    else{

        button.innerHTML = "🌙 Dark Mode";

        localStorage.setItem("theme","light");

    }

}
function loadTheme(){

    let theme = localStorage.getItem("theme");

    if(theme === "dark"){

        document.body.classList.add("dark-mode");

        document.getElementById("themeBtn").innerHTML =
        "☀️ Light Mode";

    }

}
function submitFeedback(){

    let feedback =
    document.getElementById("feedback").value;

    if(feedback === ""){

        alert("Please enter your feedback.");

        return;

    }

    document.getElementById("feedbackMessage").innerHTML =
    "✅ Thank you for your feedback!";

    document.getElementById("feedback").value = "";

}
// Show button when user scrolls
window.onscroll = function () {

    let button = document.getElementById("topBtn");

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {

        button.style.display = "block";

    } else {

        button.style.display = "none";

    }
};

// Scroll to top
function topFunction() {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

}
function showLoading(button){

    let originalText = button.innerHTML;

    button.innerHTML = "⏳ Loading...";

    button.disabled = true;

    setTimeout(function(){

        button.innerHTML = originalText;

        button.disabled = false;

    },2000);

}
function showDashboardWelcome(){

    alert("🎉 Welcome to the Women Safety Aware Navigation System Dashboard!");

}
function searchTips(){

    let input = document.getElementById("tipSearch").value.toLowerCase();

    let result = document.getElementById("searchResult");

    if(input === "phone"){

        result.innerHTML = "📱 Keep your phone fully charged before travelling.";

    }
    else if(input === "location"){

        result.innerHTML = "📍 Share your live location with trusted contacts.";

    }
    else if(input === "sos"){

        result.innerHTML = "🆘 Use the SOS button immediately during emergencies.";

    }
    else if(input === "route"){

        result.innerHTML = "🛣 Always choose well-lit and crowded routes.";

    }
    else{

        result.innerHTML = "❌ No matching safety tip found.";

    }

}
function showCategoryTips(){

    let category = document.getElementById("tipCategory").value;

    let result = document.getElementById("categoryResult");

    if(category === "travel"){

        result.innerHTML =
        "🚶 Travel Tip: Prefer well-lit roads and avoid isolated areas.";

    }
    else if(category === "emergency"){

        result.innerHTML =
        "🆘 Emergency Tip: Keep emergency numbers saved and use the SOS button if needed.";

    }
    else if(category === "technology"){

        result.innerHTML =
        "📱 Technology Tip: Keep GPS enabled and your phone battery charged.";

    }
    else{

        result.innerHTML =
        "⚠️ Please select a category.";

    }

}
function checkQuiz(){

    let answer = document.getElementById("quizAnswer").value;

    let result = document.getElementById("quizResult");

    if(answer === "2"){

        result.innerHTML =
        "✅ Correct! Using the SOS button and contacting emergency services is the safest action.";

    }
    else if(answer === ""){

        result.innerHTML =
        "⚠️ Please select an answer.";

    }
    else{

        result.innerHTML =
        "❌ Incorrect. Try again!";

    }

}
function updateChecklist(){

    let items = document.querySelectorAll(".checkItem");

    let completed = 0;

    items.forEach(function(item){

        if(item.checked){
            completed++;
        }

    });

    document.getElementById("checklistCount").innerHTML =
    "Completed: " + completed + "/" + items.length;

    let score = (completed / items.length) * 100;

    document.getElementById("safetyScore").innerHTML =
    score + "%";

    document.getElementById("safetyProgress").value =
    score;

    if(score === 100){

    document.getElementById("safetyLevel").innerHTML =
    "🟢 High";

    }
    else if(score >= 60){

        document.getElementById("safetyLevel").innerHTML =
        "🟡 Medium";

    }
    else{

        document.getElementById("safetyLevel").innerHTML =
        "🔴 Low";

    }

    if(completed === items.length){

    let time = new Date().toLocaleTimeString();

    document.getElementById("checklistCount").innerHTML =
    "Completed: " + completed + "/" + items.length +
    "<br>🎉 Great! You are ready for a safe journey." +
    "<br>🕒 Completed at: " + time;

    }
}
updateChecklist();

function resetChecklist(){

    if(confirm("Are you sure you want to reset the checklist?")){

        let items = document.querySelectorAll(".checkItem");

        items.forEach(function(item){
            item.checked = false;
        });

        updateChecklist();

    }

}

function updateDateTime(){

    let now = new Date();

    let day = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    let date = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    let time = now.toLocaleTimeString("en-US");

    document.getElementById("currentDateTime").innerHTML =
    "<span style='color:#6A0DAD;font-weight:bold;'>📅 Today is " +
    day + ", " + date +
    "</span><br>" +
    "<span style='color:#007BFF;font-weight:bold;'>🕒 Current Time: " +
    time +
    "</span>";
}

updateDateTime();
setInterval(updateDateTime, 1000);

function showLastLogin(){

    let now = new Date();

    document.getElementById("lastLogin").innerHTML =
    now.toLocaleString("en-GB");
}

showLastLogin();

let seconds = 0;

function updateSessionTimer(){

    seconds++;

    let minutes = Math.floor(seconds / 60);

    let secs = seconds % 60;

    document.getElementById("sessionTimer").innerHTML =
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0");
}

setInterval(updateSessionTimer, 1000);

function updateConnectionStatus(){

    if(navigator.onLine){

        document.getElementById("connectionStatus").innerHTML =
        "🟢 Online";

    }
    else{

        document.getElementById("connectionStatus").innerHTML =
        "🔴 Offline";

    }
}
function showBrowserInfo(){

    document.getElementById("browserInfo").innerHTML =
    navigator.userAgent;

}
updateConnectionStatus();

showBrowserInfo();

window.addEventListener("online", updateConnectionStatus);

window.addEventListener("offline", updateConnectionStatus);