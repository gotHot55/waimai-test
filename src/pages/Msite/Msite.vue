<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <router-link class="header_search" slot="left" to="/search">
          <i class="iconfont icon-sousuo" style="font-size: 25px;color: white"></i>
        </router-link>
        <!--<div class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </div>-->
        <router-link class="header_login" slot="right" :to="userInfo._id ? '/userInfo':'/login'">
          <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>

      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="imgUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!--导航按钮-->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
            <!--滚动条
            <div class="swiper-scrollbar"></div>
            -->
        </div>
        <div v-else>
          <img src="./images/msite_back.svg">
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList/>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import Swiper from 'swiper'
  import 'swiper/dist/js/swiper'
  import 'swiper/dist/css/swiper.css'
  import ShopList from '../../components/ShopList/ShopList'
  export default {
    name: 'Msite',
    data(){
      return{
        imgUrl:'https://fuss10.elemecdn.com'
      }
    },
    components: {ShopList, HeaderTop} ,
    computed:{
      ...mapState(['address','categorys','userInfo']),
      /*
      根据categorys一维数组生成一个二维数组
      小数组中的元素个数最大是八个
      */
      categorysArr(){
        const {categorys} = this
        //空的二维数组
        const arr=[]
        let minArr=[]
        //遍历categorys
        categorys.forEach(c =>{
          if (minArr.length===8){
            minArr=[]
          }
          if (minArr.length===0){
            arr.push(minArr)
          }
          //将当前分类保存到小数组中
          minArr.push(c)
        })
        return arr
      }
    },
    watch:{
      categorys(value){
        /*setTimeout(()=>{
          //创建一个swiper实列对象，实现轮播
          new Swiper('.swiper-container',{
            //direction:'vertical',//垂直轮播
            loop:true ,//循环轮播
            pagination:{
              el:'.swiper-pagination',
            },
            //前进后退按钮
            navigation:{
              nextEl:'.swiper-button-next',
              prevEl:'.swiper-button-prev',
            },
            //滚动条
            /!*scrollbar:{
              el:'.swiper-scrollbar'
            }*!/
          })
        },100)*/
        this.$nextTick(()=>{
          //创建一个swiper实列对象，实现轮播
          new Swiper('.swiper-container',{
            //direction:'vertical',//垂直轮播
            loop:true ,//循环轮播
            pagination:{
              el:'.swiper-pagination',
            },
            //前进后退按钮
            navigation:{
              nextEl:'.swiper-button-next',
              prevEl:'.swiper-button-prev',
            },
            //滚动条
            /*scrollbar:{
              el:'.swiper-scrollbar'
            }*/
          })
        })
      }
    },
    mounted(){
      this.$store.dispatch('getCategroys')
      this.$store.dispatch('getShops')
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
