<template>
  <div>
    <input v-model="text" placeholder="이미지 위에 올릴 텍스트 입력" />
    <button @click="createImage">이미지 생성</button>
    <div ref="container" style="display: none"></div>
    <img v-if="finalImageUrl" :src="finalImageUrl" alt="Combined Image" />
  </div>
</template>

<script>
import Konva from 'konva';
import { ref, onMounted } from 'vue';
import backgroundImgSrc from './assets/1.jpg'; // 배경 이미지

export default {
  name: 'ImageWithText',
  setup() {
    const text = ref('');
    const finalImageUrl = ref(null);
    const container = ref(null);
    let stage, layer, backgroundImage, textNode;

    onMounted(() => {
      // Konva 스테이지와 레이어 설정
      stage = new Konva.Stage({
        container: container.value,
        width: 400, // 이미지 크기에 맞춤
        height: 400,
      });
      layer = new Konva.Layer();
      stage.add(layer);

      // 배경 이미지 로드
      const bgImg = new Image();
      bgImg.src = backgroundImgSrc;
      bgImg.onload = () => {
        backgroundImage = new Konva.Image({
          x: 0,
          y: 0,
          image: bgImg,
          width: stage.width(),
          height: stage.height(),
        });
        layer.add(backgroundImage); // 배경 이미지 추가

        // 텍스트 노드 추가
        textNode = new Konva.Text({
          x: 325,
          y: 348,
          text: text.value, // 텍스트를 바로 설정
          fontSize: 30,
          fill: 'white',
          fontFamily: 'RubikWetPaint-Regular',
        });
        layer.add(textNode); // 텍스트 노드 추가
        layer.draw(); // 캔버스 그리기
      };
    });

    const createImage = () => {
      textNode.text(text.value); // 입력된 텍스트 갱신
      layer.draw();

      // 최종 이미지를 데이터 URL 형식으로 변환
      finalImageUrl.value = stage.toDataURL();
    };

    return {
      text,
      finalImageUrl,
      container,
      createImage,
    };
  },
};
</script>

<style>
@font-face {
  font-family: 'RubikWetPaint-Regular';
  src: url('/font/RubikWetPaint-Regular.ttf');
}
body {
  font-family: 'RubikWetPaint-Regular';
}
</style>
