
export const onRequest = async ({ request }) => {
  try {
    const body = await request.json();
    // This demo function evaluates using bundled questions.json for local testing.
    const resp = await fetch(new URL('/data_questions.json', request.url).toString());
    const all = await resp.json();
    const answers = body.answers || [];
    let attempted=0, correct=0, wrong=0;
    for(const a of answers){
      const q = all.find(x=>x.id===a.id);
      if(!q) continue;
      if(a.selected===null || a.selected===undefined) continue;
      attempted++;
      if(a.selected === q.answer_index) correct++; else wrong++;
    }
    const entry = { totalQuestions: answers.length, attempted, notAnswered: answers.length - attempted, correct, wrong, marks: correct };
    return new Response(JSON.stringify({ success:true, report: entry }), { status:200 });
  } catch(e){
    return new Response(JSON.stringify({ success:false }), { status:500 });
  }
};
