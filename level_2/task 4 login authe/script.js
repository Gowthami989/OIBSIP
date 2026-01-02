function register() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;

    if (user === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Registration successful!");
    window.location.href = "index.html";
}

function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}

function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first");
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
