import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
  display: flex; /* establish flex container */
  flex-direction: row; /* default value; can be omitted */
  flex-wrap: nowrap; /* default value; can be omitted */
  justify-content: space-between; /* switched from default (flex-start, see below) */
  background-color: #ffff;
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

export const Options = styled.select.attrs({
  className: 'form-control',
})``;

export const Op = styled.option``;

export const InputDate = styled.input.attrs({
  typ: 'text',
  className: 'form-control',
  type: 'date',
})``;

export const InputUnidade = styled.input.attrs({
  className: 'form-control',
})``;

export const InputEndereco = styled.input.attrs({
  className: 'form-control',
})``;

export const InputObjetivo = styled.textarea.attrs({
  className: 'form-control',
})``;

export const InputContato = styled(InputMask).attrs({
  mask: '(99) 9 9999-9999',
  className: 'form-control',
})``;

export const InputObs = styled.textarea.attrs({
  className: 'form-control',
  rows: '8',
})``;

export const InputNecessidade = styled.input.attrs({
  className: 'form-control',
})``;

export const ButtonSubmit = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const ButtonForm = styled.button.attrs({
  className: 'btn btn-primary col-md-5',
})`
  margin: 10px;
`;

export const ButtonList = styled.button.attrs({
  className: 'btn btn-secondary col-md-5',
})`
  margin: 10px;
`;
export const ButtonOption = styled.button.attrs({
  className: 'badge bg-secondary btn',
})`
  float: right;
  margin: 1px;
`;

export const ButtonDelete = styled.button.attrs({
  className: 'badge bg-danger btn',
})`
  float: right;
  margin: 1px;
`;
