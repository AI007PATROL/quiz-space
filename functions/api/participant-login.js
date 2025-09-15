// functions/participant-login.js
export async function onRequestPost(context) {
  try {
    const { request } = context;
    const { user_id, password } = await request.json();

    // Load users.json (converted from Excel)
    const resp = await fetch(new URL("../public/users.json", import.meta.url));
    const users = await resp.json();

    const user = users.find(
      (u) => u["Email Address"] === user_id && String(u["Phone Number"]) === password
    );

    if (user) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
