import { defineComponent, inject } from 'vue';
import { Title, Paragraph, Text } from 'view-ui-plus';

export default defineComponent({
  components: {
    Title,
    Paragraph,
    Text,
  },
  setup(props, ctx) {
    const value: any = inject('DLMicroContext');
    debugger;
    return () => (
      <div style={{ padding: '20px' }}>
        <Title level={1}>Vue3版本的组件级应用</Title>
        <Title level={2}>{`随机数：${value?.title || 0}`}</Title>

        <Paragraph>
          <img
            style={{ width: '200px' }}
            src="https://img1.baidu.com/it/u=847956157,2750448390&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
          ></img>
        </Paragraph>
      </div>
    );
  },
});
