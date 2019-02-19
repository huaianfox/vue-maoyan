<template>
  <ul class="alphabet">
    <li
      class="letter"
      v-for="(cities, letter) in letterMap"
      :key="letter"
      :ref="letter"
      @click="handleLetterClick"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
    >{{letter}}</li>
  </ul>
</template>

<script >
export default {
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    };
  },
  updated() {
    console.log("updated");
    this.startY = this.$refs["A"][0].offsetTop
  },
  props: {
    letterMap: Object
  },
  computed: {
    letters() {
      const letters = Object.keys(this.letterMap)
      return letters;
    }
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("changePanel", e.target.innerText)
    },
    handleTouchstart() {
      this.touchStatus = true;
    },
    handleTouchmove(e) {
      if (this.touchStatus) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            this.$emit("changePanel", this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchend() {
      this.touchStatus = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../scss/fn.scss";
.alphabet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  .letter {
    width: 100%;
    line-height: 20px;
    text-align: center;
  }
}
</style>
