<template>
  <div>
    <div class="header">
      计还器
    </div>
    <formItem label="借款金额" v-model="loan.loanNum" unit="元" placeholder="10000.00" @blur="handleNum"></formItem>
    <formItem label="借款期限" v-model="loan.loanTerm" unit="月" placeholder="1-360" @blur="handleTerm"></formItem>
    <formItem label="借款利率" v-model="loan.loanRate" unit="%" placeholder="年利率" @blur="handleRate"></formItem>
    <div class="btnbox">
      <button class="btn" @click="goDetail(0)">等额本息</button>
      <button class="btn" @click="goDetail(1)">等额本金</button>
    </div>  
    
  </div>
</template>

<script>
import formItem from '@/components/formItem'
export default {
  data () {
    return {
      loan: {
        loanNum: '',
        loanTerm: '',
        loanRate: ''
      }
    }
  },

  components: {
    formItem
  },

  methods: {
    goDetail (type) {
      // const url = '../detail/main'
      // let url = '../detail/main?loan=' + JSON.stringify(this.loan)
      let url = '../detail/main?type=' + type + '&&' + 'loan=' + JSON.stringify(this.loan)
      console.log('index is')
      console.log(this.loan)
      // console.log(this.motto)
      mpvue.navigateTo({url})
    },
    handleTerm () {
      if (!this.loan.loanTerm.match(/^([0-9]{1,2}|1[0-9]{2}|3[0-5][0-9]|360)$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '期限只能为0-360',
          duration: 2000,
          mask: true
        })
      }
    },
    handleNum () {
      if (!this.loan.loanNum.match(/^([1-9]{0,1}[0-9]{0,6})(\.\d{1,2})?$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '金额格式错误',
          duration: 2000,
          mask: true
        })
      }
    },
    handleRate () {
      if (!this.loan.loanRate.match(/^([1-9]{0,1}[0-9]{0,2})(\.\d{1,2})?$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '年利率格式错误',
          duration: 2000,
          mask: true
        })
      }
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .header {
    height: 200rpx;
    text-align: center;
    line-height: 200rpx;
    background: #747EFF;
    background: -webkit-linear-gradient(left,#747EFF,#ABB5FF);
    background: linear-gradient(left,#747EFF,#ABB5FF);
    color: #fff;
    margin-bottom: 10px;
  }
  .btnbox {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .btnbox .btn {
    color: #747EFF;
    border: 1px solid #747EFF;
  }
</style>
