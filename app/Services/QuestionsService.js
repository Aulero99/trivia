import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { questionsApi } from "./AxiosService.js";

class QuestionsService{
    reset() {
        appState.correct = 0
        appState.incorrect = 0
        appState.qNum = 0
    }
    newGame(formData) {
        let difficulty = formData.difficulty
        let number = formData.number
        let category = formData.category

        let catIndex = ''

        if (category != 0){
            catIndex = '&category=' + category
        }

        let param = '/api.php?amount=' + number + catIndex + '&difficulty=' + difficulty + '&type=multiple'

        try {
            this.questionsFetchApi(param)
        } catch (error) {
            console.log(error)
        }
    }

    incorrectAnswer() {
        appState.incorrect ++
    }
    
    correctAnswer() {
        appState.correct ++
    }
    
    nextQuestion(){
        let questions = appState.questions


        console.log('the question is', appState.qNum);
        console.log('of', questions.length);

        if ( appState.qNum < questions.length-1 ){
            appState.qNum++
            appState.emit('qNum')
        }else{
            appState.emit('gameFin')
        }
    }
   
    Online() {
        console.log('QuestionsService Online')
    }

    async questionsFetchApi(param){

        const response = await questionsApi.get(param)
        console.log(response.data)
        appState.questions = response.data.results.map(c => new Question(c))
    }

}

export const questionsService = new QuestionsService()