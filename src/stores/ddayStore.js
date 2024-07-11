import { defineStore } from 'pinia';

export const useDdayStore = defineStore('ddayStore', {
  state: () => ({
    name: '',
    birthday: ''
  }),
  actions: {
    setDday(name, birthday) {
      this.name = name;
      this.birthday = birthday;
    },
    clearDday() {
      this.name = '';
      this.birthday = '';
    }
  }
});
