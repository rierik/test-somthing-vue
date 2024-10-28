<template>
  <div>
    <canvas ref="canvas" style="display: none"></canvas>
    <img v-if="imageSrc" :src="imageSrc" alt="Combined Image" @click="downloadImage" style="border: 1px solid black; width: 100%; cursor: pointer" />
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import dogImage from './assets/1.jpg'; // 강아지 이미지
import heartImage from './assets/2.png'; // 하트 이미지

export default {
  data() {
    return {
      errorMessage: '', // 오류 메시지
      imageSrc: '', // 생성된 이미지의 URL
    };
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    loadImages() {
      const image1 = new Image();
      const image2 = new Image();

      let imagesLoaded = 0;

      const onImageLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === 2) {
          this.combineImages(image1, image2);
        }
      };

      const handleImageError = (src) => {
        this.errorMessage = `Failed to load image: ${src}`;
      };

      image1.onload = onImageLoad;
      image2.onload = onImageLoad;
      image1.onerror = () => handleImageError(dogImage);
      image2.onerror = () => handleImageError(heartImage);

      image1.src = dogImage;
      image2.src = heartImage;
    },
    combineImages(image1, image2) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      // 강아지 이미지 크기를 500으로 설정
      const dogSize = 500;
      canvas.width = dogSize; // 캔버스 너비
      canvas.height = dogSize; // 캔버스 높이

      // 첫 번째 이미지 그리기 (강아지)
      ctx.drawImage(image1, 0, 0, dogSize, dogSize);

      // 두 번째 이미지 (하트) 크기 및 위치 설정
      const heartSize = 100; // 하트 이미지 크기
      const heartX = 50; // X 좌표
      const heartY = dogSize - heartSize - 50; // Y 좌표 (하단 50px 위치)

      ctx.drawImage(image2, heartX, heartY, heartSize, heartSize); // 하트 이미지 그리기

      // 이미지를 PNG 데이터로 변환하여 <img> 태그의 src로 설정
      this.imageSrc = canvas.toDataURL('image/png');
    },
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.imageSrc;
      link.download = 'combined-image.png'; // 다운로드할 파일 이름 설정
      link.click(); // 다운로드 실행
    },
  },
};
</script>

<style scoped>
img {
  border: 1px solid black;
  width: 100%;
}
</style>
