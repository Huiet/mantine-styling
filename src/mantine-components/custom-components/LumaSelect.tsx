import React, { forwardRef, useState } from 'react';
import { Select, SelectProps } from '@mantine/core';
import { useLumaInputStyles } from './LumaNumberInput';

export interface LumaSelectProps extends SelectProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LumaSelect = forwardRef<HTMLInputElement, LumaSelectProps>((props, ref) => {
  const [focused, setFocused] = useState(false);
  console.log('props', props)
  const {classes} = useLumaInputStyles({floating: !!props.value || focused, size: props.size || 'md'});
  return (
    <Select {...props}
            classNames={classes}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}/>
  );
});
