import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  answerNumber: number;
  guesses: any[];
  maxNumber: number;
  hasWon: boolean;
}

export interface NumberItem {
  value: number;
  isGuessed: boolean;
}

export default new Vuex.Store({
  state: {
    answerNumber: 0,
    guesses: [],
    maxNumber: 20,
    hasWon: false,
  } as State,
  getters: {
    getMaxNumber: (state, getters) => () => {
      return state.maxNumber;
    },
    getAnswerNumber: (state, getters) => () => {
      return state.answerNumber;
    },
    getNumberItemList: (state, getters) => () => {
      const numberList: NumberItem[] = [];
      for (let i = 1; i <= state.maxNumber; i++) {
        numberList.push({
          value: i,
          isGuessed: (state.guesses.indexOf(i) > -1),
        });
      }
      return numberList;
    },
    getGuessList: (state, getters) => () => {
      return state.guesses;
    },
    hasWon: (state, getters) => () => {
      return state.hasWon;
    },
  },
  mutations: {
    generateAnswerNumber(state, payload) {
      state.answerNumber = Math.floor(Math.random() * Math.floor(state.maxNumber)) + 1;
    },
    addGuess(state, payload) {
      state.guesses.push(payload.guess);
    },
    clearGuesses(state, payload) {
      state.guesses = [];
    },
    setWon(state, payload) {
      state.hasWon = payload.hasWon;
    },
  },
  actions: {
    resetGame(context) {
      context.commit('clearGuesses');
      context.commit('generateAnswerNumber');
      context.commit('setWon', {
        hasWon: false,
      });
    },
    addGuess(context, guess: number) {
      if (guess === context.state.answerNumber) {
        context.commit('setWon', {
          hasWon: true,
        });
      } else {
        context.commit('addGuess', {
          guess,
        });
      }
    },
  },
});
