import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  ButtonLogin,
} from './styles';

export default class RegisterProvider extends Component {
  state = {
    name: '',
    phone: '',
    cpf: '',
    date: '',
    email: '',
    password: '',
  };

  handleInputName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleInputPhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  handleInputCpf = (e) => {
    this.setState({ cpf: e.target.value });
  };

  handleInputDate = (e) => {
    this.setState({ date: e.target.value });
  };

  handleInputEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleInputPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { name, phone, cpf, date, email, password } = this.state;
    return (
      <Container>
        <h5 style={{ color: '#FFF' }}>Registro de administrador</h5>
        <hr />
        <Form>
          <strong style={{ color: '#FFF' }}>Informe o nome completo</strong>
          <InputName onChange={this.handleInputName} value={name} />
          <strong style={{ color: '#FFF' }}>
            Informe seu numero de contato
          </strong>
          <InputPhone onChange={this.handleInputPhone} value={phone} />
          <strong style={{ color: '#FFF' }}>Informe seu cpf</strong>
          <InputCpf onChange={this.handleInputCpf} value={cpf} />
          <strong style={{ color: '#FFF' }}>Sua data de nascimento</strong>
          <InputDate onChange={this.handleInputDate} value={date} />
          <strong style={{ color: '#FFF' }}>
            E-mail para acesso ao sistema
          </strong>
          <InputEmail onChange={this.handleInputEmail} value={email} />
          <strong style={{ color: '#FFF' }}>Escolha uma senha de acesso</strong>
          <InputPassword onChange={this.handleInputPassword} value={password} />
          <br />
          <ButtonSubmit>
            <ButtonSubmitText>Registrar-me</ButtonSubmitText>
          </ButtonSubmit>
          <Link to="/">
            <ButtonLogin>
              <ButtonSubmitText>Login</ButtonSubmitText>
            </ButtonLogin>
          </Link>
        </Form>
      </Container>
    );
  }
}
