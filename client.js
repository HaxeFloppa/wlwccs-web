const socket = new WebSocket("wss://wlwccs.duckdns.org:80");
let account_id = "If Nathan is reading this... your roblox game will never come out >:(";

const EncryptData = new TextEncoder();
const DecryptData = new TextDecoder();
async function account_do(type) {
	const username_val = document.getElementById("username").value;
	const password_val = document.getElementById("password").value;
	const token = await window.crypto.subtle.digest("SHA-256", EncryptData.encode(username_val.concat(password_val)));
	socket.send(DecryptData.decode(token).concat(type));
};

function toggle_req() {
	socket.send(account_id);
};

function panel_switch() {
	const account_panel = document.querySelectorAll(".account-panel");
	for (let i = 0; i < account_panel.length; i++) {
		account_panel[i].remove();
	};
	const panel_heading = document.createElement("h1");
	text_test.innerText = "Server Panel";
	const toggle_but = document.createElement("button");
	toggle_but.setAttribute("onclick", "toggle_req()");
	document.getElementById("server-panel").appendChild(panel_heading);
	document.getElementById("server-panel").appendChild(toggle_but);
};

function signup_check(signup_status) {
	let signup_cut = signup_status.replace("S", "");
	switch (signup_cut) {
		case "1":
			console.log("signup failed");
			break;
		default:
			console.log("signup success");
			account_id = signup_cut;
			panel_switch();
			break;
	};
};

function login_check(login_status) {
	let login_cut = login_status.replace("L", "");
	switch (login_cut) {
		case "1":
			console.log("login failed");
			break;
		default:
			console.log("login success");
			account_id = login_cut;
			panel_switch();
			break;
	};
};

socket.onopen = () => {
	console.log('connected');
};

socket.onmessage = (event) => {
	console.log('received: ', event.data);
	switch (event.data[0]) {
		case "S":
			signup_check(event.data);
			break;
		case "L":
			login_check(event.data);
			break;
	};
};

socket.onclose = () => {
	console.log('disconnected');
};
