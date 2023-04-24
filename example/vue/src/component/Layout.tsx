import { computed, defineComponent, ref } from 'vue';

import { RouterView, useRouter } from 'vue-router';
import { Sider, Content, Menu, MenuItem, Submenu } from 'view-ui-plus';
import { DLWidgetContent } from './DLWidgetContent';

export const LayoutUI = defineComponent({
  setup() {
    const showWidget1 = ref(false);
    const showWidget2 = ref(false);
    const showWidget3 = ref(false);
    const showWidget4 = ref(false);

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
              key: '5',
              label: '/vue3/1',
            },
            {
              key: '6',
              label: '/vue3/404',
            },
            {
              key: '7',
              label: '/vue2/1',
            },
            {
              key: '8',
              label: '/vue2/2',
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

            {
              key: 'widget3',
              label: `${showWidget3.value ? '隐藏' : '显示'}-Vue3组件`,
            },
            {
              key: 'widget4',
              label: `${showWidget4.value ? '隐藏' : '显示'}-Vue2组件`,
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
                    } else if (key === 'widget3') {
                      showWidget3.value = !showWidget3.value;
                    } else if (key === 'widget4') {
                      showWidget4.value = !showWidget4.value;
                    } else if (['1', '2'].includes(key)) {
                      router.push(`/zone/${key}`);
                    } else if (['3', '4'].includes(key)) {
                      router.push(`/zone-origin/${key - 2}`);
                    } else if (['5', '6'].includes(key)) {
                      router.push(`/vue3/${key - 4}`);
                    } else if (['7', '8'].includes(key)) {
                      router.push(`/vue2/${key - 6}`);
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
              <div class="cmpWrap">
                {showWidget1.value ? (
                  <DLWidgetContent name="1" entry="https://localhost:9000" />
                ) : null}
                {showWidget2.value ? (
                  <DLWidgetContent name="2" entry="https://localhost:9001" />
                ) : null}
                {showWidget3.value ? (
                  <DLWidgetContent name="3" entry="https://localhost:9003" />
                ) : null}
                {showWidget4.value ? (
                  <DLWidgetContent name="3" entry="https://localhost:9004" />
                ) : null}
              </div>

              <Content>
                <RouterView />
              </Content>
            </div>
          </div>
        </div>
      );
    };
  },
});
