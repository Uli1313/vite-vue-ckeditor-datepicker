// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';

// VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// VeeValidate
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.use(createPinia())
app.use(router)
app.use(CKEditor)
app.use(VueAxios, axios)

app.mount('#app')
