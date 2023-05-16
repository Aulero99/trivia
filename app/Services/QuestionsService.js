import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { questionsApi } from "./AxiosService.js";

class QuestionsService{
    nextQuestion() {
        appState.qNum++
        appState.emit('qNum')
    }
    Online() {
        console.log('QuestionsService Online')
    }

    async questionsFetchApi(){
        const response = await questionsApi.get('api.php?amount=1&difficulty=medium&type=multiple')
        console.log(response.data)
        appState.questions = response.data.results.map(c => new Question(c))
    }

}

export const questionsService = new QuestionsService()