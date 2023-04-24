import React from 'react';

export interface IAppContainerProps extends Record<string, any> {
  containerIdentity?: string;
}
export const RouteAppContainer = (props: IAppContainerProps) => {
  const { containerIdentity: container, children } = props || {};

  const identity: Record<string, any> = {};
  if (typeof container === 'string') {
    if (container.startsWith('#')) {
      identity.id = container.substring(1);
    } else if (container.startsWith('.')) {
      identity.id = container.substring(1);
    } else if (container) {
      identity.id = container;
    }
  }
  return <div {...identity}>{children}</div>;
};

export const WidgetAppContainer = React.forwardRef((props: any, ref: any) => {
  const { children } = props || {};

  return <div ref={ref}>{children}</div>;
});
