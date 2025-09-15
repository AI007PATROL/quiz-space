// functions/questions.js
export const onRequest = async ({ request }) => {
  try {
    const resp = await fetch(new URL('/data_questions.json', request.url).toString());
    const qs = await resp.json();

    return new Response(JSON.stringify(qs), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (e) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
};
