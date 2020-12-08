import styled from 'styled-components';

export const Container = styled.div.attrs({
  className: 'container col-md-5',
})`
  padding: 10px;
  margin: 0 auto;
  margin-top: 10%;
  align-items: center;
  justify-content: center;
  align-self: center;
  background: linear-gradient(#0066cc, #9198e5);
  box-shadow: 2px 4px 10px 4px #ccc;
  height: 100%;
  border-radius: 4px;
`;

export const Form = styled.form`
  padding: 20px;

  flex-direction: column;
  height: 100%;
  min-width: 70%;
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 5%;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;

export const TitleInput = styled.span`
  font-size: 12px;
  color: #ffff;
`;

export const Input = styled.input`
  border: 1px solid #014055;
  height: 40px;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
  padding-left: 10px;
`;

export const ButtonSubmit = styled.button`
  border: 1px solid #014055;
  height: 40px;
  width: 100%;
  margin-top: 20px;
  padding-left: 10px;
  background-color: #014055;
  color: #fff;
`;
