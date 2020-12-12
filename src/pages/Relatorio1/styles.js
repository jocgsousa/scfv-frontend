import styled from 'styled-components';

export const Container = styled.div.attrs({
  className: 'container col-md-8',
})`
  margin-top: 20px;
`;

export const Table = styled.table.attrs({
  className: 'table',
})`
  border: 1px solid black;
  td,
  th {
    border: 1px solid black;
    padding: 4px;
  }
`;

export const Tr = styled.tr``;

export const Td = styled.td``;
