import * as React from 'react';
import cls from "classnames";
import { Button, ButtonProps } from '@tarojs/components';
import { mergeProps } from '../../utils';

export interface TButtonProps extends ButtonProps {
  block: boolean;
  loading: boolean;
  shape: 'default' | 'rounded' | 'rectangular';
  fill: 'solid' | 'outline' | 'none';
}

const classPrefix = 't-button'

const Index: React.FC<TButtonProps> = (p) => {
  const props = mergeProps({
    block: false,
    loading: false,
    shape: 'default',
    fill: 'none',
  }, p)

  return (
    <Button
      className={
        cls(
          classPrefix,
          {
            [`${classPrefix}-block`]: props.block,
          }
        )
      }
      {...props}>{props.children}</Button>
  )
}

export default Index;