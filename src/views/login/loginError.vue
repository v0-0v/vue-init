<template>
  <div class="zyLogin-warp">
    <div class="zyLogin">
      <img src="../../assets/img/smile.png">
      <p>请回到浙江公安警综平台登录</p>
      <div>Please go back to zhejiang police comprehensive landing platform</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginError'
}
</script>

<style lang="scss" scoped>
.zyLogin-warp{
  width: 100%;
  height: 100%;
  background: #2b2f32;
  .zyLogin{
    width: 800px;
    height: auto;
    text-align: center;
    margin: 0 auto;
    padding-top: 250px;
    font-weight: bolder;
    color: #fff;
    img{
      width: 100px;
    }
    p{
      font-size: 26px;
      margin: 30px 0 20px;
    }
    div{
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
