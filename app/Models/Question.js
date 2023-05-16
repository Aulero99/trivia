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
        <div class="col-12 p-3">
            <div class="question-card">
            ${this.question}
            </div>
        </div>
        `
    }

    get AnswerTemplate(){
        return /*html*/`
        <div class="col-6 p-3 order-${this.answerKey[0]}" onclick="app.questionsController.correctAnswer()">
            <div class="answer-card">
            <div class="option">
                ${_computeLetter(this.answerKey[0])}:
            </div>
            <p>
                ${this.correct_answer}
            </p>
            </div> 
        </div>

        <div class="col-6 p-3 order-${this.answerKey[1]}" onclick="app.questionsController.incorrectAnswer()">
            <div class="answer-card">
            <div class="option">
            ${_computeLetter(this.answerKey[1])}:
            </div>
            <p>
                ${this.incorrect_answers[0]}
            </p>
            </div> 
        </div>

        <div class="col-6 p-3 order-${this.answerKey[2]}" onclick="app.questionsController.incorrectAnswer()">
            <div class="answer-card">
            <div class="option">
            ${_computeLetter(this.answerKey[2])}:
            </div>
            <p>
                ${this.incorrect_answers[1]}
            </p>
            </div> 
        </div>

        <div class="col-6 p-3 order-${this.answerKey[3]}" onclick="app.questionsController.incorrectAnswer()">
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

}