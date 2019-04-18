<template>
  <div>
    <div class="header">
      <img class="logo" src="/static/images/logo.png" background-size="cover" />
      <h3>计还器</h3>
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
      if (this.loan.loanNum === '') {
        wx.showToast({
          icon: 'none',
          title: '请输入金额',
          duration: 2000,
          mask: true
        })
        return
      }
      if (this.loan.loanTerm === '') {
        wx.showToast({
          icon: 'none',
          title: '请输入期限',
          duration: 2000,
          mask: true
        })
        return
      }
      if (this.loan.loanRate === '') {
        wx.showToast({
          icon: 'none',
          title: '请输入年利率',
          duration: 2000,
          mask: true
        })
        return
      }
      if (!this.loan.loanNum.match(/^([1-9]{0,1}[0-9]{0,6})(\.\d{1,2})?$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '金额格式错误',
          duration: 2000,
          mask: true
        })
        return
      }
      if (!this.loan.loanTerm.match(/^([0-9]{1,2}|1[0-9]{2}|3[0-5][0-9]|360)$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '期限格式错误',
          duration: 2000,
          mask: true
        })
        return
      }
      if (!this.loan.loanNum.match(/^([1-9]{0,1}[0-9]{0,6})(\.\d{1,2})?$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '金额格式错误',
          duration: 2000,
          mask: true
        })
        return
      }
      let url = '../detail/main?type=' + type + '&&' + 'loan=' + JSON.stringify(this.loan)
      mpvue.navigateTo({url})
    },
    handleTerm () {
      if (!this.loan.loanTerm.match(/^([0-9]{1,2}|1[0-9]{2}|3[0-5][0-9]|360)$/)) {
        console.log('no')
        wx.showToast({
          icon: 'none',
          title: '期限格式错误',
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
  }
}
</script>

<style scoped>
  .header {
    height: 300rpx;
    text-align: center;
    background: #747EFF;
    background: -webkit-linear-gradient(left,#747EFF,#ABB5FF);
    background: linear-gradient(left,#747EFF,#ABB5FF);
    color: #fff;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .header h3 {

  }
  .logo {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
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
