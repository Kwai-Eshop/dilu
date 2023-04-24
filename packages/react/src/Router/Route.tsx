import React from 'react';
import { Activity, AppMetadata } from '@ks-dilu/core';

export interface RouteAppProps extends Partial<AppMetadata> {
  activeRule?: Activity;
  extra?: Record<string, any>;
  extras?: Record<string, any>;
  children?: React.ReactNode;
}

export const DLRoute = (props: RouteAppProps) => {
  const { name, entry, activeRule, children } = props;
  if (!name || !entry || !activeRule) {
    return <>{children}</>;
  }
  return <></>;
};
