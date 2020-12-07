<template>
  <div class="scollist">
    <div class="title">今日关键事件详情</div>
    <div class="list" @mouseenter="on_bot_enter" @mouseleave="on_bot_leave" v-loading="loading" element-loading-text="拼命加载中" v-if='swiperData.length>0'>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in swiperData" :key="index">
          <div class="status">
            <img src="../../../assets/img/redStar.png" v-if="item.status === '300'">
            <img src="../../../assets/img/grayStar.png" v-else>
          </div>
          <div class="text">
            {{item.index}}
            {{item.eventDetail.slice(0,16)}}...
          </div>
          <div class="add">{{item.orgName}}</div>
          <div class="time">{{item.occurDate}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="status-warp">
      <img src="../../../assets/img/redStar.png">
      <span>未办结</span>
      <img src="../../../assets/img/grayStar.png">
      <span>已办结</span>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    typeCode: {
      type: String,
      default: ''
    },
    echartType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 6, // 这个表示父盒子的宽度放下几个子盒子slide
        spaceBetween: 0, // 表示子盒子与子盒子之间的距离（slide之间的距离）
        direction: 'vertical'
      },
      loading: true,
      swiperData: [] // 昨日关键事件详情滚动列表
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.getEventDetail();
  },
  methods: {
    // 请求昨日关键事件详情滚动列表
    async getEventDetail() {
      const res = await this.$services.post({
        type: 'HOME',
        url: 'getEventDetail'
      });
      if (res.bean) {
        console.log('昨日关键事件详情滚动列表', res.bean);
        this.loading = false;
        this.swiperData = res.bean;
        if (this.swiperData.length <= 5) {
          this.swiperOption.loop = false;
        }
        else {
          this.swiperOption.loop = true;
        }
      }
    },
    // 通过获得的swiper对象来暂停自动播放
    on_bot_enter() {
      this.swiper.autoplay.stop();
    },
    on_bot_leave() {
      this.swiper.autoplay.start();
    }
  }
};
</script>

<style lang="scss" scoped>
.scollist {
  width: 100%;
  height: 100%;
  .title {
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    // letter-spacing: 2px;
    color: rgb(51, 50, 50);
    font-weight: 800;
  }
  .list {
    width: 100%;
    height: calc(100% - 62px);
    padding: 0 16px 2px 16px;
    box-sizing: border-box;
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      border-bottom: 1px dashed rgba(46, 192, 246, 0.3);
      box-sizing: border-box;
      box-sizing: border-box;
      > div {
        float: left;
        height: 100%;
        font-size: 12px;
        text-align: left;
        line-height: 18px;
      }
      div.status {
        width: 20px;
      }
      div.text {
        width: calc(100% - 215px);
        padding-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      div.add,
      div.time {
        width: 80px;
      }
      div.time {
        text-align: right;
      }
    }
  }
  .status-warp {
    line-height: 30px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    text-align: left;
    padding: 0 16px;
    span {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
