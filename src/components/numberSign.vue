<template>
    <div class="number-sign">
        <div @click="activeNumber(item)" class="item" v-for="(item, index) in dataArr" :key="index">
            {{item}}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataArr: Array.from({length: 9}, (v, i) => i + 1)
        }
    },
    methods: {
        activeNumber(index) {
            this.$emit('activeNumber', index);
        }
    }
}
</script>
<style lang="stylus" scoped>
itemHeight = 40px
.number-sign
    width 100%
    background gray 
    height itemHeight
    color #fff
    line-height itemHeight
    display flex
    .item
        flex 1
        text-align center
        box-sizing border-box
        border 1px solid #fff
</style>
