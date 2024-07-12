<template>
    <div class="result-view">
      <h1 v-if="dday !== null">{{ ddayText }}</h1>
      <p>{{ name }}</p>
      <button @click="clearDday">Delete</button>
    </div>
  </template>
  
  <script>
  import { useDdayStore } from '@/stores/ddayStore';
  import moment from 'moment';
  
  export default {
    computed: {
      name() {
        return this.ddayStore.name;
      },
      birthday() {
        return this.ddayStore.birthday;
      },
      dday() {
        return this.calculateDday();
      },
      ddayText() {
        return `D${this.dday >= 0 ? '+' : ''}${this.dday+1}`;
      }
    },
    methods: {
      calculateDday() {
        if (this.birthday) {
          const today = moment();
          const birthDate = moment(this.birthday);
          return today.diff(birthDate, 'days');
        }
        return null;
      },
      clearDday() {
        this.ddayStore.clearDday();
        this.$router.push({ name: 'Input' });
      }
    },
    created() {
      this.ddayStore = useDdayStore();
    }
  };
  </script>
  
  <style scoped>
  .result-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(180deg, #000000, #434343);
    color: white;
    text-align: center;
  }
  
  .result-view h1 {
    font-size: 15em;
    margin: 0;
    color: #6a00ff;
    background: -webkit-linear-gradient(#00f260, #0575e6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .result-view p {
    font-size: 5em;
    margin: 10px 0 0;
  }
  
  .result-view button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .result-view button:hover {
    background-color: #cc0000;
  }

  @media (max-width: 600px) {
  .result-view h1 {
    font-size: 8em;
  }
  
  .result-view p {
    font-size: 3em;
  }
}
  </style>
  