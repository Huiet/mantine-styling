import React from 'react';
import {
  Autocomplete,
  Checkbox,
  Chip,
  FileInput,
  Group,
  MultiSelect,
  NumberInput,
  Radio, SegmentedControl,
  Select, Slider,
  Stack, Switch, Textarea,
  TextInput
} from '@mantine/core';

const MantineInputs = () => {
  return (
    <Stack>
      <NumberInput label="Number input"/>
      <TextInput label="Text input"/>
      <Select clearable={true} data={[
        {label: 'Option 1', value: 'option-1'},
        {label: 'Option 2', value: 'option-2'},
        {label: 'Option 3', value: 'option-3'},
        {label: 'Option 4', value: 'option-4'},
      ]} label="Select"/>
      <MultiSelect clearable={true} data={[
        {label: 'Option 1', value: 'option-1'},
        {label: 'Option 2', value: 'option-2'},
        {label: 'Option 3', value: 'option-3'},
        {label: 'Option 4', value: 'option-4'},
      ]} label="Multi select"/>
      <Radio.Group>
        <Radio label="Option 1" value="option-1"/>
        <Radio label="Option 2" value="option-2"/>
        <Radio label="Option 3" value="option-3"/>
      </Radio.Group>
      <FileInput label="File input"/>
      <Chip.Group multiple>
        <Group position="center" mt="md">
          <Chip value="1">Multiple chips</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Group>
      </Chip.Group>
      <Checkbox
        label="Checkbox"
      />
      <Autocomplete
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={['React', 'Angular', 'Svelte', 'Vue']}
      />

      <SegmentedControl
        data={[
          {label: 'React', value: 'react'},
          {label: 'Angular', value: 'ng'},
          {label: 'Vue', value: 'vue'},
          {label: 'Svelte', value: 'svelte'},
        ]}
      />
      <Slider
        marks={[
          {value: 20, label: '20%'},
          {value: 50, label: '50%'},
          {value: 80, label: '80%'},
        ]}
      />
      <Switch
        label="Good day"
      />
      <Textarea
        placeholder="Your comment"
        label="Text Area"
      />
    </Stack>
  );
};

export default MantineInputs;
