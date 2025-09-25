const questions = [
  {q:'Що таке Adobe Dreamweaver?', a:['Графічний редактор','IDE для веб-розробки','Онлайн магазин','Сервер баз даних'], correct:1},
  {q:'Головний файл сайту?', a:['index.html','main.docx','project.dwg','site.exe'], correct:0},
  {q:'Яка мова стилів використовується?', a:['Python','CSS','SQL','Markdown'], correct:1},
  {q:'Що таке Live Preview?', a:['Публікація сайту','Попередній перегляд змін','Редактор зображень','Інструмент SEO'], correct:1},
  {q:'Протокол для завантаження сайту?', a:['FTP/SFTP','SMTP','IMAP','SNMP'], correct:0},
  {q:'WYSIWYG означає?', a:['Формат зображення','What You See Is What You Get','Серверне програмування','Тип шрифта'], correct:1},
  {q:'Файл для логіки на стороні клієнта?', a:['styles.css','index.html','scripts.js','readme.txt'], correct:2},
  {q:'Навіщо налаштовувати Site у Dreamweaver?', a:['Щоб швидше працювала програма','Для зручних шляхів та публікації','Щоб змінити мову','Щоб прискорити інтернет'], correct:1},
  {q:'Чи можна використовувати Dreamweaver без знання коду?', a:['Так, тільки візуально','Ні, обов\'язково код','Тільки для PHP','Тільки для CSS'], correct:0},
  {q:'Що НЕ можна робити в Dreamweaver?', a:['Редагувати HTML','Попередній перегляд','Редагувати відео','Налаштувати FTP'], correct:2}
];

const container = document.getElementById('quiz-container');

function renderQuiz(){
  container.innerHTML = '';
  questions.forEach((item, idx)=>{
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-item';
    qDiv.innerHTML = `<strong>Питання ${idx+1}:</strong> ${item.q}`;
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers';
    item.a.forEach((ans, i)=>{
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.innerText = ans;
      btn.dataset.q = idx;
      btn.dataset.a = i;
      btn.addEventListener('click', ()=>{
        answersDiv.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      answersDiv.appendChild(btn);
    });
    qDiv.appendChild(answersDiv);
    container.appendChild(qDiv);
  });
}

function checkAnswers(){
  let score = 0;
  const review = document.getElementById('review');
  review.innerHTML = '';
  questions.forEach((item, idx)=>{
    const qBlock = container.children[idx];
    const chosen = qBlock.querySelector('.answer.selected');
    const answers = qBlock.querySelectorAll('.answer');
    answers.forEach(a=>a.classList.remove('correct','wrong'));
    if(chosen){
      const chosenIndex = Number(chosen.dataset.a);
      if(chosenIndex === item.correct){
        score++;
        chosen.classList.add('correct');
      } else {
        chosen.classList.add('wrong');
        answers[item.correct].classList.add('correct');
      }
    } else {
      answers[item.correct].classList.add('correct');
    }
  });
  document.getElementById('score').innerText = `Ваш результат: ${score} / ${questions.length}`;
}

document.getElementById('check-btn').addEventListener('click', checkAnswers);
document.getElementById('reset-btn').addEventListener('click', ()=>{
  renderQuiz();
  document.getElementById('score').innerText = '';
  document.getElementById('review').innerHTML = '';
});

renderQuiz();