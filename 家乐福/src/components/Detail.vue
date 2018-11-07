<template>
  <div class="container">
    <div>
      <img :src="data.banner_pic_1" alt="">
    </div>
    <div>
      <img :src="data.banner_pic_2" alt="">
    </div>
    <div>
      <img src="../assets/img/detail/a_3.jpg" alt="">
      <div class="button-body">
            <a :href="data.app_url_1" class="link-button"><img :src="data.app_pic_1" alt=""></a>
            <a :href="data.app_url_2" class="link-button"><img :src="data.app_pic_2" alt=""></a>
            <a :href="data.app_url_3" class="link-button"><img :src="data.app_pic_3" alt=""></a>
            <a :href="data.app_url_4" class="link-button"><img :src="data.app_pic_4" alt=""></a>
        </div>
    </div>
    <div>
      <img :src="data.bottom_pic" alt="">
    </div>
    <img src="../assets/img/detail/a_5.jpg" alt="" class="code-img"> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data : []
    }
  },
  methods:{
    pagerLoad(){
      let url = "http://affqrcode.carrefourvip.com.cn/scan/index.php?s=/Home/Scan/get/id/"+this.$route.params.id
      this.$http.jsonp(url).then(function(res) {
        if(res.body.result == 200){
          this.data = res.body.obj
          // console.log(this.data)
        }
      });
    }
  },
  activated(){
    window.scrollTo(0,0)
    this.pagerLoad()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container>div>img{
  width: 100%;
  display: block;
}
.button-body {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    top: 20.8rem;
    left: 0;
    right: 0;
    width: 6.1rem;
    height: 2.64rem;
    margin: 0 auto
}
.button-body img{
  width: 100%;
}
.link-button {
    display: block;
    width: 2.4rem;
    height: 3rem;
    background-color: transparent;
    /* background: rgba(123,66,99,.5); */
    margin-bottom: .5rem
}
</style>
