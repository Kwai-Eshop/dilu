import { defineComponent, ref, getCurrentInstance } from '@vue/composition-api';

import { DLWidget } from '@/Widget/index';

export const DLWidgetContent = defineComponent({
  components: {
    DLWidget,
  },
  props: ['name', 'entry'],
  setup(props, ctx) {
    const extra = ref({ title: '开始了' });
    const vm = getCurrentInstance();

    return () => {
      return (
        <div>
          <div
            onClick={() => {
              extra.value = { title: Math.random().toString() };
            }}
          >
            props更新
          </div>
          <div
            onClick={() => {
              debugger;
              //@ts-ignore
              const update = vm?.refs?.xx?.update;
              update?.({ props: { title: Math.random().toString() } });
            }}
          >
            update更新
          </div>
          <DLWidget
            ref="xx"
            {...({
              attrs: {
                name: props.name,
                entry: props.entry,
                extra: { title: extra.value.title, type: 'widget' },
              },
            } as any)}
          ></DLWidget>
        </div>
      );
    };
  },
});
