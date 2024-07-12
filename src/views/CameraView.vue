<template>
    <div class="camera-view" @keyup.space="handleKeyUp" @touchstart="handleTouch" tabindex="0">
      <h1>Camera</h1>
      <div class="controls">
        <label for="camera-select">Select Camera:</label>
        <select id="camera-select" v-model="selectedCameraId" @change="setupCamera">
          <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">
            {{ device.label }}
          </option>
        </select><br>
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
      <div class="camera-output">
        <video v-show="!captured" id="video" width="640" height="480" autoplay></video>
        <canvas v-show="captured" id="canvas" width="640" height="480"></canvas>
      </div>
      <div class="buttons">
        <button v-if="!captured" @click="takePicture">Take Picture</button>
        <button v-if="captured" @click="retakePicture">Retake</button>
        <button v-if="captured" @click="savePicture">Save</button>
      </div>      
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
        context: null,
        captured: false,
        videoDevices: [],
        selectedCameraId: ''
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
      this.getVideoDevices();
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('keydown', this.handleKeyDown);
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
      async getVideoDevices() {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          this.videoDevices = devices.filter(device => device.kind === 'videoinput');
          if (this.videoDevices.length > 0) {
            this.selectedCameraId = this.videoDevices[0].deviceId;
            this.setupCamera();
          }
        } catch (error) {
          console.error('Error accessing video devices: ', error);
        }
      },
      async setupCamera() {
        try {
          if (this.video && this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
          }
          this.video = document.getElementById('video');
          this.canvas = document.getElementById('canvas');
          this.context = this.canvas.getContext('2d');
  
          const constraints = {
            video: {
              deviceId: this.selectedCameraId ? { exact: this.selectedCameraId } : undefined,
              facingMode: this.selectedCameraId ? undefined : 'environment'
            }
          };
  
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          this.video.srcObject = stream;
          this.video.play();
        } catch (error) {
          console.error('Error setting up camera: ', error);
        }
      },
      takePicture() {
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        this.context.font = '40px Arial';
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 3;
        this.context.strokeText(`${this.selectedDdayLabel}: D+${this.selectedDdayValue}`, 10, 50);
        this.context.fillText(`${this.selectedDdayLabel}: D+${this.selectedDdayValue}`, 10, 50);
        this.captured = true;
        if (this.video.srcObject) {
          this.video.srcObject.getTracks().forEach(track => track.stop());
        }
      },
      retakePicture() {
        this.captured = false;
        this.setupCamera();
      },
      savePicture() {
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png');
        link.download = 'photo.png';
        link.click();
      },
      handleKeyUp(event) {
        if (event.code === 'Space' && !this.captured) {
          this.takePicture();
        }
      },
      handleKeyDown(event) {
        if ((event.key === 'AudioVolumeDown' || event.key === 'AudioVolumeUp') && !this.captured) {
          this.takePicture();
        }
      },
      handleTouch(event) {
        if (!this.captured) {
          this.takePicture();
        }
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
    padding: 10px;
  }
  .controls {
    margin-bottom: 10px;
  }
  .dday-info {
    margin-bottom: 10px;
  }
  .camera-output {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    height: calc(100vh - 300px); /* Adjust the height to fit buttons and navbar */
  }
  video, canvas {
    width: 100%;
    height: 100%;
    border: 2px solid white;
    object-fit: cover;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: fixed;
    bottom: 10px;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
  }
  button:hover {
    background-color: #0056b3;
  }
  select {
    margin-left: 10px;
    padding: 5px;
  }
  </style>
  