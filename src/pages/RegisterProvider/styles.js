import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div.attrs({
  className: 'container border col-md-6',
})`
  padding: 14px;
  margin-top: 25px;
  border-radius: 8px;
  background: linear-gradient(#0066cc, #9198e5);
`;

export const Form = styled.form.attrs({
  className: 'form-group',
})``;

export const InputName = styled.input.attrs({
  className: 'form-control',
})`
  margin-top: 10px;
`;
export const InputPhone = styled(InputMask).attrs({
  className: 'form-control',
  mask: '(99) 9 9999-9999',
})`
  margin-top: 10px;
`;
export const InputCpf = styled(InputMask).attrs({
  className: 'form-control',
  type: 'text',
  mask: '999.999.999-99',
})``;

export const InputDate = styled.input.attrs({
  className: 'form-control',
  type: 'date',
})`
  margin-top: 10px;
`;
export const InputEmail = styled.input.attrs({
  className: 'form-control',
  type: 'email',
})`
  margin-top: 10px;
`;
export const InputPassword = styled.input.attrs({
  className: 'form-control',
  type: 'password',
})`
  margin-top: 10px;
`;

export const ButtonSubmit = styled.button.attrs({
  className: 'btn btn-success',
})``;

export const ButtonSubmitText = styled.span`
  color: white;
  font-size: 14px;
`;
