import React from 'react';
import './PaginationGroup.scss';

interface PaginationGroupProps {
  paginationRef: React.MutableRefObject<HTMLFormElement | null>;
}

const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const reg = /[0-9]/g;
  const input = event.target;
  const { value: prevValue } = input;
  input.value = (prevValue.match(reg) || ['']).join('');
};

export const PaginationGroup: React.FC<PaginationGroupProps> = ({ paginationRef }) => {
  return (
    <>
      <form action="" ref={paginationRef} className="pagination-form">
        <label htmlFor="page-select">
          <span>Page:</span>
          <input type="text" id="page-select" name="page-select" defaultValue="1" onChange={handleOnChange} />
        </label>
        <label htmlFor="page-size-select">
          <span>Articles per page:</span>
          <input type="text" id="page-size-select" name="page-size-select" defaultValue="5" onChange={handleOnChange} />
        </label>
      </form>
    </>
  );
};
