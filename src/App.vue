<template>
  <div id="app" class="hg-base">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'app',
  computed: {
    ...mapGetters({
      currentSkin: 'skin/currentSkin'
    })
  },
  methods: {
    ...mapActions({
      setMenuData: 'user/setMenuData',
      initRouters: 'roleRouter/initRouters'
    }),
    /**
     * 加载资源时的loading动画
     */
    setLoding() {
      if (document.getElementById('loading')) return;
      const loading = document.createElement('div');
      loading.setAttribute('id', 'loading');
      loading.setAttribute('class', 'loading');
      loading.innerHTML = '<span>l</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span>';
      document.body.appendChild(loading);
    },
    /**
     * 加载资源时的loading动画（completed）
     */
    cancelLoading() {
      if (document.getElementById('loading')) {
        const loading = document.getElementById('loading');
        document.body.removeChild(loading);
      }
    }
  },
  created() {
    this.setMenuData().then(menu => {
      this.initRouters(menu);
    });
  }
};
</script>

<style lang="scss">
@import "assets/css/reset.scss";
@import "assets/css/comm.scss";
@import "assets/css/transition.scss";

#app {
  height: 100%;
  width: 100%;
}

.loading {
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background: linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff);*/
  background: url("./assets/img/loginback.png") no-repeat;
  background-size: cover;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999999999;
}

.loading span {
  text-transform: uppercase;
  font-size: 42px;
  font-weight: 600;
  opacity: 0;
  display: inline-block;
  padding: 0 20px;
  animation: letterWave 2s infinite linear;
}

.loading span:nth-child(0) {
  animation-delay: 0ms;
}

.loading span:nth-child(1) {
  animation-delay: 250ms;
}

.loading span:nth-child(2) {
  animation-delay: 500ms;
}

.loading span:nth-child(3) {
  animation-delay: 750ms;
}

.loading span:nth-child(4) {
  animation-delay: 1000ms;
}

.loading span:nth-child(5) {
  animation-delay: 1250ms;
}

.loading span:nth-child(6) {
  animation-delay: 1500ms;
}

.loading span:nth-child(7) {
  animation-delay: 1750ms;
}

.loading span:nth-child(8) {
  animation-delay: 2000ms;
}

.loading span:nth-child(9) {
  animation-delay: 2250ms;
}

.loading span:nth-child(10) {
  animation-delay: 2500ms;
}

@keyframes letterWave {
  0%, 100% {
    transform: translateY(0) scale(1);
    padding: 0 20px;
    opacity: .8;
  }
  25% {
    transform: translateY(-50px) scale(0.8);
    padding: 0 0;
    opacity: .6;
  }
  75% {
    transform: translateY(50px) scale(1.5);
    padding: 0 40px;
    opacity: 1;
  }
}

</style>
