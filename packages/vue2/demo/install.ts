import Vue, { type VueConstructor } from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import VueRouter from 'vue-router';

function install(_vue: VueConstructor<Vue>) {
  _vue = _vue || Vue;
  if (_vue && !_vue['__composition_api_installed__']) _vue.use(VueCompositionAPI);
}
install(Vue);

Vue.use(VueRouter);
