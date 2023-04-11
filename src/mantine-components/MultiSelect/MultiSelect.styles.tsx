import styled from '@emotion/styled';

export const MultiSelectListContainer = styled.ul<{ isOpen: boolean, size: 'sm' | 'md' | 'lg' }>`
  font-size: 12px;
  font-size: ${(props) => (props.size === 'sm' ? '12px' : props.size === 'md' ? '14px' : '16px')};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  position: absolute;
  top: 3rem;
  background-color: white;
  border: 1px solid #a9b3b8;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  align-items: flex-start;
  z-index: 300;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

export const MultiSelectListItem = styled.li<{
  highlightedIndex?: number;
  index?: number;
}>`
  padding: 0.5em;
  width: 100%;
  background-color: ${(props) =>
  props.index != null && props.highlightedIndex === props.index
    ? '#f2f4f5'
    : 'white'};
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  &:hover {
    background-color: #f2f4f5;
  }
  
`;

export const NoResultsFound = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.75em;
  font-weight: 500;
  color: #a9b3b8;
  cursor: default;
`;

export const SearchSection = styled.input`
  border: 0px;
  padding: 0.75em;
  outline: 0px;
  color: black;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;  
  `;
