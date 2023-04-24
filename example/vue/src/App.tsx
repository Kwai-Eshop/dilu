import { defineComponent } from 'vue';

import { RouterView } from 'vue-router';
import './index.less';
export default defineComponent({
  components: {
    RouterView,
  },
  setup() {
    return () => {
      return <RouterView></RouterView>;
    };
  },
});
