import React, { useState } from 'react';
import {
  Autocomplete,
  Checkbox,
  Chip,
  FileInput,
  Group,
  MultiSelect,
  NumberInput,
  Radio, SegmentedControl,
  Select, Slider, Space,
  Stack, Switch, Textarea,
  TextInput
} from '@mantine/core';
import { LumaNumberInput } from './custom-components/LumaNumberInput';
import { LumaSelect } from './custom-components/LumaSelect';
import { LumaMultiSelect } from './custom-components/LumaMultiSelect';
import { RowVirtualizerDynamic } from '../VirtualScroll/VirtualScrollExample';
import { CustomMultiSelect, SelectItemProps } from './MultiSelect/MultiSelect';

const MantineInputs = () => {
  const [numberInputVal, setNumberInputVal] = useState<number|''>('');
  const [selectInputVal, setSelectInputVal] = useState('option-1');
  const [multiSelectInputVal, setMultiSelectInputVal] = useState<string[]>([]);
  const [customMultiSelectInputVal, setCustomMultiSelectInputVal] = useState<SelectItemProps[]>([]);
  const handleSelectInputChange = (value: string) => {
    setSelectInputVal(value);
  };
  const handleNumberInputChange = (value: number) => {
    setNumberInputVal(value);
  };

  const handleCustomMultiSelectInputChange = (value: SelectItemProps[]) => {
    setCustomMultiSelectInputVal(value);
  }
  const handleMultiSelectInputChange = (value: string[]) => {
    setMultiSelectInputVal(value);
  };
  return (
    <Stack>
      <CustomMultiSelect
        virtualize={true}
        searchable={true}
        clearable={true}
        enableSelectAll={true}
        data={
          [{label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
          ...Array.from({ length: 10 }, (_, i) => ({
            label: `Option ${i + 5}`,
            value: `option-${i + 5}`,
          })),
          ]
        } label={'The cool Multi Select'}
        value={customMultiSelectInputVal}
        onChange={handleCustomMultiSelectInputChange}
      />


      <NumberInput label="Number input"
                   value={numberInputVal}
                    onChange={handleNumberInputChange}
      />

      <LumaSelect
        size={'sm'}
        value={selectInputVal}
        onChange={handleSelectInputChange}
        data={
        [
          {label: 'Option 1', value: 'option-1'},
          {label: 'Option 2', value: 'option-2'},
          {label: 'Option 3', value: 'option-3'},
          {label: 'Option 4', value: 'option-4'},
          {label: 'Option 5', value: 'option-5'},
          {label: 'Option 6', value: 'option-6'},
          {label: 'Option 7', value: 'option-7'},
          {label: 'Option 8', value: 'option-8'},
          {label: 'Option 9', value: 'option-9'},
        ]
      }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'lumaselect'}/>

      <LumaSelect
        size={'md'}
        value={selectInputVal}
        onChange={handleSelectInputChange}
        data={
          [
            {label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
            {label: 'Option 5', value: 'option-5'},
            {label: 'Option 6', value: 'option-6'},
            {label: 'Option 7', value: 'option-7'},
            {label: 'Option 8', value: 'option-8'},
            {label: 'Option 9', value: 'option-9'},
          ]
        }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'lumaselect'}/>

      <LumaSelect
        size={'lg'}
        value={selectInputVal}
        onChange={handleSelectInputChange}
        data={
          [
            {label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
            {label: 'Option 5', value: 'option-5'},
            {label: 'Option 6', value: 'option-6'},
            {label: 'Option 7', value: 'option-7'},
            {label: 'Option 8', value: 'option-8'},
            {label: 'Option 9', value: 'option-9'},
          ]
        }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'lumaselect'}/>






      <LumaMultiSelect
        size={'sm'}
        value={multiSelectInputVal}
          onChange={handleMultiSelectInputChange}
        data={
          [
            {label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
            {label: 'Option 5', value: 'option-5'},
            {label: 'Option 6', value: 'option-6'},
            {label: 'Option 7', value: 'option-7'},
            {label: 'Option 8', value: 'option-8'},
            {label: 'Option 9', value: 'option-9'},
          ]
        }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'Luma Multi Select'}/>


      <LumaMultiSelect
        size={'md'}
        value={multiSelectInputVal}
        onChange={handleMultiSelectInputChange}
        data={
          [
            {label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
            {label: 'Option 5', value: 'option-5'},
            {label: 'Option 6', value: 'option-6'},
            {label: 'Option 7', value: 'option-7'},
            {label: 'Option 8', value: 'option-8'},
            {label: 'Option 9', value: 'option-9'},
          ]
        }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'Luma Multi Select'}/>

      <LumaMultiSelect
        size={'lg'}
        value={multiSelectInputVal}
        onChange={handleMultiSelectInputChange}
        data={
          [
            {label: 'Option 1', value: 'option-1'},
            {label: 'Option 2', value: 'option-2'},
            {label: 'Option 3', value: 'option-3'},
            {label: 'Option 4', value: 'option-4'},
            {label: 'Option 5', value: 'option-5'},
            {label: 'Option 6', value: 'option-6'},
            {label: 'Option 7', value: 'option-7'},
            {label: 'Option 8', value: 'option-8'},
            {label: 'Option 9', value: 'option-9'},
          ]
        }
        clearable={true}
        placeholder={'Placeholder text'}
        searchable={true}
        label={'Luma Multi Select'}/>


      <LumaNumberInput
        size={'sm'}
        value={numberInputVal}
        placeholder={'Placeholder text'}
        onChange={handleNumberInputChange}
        label="LumaNumberInput"></LumaNumberInput>

      <LumaNumberInput
        size={'md'}
        value={numberInputVal}
        placeholder={'Placeholder text'}
        onChange={handleNumberInputChange}
        label="LumaNumberInput"></LumaNumberInput>

      <LumaNumberInput
        size={'lg'}
        value={numberInputVal}
        placeholder={'Placeholder text'}
        onChange={handleNumberInputChange}
        label="LumaNumberInput"></LumaNumberInput>
      <TextInput label="Text input" placeholder={'Placeholder text'}/>
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
      <Space h={'md'}/>
      <Switch
        label="Good day"
      />
      <Textarea
        placeholder="Your comment"
        label="Text Area"
      />

      <RowVirtualizerDynamic/>



    </Stack>
  );
};

export default MantineInputs;
