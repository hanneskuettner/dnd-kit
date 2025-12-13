import React, {forwardRef} from 'react';

export interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
  columns?: number;
  label?: string;
  scrollable?: boolean;
  shadow?: boolean;
  style?: React.CSSProperties;
  transitionId?: string;
}

export const Container = forwardRef<HTMLElement, Props>(
  (
    {
      actions,
      children,
      columns = 1,
      label,
      style,
      scrollable,
      shadow,
      transitionId,
      ...props
    }: Props,
    ref
  ) => {
    return React.createElement(
      'container-component',
      {
        ref,
        columns: String(columns),
        label,
        'data-scrollable': scrollable ? 'true' : undefined,
        'data-shadow': shadow ? 'true' : undefined,
        style: {
          ...style,
          viewTransitionName: transitionId,
        },
        ...props,
      },
      <>
        {actions && <div slot="actions">{actions}</div>}
        <ul id={label}>{children}</ul>
      </>
    );
  }
);
