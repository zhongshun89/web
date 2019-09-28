import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { Validator } from 'vee-validate'

Vue.use(VeeValidate)

Validator.localize('zh_CN', zhCN)
