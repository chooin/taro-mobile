import * as React from 'react';
import { Button as TCButton, ButtonProps as TCButtonProps } from '@tarojs/components';
import cls from 'classnames';
import { match } from 'ts-pattern';
import { mergeProps } from '../../utils';

export interface ButtonProps extends TCButtonProps {
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  size?: 'mini' | 'default';
  shape?: 'default' | 'rounded' | 'rectangular';
  fill?: 'default' | 'solid' | 'outline';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

const classPrefix = 't-button'

export const Button: React.FC<ButtonProps> = (p) => {
  const props = mergeProps({
    block: false,
    loading: false,
    size: 'default',
    shape: 'default',
    color: 'default',
    fill: 'default',
  }, p)

  const onClick = () => {
    if (props.loading || props.disabled) {
      return;
    }

    props.onClick?.();
  }

  return (
    <TCButton
      {...props}
      className={
        cls(
          props.className,
          classPrefix,
          `${classPrefix}--normalize`,
          `${classPrefix}--color-${props.color}`,
          `${classPrefix}--size-${props.size}`,
          `${classPrefix}--fill-${props.fill}`,
          `${classPrefix}--shape-${props.shape}`,
          {
            [`${classPrefix}--block`]: props.block,
            [`${classPrefix}--loading`]: props.loading,
            [`${classPrefix}--disabled`]: props.disabled,
          },
        )
      }
      onClick={onClick}
      loading={false}>
      {
        match(props)
          .with({ loading: true }, () => <></>)
          .otherwise(() => {
            return React.Children.map(props.children, (child) => {
              return React.isValidElement(child) && React.cloneElement(child)
            })
          })
      }
    </TCButton>
  )
}