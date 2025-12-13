import React, {forwardRef, CSSProperties} from 'react';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  variant?: 'light' | 'dark' | 'destructive';
  cursor?: CSSProperties['cursor'];
}

export const Action = forwardRef<HTMLElement, Props>(
  ({cursor, style, variant = 'light', ...props}, ref) => {
    return React.createElement('action-component', {
      ref,
      'data-variant': variant,
      cursor,
      style,
      ...props,
    });
  }
);
