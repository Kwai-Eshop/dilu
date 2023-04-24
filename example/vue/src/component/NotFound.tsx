import { defineComponent } from 'vue';

import { Exception } from 'view-ui-plus';

export const NotFound = defineComponent({
  components: { Exception },
  setup() {
    return () => <Exception type="404"></Exception>;
  },
});
