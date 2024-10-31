<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { ref } from 'vue';
import Inko from 'inko/inko.min.js';
import ImageResizeMoving from './ImageResizeMoving.vue';
import ImageMerge from './imageMerge.vue';
import ToastCalendarUi from './ToastCalendarUi.vue';

let inko = new Inko();
// console.log(inko.en2ko('dksldy??'));

const remainingLetters = ref(0);

function outer() {
  let outerVar = 'I am outside!';

  function inner() {
    console.log(outerVar); // outerVar에 접근 가능
  }

  return inner; // inner 함수를 반환
}

const innerFunction = outer(); // outer 함수 실행
innerFunction(); // "I am outside!" 출력
</script>

<template>
  <div class="form-group">
    <!-- <label for="de_code" class="input_label">코드</label>
    <input type="text" class="form-control" name="de_code" id="de_code" @click="chgEng($event)" /> -->
  </div>
  <!-- <div>
    <label for="">
      <input type="text" max="100" v-model="remainingLetters" />
    </label>
    <span>남은글자 : {{ remainingLetters.length }} / 100</span>
  </div> -->
  <!-- <ImageResizeMoving /> -->
  <!-- <ImageMerge /> -->
  <ToastCalendarUi />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
