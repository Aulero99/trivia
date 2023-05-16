import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";
import { questionsService } from "../Services/QuestionsService.js";
import { appState } from "../AppState.js";
import { getFormData } from "../Utils/FormHandler.js"
import { Question } from "../Models/Question.js";

function _drawQuestion(){
    let questionTemplate = ''
    let answerTemplate = ''
    let qNum = appState.qNum
    questionTemplate = appState.questions[qNum].QuestionTemplate
    answerTemplate = appState.questions[qNum].AnswerTemplate

    setHTML('questionBoardHTM', questionTemplate)
    setHTML('answerBoardHTM', answerTemplate)
}

function _drawAnswerCheck(value){
    let template = ''
    let qNum = appState.qNum

    if (value == 'correct'){
        template = appState.questions[qNum].AnswerCheckCorrect
    }else{
        template = appState.questions[qNum].AnswerCheckIncorrect
    }

    setHTML('answerCheckHTM', template)    
}

function _drawResults(){
    // @ts-ignore
    document.getElementById('resultsHTM').style.marginTop = '0';

    let correct = appState.correct
    let incorrect = appState.incorrect

    setHTML('correctHTM', correct)
    setHTML('incorrectHTM', incorrect)
}

function _drawNewGame(){
    let template = Question.NewGame
    setHTML('answerCheckHTM', template) 
}


export class QuestionsController{
    constructor(){
        console.log('QuestionsController Online')
        questionsService.Online()
    
        appState.on('qNum', _drawQuestion)
        appState.on('gameFin', _drawResults)

        // this.questionsFetchApi()
        appState.on('questions', _drawQuestion)
        appState.on('questions', this.newGameStart)

        // _drawQuestion()
        _drawNewGame()
    }

    correctAnswer(){
        console.log('Correct')
        _drawAnswerCheck('correct')
        // @ts-ignore
        document.getElementById('answerCheckHTM').style.marginTop = 0;
        questionsService.correctAnswer()
    }

    incorrectAnswer(){
        console.log('Incorrect');
        _drawAnswerCheck('incorrect')
        // @ts-ignore
        document.getElementById('answerCheckHTM').style.marginTop = 0;
        questionsService.incorrectAnswer()
    }


    nextQuestion(){
        questionsService.nextQuestion()
        // @ts-ignore
        document.getElementById('answerCheckHTM').style.marginTop = '100dvh';
    }


    newGameSetup(){
        // @ts-ignore
        document.getElementById('answerCheckHTM').style.marginTop = '0';
        // @ts-ignore
        document.getElementById('resultsHTM').style.marginTop = '-100dvh';
        questionsService.reset()
        _drawNewGame()
    }

    newGame(){
        window.event?.preventDefault()
        // @ts-ignore
        const form = window.event.target

        let formData = getFormData(form)

        questionsService.newGame(formData)
    }

    newGameStart(){
        // @ts-ignore
        document.getElementById('answerCheckHTM').style.marginTop = '100dvh';
    }


    async questionsFetchApi(){
        try {
            await questionsService.questionsFetchApi()
        } catch (error) {
            Pop.error(error)
        }
    }
}