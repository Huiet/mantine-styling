import './App.css'
import { MantineProvider, Stack } from '@mantine/core';
import MantineInputs from './mantine-components/Inputs';


const grayLabel = '#858F93'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
                     theme={{
                       fontFamily: 'Ibm Plex Sans, sans-serif',
                       fontSizes: {
                         xs: '11px',
                         sm: '12px',
                         md: '14px',
                         lg: '16px',
                         xl: '18px',
                       },
                       spacing: {

                         xxs: '0.125rem',
                         xs: '0.25rem',
                         s: '0.5rem',
                         ms: '0.75rem',
                         md: '1rem',
                         mlg: '1.25rem',
                         lg: '1.5rem',
                         xl: '1.75rem',
                         xxl: '2rem',
                         xxxl: '2.5rem',
                         xxxxl: '3rem',
                         xxxxxl: '3.5rem',
                         xxxxxxl: '4rem',
                       },

                       components: {
                         NumberInput: {
                           defaultProps: {
                             hideControls: true,
                           }
                         },
                         InputWrapper: {
                           styles: (theme, params, context) => ({
                             // label: {
                             //  position:'absolute',
                             //   zIndex: 1,
                             //   // top: 5,
                             //   left: '1em',
                             //   top: '25%',
                             //    color: grayLabel,
                             // },
                             // root: {
                             //   position: 'relative',
                             //   '&:focus-within': {
                             //     label: {
                             //       top: 5,
                             //       fontSize: '.75em',
                             //     }
                             //   },

                             // '& [value=""]': {
                             //   backgroundColor: 'green', // this gets applied
                             //   label: {
                             //     top: 5,
                             //     backgroundColor: 'red' // this does not
                             //   }
                             // }

                             // '[data-value]:not([data-value=""])': {
                             // '&[value=""]': {
                             //   label: {
                             //     backgroundColor: 'red',
                             //     top: 5
                             //   }
                             // }
                             // }
                           })
                         },
                         Input: {
                           styles: {
                             // wrapper: {
                             //   label: {
                             //     backgroundColor: 'blue'
                             //   }
                             // },
                             // input: {
                             //   position: 'relative',
                             //   paddingTop: '2em',
                             //   paddingBottom: '.8em',
                             //   borderRadius: '8px',
                             // }
                           }
                         }
                       }
                     }}
    >
      <Stack>
        <MantineInputs/>
      </Stack>

    </MantineProvider>
  )
}

export default App
