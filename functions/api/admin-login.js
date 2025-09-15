
export const onRequest = async ({ request }) => {
  const body = await request.json();
  const username = body.username;
  const password = body.password;
  // simple admin list (change as needed)
  const admins = [{username:'admin-007',password:'admin007'},{username:'admin2-008',password:'admin008'},{username:'admin3-001',password:'admin001'},{username:'mohan-hari007',password:'mohan007'}];
  const ok = admins.find(a=>a.username===username && a.password===password);
  if(ok) return new Response(JSON.stringify({ success:true }), { status:200 });
  return new Response(JSON.stringify({ success:false }), { status:401 });
};
