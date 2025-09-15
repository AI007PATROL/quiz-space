// functions/submit.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { user_id, score } = await request.json();

    if (!user_id || score === undefined) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fields" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    await env.QUIZ_DB.prepare(
      "INSERT INTO results (user_id, score) VALUES (?, ?)"
    ).bind(user_id, score).run();

    return new Response(
      JSON.stringify({ success: true, message: "Result saved!" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}
