<template>
    <div class="result-view">
      <h1>{{ ddayText }}</h1>
      <p>정원</p>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  
  export default {
    data() {
      return {
        birthday: '2022-11-19',
        dday: null
      };
    },
    computed: {
      ddayText() {
        return `D${this.dday >= 0 ? '+' : ''}${this.dday+1}`;
      }
    },
    mounted() {
      this.calculateDday();
      setInterval(this.calculateDday, 86400000); // 24시간마다 업데이트
    },
    methods: {
      calculateDday() {
        const today = moment();
        const birthDate = moment(this.birthday);
        this.dday = today.diff(birthDate, 'days');
      }
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
    font-size: 12em;
    margin: 0;
    color: #6a00ff;
    background: -webkit-linear-gradient(#00f260, #0575e6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .result-view p {
    font-size: 4em;
    margin: 10px 0 0;
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
  