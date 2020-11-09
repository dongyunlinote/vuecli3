<template>
    <div class="content">
      <header-bar :title='msg' />
      <div class='plant'>
        <div style='padding-top:70px'></div>
        <div class='plant_content'>
          <div class="agent_title">
            <img src='../assets/defaultHead.png'/>
            <div>
              <h5>{{name}}</h5>
              <p><span>{{mobile}}</span><span>查看微信二维码</span></p>
            </div>
          </div>

          {{$store.state}}
          <div class='agent_info'>
            <ul>
              <li><label>工&emsp;&emsp;号:</label><span>{{number}}</span></li>
              <li><label>职&emsp;&emsp;级:</label><span>{{$store.state.personManagement.agentInfo.careerLevel}}</span></li>
              <li><label>公司地址:</label><span>{{address}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content_info temperament">
        <div><img src='../assets/zizhi.png' /><span>执业资质</span></div>
        <div>
          <input type='text' v-model='$store.state.personManagement.agentInfo.praQualification' :readonly='temperamentRead' :class="!temperamentRead ? 'inputTextShow' : 'inputTextHide' "/>
          <img src='../assets/edit.png' @click='changeTemperament'/>
        </div>
      </div>
      <div class="content_info">
        <div><img src='../assets/zizhi.png' /><span>从业时间</span></div>
        <div @click="changeTimeRead = true"><span>{{$store.state.personManagement.agentInfo.employmentTime}}</span></div>
      </div>
      <van-calendar v-model="changeTimeRead" @confirm="onConfirm" confirm-text="确定" :show-confirm='true'/>
      <div class='intro'>
        <div class="content_info" style='margin:0px'>
          <div><img src='../assets/zizhi.png' /><span>个人简介</span></div>
          <div>
            <img src='../assets/edit.png' v-if='isEditAreaTest' @click='changeAreaText' style="width: .16rem;height: .16rem"/>
            <span v-if='!isEditAreaTest' @click='changeIntro'>完成</span>
          </div>
        </div>
        <div>
          <van-field v-model="$store.state.personManagement.agentInfo.profile"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="快去添加您的个人简介吧"
            show-word-limit
            :readonly="isEditAreaTest"
          />
        </div>
      </div>
      <div class='intro'>
        <div class="content_info" style='margin:0px'>
          <div><img src='../assets/zizhi.png' /><span>个人荣誉</span></div>
          <div>添加</div>
        </div>
        <div class="honor_list">
          <ul>
            <li :key='index' v-for='(site,index) in $store.state.personManagement.agentInfo.honor'>
              <div class="honor_item"><span>{{site.honorTitle}}</span><img src='../assets/edit.png' @click="editHonor(site,index)" /></div>
              <p class="honor_time">{{site.honorTime}}</p>
            </li>
          </ul>
        </div>
      </div>
      <van-dialog v-model="editIntroRead" title="个人荣誉" show-cancel-button @confirm="confirmHonor()">
        <div class="editHonorDialog">
          <input type="text" v-model="currentHonorTitle"/>
          <input type="text" v-model="currentHonorTime" placeholder="请输入获取时间 如: 2018-01"/>
        </div>
      </van-dialog>
      <div class='intro'>
        <div class="content_info" style='margin:0px'>
          <div><img src='../assets/zizhi.png' /><span>个人风采</span></div>
        </div>
        <div class="honor_list">
          <ul>
            <li :key='index' v-for='(site,index) in $store.state.personManagement.agentInfo.style'>
              <div class="honor_item"><img :src='site' @click="editHonor(site,index)" /></div>
              <p class="honor_time">{{site.honorTime}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/Hearder'
export default {
  name: 'Home',
  data () {
    return {
      msg: '个人管理',
      name: '姓名',
      mobile: '15122223456',
      number: '2111100149',
      rank: '职级',
      address: '北京市丰台区',
      isEditAreaTest: true,
      message: '',
      temperamentRead: true,
      changeTimeRead: false,
      editIntroRead: false,
      currentHonorTitle: '',
      currentHonorTime: '',
      currentHonorIndex: ''
    }
  },
  components: {
    HeaderBar
  },
  created () {
    // 相当于componentWillMount
    //  获取个人管理信息接口
    this.$store.dispatch('getPersonInfo')
  },
  methods: {
    changeTemperament () {
      console.log(this.temperamentRead)
      this.temperamentRead = !this.temperamentRead
    },
    changeAreaText () {
      this.isEditAreaTest = !this.isEditAreaTest;
    },
    // 确认时间
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm (date) {
      this.changeTimeRead = false;
      this.$store.dispatch('changePersonInfo', {'employmentTime': this.formatDate(date)})
      // this.date = this.formatDate(date);
    },
    // 个人简介修改
    changeIntro () {
      this.isEditAreaTest = true
      console.log(this.$store.state.personManagement.agentInfo.profile)
      // this.$store.dispatch('changePersonInfo', {'profile': data})
    },
    // 个人荣誉修复
    editHonor (obj, ind) {
      this.editIntroRead = true
      this.currentHonorTitle = obj.honorTitle
      this.currentHonorTime = obj.honorTime
      this.currentHonorIndex = ind
      console.log(obj, ind)
    },
    confirmHonor () {
      console.log(this.currentHonorTitle)
      // this.$store.state.personManagement.agentInfo.honor.map((item,index) => {
      //   return
      // })
      let honorList = []
      honorList = this.$store.state.personManagement.agentInfo.honor.map((prod, index) => {
        if (index === this.currentHonorIndex) {
          prod.honorTitle = this.currentHonorTitle
          prod.honorTime = this.currentHonorTime
        }
        return prod
      })
      console.log(honorList)
    }

  }
}
</script>

<style scoped>
h5,p,ul,li{margin:0px; padding:0px;}
ul,li{list-style: none}
input{border:none}
.content{background: #f0f0f0;padding-bottom: 0.1rem;font-size: 0.14rem}
.plant{
  background-image: url('../assets/WechatIMG101.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.plant_content{
  background: #fff;
  margin: 0.3rem 0.1rem 0rem 0.1rem;
  border-radius: 0.08rem;
  padding: 0.1rem;
}
.plant_content .agent_title {
  display: flex;
}
.plant_content .agent_title img{
  margin-right: 0.1rem;
}

.agent_title h5{
  font-size: 0.16rem;
  font-weight: bold;
  margin-top: 0.1rem;
  margin-bottom: 0.08rem;
}
.agent_title p span{
  border: 1px solid #000;
  border-radius: 0.18rem;
  padding: 0.03rem 0.05rem;
  font-size: 0.12rem;
  margin-right: 0.08rem;
}
.agent_info{
  text-align: left;
}
.agent_info li{
  padding: 0.05rem 0rem;
}
.agent_info li label{
  width: 0.9rem;
  display: inline-block;
}
.content_info{
  background: #fff;
  border-radius: 0.08rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 0.1rem;
  padding: 0.1rem 0.1rem;
}
/*个人简介*/
.intro{
  background: #fff;
  border-radius: 0.08rem;
  margin: 0.1rem;
  overflow: hidden;
}
.content_info div{
  display: flex;
  align-items: center;
}
/*资质*/
.temperament img{
  width:.16rem;
  height:.16rem;
}
.content_info img:first-child{
  width:.24rem;
  height:.24rem;
}
.temperament .inputTextHide{
  text-align: right;
  padding-right: 0.05rem;
  width: 0.9rem;
}
.temperament .inputTextShow{
  border-bottom: 1px solid #ccc;
  text-align: left;
  width: 0.9rem;
}
  /*荣荣誉列表*/
.honor_list{
  background: #fff;
}
.honor_item{
  display: flex;
  justify-content: space-between;
}
.honor_list li{
  padding: 0.1rem 0.1rem;
}
.honor_list li img{
  width: .16rem;
  height:.16rem
}
.honor_time{
  text-align: left;
  margin-top: 0.08rem;
  font-size: .12px;
}
.editHonorDialog {
  padding: .1rem;
}
.editHonorDialog input {
  border: 1px solid #ccc;
  border-radius: 0.08rem;
  padding: .1rem;
  margin: .1rem 0rem;
}
</style>
