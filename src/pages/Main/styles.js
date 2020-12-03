import styled from 'styled-components';

export const Container = styled.div`
  max-width: 70%;
  min-width: 60%;
  margin: 0 auto;
  margin-top: 10%;
  padding: 10px;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: #fff;
  box-shadow: 2px 4px 10px 4px #ccc;
  height: 100%;
`;

export const Form = styled.form`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  color: #333;
`;

export const TitleInput = styled.span`
  font-size: 12px;
  color: #333;
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
