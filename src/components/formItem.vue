<template>
  <div class="form-item">
    <div class="form-label">{{label}}</div>
    <div class="form-cont">
      <input type="text" class="form-ipt" :placeholder="placeholder" :value="currentValue" @input="handleInput" @blur="handleBlur"/>
      <span class="form-unit">{{unit}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'unit', 'placeholder'],
  data () {
    return {
      currentValue: this.value
    }
  },

  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  methods: {
    handleInput (e) {
      const value = e.target.value
      this.currentValue = value
      this.$emit('input', value)
    },
    handleBlur (e) {
      const value = e.target.value
      this.currentValue = value
      this.$emit('blur', value)
    }
  }
}
</script>

<style scoped>
.form-item {
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px;
  padding: 10px 10px 20px;
  border-bottom: 1px solid #eee;
  color: #333;
}
.form-label {
  margin-right: 20px;
}
.form-cont {
  display: flex;
}
.form-ipt {
  text-align: right;
}
.form-unit {
  padding-left: 5px;
  color: #666;
}
</style>
