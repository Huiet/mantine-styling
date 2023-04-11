import LumaMultiSelect from './LumaMultiSelect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
global.ResizeObserver = require('resize-observer-polyfill');
// window.HTMLCanvasElement.prototype.getContext = () => {};
HTMLCanvasElement.prototype.getContext = jest.fn();

describe('Luma Multi Select Component', () => {
  const data = [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
    { value: '3', label: 'three' },
    { value: '11', label: 'eleven' },
    { value: '12', label: 'twolve' },
    { value: '13', label: 'thirteen' },
    { value: 'foo1', label: 'foo1' },
    { value: 'bar1', label: 'bar1' },
    { value: 'foo2', label: 'foo2' },
    { value: 'bar2', label: 'bar2' },
  ];

  test('Has Initial Value', () => {
    const onChangeMock = jest.fn((val: any) => val);
    render(
      <LumaMultiSelect
        label={'test label'}
        data={data}
        value={[data[0]]}
        onChange={onChangeMock}
      />
    );
    expect(screen.getAllByTestId('options-container')).toHaveLength(1);
    // expect(screen.getAllByTestId('options-container')).toHaveStyle({visibility: 'hidden'});
    // expect(screen.getAllByTestId('options-container')).not.toBeVisible();
    // expect(screen.getAllByText('one')).toBeInTheDocument();
  });

  // todo: null values at the start???
  test('selection values', async () => {
    const onChangeMock = jest.fn((val: any) => val);
    render(
      <LumaMultiSelect
        label={'test label'}
        data={data}
        value={[]}
        onChange={onChangeMock}
      />
    );
    // expect(screen.getAllByTestId('options-container')).toHaveLength(1);
    // expect(screen.getByTestId('options-container')).toHaveStyle({visibility: 'hidden'});
    expect(screen.getByTestId('options-container')).toHaveStyleRule(
      'visibility',
      'hidden'
    );
    await userEvent.click(screen.getByText('test label'));
  });
});
