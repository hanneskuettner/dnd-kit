import React, {forwardRef, type HTMLAttributes} from 'react';

export const Handle = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    return React.createElement('handle-component', {
      ref,
      ...props,
    });
  }
);
