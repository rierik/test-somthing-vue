<!-- <template>
  <div class="image-upload-container">
    <input type="file" @change="onFileChange" accept="image/*" />
    <div
      class="canvas-container"
      @mousedown.prevent="startDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
      @touchstart.prevent="startDragging"
      @touchend="stopDragging"
      @touchmove="dragImage"
    >
      <img v-if="imageSrc" :src="imageSrc" ref="image" class="draggable-image" :style="imageStyle" @wheel="handleWheel" @load="setOriginalSize" />
    </div>
    <button @click="zoomIn">확대</button>
    <button @click="zoomOut">축소</button>
    <button @click="resetSize">원래 크기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: '',
      imgOriginalWidth: 0,
      imgOriginalHeight: 0,
      imgWidth: 0,
      imgTop: 0,
      imgLeft: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
    };
  },
  computed: {
    imageStyle() {
      return {
        position: 'absolute',
        top: `${this.imgTop}px`,
        left: `${this.imgLeft}px`,
        width: `${this.imgWidth}px`,
        cursor: this.isDragging ? 'grabbing' : 'grab',
      };
    },
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일을 선택해 주세요.');
      }
    },
    setOriginalSize() {
      const img = this.$refs.image;
      this.imgOriginalWidth = img.naturalWidth;
      this.imgOriginalHeight = img.naturalHeight;
      this.imgWidth = this.imgOriginalWidth;
      this.imgTop = 0; // 초기 위치
      this.imgLeft = 0; // 초기 위치
    },
    zoomIn() {
      this.imgWidth += 50;
    },
    zoomOut() {
      if (this.imgWidth > 100) {
        this.imgWidth -= 50;
      }
    },
    resetSize() {
      this.imgWidth = this.imgOriginalWidth;
      this.imgTop = 0; // 초기 위치
      this.imgLeft = 0; // 초기 위치
    },
    handleWheel(event) {
      event.preventDefault();
      const delta = event.deltaY < 0 ? 50 : -50;
      this.imgWidth = Math.max(100, this.imgWidth + delta);
    },
    startDragging(event) {
      this.isDragging = true;
      this.lastMouseX = event.clientX || event.touches[0].clientX;
      this.lastMouseY = event.clientY || event.touches[0].clientY;

      // Dragging start position
      this.$refs.image.style.transition = 'none'; // Disable transition
    },
    stopDragging() {
      this.isDragging = false;
      this.$refs.image.style.transition = 'transform 0.1s ease'; // Enable transition
    },
    dragImage(event) {
      if (this.isDragging) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        const dx = clientX - this.lastMouseX;
        const dy = clientY - this.lastMouseY;

        this.imgLeft += dx;
        this.imgTop += dy;

        this.lastMouseX = clientX;
        this.lastMouseY = clientY;
      }
    },
  },
  mounted() {
    window.addEventListener('mouseup', this.stopDragging);
    window.addEventListener('mousemove', this.dragImage);
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('mousemove', this.dragImage);
  },
};
</script>

<style scoped>
.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-container {
  position: relative;
  width: 375px; /* 최대 너비 고정 */
  height: 485px; /* 고정 높이 */
  border: 1px solid #ccc;
  overflow: hidden;
}

.draggable-image {
  top: 0;
  left: 0;
}
</style> -->
<template>
  <div class="image-upload-container">
    <input type="file" @change="onFileChange" accept="image/*" />
    <div
      class="canvas-container"
      @mousedown.prevent="startDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
      @touchstart.prevent="startDragging"
      @touchend="stopDragging"
      @touchmove="dragImage"
    >
      <img v-if="imageSrc" :src="imageSrc" ref="image" class="draggable-image" :style="imageStyle" @load="setOriginalSize" @touchmove="handlePinchZoom" />
    </div>
    <button @click="zoomIn">확대</button>
    <button @click="zoomOut">축소</button>
    <button @click="resetSize">원래 크기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: '',
      imgOriginalWidth: 0,
      imgOriginalHeight: 0,
      imgWidth: 0,
      imgTop: 0,
      imgLeft: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      lastDistance: 0, // 이전 핀치 거리
      isPinching: false, // 핀치 상태
    };
  },
  computed: {
    imageStyle() {
      return {
        position: 'absolute',
        top: `${this.imgTop}px`,
        left: `${this.imgLeft}px`,
        width: `${this.imgWidth}px`,
        cursor: this.isDragging ? 'grabbing' : 'grab',
      };
    },
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일을 선택해 주세요.');
      }
    },
    setOriginalSize() {
      const img = this.$refs.image;
      this.imgOriginalWidth = img.naturalWidth;
      this.imgOriginalHeight = img.naturalHeight;
      this.imgWidth = this.imgOriginalWidth;
      this.imgTop = 0; // 초기 위치
      this.imgLeft = 0; // 초기 위치
    },
    zoomIn() {
      this.imgWidth += 50;
    },
    zoomOut() {
      if (this.imgWidth > 100) {
        this.imgWidth -= 50;
      }
    },
    resetSize() {
      this.imgWidth = this.imgOriginalWidth;
      this.imgTop = 0; // 초기 위치
      this.imgLeft = 0; // 초기 위치
    },
    handlePinchZoom(event) {
      if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        if (this.lastDistance) {
          const zoomFactor = currentDistance / this.lastDistance;
          this.imgWidth *= zoomFactor; // 현재 거리로 이미지 너비 조정
        }
        this.lastDistance = currentDistance;
        this.isPinching = true;
      } else {
        this.lastDistance = 0; // 손가락을 하나만 사용하면 거리 초기화
      }
    },
    startDragging(event) {
      this.isDragging = true;
      this.lastMouseX = event.clientX || event.touches[0].clientX;
      this.lastMouseY = event.clientY || event.touches[0].clientY;

      // Dragging start position
      this.$refs.image.style.transition = 'none'; // Disable transition
    },
    stopDragging() {
      this.isDragging = false;
      this.$refs.image.style.transition = 'transform 0.1s ease'; // Enable transition
      this.lastDistance = 0; // 핀치 종료 시 거리 초기화
    },
    dragImage(event) {
      if (this.isDragging) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        const dx = clientX - this.lastMouseX;
        const dy = clientY - this.lastMouseY;

        this.imgLeft += dx;
        this.imgTop += dy;

        this.lastMouseX = clientX;
        this.lastMouseY = clientY;
      }
    },
  },
  mounted() {
    window.addEventListener('mouseup', this.stopDragging);
    window.addEventListener('mousemove', this.dragImage);
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('mousemove', this.dragImage);
  },
};
</script>

<style scoped>
.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-container {
  position: relative;
  width: 375px; /* 최대 너비 고정 */
  height: 485px; /* 고정 높이 */
  border: 1px solid #ccc;
  overflow: hidden;
}

.draggable-image {
  top: 0;
  left: 0;
}
</style>
