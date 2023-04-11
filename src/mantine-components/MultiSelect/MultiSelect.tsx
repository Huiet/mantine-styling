import { IconX, IconSelector } from '@tabler/icons-react';
import React, {
  ComponentPropsWithoutRef, ForwardedRef,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelect } from 'downshift';

import { useId, useMergedRef } from '@mantine/hooks';
import {
  getAvailableTextWidth,
  getCanvasFont,
  getTextWidth,
} from './MultiSelect.utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Checkbox, TextInput } from '@mantine/core';
import { MultiSelectListContainer, MultiSelectListItem, NoResultsFound, SearchSection } from './MultiSelect.styles';

export interface SelectItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface CustomMultiSelectProps
  extends Omit<ComponentPropsWithoutRef<'input'>,
    'onChange' | 'size' | 'value' | 'data'> {
  value: SelectItemProps[];
  data: SelectItemProps[];
  label: string;
  onChange: (value: SelectItemProps[]) => void;
  clearable?: boolean;
  searchable?: boolean;
  error?: string;
  virtualize?: boolean;
  size?: 'sm' | 'md' | 'lg';
  enableSelectAll?: boolean;
}

/**
 * Luma multiselect component that can be searchable, clearable, and can include select all
 * The data flow into this component is unidirectional, meaning it doesn't update it's internal state,
 * instead it triggers an onchange that updates the parent component.
 * It is meant to be used as a controlled component

 */

export const CustomMultiSelect = forwardRef<HTMLInputElement, CustomMultiSelectProps>(
  (
    {
      value,
      size,
      data,
      searchable,
      label,
      onChange,
      enableSelectAll,
      clearable = false,
      error,
      virtualize = false,
      disabled = false,
    }: LumaMultiSelectProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const uniqueId = useId();
    const items = useMemo(
      () => data.map((x, index) => ({...x, index: index})),
      [data]
    );
    // const [selectedItems, setSelectedItems] = useState<SelectItemProps[]>([]);

    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (e: any) => {
      setSearchValue(e.target.value);
    };

    const stateReducer = (state: any, actionAndChanges: any) => {
      const {changes, type} = actionAndChanges;
      // console.log('type', type);
      console.log('here', type);
      switch (type) {
        case useSelect.stateChangeTypes.MenuBlur:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          setSearchValue('');
          return changes;
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.MenuKeyDownCharacter:
          return {
            ...changes,
            isOpen: true, // keep menu open after selection.
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    };
    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      items: items,
      itemToString: (item: SelectItemProps | null) => item?.label ?? '',
      stateReducer,
      selectedItem: null,
      onSelectedItemChange: ({selectedItem}) => {
        console.log('selected', selectedItem, value);
        let newSelectedItems;
        if (!selectedItem) {
          if (!value.length) {
            onChange([]);
            return;
          }
          return;
        }

        const index = value.findIndex((x) => x.value === selectedItem.value);

        if (index >= 0) {
          newSelectedItems = [
            ...value.slice(0, index),
            ...value.slice(index + 1),
          ];
        } else if (index === 0) {
          newSelectedItems = [...value.slice(1)];
        } else {
          newSelectedItems = [...value, selectedItem];
          // setSelectedItems([...selectedItems, selectedItem]);
        }
        onChange(newSelectedItems);
      },
    });

    const selectedItemsString = useMemo(() => {
      if (value.length === 0) return '';
      let returnString = '';
      let currentElementsWidth = 0;
      const numberPadding = 16;
      const widthAvailable = getAvailableTextWidth(
        document.getElementById(getToggleButtonProps().id)
      );

      // console.log('what', getAvailableTextWidth(
      //   (ref)
      // ))
      const font = getCanvasFont(
        document.getElementById(getToggleButtonProps().id)
      );
      const canvas = document.createElement('canvas');
      for (let i = 0; i < value.length; i++) {
        const displayValue = value[i].label;
        const elementWidth = getTextWidth(displayValue + ', ', font, canvas);
        if (
          currentElementsWidth + elementWidth >
          widthAvailable - numberPadding
        ) {
          if (i === 0) {
            if (value.length === 1) {
              return displayValue;
            }
            for (let x = 15; x < displayValue.length; x = x + 15) {
              const elementWidth = getTextWidth(
                displayValue.substring(0, x),
                font,
                canvas
              );
              if (elementWidth > (widthAvailable - numberPadding)) {
                return (
                  displayValue.substring(0, x - 12) +
                  `... ${value.length > 1 ? `+${value.length - i}` : ''}`
                );
              }
            }
          }
          returnString += `+${value.length - i}`;
          return returnString;
        }
        returnString += displayValue;
        if (i !== value.length - 1) {
          returnString += ', ';
        }
        currentElementsWidth += elementWidth;
      }
      return returnString;
    }, [value]);

    const handleClearItems = () => {
      onChange([]);
    };

    const handleSelectAll = () => {
      if (searchable && searchValue) {
        if (filteredData.every((x) => value.some((y) => y.value === x.value))) {
          onChange(
            value.filter((x) => !filteredData.some((y) => y.value === x.value))
          );
        } else {
          onChange([...filteredData, ...value]);
        }
      } else {
        if (value.length === items.length) {
          onChange([]);
        } else {
          onChange(data);
        }
      }
    };

    const filteredData = useMemo(() => {
      if (!searchValue || !searchable) {
        return items;
      } else {
        return items.filter((x: SelectItemProps) =>
          x.label.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }, [items, searchValue]);

    const isSelectAllChecked = useMemo(() => {
      if (searchable && searchValue) {
        return filteredData.every((x) =>
          value.some((y) => y.value === x.value)
        );
      } else {
        return items.length === value.length;
      }
    }, [searchable, searchValue, value, items, filteredData]);

    const getRightSection = useMemo(() => {
      if (value.length > 0 && clearable) {
        return (
          <div
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClearItems();
              }
            }}
            onClick={handleClearItems}
            style={{display: 'flex', alignItems: 'center', padding: '1em'}}
          >
            <IconX size={12}/>
          </div>
        );
      } else {
        return (
          <IconSelector size={12}/>
        );
      }
      // }
    }, [isOpen, value, clearable]);

    // merging refs for forwardRef and dropdown toggle utility
    const toggleButtonRef = useMergedRef(ref, getToggleButtonProps().ref);
    // stuff needed for virtual scrolling>
    const parentRef = useRef(null);
    const count = filteredData.length;
    const virtualizer = useVirtualizer({
      count,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 25,
    });
    const listItems = virtualizer.getVirtualItems();
    const mergedContainerRefs = useMergedRef(getMenuProps().ref, parentRef);
    return (
      <div style={{position: 'relative', cursor: 'pointer'}}>
        <TextInput
          error={error}
          disabled={disabled}
          size={size || 'sm'}
          floatOnFocus={false}
          styles={{
            input: {
              cursor: 'pointer',
            },
            rightSection: {
              pointerEvents: clearable && value?.length > 0 ? 'default' : 'none',
            },
            label: {
              cursor: 'pointer',
            },
          }}
          {...getToggleButtonProps()}
          onKeyDown={(e) => {
            getToggleButtonProps().onKeyDown(e);
            if (e.key === 'Enter' && !isOpen) {
              e.preventDefault();
              e.stopPropagation();
              getToggleButtonProps().onClick(e);
            }
          }}
          ref={toggleButtonRef}
          label={label}
          rightSection={getRightSection}
          readOnly={true}
          value={selectedItemsString}
        />

        <MultiSelectListContainer
          isOpen={isOpen}
          {...getMenuProps()}
          ref={mergedContainerRefs}
        >
          {/* eslint-disable-next-line react/prop-types */}
          {searchable && items?.length > 0 && (
            <SearchSection
              placeholder={`Search...`}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.code === 'Space') {
                  e.stopPropagation();
                }
              }}
              value={searchValue}
            />
          )}
          {filteredData.length > 0 && enableSelectAll && (
            <MultiSelectListItem
              onClick={handleSelectAll}
              style={{
                position: 'sticky',
                top: searchable ? '32px' : '0',
                zIndex: '1',
              }}
            >
              <Checkbox
                style={{pointerEvents: 'none'}}
                readOnly={true}
                checked={isSelectAllChecked}
              ></Checkbox>
              Select All
            </MultiSelectListItem>
          )}
          {filteredData.length > 0 ? (
            virtualize ? (
              <div style={{width: '100%'}}>
                <div
                  style={{
                    height: virtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      transform: `translateY(${listItems[0].start}px)`,
                    }}
                  >
                    {listItems.map((virtualRow) => (
                      <MultiSelectListItem
                        key={virtualRow.key}
                        highlightedIndex={highlightedIndex}
                        index={virtualRow.index}
                        {...getItemProps({
                          item: filteredData[virtualRow.index],
                          index: filteredData[virtualRow.index].index,
                        })}
                      >
                        <Checkbox
                          style={{pointerEvents: 'none'}}
                          readOnly={true}
                          checked={value.some(
                            (x) =>
                              x.value === filteredData[virtualRow.index].value
                          )}
                        ></Checkbox>
                        {filteredData[virtualRow.index].label}
                      </MultiSelectListItem>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              filteredData.map((item) => (
                <MultiSelectListItem
                  key={item.value}
                  highlightedIndex={highlightedIndex}
                  index={item.index}
                  {...getItemProps({item, index: item.index})}
                >
                  <Checkbox
                    style={{pointerEvents: 'none'}}
                    readOnly={true}
                    checked={value.some((x) => x.value === item.value)}
                  ></Checkbox>
                  {item.label}
                </MultiSelectListItem>
              ))
            )
          ) : (
            <NoResultsFound>No results found</NoResultsFound>
          )}
        </MultiSelectListContainer>
      </div>
    );
  }
);

CustomMultiSelect.displayName = 'CustomMultiSelect';
