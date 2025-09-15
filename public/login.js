// public/login.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Login form not found!");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop default reload

    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate using your uploaded DATA FOR QUIZ USERID,PW (data_users.json)
    fetch("/data_users.json")
      .then((res) => res.json())
      .then((users) => {
        const match = users.find(
          (u) => u.user_id === userId && u.password === password
        );

        if (match) {
          // Save session
          localStorage.setItem("user_id", userId);

          // Redirect to quiz page
          window.location.href = "/quiz.html";
        } else {
          alert("❌ Invalid User ID or Password");
        }
      })
      .catch((err) => {
        console.error("Error loading users:", err);
        alert("⚠️ Login failed, please try again later.");
      });
  });
});
