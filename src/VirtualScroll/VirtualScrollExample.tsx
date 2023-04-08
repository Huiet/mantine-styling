import { faker } from '@faker-js/faker';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { memo } from 'react';

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max })

const sentences = new Array(10000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)))


export const RowVirtualizerDynamic = memo(() => {
  console.log('sentences', sentences);
  const parentRef = React.useRef<HTMLDivElement>(null)

  const count = sentences.length
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <div>
      <button
        onClick={() => {
          virtualizer.scrollToIndex(0)
        }}
      >
        scroll to the top
      </button>
      <span style={{ padding: '0 4px' }} />
      <button
        onClick={() => {
          virtualizer.scrollToIndex(count / 2)
        }}
      >
        scroll to the middle
      </button>
      <span style={{ padding: '0 4px' }} />
      <button
        onClick={() => {
          virtualizer.scrollToIndex(count - 1)
        }}
      >
        scroll to the end
      </button>
      <hr />
      <div
        ref={parentRef}
        className="List"
        style={{
          height: 400,
          width: 400,
          overflowY: 'auto',
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0].start}px)`,
            }}
          >
            {items.map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className={
                  virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                }
              >
                <div style={{ padding: '10px 0' }}>
                  <div>Row {virtualRow.index}</div>
                  <div>{sentences[virtualRow.index]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
});


//
// {
//   filteredData.map((item) => (
//     <LumaMultiSelectListItem
//       key={item.value}
//       highlightedIndex={highlightedIndex}
//       index={item.index}
//       {...getItemProps({ item, index: item.index })}
//     >
//       <LumaCheckbox
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         checkboxKey={item.value + 'checkbox'}
//         readonly={true}
//         checked={value.some((x) => x.value === item.value)}
//       ></LumaCheckbox>
//       {item.label}
//     </LumaMultiSelectListItem>
//   ))
// }
RowVirtualizerDynamic.displayName = 'RowVirtualizerDynamic';
