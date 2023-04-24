import { defineComponent, ref } from 'vue';

import { DLWidget } from '@ks-dilu/vue';
import { Card, Icon, Button } from 'view-ui-plus';
import { RouteMicros } from '../micros';

export const DLWidgetContent = defineComponent({
  components: {
    DLWidget,
    Card,
    Button,
  },
  props: ['name', 'entry'],
  setup(props, ctx) {
    const extra = ref({ title: '开始了' });
    const refInstance = ref();
    debugger;
    return () => {
      return (
        <Card>
          {{
            title: () => {
              return (
                <>
                  <Icon type="ios-film-outline"></Icon>
                  组件级子应用
                </>
              );
            },
            extra: () => {
              return (
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      refInstance.value.update({
                        props: {
                          title: Math.random().toString(),
                        },
                      });
                    }}
                  >
                    通过实例update方法
                  </Button>
                  <Button
                    onClick={() => {
                      extra.value = { title: Math.random().toString() };
                    }}
                  >
                    通过Props更新子应用
                  </Button>
                </div>
              );
            },
            default: () => {
              return (
                <DLWidget
                  ref={refInstance}
                  name={props.name}
                  entry={props.entry}
                  extra={{ title: extra.value.title, type: 'widget' }}
                ></DLWidget>
              );
            },
          }}
        </Card>
      );
    };
  },
});
