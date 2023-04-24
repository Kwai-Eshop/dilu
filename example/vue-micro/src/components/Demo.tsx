import { defineComponent, inject } from 'vue';
import { Title, Paragraph } from 'view-ui-plus';

export default defineComponent({
  components: {
    Title,
    Paragraph,
  },
  setup(props, ctx) {
    const value: any = inject('DLMicroContext');
    return () => (
      <div style={{ padding: '20px' }}>
        <Title level={1}>Vue3版本的路由组件</Title>

        <Title level={2}>{`随机数： ${value?.title || 0}`}</Title>
        <Paragraph></Paragraph>
        <Paragraph>
          <img
            style={{ height: '300px' }}
            src="https://img1.baidu.com/it/u=3771202995,2341004196&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
          ></img>
        </Paragraph>
      </div>
    );
  },
});
