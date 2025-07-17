document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        if (usernameInput === "" || passwordInput === "") {
            alert("Please fill in both fields.");
            return;
        }

        // Fetch stored signup data from localStorage
        const storedData = JSON.parse(localStorage.getItem("signupData"));

        if (storedData) {
            const isUsernameValid = (
                usernameInput === storedData.username ||
                usernameInput === storedData.email ||
                usernameInput === storedData.phone
            );

            if (isUsernameValid && passwordInput === storedData.password) {
                alert("Login successful!");
                localStorage.setItem("isLoggedIn", "true"); // set login state
                localStorage.setItem("loggedInUser", usernameInput); // 👈 Save login ID
                window.location.href = "homepage.html";
            } else {
                alert("Incorrect username or password.");
            }
        } else {
            alert("No user found. Please sign up first.");
        }
    });

    // Social login redirects
    document.querySelector(".go").addEventListener("click", function () {
        window.location.href = "https://accounts.google.com/signin";
    });

    document.querySelector(".fb").addEventListener("click", function () {
        window.location.href = "https://www.facebook.com/login/";
    });
});
