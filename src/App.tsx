import './App.css'
import { MantineProvider, Stack } from '@mantine/core';
import MantineInputs from './mantine-components/Inputs';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Stack>
        <MantineInputs/>
      </Stack>

    </MantineProvider>
  )
}

export default App
