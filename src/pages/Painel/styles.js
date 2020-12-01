import styled from 'styled-components';

export const Container = styled.div`
  display: flex; /* establish flex container */
  flex-direction: row; /* default value; can be omitted */
  flex-wrap: nowrap; /* default value; can be omitted */
  justify-content: space-between; /* switched from default (flex-start, see below) */
  background-color: lightyellow;
`;

export const Header = styled.div`
  background-color: #014055;
  padding: 10px;
`;
export const Title = styled.h3`
  color: #ccc;
`;

export const HeaderLeft = styled.div`
  width: 20%;
  height: 1000px;
  border: 2px solid #014055;
  background-color: #006699;
`;

export const HeaderRight = styled.div`
  width: 80%;
  height: 1000px;
  border: 2px solid #014055;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Option = styled.button`
  border: 1px solid #eee;
  padding: 10px;
  margin-top: 20px;
  width: 80%;
  border-radius: 10px;
`;
