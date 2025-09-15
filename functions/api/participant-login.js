
export const onRequest = async ({ request }) => {
  const body = await request.json();
  const email = (body.email||'').toString().trim();
  const password = (body.password||'').toString().trim();
  try {
    const resp = await fetch(new URL('/data_users.json', request.url).toString());
    const users = await resp.json();
    const u = users.find(x=>x.email===email && x.password===password);
    if(u) return new Response(JSON.stringify({ success:true, email:u.email, username:u.username }), { status:200 });
    return new Response(JSON.stringify({ success:false }), { status:401 });
  } catch(e){
    return new Response(JSON.stringify({ success:false }), { status:500 });
  }
};
