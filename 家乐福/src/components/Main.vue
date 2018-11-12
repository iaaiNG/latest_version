<template>
  <div  v-track-pageview="{pageURL:'/index'}">
    <div class="bg-1 bg">
      <img src="../assets/img/a_1.png" alt="">
    </div>
    <div class="bg-2 bg">
      <div class="button-body foods">
        <a  v-for="(i,index) in menu" :key="index" :href="indexObj['url_pic_'+i]"
        v-track-event.click="{category:'风味名菜', action:'click',opt_label: 'index_'+i}">
          <img :src="indexObj['index_pic_'+i]" alt="">
        </a>
      </div>
    </div>
    <div class="bg-3 bg">
      <div class="button-body apps">
        <a  v-for="(i,index) in 4" :key="index" :href="indexObj['app_url_'+i]"
        v-track-event.click="{category:'点击购买', action:'click',opt_label: 'app_'+i}">
          <img :src="indexObj['app_pic_'+i]" alt="">
        </a>
      </div>
    </div>
    <div class="bg-4 bg">
      <div class="button-body foodsDetail">
        <div></div>
        <a v-for="(i, index) in list" :key=index
        v-track-event.click="{category:'往期菜品', action:'click',opt_label: 'list_'+(index+1)}">
          <router-link :to="'/detail/'+i.id"><img :src="i.pic" alt=""></router-link>
          <!-- <img :src="i.pic" alt=""> -->
          <!-- :href="'http://192.168.31.218:8080/#/detail/'+i.id" -->
        </a>
      </div>
    </div>
    <img src="../assets/img/a_3.jpg" alt="" class="code-img">
  </div>
</template>

<script>

export default {
  data () {
    return {
      indexObj: [],
      list: [],
      menu: 0,
    }
  },
  methods:{
    pagerLoad(){
      let url = "http://affqrcode.carrefourvip.com.cn/scan/index.php?s=/Home/Scan/index"
      this.$http.jsonp(url).then(function(res) {
        if(res.body.result == 200){
          this.indexObj = res.body.index_obj;
          this.list = res.body.list;
          // console.log(res.body)
          var reg = /index_pic_\d/;
          for(var key in this.indexObj){
            if(reg.test(key)){
              this.menu++
            }
          }
        }
      });
    },
    roll () {
        this.top = document.body.scrollTop || document.documentElement.scrollTop
      }
  },
  created(){
    this.pagerLoad()
  },
  activated(){ 
    if (document.body.scrollTop) {
      document.body.scrollTop = sessionStorage.getItem('roll')
    } else {
      document.documentElement.scrollTop = sessionStorage.getItem('roll')
      // console.log(sessionStorage.getItem('roll'),'----done')
    }
    window.addEventListener('scroll', this.roll)
  },
  deactivated(){
    sessionStorage.setItem('roll', this.top)
    // console.log(sessionStorage.getItem('roll'))
    window.removeEventListener('scroll', this.roll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
