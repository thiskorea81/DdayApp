<template>
    <div class="input-view">
      <h1>D-Day Calculator</h1>
      <form @submit.prevent="addDday">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div>
          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" v-model="birthday" required>
        </div>
        <button type="submit">Add D-Day</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useDdayStore } from '@/stores/ddayStore';
  
  export default {
    data() {
      return {
        name: '',
        birthday: ''
      };
    },
    methods: {
      addDday() {
        const ddayStore = useDdayStore();
        ddayStore.setDday(this.name, this.birthday);
        this.$router.push({ name: 'Result' });
      }
    }
  };
  </script>
  
  <style scoped>
  .input-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
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
  