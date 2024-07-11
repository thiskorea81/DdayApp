<template>
    <div class="dday-calculator">
      <h1>D-Day Calculator</h1>
      <form @submit.prevent="calculateDday">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" v-model="birthday" required>
        </div>
        <button type="submit">Calculate D-Day</button>
      </form>
      <div v-if="dday !== null">
        <h2>{{ name }}'s D-Day</h2>
        <p>Days: {{ dday }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  
  export default {
    data() {
      return {
        name: '',
        birthday: '',
        dday: null
      };
    },
    mounted() {
      this.updateDday();
      setInterval(this.updateDday, 86400000); // 24시간마다 업데이트
    },
    methods: {
      calculateDday() {
        const today = moment();
        const birthDate = moment(this.birthday);
        this.dday = today.diff(birthDate, 'days');
      },
      updateDday() {
        if (this.birthday) {
          const today = moment();
          const birthDate = moment(this.birthday);
          this.dday = today.diff(birthDate, 'days');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dday-calculator {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  form div {
    margin-bottom: 10px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  