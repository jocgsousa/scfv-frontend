import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
  display: flex; /* establish flex container */
  flex-direction: row; /* default value; can be omitted */
  flex-wrap: nowrap; /* default value; can be omitted */
  justify-content: space-between; /* switched from default (flex-start, see below) */
  background-color: #ffff;
  margin-bottom: 200px;
`;

export const Header = styled.div`
  background-color: #014055;
  padding: 10px;
  color: #fff;
  width: 100%;
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
  width: 200px;
  border-radius: 10px;
  margin: 10px;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: red;
  }
`;
export const BoxGroup = styled.div`
  padding: 10px;
  flex: 1 1 auto;
  flex-flow: column;
`;

export const BoxItem = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 1px 5px 10px 2px #ccc;
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const BoxItemTitle = styled.h3`
  color: #333;
`;

export const ContainerLoader = styled.div`
  margin: 0 auto;
  margin-top: 200px;
`;

export const ButtonLogout = styled.button.attrs({
  className: 'btn btn-sm btn-danger',
})`
  float: right;
  position: relative;
  bottom: 4px;
`;

export const ContainerUser = styled.div.attrs({
  className: 'col-md-5',
})``;

export const Op = styled.option``;

export const ButtonSubmit = styled.button`
  margin-top: 14px;
  margin-bottom: 14px;
  border-radius: 4px;
  width: 200px;
  height: 40px;
  background-color: #7159c1;
  border: 1px solid blue;
  color: white;
  outline: none;
`;

export const ButtonOption = styled.button`
  border-radius: 4px;
  border: 1px solid #7159c1;
  background-color: #7159c1;
  color: white;
`;

export const InputCPF = styled(InputMask).attrs({
  className: 'form-control',
  type: 'text',
  mask: '999.999.999-99',
})``;

export const InputPhone = styled(InputMask).attrs({
  className: 'form-control',
  type: 'tel',
  mask: '(99) 9 9999-9999',
})``;
