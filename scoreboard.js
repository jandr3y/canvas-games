let scoreboard = {
  score: 0,
  el: document.querySelector('.scoreboard'),
  record: localStorage.getItem('record'),
  update: () => {
    scoreboard.score++
    scoreboard.draw()
  },
  draw: () => {
    scoreboard.el.innerHTML = `<div>Pontuação: ${scoreboard.score}</div>
                               <div>Recorde: ${scoreboard.record}</div>`
  },
  updateRecord: () => {
    if(scoreboard.score > scoreboard.record) localStorage.setItem('record', scoreboard.score)
  }
}