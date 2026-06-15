// ===== STATE =====
let state = {
water: 0,
appointments: [],
healthScore: 0
};

// ===== NAVIGATION =====
function showSection(id) {
document.querySelectorAll(".page")
.forEach(p => p.style.display = "none");

document.getElementById(id).style.display = "block";
}

// ===== INIT =====
window.onload = () => {
loadData();
initYoga();
showSection("dashboard");
updateUI();
};

// ===== LOCAL STORAGE =====
function saveData() {
localStorage.setItem("caremate", JSON.stringify(state));
}

function loadData() {
let data = JSON.parse(localStorage.getItem("caremate"));
if(data) state = data;
}

// ===== WATER =====
function addWater(amount) {
state.water += amount;
saveData();
updateUI();
}

// ===== APPOINTMENTS =====
function saveAppointment() {

let app = {
doc: docName.value,
hospital: hospital.value,
date: date.value,
time: time.value
};

state.appointments.push(app);
saveData();
renderAppointments();
}

// ===== YOGA =====
function initYoga() {

const yoga = [
{
name:"Chair Yoga",
desc:"Improves flexibility",
img:"https://images.unsplash.com/photo-1607962837359"
},
{
name:"Breathing",
desc:"Reduces stress",
img:"https://images.unsplash.com/photo-1506126613408"
}
];

let html = "";

yoga.forEach(y => {
html += `
<div class="card">
<h3>${y.name}</h3>
<img src="${y.img}">
<p>${y.desc}</p>
</div>`;
});

document.getElementById("yogaList").innerHTML = html;
}

// ===== AI CHAT =====
function askAI() {

let msg = document.getElementById("msg").value;
let response = "";

if(msg.includes("water")) {
response = "Drink 2–3 liters daily.";
}
else if(msg.includes("appointment")) {
response = "Check your dashboard for upcoming visits.";
}
else {
response = "Please consult a doctor for detailed advice.";
}

document.getElementById("chatBox").innerHTML +=
`<p><b>You:</b> ${msg}</p><p><b>AI:</b> ${response}</p>`;
}

// ===== UI =====
function updateUI() {

document.getElementById("waterDisplay").innerText =
"Water: " + state.water + "ml";

document.getElementById("healthScore").innerText =
Math.min(100, state.water / 50);

}
