<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png">

    <!-- jj. this is add and  minus random numbers result  -->
    <div class="counter" :style="{color: $store.state.colorCode}">{{$store.state.counter}}</div>

    <!-- jj. this is take random number result ad make squere number form it section -->
    <div class="counter-squered">
      {{$store.state.counter}}
      <sup>2</sup> = {{$store.getters.counterSquered}}
    </div>

    <!-- jj.this are button sections -->
    <div class="buttons">
      <button @click="$store.dispatch('decreaseCounter')">-</button>
      <button @click="$store.dispatch('increaseCounter')">+</button>
    </div>


    <!-- jj. this is input waiting for colour number -->
    <div>
      <input 
        v-model="colorCode"
        placeholder="enter color code" 
        type="text">
    </div>

  </div>
</template>

<script>


export default {
  name: 'Home',

  computed:{
    colorCode:{
      get(){
        return this.$store.state.colorCode
      },
      set(newValue){
        console.log(newValue);
        this.$store.commit('setColorCode', newValue)
      }
    }
  }
}

</script>


<style>
  div{
    margin-bottom:10px;
  }
  .counter{
    font-size:80px;
  }
  .buttons>button{
    border:none;
    border-radius: 5px;
    background-color:#42b883;
    font-size:40px;
    color:white;
    width:80px;
    margin: 10px;
  }
  .buttons>button:hover{
    background-color:#35495e;
  }
</style>