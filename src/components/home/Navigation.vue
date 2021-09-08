<template>
  <section class="section-navigation">
    <el-container>
      <div class="navigation">
        <el-row :gutter="9">
          <el-col :md="8" :xs="24">
            <div class="item">
              <div class="icon">
                <img src="@assets/images/product-adv-icon1.png" alt="" />
              </div>
              <div class="title">稳定可靠</div>
              <div class="desc">无限DDOS、CC防御，保证你的网站正常运行。</div>
            </div>
          </el-col>
          <el-col :md="8" :xs="24">
            <div class="item">
              <div class="icon">
                <img src="@assets/images/product-adv-icon2.png" alt="" />
              </div>
              <div class="title">全球节点</div>
              <div class="desc">
                1000+全球节点，跨越超过 100 个国家/地区 200
                个城市的全球云网络，数据触手可达。
              </div>
            </div></el-col
          >
          <el-col :md="8" :xs="24">
            <div class="item">
              <div class="icon">
                <img src="@assets/images/product-adv-icon3.png" alt="" />
              </div>
              <div class="title">简单容易</div>
              <div class="desc">
                开通CDN加速服务并添加域名后，前往域名服务商添加对应CNAME记录，即可正式启用加速服务，无需业务员侧做任何调整。
              </div>
            </div></el-col
          >
        </el-row>
      </div>
    </el-container>
  </section>
</template>
<style scoped>
.section-navigation {
  position: relative;
  background-color: #f5f7f9;
  /* padding: 0 10rem; */
}
.section-navigation .navigation {
  display: flex;
  background-color: #fff;
  padding: 2rem;
  justify-content: space-evenly;
  width: 80vw;
  margin: 0 auto;
}
.section-navigation .navigation .item {
  padding: 0 2rem;
  margin: 1rem 0;
}
.section-navigation .navigation .icon {
  width: 100%;
  text-align: left;
}
.section-navigation .navigation .title {
  margin: 1rem 0;
  color: #4573de;
  font-size: 1.2rem;
}
.section-navigation .navigation .desc {
  color: #6b798c;
  font-size: .9rem;
  line-height: 1.5;
}
</style>
<script>
import { Row, Col,Container } from "element-ui";
export default {
  name: "Navigation",
  components: {
    ElRow: Row,
    ElCol: Col,
    ElContainer: Container,
    // Footer,
    // Main,
  },
};
</script>
