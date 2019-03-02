<template>
  <footer class="footer">
    <div class="copyright">
      <span>© 猫眼电影 客服电话: <a href="tel:10105335">1010-5335</a></span>
    </div>
    <p class="icp">
      <span>京ICP备16022489号-1</span>
      <span>京公网安备11010502030881号</span>
    </p>
    <p class="comp">
      北京猫眼文化传媒有限公司
    </p>
  </footer>
</template>

<script >
export default {
  name: 'FooterCopy'
}
</script>

<style scoped lang="scss">
.footer {
  padding-top: 20px;
  text-align: center;
  .copyright {
    a {
      color: #df3434;
      text-decoration: underline;
    }
  }
  .icp {
    margin: 20px 0 10px;
    font-size: 12px;
    color: #9e9e9e;
    text-decoration: none;
    span {
      margin-left: 9px;
    }
  }
  .comp {
    margin: 10px 0;
    font-size: 14px;
    color: #9e9e9e;
    text-decoration: none;
  }
}
</style>
