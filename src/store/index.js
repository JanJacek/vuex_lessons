import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    counter: 0,
    colorCode:'blue'
  },
  mutations: {

    decreaseCounter(state, randomNum){
      state.counter -= randomNum
    },
    increaseCounter(state, randomNum){
      state.counter += randomNum
    },
    setColorCode(state, newValue){
      state.colorCode = newValue
    }

  },
  actions: {
    increaseCounter({commit}){
      console.log('icreaseCounter action podmieniona na despatch method')
      axios('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new').then(res=>{
      console.log(res);  
      commit('increaseCounter', res.data)
      })
    },
    decreaseCounter({commit}){
      console.log('icreaseCounter action podmieniona na despatch method')
      axios('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new').then(res=>{
        console.log(res);
        commit('decreaseCounter', res.data)
      }).catch(error=>{
        throw error
      })
    }
  },
  getters:{
    counterSquered(state) {
      return state.counter * state.counter
    }
  },
  modules: {
  }
})
