<template>
  <div>
    <div ref="container" style="width: 100%; height: 100vh"></div>
    <img v-if="imageUrl" :src="imageUrl" alt="Konva Canvas" style="margin-top: 20px" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Konva from 'konva';
import dogImage from './assets/1.jpg'; // 강아지 이미지
import heartImage from './assets/2.png'; // 하트 이미지

export default {
  name: 'KonvaComponent',
  setup() {
    const container = ref(null);
    let stage = null;
    const imageUrl = ref(null);

    const initKonva = () => {
      stage = new Konva.Stage({
        container: container.value,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const layer = new Konva.Layer();
      stage.add(layer);

      // 첫 번째 이미지
      const imageObj1 = new Image();
      imageObj1.src = dogImage;

      // 두 번째 이미지
      const imageObj2 = new Image();
      imageObj2.src = heartImage;

      // 첫 번째 이미지 로드
      imageObj1.onload = () => {
        const konvaImage1 = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj1,
          // draggable: true,
        });

        layer.add(konvaImage1);
        layer.draw(); // 레이어 업데이트

        // 두 번째 이미지 로드
        imageObj2.onload = () => {
          const konvaImage2 = new Konva.Image({
            x: stage.width() / 2 - 400, // 위치 조정
            y: stage.height() / 2 - 240, // 위치 조정
            image: imageObj2,
            width: 100,
            height: 100,
            // draggable: true, // 주석 처리
          });

          layer.add(konvaImage2);
          layer.draw(); // 레이어 업데이트

          // 두 번째 이미지 로드 후 자동으로 내보내기
          const dataURL = stage.toDataURL();
          console.log('dataURL', dataURL);
          imageUrl.value = dataURL; // 이미지 URL 상태 업데이트
        };
      };

      // 이미지 로드 에러 처리
      imageObj1.onerror = () => {
        console.error('첫 번째 이미지 로드 실패');
      };
      imageObj2.onerror = () => {
        console.error('두 번째 이미지 로드 실패');
      };
    };

    const handleResize = () => {
      if (stage) {
        stage.width(window.innerWidth);
        stage.height(window.innerHeight);
        stage.draw();
      }
    };

    onMounted(() => {
      initKonva();
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      container,
    };
  },
};
</script>

<style>
/* 추가 스타일 필요 시 여기에 작성 */
</style>
