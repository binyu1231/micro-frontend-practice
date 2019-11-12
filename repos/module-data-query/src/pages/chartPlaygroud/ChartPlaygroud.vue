<template>
<div>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="数据源" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'dataorigin',
          { rules: [{ required: true, message: '!' }] },
        ]"
        placeholder="选择数据源"
      >
        <a-select-option value="bi">
          BI
        </a-select-option>
        <a-select-option value="other">
          OTHER
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="展现形式" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'display',
          { rules: [{ required: true, message: '!' }] },
        ]"
        placeholder="选择展现形式"
      >
        <a-select-option value="table">
          表格
        </a-select-option>
        <a-select-option value="pie">
          饼图
        </a-select-option>
        <a-select-option value="line">
          线图
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'chart-control' })
    }
  },

  methods: {
    handleSubmit () {
      
    }
  }
}
</script>

<style>

</style>