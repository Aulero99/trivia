function _computeLetter(num){
    if(num == 1){
        return 'A'
    }
    if(num == 2){
        return 'B'
    }
    if(num == 3){
        return 'C'
    }
    if(num == 4){
        return 'D'
    }
}


export class Question{
    constructor(data){
        this.question = data.question
        this.correct_answer = data.correct_answer
        this.incorrect_answers = data.incorrect_answers
        this.answerKey = this.Randomize
    }

    get QuestionTemplate(){
        return /*html*/`
        <div class="col-12 p-1 p-md-3">
            <div class="question-card">
            ${this.question}
            </div>
        </div>
        `
    }

    get AnswerTemplate(){
        return /*html*/`
        <div class="col-12 col-md-6 p-1 p-md-3 order-${this.answerKey[0]}" onclick="app.questionsController.correctAnswer()">
            <div class="answer-card">
            <div class="option">
                ${_computeLetter(this.answerKey[0])}:
            </div>
            <p>
                ${this.correct_answer}
            </p>
            </div> 
        </div>

        <div class="col-12 col-md-6 p-1 p-md-3 order-${this.answerKey[1]}" onclick="app.questionsController.incorrectAnswer()">
            <div class="answer-card">
            <div class="option">
            ${_computeLetter(this.answerKey[1])}:
            </div>
            <p>
                ${this.incorrect_answers[0]}
            </p>
            </div> 
        </div>

        <div class="col-12 col-md-6 p-1 p-md-3 order-${this.answerKey[2]}" onclick="app.questionsController.incorrectAnswer()">
            <div class="answer-card">
            <div class="option">
            ${_computeLetter(this.answerKey[2])}:
            </div>
            <p>
                ${this.incorrect_answers[1]}
            </p>
            </div> 
        </div>

        <div class="col-12 col-md-6 p-1 p-md-3 order-${this.answerKey[3]}" onclick="app.questionsController.incorrectAnswer()">
            <div class="answer-card">
            <div class="option">
            ${_computeLetter(this.answerKey[3])}:
            </div>
            <p>
                ${this.incorrect_answers[2]}
            </p>
            </div> 
        </div>
        `
    }

    get Randomize(){
        let arr = [1,2,3,4]
        let curIndex = arr.length, ranIndex;

        while (curIndex != 0){
            ranIndex = Math.floor(Math.random()*curIndex)
            curIndex--
            [arr[curIndex], arr[ranIndex]] = [arr[ranIndex], arr[curIndex]]
        }

        return arr
    }

    get AnswerCheckCorrect(){
        return /*html*/ `
        <section class="">
            <div class="question-check correct">
            <div class="d-flex flex-column">
                <h1>Correct</h1>
    
                <div class="continue" onclick="app.questionsController.nextQuestion()">CONTINUE</div>
                
            </div>
            </div>
        </section>
        `
    }

    get AnswerCheckIncorrect(){
        return /*html*/ `
        <section class="">
            <div class="question-check incorrect">
            <div class="d-flex flex-column">
                <h1>Incorrect</h1>
                <p>The correct answer was:</p> 

                <div class="answer-reveal">
                    <span class="identifier">${_computeLetter(this.answerKey[0])}:</span> ${this.correct_answer}
                </div>
    
                <div class="continue" onclick="app.questionsController.nextQuestion()">CONTINUE</div>
                
            </div>
            </div>
        </section>
        `
    }

    static NewGame(){
        return /*html*/`
        <section class="new-game">
      <div class="card p-3">
        <h1>New Game</h1>
        <form class="d-flex flex-column" onsubmit="app.questionsController.newGame()" id="newGameHTM">
          <label>Number of Questions</label>
          <select name="number">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
          </select>

          <label>Category</label>
          <select name="category">
            <option value="0">Any</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatre</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoons & Animation</option>
          </select>

          <label>Difficulty</label>
          <select name="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button type="submit" class="submit">SUBMIT</button>
        </form>
      </div>
    </section>
        `
    }

}