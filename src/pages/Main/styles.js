import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  max-width: 50%;
  margin: 0 auto;
  margin-top: 10%;
  padding: 10px;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const Form = styled.form`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TitleInput = styled.span`
  font-size: 12px;
  color: #333;
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
