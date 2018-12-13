<template>
<div class="home">
  <number-sign @activeNumber="changeActiveNumber" class="number-sign"></number-sign>
  <div class="home-container">
    <div class="container">
      <div class="row" v-for="(row, rowIndex) in sudokuArr" :key="rowIndex">
        <div  class="column" v-for="(column, columnIndex) in row" :key="columnIndex" :class="{active: column === activeNumber}">
          <label>{{column}}</label>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Generator from '../class/generator';
import numberSign from '@/components/numberSign'
export default {
  name: 'home',
  data() {
    return {
      sudokuArr: [],
      activeNumber: -1
    }
  },
  created() {
    const generator = new Generator();
    this.sudokuArr = generator.generate();
  },
  mounted() {
    
  },
  methods: {
    changeActiveNumber(index) {
      this.activeNumber = index;
    }
  },
  components: {
    numberSign
  }
}
</script>
<style lang="stylus" scoped>
interval-small = #ffffff
interval-big = #6911EE
.home
  .number-sign
    position absolute
    bottom 0
  .home-container
    position absolute
    top 50%
    transform translateY(-50%)
    width 100%
    padding-top 100%
    .container
      position absolute
      box-sizing border-box
      border 2px solid interval-big
      background pink
      top 0
      width 100%
      height 100%
      display flex
      flex-direction: column;
      .row
        box-sizing border-box
        display flex
        flex 1
        vertical-align middle
        .column
          position relative
          box-sizing border-box
          flex 1
          border-right 2px solid interval-small
          border-bottom 2px solid interval-small
          &.column:nth-child(3)
            border-right 2px solid interval-big
          &.column:nth-child(6)
            border-right 2px solid interval-big
          &.column:last-child
            border-right none
          label
            position absolute
            top 50%
            left 50%
            transform translateY(-50%) translateX(-50%)
      .row:nth-child(3),.row:nth-child(6)
        border-bottom 2px solid interval-big
        .column
          border-bottom none
      .row:last-child
        .column
          border-bottom none
      .row
        .active
          background  red
</style>

