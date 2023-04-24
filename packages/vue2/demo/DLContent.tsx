import { DLRouter, type DLRouterProps } from '@/Router'; // @ is an alias to /src
import { defineComponent, ref } from '@vue/composition-api';
import { RouteMicros } from './micros';

export default defineComponent({
  setup(props: any) {
    return () => {
      return (
        <div class="home">
          <DLRouter
            {...({
              props: { fetchMicros: () => Promise.resolve(RouteMicros) },
            } as any)}
            scopedSlots={{
              default: (xx: any) => {
                console.log(xx);
                return <div>adf</div>;
              },
            }}
          ></DLRouter>
        </div>
      );
    };
  },
});
