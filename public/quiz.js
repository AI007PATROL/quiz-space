
let questions = [];
let current = 0;
let answers = [];
let timer = 20*60;
let timerInterval = null;

async function loadQuestions(){
  // try API first
  try {
    const res = await fetch('/api/quiz');
    if(res.ok){ questions = await res.json(); }
    else { questions = await fetch('/data_questions.json').then(r=>r.json()); }
  } catch(e){
    questions = await fetch('/data_questions.json').then(r=>r.json());
  }
  // frontend picks random 20 out of questions
  questions = shuffle(questions).slice(0,20);
  answers = questions.map(q=>({id:q.id, selected:null}));
  showQuestion();
  startTimer();
}

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

function showQuestion(){
  const q = questions[current];
  document.getElementById('qtext').innerText = q.question;
  const opts = document.getElementById('opts'); opts.innerHTML='';
  q.options.forEach((o,i)=>{ const d=document.createElement('div'); d.className='opt'; d.innerText=o; d.onclick=()=>{ answers[current].selected=i; document.querySelectorAll('.opt').forEach(x=>x.style.boxShadow='none'); d.style.boxShadow='0 0 0 4px rgba(0,0,0,0.08)'; }; opts.appendChild(d); });
  document.getElementById('submit').style.display = (current===questions.length-1)?'inline-block':'none';
}
document.getElementById('next')?.addEventListener('click', ()=>{ if(current<questions.length-1){ current++; showQuestion(); } });
document.getElementById('prev')?.addEventListener('click', ()=>{ if(current>0){ current--; showQuestion(); } });
document.getElementById('submit')?.addEventListener('click', submitQuiz);

function startTimer(){ timerInterval=setInterval(()=>{ timer--; const m=Math.floor(timer/60), s=timer%60; document.getElementById('timer').innerText = `${m}:${s<10? '0'+s : s}`; if(timer<=0){ clearInterval(timerInterval); submitQuiz(); } },1000); }

async function submitQuiz(){
  clearInterval(timerInterval);
  const payload = { email: JSON.parse(localStorage.getItem('quizUser')||'{}').email, answers };
  try{
    const res = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const j = await res.json();
    alert('Submitted. Score: '+j.report.marks+'/'+j.report.totalQuestions);
    window.location.href='/';
  }catch(e){
    // fallback evaluate locally using data_questions.json
    const all = await fetch('/data_questions.json').then(r=>r.json());
    let correct=0, attempted=0;
    answers.forEach(a=>{ const q=all.find(x=>x.id===a.id); if(a.selected!==null){ attempted++; if(a.selected===q.answer_index) correct++; }});
    alert(`Score (local): ${correct}/${answers.length}`);
    window.location.href='/';
  }
}

window.addEventListener('load', ()=>{ const user = localStorage.getItem('quizUser'); if(!user && !location.pathname.endsWith('participant-login.html')){ window.location.href='/participant-login.html'; } if(location.pathname.endsWith('quiz.html')) loadQuestions(); });
