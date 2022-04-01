const quizA = [zero, first, second, third, fourth]
const result_List = []

for(let RES_NUM = 0; RES_NUM < quizA.length; RES_NUM++){result_List.push(document.querySelectorAll(`.answer${RES_NUM}`))}

function getSelected() {
    const answer_List = []    
    for(let RES_NUM_ANS = 0; RES_NUM_ANS < quizA.length; RES_NUM_ANS++){result_List[RES_NUM_ANS].forEach((res) => {if (res.checked) answer_List.push(res.id)}) }
    return [answer_List] }

const btn = document.querySelector('#submit')
let score = 0

btn.addEventListener('click', () => {
    const answers = getSelected().toString().split(',')
    for(let num = 0; num < answers.length; num++){answers[num].toString() === quizA[num] ? score++ : score}

    (score === 5 ? document.querySelector("#quiz").innerHTML = quiz.innerHTML = 
                    `<h2 style="color: green;">You answered correctly at ${score}/5 questions.</h2>            
                    <button class="btn btn-success" onclick="location.reload()">Retake?</button>
                    <a href="/dashboard" class="btn btn-secondary" style="text-align: center;">Go to Dashboard</a>` 
                    :
                    document.querySelector("#quiz").innerHTML = quiz.innerHTML = 
                    `<h2 style="color: red;">You answered correctly at ${score}/5 questions.</h2>            
                     <button class="btn btn-warning" onclick="location.reload()">Retake!</button>
                     <a href="/dashboard" class="btn btn-secondary" style="text-align: center;">Go to Dashboard</a>`
    )



})