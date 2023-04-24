import React from 'react';
import { FetchStatus, Advanced } from '@ks-dilu/core';

export interface IDLContenxt {
  microList?: Array<any>;
  fetchStatus?: FetchStatus;
  /**
   * 高级配置选项，
   */
  advanced?: Advanced;
}

export const DLContext = React.createContext<IDLContenxt>({});
