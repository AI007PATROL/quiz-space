// public/quiz.js

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    alert("⚠️ Please login first!");
    window.location.href = "/participant-login.html";
    return;
  }

  // Display user info
  const userInfoDiv = document.getElementById("userInfo");
  if (userInfoDiv) {
    userInfoDiv.textContent = `Logged in as: ${userId}`;
  }

  // Load questions
  fetch("/quiz_questions.json")
    .then((res) => res.json())
    .then((questions) => {
      renderQuestions(questions);

      // Attach submit listener
      const form = document.getElementById("quizForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let score = 0;
        questions.forEach((q, index) => {
          const selected = document.querySelector(
            `input[name="q${index}"]:checked`
          );
          if (selected && selected.value === q.answer) {
            score++;
          }
        });

        // Save result to DB via API (worker or backend)
        fetch("/api/save-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, score }),
        })
          .then((res) => res.json())
          .then((resp) => {
            alert(`✅ Quiz submitted! Your score: ${score}`);
            localStorage.removeItem("user_id"); // logout after submit
            window.location.href = "/thankyou.html";
          })
          .catch((err) => {
            console.error("Error saving result:", err);
            alert("⚠️ Could not save result, try again.");
          });
      });
    })
    .catch((err) => {
      console.error("Error loading questions:", err);
    });
});

function renderQuestions(questions) {
  const quizContainer = document.getElementById("quizQuestions");
  if (!quizContainer) return;

  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      ${q.options
        .map(
          (opt, i) => `
        <label>
          <input type="radio" name="q${index}" value="${opt}" /> ${opt}
        </label><br/>
      `
        )
        .join("")}
    `;
    quizContainer.appendChild(div);
  });
}
