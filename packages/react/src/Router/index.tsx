/**
 * 微前端路由级组件
 */
import React, { useEffect, useState } from 'react';
import {
  createDebug,
  MicroInfo,
  MicroType,
  CollectType,
  createDefaultCollect,
  FetchStatus,
  MicroList,
} from '@ks-dilu/core';
import { DLSwitch } from './Switch';
import { DLRoute } from '@/Router/Route';
import { SwitchProps } from './Switch/Bootstrap';

const debug = createDebug('DL:Router');

const defaultCollect = createDefaultCollect(debug);

export interface DLRouterProps extends Omit<SwitchProps, 'children'> {
  fetchMicros: () => Promise<MicroList>;
  children?: React.ReactNode | ((state: any, list: any) => React.ReactNode);
}

export const DLRouter = ({
  fetchMicros = () => Promise.resolve([]),
  collect = defaultCollect,
  children,
  ...switchProps
}: DLRouterProps) => {
  const [microList, setMicroList] = useState<MicroList>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Init);

  useEffect(() => {
    (async () => {
      setFetchStatus(FetchStatus.Fetching);
      try {
        const micros = await fetchMicros();
        debug('获取到子应用列表: %O', micros);
        setMicroList(micros);
        setFetchStatus(FetchStatus.Fetched);
      } catch (e) {
        collect(CollectType.ERROR, e);
        debug('获取到子应用列表失败: %O', e);
        setFetchStatus(FetchStatus.Error);
      }
    })();
  }, []);

  return (
    <>
      {fetchStatus == FetchStatus.Fetched ? (
        <DLSwitch {...switchProps} collect={collect}>
          {microList?.map((micro: MicroInfo) => {
            if (micro.type == MicroType.Route) {
              return <DLRoute {...micro} key={micro.name}></DLRoute>;
            }
            return null;
          })}
          {children ? <DLRoute>{children}</DLRoute> : null}
        </DLSwitch>
      ) : null}
    </>
  );
};
