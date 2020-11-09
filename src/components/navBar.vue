<template>
    <div>
        <van-nav-bar
        :title="navtitle"
        left-arrow
        fixed
        @click-left="onClickLeft"
        />
    </div>
</template>

<script>
export default {
    name:"navBar",
    props:{
        navtitle: {
            type: String,
            default: "标题"
        },
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
  },
};
</script>