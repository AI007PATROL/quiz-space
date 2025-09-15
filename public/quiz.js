// Function to submit result to backend
async function submitResult(userId, score) {
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, score }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (data.success) {
      alert("✅ Result saved successfully!");
    } else {
      alert("⚠️ Failed to save result: " + data.error);
    }
  } catch (err) {
    console.error("Error saving result:", err);
    alert("❌ Error saving result");
  }
}

// Function to evaluate quiz
function evaluateQuiz(answers, allQuestions, userId) {
  let attempted = 0, correct = 0, wrong = 0;

  for (const a of answers) {
    const q = allQuestions.find(x => x.id === a.id);
    if (!q) continue;
    if (a.selected === null || a.selected === undefined) continue;
    attempted++;
    if (a.selected === q.answer_index) correct++; else wrong++;
  }

  const report = {
    totalQuestions: answers.length,
    attempted,
    notAnswered: answers.length - attempted,
    correct,
    wrong,
    marks: correct
  };

  console.log("Final Report:", report);

  // 🔑 Auto-submit result to backend
  submitResult(userId, report.marks);

  return report;
}

// Example usage when quiz ends
// Suppose you already have `answers` and `allQuestions`
document.getElementById("finishBtn").addEventListener("click", () => {
  const userId = document.getElementById("userIdInput").value; // take from login/input
  const report = evaluateQuiz(answers, allQuestions, userId);

  // Show report to user
  alert(`You scored ${report.marks}/${report.totalQuestions}`);
});
