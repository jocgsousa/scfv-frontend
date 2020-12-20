import React, { Component } from 'react';
// import api from '../../services/api';

import {
  Container,
  Form,
  InputName,
  InputPhone,
  InputCpf,
  InputDate,
  InputEmail,
  InputPassword,
  ButtonSubmit,
  ButtonSubmitText,
} from './styles';

export default class RegisterProvider extends Component {
  state = {};

  render() {
    return (
      <Container>
        <h5 style={{ color: '#FFF' }}>Registro de administrador</h5>
        <hr />
        <Form>
          <strong style={{ color: '#FFF' }}>Informe o nome completo</strong>
          <InputName />
          <strong style={{ color: '#FFF' }}>
            Informe seu numero de contato
          </strong>
          <InputPhone />
          <strong style={{ color: '#FFF' }}>Informe seu cpf</strong>
          <InputCpf />
          <strong style={{ color: '#FFF' }}>Sua data de nascimento</strong>
          <InputDate />
          <strong style={{ color: '#FFF' }}>
            E-mail para acesso ao sistema
          </strong>
          <InputEmail />
          <strong style={{ color: '#FFF' }}>Escolha uma senha de acesso</strong>
          <InputPassword />
          <br />
          <ButtonSubmit>
            <ButtonSubmitText>Registrar-me</ButtonSubmitText>
          </ButtonSubmit>
        </Form>
      </Container>
    );
  }
}
