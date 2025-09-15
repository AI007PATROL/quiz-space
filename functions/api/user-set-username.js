
export const onRequest = async ({ request }) => {
  const body = await request.json();
  const email = body.email;
  const username = body.username;
  try {
    // For Pages functions using static JSON, we can't persist; this endpoint is for D1 or future implementation.
    // Return success to let frontend store locally.
    return new Response(JSON.stringify({ success:true }), { status:200 });
  } catch(e){
    return new Response(JSON.stringify({ success:false }), { status:500 });
  }
};
