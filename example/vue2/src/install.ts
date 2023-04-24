import { Vue2 as Vue, install } from 'vue-demi';
// import VueCompositionAPI from '@vue/composition-api';
import VueRouter from 'vue-router';

install(Vue);
// function install(_vue: any) {
//   _vue = _vue || Vue;
//   if (_vue && !_vue['__composition_api_installed__']) _vue.use(VueCompositionAPI);
// }
// install(Vue);

Vue.use(VueRouter);
