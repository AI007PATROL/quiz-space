
export const onRequest = async ({ request }) => {
  // For demo, return empty reports; when using D1, implement querying.
  return new Response(JSON.stringify([]), { status:200 });
};
