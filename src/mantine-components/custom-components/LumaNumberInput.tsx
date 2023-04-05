import { forwardRef, useState } from 'react';
import { createStyles, NumberInputProps, NumberInput, MantineSize } from '@mantine/core';


const smallSizeMap = (size: MantineSize) => {
  switch (size) {
    case 'xs':
      return 's';
    case 'sm':
      return 'ms';
    case 'md':
      return 'md';
    case 'lg':
      return 'lg';
    case 'xl':
      return 'xl';
    default:
      return 'md';
  }
}



export const useLumaInputStyles = createStyles((theme, { floating, size }: { floating: boolean, size: MantineSize }) => ({
  root: {
    position: 'relative',
    fontSize: theme.fontSizes.sm,
  },
  label: {
    display: size === 'sm' ? 'none' : 'block',
    position:'absolute',
    zIndex: 1,
    left: theme.spacing.sm,
    top: '30%',
    color: floating ?
      theme.colors.gray[6]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(0px, -9px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  input: {
    height: '40px',
    position: 'relative',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    borderRadius: '8px',

    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
    '&:focus-within': {
      borderColor: '#C4CDD1',
    }

  },
  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },
}));

export interface LumaNumberInputProps extends NumberInputProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LumaNumberInput = forwardRef<HTMLInputElement, LumaNumberInputProps>((props: LumaNumberInputProps, ref)  => {
  const [focused, setFocused] = useState(false);
  const { classes } = useLumaInputStyles({ floating: !!props.value || focused, size: props.size || 'md' });
  return (
    <NumberInput {...props} classNames={classes}
                  ref={ref}
                  required={true}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
    />
  );
});
