<template>
  <div>
    <div class="topbox" id="topBox">
      <div class="loaninfo">
        <div>{{loanNum}}元&nbsp;/&nbsp;</div>
        <div>{{loan.loanTerm}}期&nbsp;/&nbsp;</div>
        <div>{{loan.loanRate}}%</div>
      </div>
      <div class="resultbox">
        <div class="item">
          <strong>{{typeName}}</strong>
          <small>还款方式</small>
        </div>
        <div class="item">
          <strong>{{totalRate}}</strong>
          <small>总利息</small>
        </div>
        <div class="item">
          <strong>{{totalNum}}</strong>
          <small>总还款</small>
        </div>
      </div>
    </div>
    <div class="listhead" :class="{'fixed':isFixed}">
      <span>期数</span>
      <span>月供</span>
      <span>月供本金</span>
      <span>月供利息</span>
      <span>本金余额</span>
    </div>
    <scroll-view
      scroll-y
      style="height: 100%;"
    >
      <ul class="listbox">
        <li v-for="(item, index ) in monthList" :key="index">
          <span>{{index + 1}}</span>
          <span>{{item.monthSupply}}</span>
          <span>{{item.monthNum}}</span>
          <span>{{item.monthRate}}</span>
          <span>{{item.balance}}</span>
        </li>
      </ul>
    </scroll-view>

    
  </div>
</template>

<script>
import { moneyFormat } from '@/utils/index'

export default {
  data () {
    return {
      type: null,
      typeName: '',
      loan: {},
      loanNum: null,
      monthSupply: null,
      totalRate: null,
      totalNum: null,
      monthList: [],
      topHeight: null,
      isFixed: false
    }
  },
  methods: {
    interest () {
      let num = parseFloat(this.loan.loanNum)
      let term = parseInt(this.loan.loanTerm)
      let rate = this.loan.loanRate / 1200
      let monthSupply = 0 // 月供
      let monthRate = 0 // 月利息
      let totalRate = 0 // 总利息
      let monthNum = 0 // 月供本金
      let paidNum = 0 // 月已还本金
      let balance = 0 // 每月余额
      let monthList = []
      let totalNum = 0
      if (this.type.toString() === '1') {
        for (let i = 1; i < term + 1; i++) {
          monthNum = num / term
          monthRate = (num - paidNum) * rate
          totalRate += monthRate
          monthSupply = monthNum + monthRate
          paidNum += monthNum
          balance = num - paidNum
          monthList.push({monthSupply, monthRate, monthNum, balance})
        }
      } else {
        monthSupply = (num * rate * Math.pow((1 + rate), term)) / (Math.pow((1 + rate), term) - 1)
        this.monthSupply = moneyFormat(monthSupply)
        for (let i = 1; i < term + 1; i++) {
          monthRate = (num - paidNum) * rate
          totalRate += monthRate
          monthNum = monthSupply - monthRate
          paidNum += monthNum
          balance = num - paidNum
          monthList.push({monthSupply, monthRate, monthNum, balance})
        }
      }
      totalNum = totalRate + num
      this.totalRate = moneyFormat(totalRate)
      this.totalNum = moneyFormat(totalNum)
      this.loanNum = moneyFormat(num)
      monthList.map(i => {
        i.monthSupply = moneyFormat(i.monthSupply)
        i.monthRate = moneyFormat(i.monthRate)
        i.monthNum = moneyFormat(i.monthNum)
        i.balance = moneyFormat(i.balance)
      })
      this.totalRate = moneyFormat(totalRate)
      this.monthList = monthList
    },
    corpus () {

    },
    getHeight () {
      let _this = this
      this.query = wx.createSelectorQuery()
      this.query.select('#topBox').boundingClientRect(res => {
        _this.topHeight = res.height
      }).exec()
    }
  },
  mounted () {
    this.type = this.$root.$mp.query.type
    this.typeName = this.$root.$mp.query.type.toString() === '1' ? '等额本金' : '等额本息'
    this.loan = JSON.parse(this.$root.$mp.query.loan)
    // this.loanNum = moneyFormat(this.loan.loanNum)
    console.log('this.loan is')
    console.log(this.loan)
    console.log(this.loanNum)
    this.interest()
    this.$nextTick(() => {
      this.getHeight()
    })
  },
  onPageScroll (e) {
    console.log('e is')
    console.log(e)
    console.log(this.topHeight)
    let height = Math.floor(this.topHeight)
    if (e.scrollTop >= height) {
      this.isFixed = true
    } else {
      this.isFixed = false
    }
  }
}
</script>

<style>
.topbox {
  padding: 10rpx 0;
  background: #747EFF;
  background: -webkit-linear-gradient(left,#747EFF,#ABB5FF);
  background: linear-gradient(left,#747EFF,#ABB5FF);
}
.loaninfo {
  display: flex;
  /* justify-content: space-between; */
  color: #fff;
  font-size: 14px;
  padding-bottom: 60rpx;
  padding-left: 10px; 
}
/* .loaninfo div {
  text-align: center;
  width: 33.333%;
} */
.resultbox {
  display: flex;
  justify-content: space-between; 
}
.resultbox .item {
  text-align: center;
  width: 33.333%;
}
.resultbox .item strong{
  display: block;
  font-size: 18px;
  color: #fff;
}
.resultbox .item small{
  display: block;
  font-size: 12px;
  color: #fefefe;
}
.listhead {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  z-index: 99;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 3px 5px #eee; 
}
.listhead span{
  width: 23%;
  text-align: center;
  font-size: 12px;
  color: #666;
}
.listhead span:first-child {
  width: 8%;
  text-indent: -9999px;
}
.listbox {
  z-index: 9;
}
.listbox li{
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.listbox li:first-child.on {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 3px 3px #ddd;
}
/* .listbox li:first-child span{
  font-size: 12px;
  color: #666;
}
.listbox li:first-child span:first-child {
  text-indent: -9999px;
} */
.listbox li span {
  width: 23%;
  text-align: center;
  font-size: 14px;
  color: #333;
}
.listbox li span:first-child {
  width: 8%;
  color: #666;
}
</style>
