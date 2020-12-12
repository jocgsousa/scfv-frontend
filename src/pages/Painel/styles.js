import styled from 'styled-components';

export const Header = styled.div`
  background-color: #014055;
  padding: 10px;
  color: #fff;
  width: 100%;
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

export const Row = styled.div.attrs({
  className: 'row',
})`
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ChartContainer = styled.div.attrs({
  className: 'col-md-12',
})`
  box-shadow: 2px 1px 10px 2px #ccc;
  border-radius: 4px;
  margin-top: 20px;
`;

export const Form = styled.form`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 4px;
`;

export const Input = styled.input.attrs({
  className: 'form-control',
  placeholder: 'Buscar usuário',
})``;

export const List = styled.ul`
  border: 1px solid #ccc;
  margin-top: 4px;
  padding: 10px;
`;

export const Item = styled.li.attrs({
  className: 'btn form-control',
})`
  list-style-type: none;
  border: 1px solid #ccc;
  margin-top: 1px;
  width: 100%;
`;

export const ButtonOption = styled.button.attrs({
  className: 'badge bg-secondary',
})`
  float: right;
  border: 3px solid rgba(0, 153, 255, 0.5);
`;

export const Button = styled.button`
  margin: 10px;
  border-radius: 4px;
  background-color: #7159c1;
  color: white;
  border: 1px solid #7159c1;
  padding: 10px;
  outline: none;
  width: 350px;
  font-size: 12px;
`;
