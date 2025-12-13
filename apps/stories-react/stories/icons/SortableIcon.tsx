import React, {type HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  width?: number;
}

export const SortableIcon = ({width, ...props}: Props) => {
  return React.createElement('sortable-icon', {
    width: width ? String(width) : undefined,
    ...props,
  });
};
