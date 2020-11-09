<template>
    <div class="person"  :style="{ background: `#eee url(${url}) no-repeat top left / 100% 300px `}">
        <NavBar :navtitle="navtitle"/>
        <div class="info" >
            <div class="changeTemplate" @click="changeTemplate">更换模板</div>
            <div class="part top">
                <van-row>
                    <van-col span="8">
                        <van-image
                        round
                        width="5rem"
                        height="5rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        />
                    </van-col>
                    <van-col span="16">
                        <a class="name" @click="toMy">{{name}}</a> 
                        <p><span class="tel">18001180162</span><span class="code">查看微信二维码</span></p></van-col>
                </van-row>
                <ul>
                    <li><span>工号：</span>{{userform.num}}</li>
                    <li>
                        <span>职级：</span>
                        <van-field v-model.trim="userform.level" ref="level" :autofocus="!level" :readonly="level"  /> 
                        <p>
                            <span v-if="level" class="edit" @click="edit('level')" ></span>
                            <span v-if="!level" class="ok" @click="onOk('level')">完成</span>
                        </p>
                    </li>
                    <li><span>公司地址：</span>{{userform.address}}</li>
                </ul>
            </div>

            <div class="part bar">
                <span>执业资质</span>
                <van-field v-model.trim="userform.qualification" :disabled="qualification" ref="qualification" /> 
                <span >
                    <span v-if="qualification" class="edit" @click="edit('qualification')" ></span>
                    <span v-if="!qualification" class="ok" @click="onOk('qualification')">完成</span>
                </span>
            </div>

            <div class="part bar">
                <span>从业时间</span>
                <span>{{userform.startTime}}</span>
            </div>

            <div class="part">
                <div class="bar">
                    <span>个人简介</span> <span >
                        <span v-if="info" class="edit" @click="edit('info')" ></span>
                        <span v-if="!info" class="ok" @click="onOk('info')">完成</span>
                    </span>
                </div>
                <van-field v-model="userform.info" ref="info" :disabled="info" rows="5"  autosize  show-word-limit type="textarea" maxlength="120"  />
            </div>

            <div class="part listry">
                <div class="bar">
                    <span>个人荣誉</span> <span @click="honorAdd">添加</span>
                </div>
                <ul>
                    <li v-for="(item,i) in userform.honor" :key="i">
                        <div class="ry">
                            <span>{{item.title}}</span><span>{{item.time}}</span>
                        </div>
                        <span class="edit" @click="honorEdit(item,i)" ></span>
                    </li>
                </ul>
            </div>

            <div class="part">
                <div class="bar">
                    <span>个人风采</span>
                </div>
                <van-uploader v-model="userform.ability" multiple />
            </div>

        </div>
        <van-dialog v-model="honor" :title="honorFlag == 0 ? '添加荣誉' :'修改荣誉'" show-cancel-button @confirm="confirm" @cancel="cancel">
           <div class="box">
                <van-field v-model.trim="title" placeholder="请输入个人荣誉" /> 
                <van-field v-model.trim="time" placeholder="请输入时间"  /> 
           </div>
        </van-dialog>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import { mapState } from "vuex"
export default {
    name:"user",
    data(){
        return{
            navtitle:"个人管理",
            userform:{
                num:"200010000", //工号
                level:"高级工程师", //职级
                address:"北京市海淀区北京市海淀", //地址
                qualification:"1111", //执业资质
                startTime:"2008-09-09", //从业时间
                info:"热情随和，活波开朗，具有进取精神和团队精神，有较强的动手能力。良好协调沟通能力，适应力强，反应快、积极、灵活，爱创新!",//简介
                honor:[{"title":"技术比赛一等奖","time":"2008-09-09"},{"title":"技术比赛一等奖","time":"2008-09-09"}], //荣誉
               ability:[{"url":"https://img.yzcdn.cn/vant/leaf.jpg"},{"url":"https://img.yzcdn.cn/vant/leaf.jpg"}], //个人风采
            },
            level:true,
            qualification:true,
            info:true,
            honor:false, 
            honorFlag:0, //0 添加  1修改
            honorIndex:null, //i
            title:"",
            time:"",
            url:"",
            src:[
                {url:"https://img.yzcdn.cn/vant/sand.jpg"},
                {url:"https://img.yzcdn.cn/vant/tree.jpg"},
                {url:"https://img.yzcdn.cn/vant/leaf.jpg"},
                {url:"https://img.yzcdn.cn/vant/apple-1.jpg"},
                {url:"https://img.yzcdn.cn/vant/ipad.jpeg"},
            ]
        }
    },
    created(){
        // 默认值
        this.url = this.src[0].url;
    },
    computed:{
        ...mapState('user',["name","userLevel"])
    },
    components:{
        NavBar
    },
    watch:{
        level(v){
            if(v== false){
                this.$nextTick(()=>{
                    this.$refs.level.focus()
                })
            }
        },
        qualification(v){
            if(v== false){
                this.$nextTick(()=>{
                    this.$refs.qualification.focus()
                })
            }
        },
        info(v){
            if(v== false){
                this.$nextTick(()=>{
                    this.$refs.info.focus()
                })
            }
        },
    },
    methods:{
        // 修改
        edit(r){
            if(r == "level"){
                this.level = false 
            } else if( r == "qualification" ){
                this.qualification = false
            } else if( r == "info" ){
                this.info = false
            }
        },
        // 完成
        onOk(r){
            if(r == "level"){
                this.level = true
                // for example: use user store mutations or actions 
                // this.$store.commit("user/MSetUserLevel",this.userform.level)
                // this.$store.dispatch("user/ASetUserLevel",this.userform.level)
            } else if( r == "qualification" ){
                this.qualification = true
            } else if( r == "info" ){
                this.info = true
            }
        },
        // 个人荣誉-添加
        honorAdd(){
            this.honor = true
            this.honorFlag = 0;
            this.title ="";
            this.time ="";
        },
        // 个人荣誉-修改
        honorEdit(item,i){
            this.honor = true ;
            this.honorIndex =i
            this.honorFlag = 1
            this.title = item.title;
            this.time = item.time;
        },
        // 个人荣誉-添加/修改-确认
        confirm(){
            if(this.honorFlag == 0){
                // 添加
                const row = { title: this.title,time:this.time}
                this.userform.honor.push(row);
                this.title ="";
                this.time ="";
            } else if(this.honorFlag == 1) {
                // 修改
                const i = this.honorIndex;
                this.userform.honor[i].title = this.title
                this.userform.honor[i].time = this.time
            }
        },
        // 个人荣誉-添加/修改-取消
        cancel(){
            this.title ="";
            this.time ="";
        },
        // 变更模板
        changeTemplate(){
            const length = this.src.length
            const i=  Math.round(Math.random()*(length-1));
            this.url= this.src[i]["url"]
        },
        toMy(){
            this.$router.push({name:"My",query:{"name":"zhangsan","age":"18"}})
        }
    }
}
</script>

<style lang="less" scoped>
.person{
    .name{
        color: blue; text-decoration: underline;
    }
    padding-top: 46px;
    min-height: 100vh;
    padding-bottom:20px;
    background-color: #eee;
    .info{
        margin:10px;
    }
    .part {
        border-radius:2px ;
        padding:5px 10px;
        background-color: #fff;
        text-align: left;
        margin-bottom: 10px;
        li{
            
        }
    }
    .top{
        padding:10px;
        p{
            margin: 0;
        }
        .van-row{
            display: flex;
            align-items: center;
        }
        ul{
            margin-top: 10px;
            li {
                display: flex;
                align-content: center;
                padding:5px 10px;
                height: auto;
                span{
                    min-width: 80px;
                    align-items: top;
                }
            }
        }
    }
    .part.listry{
        li{
            padding: 5px 0;
            display: flex;
            justify-content:space-between;
            align-items: center;

            .ry{
                span {
                    display: block;
                    line-height: 20px;
                    font-size: 12px;
                }
            }
            .edit{
                height: 40px;
            }
            
        }
        
    }
    .edit{
        background-size: 100%;
        transition: all 0.1s ease;
        background: url('~@/assets/img/edit.png') no-repeat left center ;
        display: inline-block;
        width: 20px;
        height: 100%;
        cursor: pointer; 
    }

    .ok{
        color: rgb(0, 162, 255) ; font-size: 14px;  height: 100%; 
    }
    .bar {
        .edit{
            height: 55px;
        }
    }
    .bar {
        display: flex;
        justify-content:space-between;
        align-items: center;
        height: 40px;
        line-height: 40px;
    }
    .tel,.code{
        border:1px solid #555;
        margin-right:10px;
        border-radius: 10px;
        font-size: 8px;
        padding:0 4px;
    }

    .cz{
        &.showEdit{
            .edit{ display: block; }
            .ok{
                display: none; height: 24px;
            }
            

        } 
        &.showOk{
            .edit{display: none;}
            .ok{
                display: block; height: 24px;
            }

        }
    }
    .box{
        margin: 20px 50px;
}
    
}
/deep/.van-cell{
    width: auto;
    padding: 0;
}

/deep/.van-field__control:disabled{
    color:#2c3e50;
    -webkit-text-fill-color:#2c3e50;
}
/deep/.van-field__body{
    height: 100%;
}
.changeTemplate{
    font-size: 12px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
    display: inline-block;
    padding:0 10px;
}
</style>