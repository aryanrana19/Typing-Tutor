const endGame = document.getElementById("end-game-creds")
const difficultySelect = document.getElementById("difficulty")
const word = document.getElementById("word")
const time = document.getElementById("time")
const score = document.getElementById("score")
const reloadBtn = document.getElementById("reload-btns")
const text = document.getElementById("text")
const settingsForm = document.getElementById("settings-form")
const dictionary = ["apple", 'facebook', 'therefore', 'cricket', 'amsterdam', 'speaker', 'dragon', 'koala', 'mermaid', 'crocodile', 'alligator', 'chimpanzee']

let init_score = 0
let init_time = 10
let randomWord

// DISPLAY WORD
function displayWord(){
  randomWord = randonWordGenerator()
  word.textContent = randomWord
}
displayWord()

// COUNTDOWN
const timeInterval = setInterval(updateTime, 1000)

// RANDOM WORD GENERATOR
function randonWordGenerator(){
  const num = Math.floor(Math.random() * 12)
  randomWord = dictionary[num]
  // console.log(randomWord)
  return randomWord
}

// UPDATE SCORE
function updateScore(){
  init_score++
  score.innerHTML = init_score
}

// UPDATE TIME
function updateTime(){
  init_time--
  time.innerHTML = init_time + 's'
  if(init_time === 0){
    clearInterval(timeInterval)
    gameOver()
  }
}

// GAME OVER FUNCTION
function gameOver(){
  endGame.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your Score is ${init_score}</p>
    <button onclick="location.reload()">Reload</button>
  `
  endGame.style.display = 'flex'
}

// EVENT LISTENERS
text.addEventListener("input", (e)=>{
  const insertedText = e.target.value
  if(insertedText === randomWord){
    displayWord()
    updateScore()
    e.target.value = ''
    if(difficulty === 'hard'){
      init_time += 2
    }else if(difficulty === 'medium'){
      init_time += 3
    }else{
      init_time += 5
    }
    updateTime()
  }
})

// SETTING SELECT
settingsForm.addEventListener('change', (e)=>{
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
})

// SET DIFFICULTY TO LOCAL STORAGE
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium'

// SET DIFFICULTY SELECT VALUE
difficultySelect.value = localStorage.getItem('difficulty') != null ? localStorage.getItem("difficulty") : 'medium'

// TEXT FOCUS
text.focus()