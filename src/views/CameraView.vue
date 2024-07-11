<template>
    <div class="camera-view">
      <h1>Camera</h1>
      <div>
        <label for="dday-select">Select D-Day:</label>
        <select id="dday-select" v-model="selectedDday">
          <option value="jungwon">정원</option>
          <option value="yeolmae">열매</option>
          <option value="result">결과</option>
        </select>
      </div>
      <div class="dday-info">
        <p>{{ selectedDdayLabel }}: D+{{ selectedDdayValue }}</p>
      </div>
      <video id="video" width="640" height="480" autoplay></video>
      <button @click="takePicture">Take Picture</button>
      <canvas id="canvas" width="640" height="480"></canvas>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  
  export default {
    data() {
      return {
        jungwonDday: null,
        yeolmaeDday: null,
        resultDday: null,
        selectedDday: 'jungwon',
        video: null,
        canvas: null,
        context: null
      };
    },
    computed: {
      selectedDdayValue() {
        switch (this.selectedDday) {
          case 'jungwon':
            return this.jungwonDday;
          case 'yeolmae':
            return this.yeolmaeDday;
          case 'result':
            return this.resultDday;
        }
      },
      selectedDdayLabel() {
        switch (this.selectedDday) {
          case 'jungwon':
            return '정원';
          case 'yeolmae':
            return '열매';
          case 'result':
            return '결과';
        }
      }
    },
    mounted() {
      this.calculateDdDays();
      this.setupCamera();
    },
    methods: {
      calculateDdDays() {
        this.jungwonDday = this.calculateDday('2022-11-19');
        this.yeolmaeDday = this.calculateDday('2024-07-11');
        const name = localStorage.getItem('name');
        const birthday = localStorage.getItem('birthday');
        if (name && birthday) {
          this.resultDday = this.calculateDday(birthday);
        }
      },
      calculateDday(birthday) {
        const today = moment();
        const birthDate = moment(birthday);
        const differenceInDays = today.diff(birthDate, 'days');
        return differenceInDays >= 0 ? differenceInDays + 1 : differenceInDays;
      },
      async setupCamera() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
  
            const constraints = {
              video: {
                deviceId: rearCamera ? { exact: rearCamera.deviceId } : undefined,
                facingMode: rearCamera ? undefined : { exact: 'environment' }
              }
            };
  
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = stream;
            this.video.play();
          } catch (error) {
            console.error('Error accessing the camera: ', error);
          }
        }
      },
      takePicture() {
        this.context.drawImage(this.video, 0, 0, 640, 480);
        this.context.font = '40px Arial';
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 3;
        this.context.strokeText(`${this.selectedDdayLabel}: D+${this.selectedDdayValue}`, 10, 50);
        this.context.fillText(`${this.selectedDdayLabel}: D+${this.selectedDdayValue}`, 10, 50);
      }
    }
  };
  </script>
  
  <style scoped>
  .camera-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(180deg, #000000, #434343);
    color: white;
    text-align: center;
  }
  .dday-info {
    margin-bottom: 10px;
  }
  video, canvas {
    margin-bottom: 10px;
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
  select {
    margin-left: 10px;
    padding: 5px;
  }
  </style>
  