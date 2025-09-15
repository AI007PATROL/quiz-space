
export const onRequest = async ({ request }) => {
  try {
    const resp = await fetch(new URL('/data_questions.json', request.url).toString());
    const qs = await resp.json();
    // return full set; frontend will pick random 20
    return new Response(JSON.stringify(qs), { status:200 });
  } catch(e){
    return new Response(JSON.stringify([]), { status:500 });
  }
};
