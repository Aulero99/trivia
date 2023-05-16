import { Question } from "./Models/Question.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])


  questions = [
    new Question({"category":"History","type":"multiple","difficulty":"medium","question":"What year did Australia become a federation?","correct_answer":"1901","incorrect_answers":["1910","1899","1911"]}),
    new Question({"category":"History","type":"multiple","difficulty":"medium","question":"In what year did Neil Armstrong and Buzz Aldrin land on the moon?","correct_answer":"1969","incorrect_answers":["1965","1966","1973"]})
]


  qNum = 0
  correct = 0
  incorrect = 0

  gameFin = undefined

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
