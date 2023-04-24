import { defineComponent, ref } from 'vue';

import { DLRouter } from '@ks-dilu/vue';
import { Card, Icon, Button } from 'view-ui-plus';
import { RouteMicros } from '../micros';

export const DLContent = defineComponent({
  components: {
    DLRouter,
    Card,
    Button,
  },
  setup(_props: any, ctx) {
    const extra = ref({ title: '开始了' });

    return () => {
      return (
        <Card>
          {{
            title: () => {
              return (
                <>
                  <Icon type="ios-film-outline"></Icon>
                  路由级子应用
                </>
              );
            },
            extra: () => {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    extra.value = { title: Math.random().toString() };
                  }}
                >
                  更新标题
                </Button>
              );
            },
            default: () => {
              return (
                <DLRouter
                  fetchMicros={async () => {
                    return Promise.resolve(RouteMicros);
                  }}
                  extra={{
                    ...extra.value,
                  }}
                  activeFilter={(location: Location) => {
                    return !location.pathname.includes('/zone-origin/2');
                  }}
                >
                  {{
                    default: (args: any) => {
                      console.log(args);
                      return (
                        <>
                          <span>444</span>
                          <span>444</span>
                        </>
                      );
                    },
                  }}
                </DLRouter>
              );
            },
          }}
        </Card>
      );
    };
  },
});
