import { computed, defineComponent, onMounted, reactive, ref } from 'vue';

import { RouteAppContainer } from '@/Container';
import { DLWidget } from '@/Widget';
import { DLRouter } from '@/Router';
import { RouterView, useRouter } from 'vue-router';
import {
  Exception,
  Sider,
  Card,
  Content,
  Menu,
  MenuItem,
  Icon,
  Submenu,
  Button,
} from 'view-ui-plus';
import { RouteMicros } from './micros';
export const NotFound = defineComponent({
  components: { Exception },
  setup() {
    return () => <Exception type="404"></Exception>;
  },
});

export const LayoutUI = defineComponent({
  setup() {
    const showWidget1 = ref(false);
    const showWidget2 = ref(false);

    const router = useRouter();

    const items2 = computed(() => {
      return [
        {
          key: 'route',
          label: '路由级子应用',
          children: [
            {
              key: '1',
              label: '/zone/1',
            },
            {
              key: '2',
              label: '/zone/2',
            },
            {
              key: '3',
              label: '/zone-origin/1',
            },
            {
              key: '4',
              label: '/zone-origin/2',
            },
            {
              key: 'x',
              label: '不存在的路由',
            },
          ],
        },
        {
          key: 'widget',
          label: `组件级子应用`,
          children: [
            {
              key: 'widget1',
              label: `${showWidget1.value ? '隐藏' : '显示'}-组件子应用1`,
            },
            {
              key: 'widget2',
              label: `${showWidget2.value ? '隐藏' : '显示'}-组件子应用2`,
            },
          ],
        },
      ];
    });

    return () => {
      return (
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="https://v2.cn.vuejs.org/images/logo.svg"></img>
              <span class="logo-title">Vue Main Demo</span>
            </div>
          </div>
          <div class="content-wrap">
            <div class="sidebar">
              <Sider hide-trigger>
                <Menu
                  theme="light"
                  width="auto"
                  onOnSelect={(key: any) => {
                    if (key === 'widget1') {
                      showWidget1.value = !showWidget1.value;
                    } else if (key === 'widget2') {
                      showWidget2.value = !showWidget2.value;
                    } else if (['1', '2'].includes(key)) {
                      router.push(`/zone/${key}`);
                    } else if (['3', '4'].includes(key)) {
                      router.push(`/zone-origin/${key - 2}`);
                    } else {
                      router.push(`/zonee/${key}`);
                    }
                  }}
                >
                  {items2.value.map((it: any) => {
                    return (
                      <Submenu name={it.key}>
                        {{
                          title: () => <>{it.label}</>,
                          default: () =>
                            it.children.map((subIt: any) => {
                              return <MenuItem name={subIt.key}>{subIt.label}</MenuItem>;
                            }),
                        }}
                      </Submenu>
                    );
                  })}
                </Menu>
              </Sider>
            </div>
            <div class="content">
              <Content>
                <RouterView />
              </Content>
              {/* <DLWidget
              entry={entry.value}
              name={entry.value}
              ref={dl}
              extra={{ type: 'widget', title: extra.title }}
              loader={(l: any) => {
                console.log('loading', l);
              }}
            ></DLWidget> */}
            </div>
          </div>
        </div>
      );
    };
  },
});

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
                  全局广播
                </Button>
              );
            },
            default: () => {
              return (
                <DLRouter
                  fetchMicros={async () => {
                    return Promise.resolve(RouteMicros);
                  }}
                  isOccupyOuterContainer={false}
                  extra={{
                    ...extra.value,
                  }}
                  activeFilter={(location: Location) => {
                    return !location.pathname.includes('/zone-origin/2');
                  }}
                ></DLRouter>
              );
            },
          }}
        </Card>
      );
    };
  },
});

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
