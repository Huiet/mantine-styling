import React, { forwardRef, useState } from 'react';
import { createStyles, Select, SelectProps } from '@mantine/core';
import { useLumaInputStyles } from './LumaNumberInput';

// const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
//   root: {
//     position: 'relative',
//     fontSize: theme.fontSizes.sm,
//   },
//   label: {
//     position:'absolute',
//     zIndex: 1,
//     left: '1em',
//     top: '25%',
//     color: floating ?
//       theme.colors.gray[6]
//       : theme.colors.gray[5],
//     transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
//     transform: floating ? `translate(0px, -8px)` : 'none',
//     fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
//     fontWeight: floating ? 500 : 400,
//   },
//
//   input: {
//     position: 'relative',
//     paddingTop: '1.75em',
//     paddingBottom: '1em',
//     borderRadius: '8px',
//
//     '&::placeholder': {
//       transition: 'color 150ms ease',
//       color: !floating ? 'transparent' : undefined,
//     },
//
//   },
//   required: {
//     transition: 'opacity 150ms ease',
//     opacity: floating ? 1 : 0,
//   },
// }));


export const LumaSelect = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const [focused, setFocused] = useState(false);
  console.log('props', props)
  const {classes} = useLumaInputStyles({floating: !!props.value || focused});
  return (
    <Select {...props}
            classNames={classes}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}/>
  );
});
