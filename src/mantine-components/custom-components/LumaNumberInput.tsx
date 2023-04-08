import { forwardRef, useState } from 'react';
import { createStyles, NumberInputProps, NumberInput } from '@mantine/core';


export type acceptedSizes = 'sm' | 'md' | 'lg';

export const useLumaInputStyles = createStyles((theme, { floating, size }: { floating: boolean, size: acceptedSizes }) => ({
  root: {
    position: 'relative',
    fontSize: theme.fontSizes.sm,
  },
  placeholder: {
    fontSize: theme.fontSizes.sm,
  },
  label: {
    display: size === 'sm' && floating ? 'none' : 'block',
    position:'absolute',
    zIndex: 1,
    left: theme.spacing.sm,
    top: '30%',
    color: floating ?
      theme.colors.gray[6]
      : theme.colors.gray[5],
    transition: size !== 'sm' ? 'transform 150ms ease, color 150ms ease, font-size 150ms ease': 'none',
    transform: floating ?
      size === 'md' ? 'translate(0px, -9px)' :
        size === 'lg' ? 'translate(0px, -11px)' : 'none' : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  input: {
    fontSize: theme.fontSizes.sm,
    height: size === 'sm' ? '32px' :
      size === 'md' ? '40px' :
        '48px',
    position: 'relative',
    paddingTop: size === 'sm' ? theme.spacing.xs :
    theme.spacing.lg,
    paddingBottom: size === 'sm' ? theme.spacing.xxs :
    theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
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
                  size={'sm'}
                  ref={ref}
                  required={true}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
    />
  );
});
