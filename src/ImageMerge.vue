<template>
  <div>
    <input v-model="text" placeholder="이미지로 만들 텍스트 입력" />
    <button @click="createImage">이미지 생성ddd</button>
    <div ref="container" style="display: none"></div>
    <img v-if="imageUrl" :src="imageUrl" alt="Generated Image" />
  </div>
</template>

<script>
import Konva from 'konva';
import { ref, onMounted } from 'vue';

export default {
  name: 'TextToImage',
  setup() {
    const text = ref(''); // 사용자 입력 텍스트
    const imageUrl = ref(null);
    const container = ref(null);
    let stage, layer, textNode;

    onMounted(() => {
      // Konva 스테이지와 레이어 생성
      stage = new Konva.Stage({
        container: container.value,
        width: 150,
        height: 30,
      });
      layer = new Konva.Layer();
      stage.add(layer);

      // 텍스트 노드 생성
      textNode = new Konva.Text({
        x: 0,
        y: 0,
        text: '',
        fontSize: 24,
        fill: 'black',
        fontFamily: 'RubikWetPaint-Regular',
      });
      layer.add(textNode);
    });

    const createImage = () => {
      textNode.text(text.value); // 입력한 텍스트 설정
      layer.draw();

      // 데이터 URL 형식으로 변환
      imageUrl.value = stage.toDataURL();
    };

    return {
      text,
      imageUrl,
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
