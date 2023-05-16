import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { questionsApi } from "./AxiosService.js";

class QuestionsService{
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

    async questionsFetchApi(){
        const response = await questionsApi.get('/api.php?amount=10&difficulty=medium&type=multiple')
        console.log(response.data)
        appState.questions = response.data.results.map(c => new Question(c))
    }

}

export const questionsService = new QuestionsService()