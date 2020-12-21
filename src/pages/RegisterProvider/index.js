import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../services/api';

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
    loading: false,
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

  handleSubmitRegister = async (e) => {
    e.preventDefault();

    // Conexão ok seguimos com o registro do usuário
    const { name, phone, cpf, date, email, password } = this.state;

    if (
      name !== '' &&
      phone !== '' &&
      cpf !== '' &&
      date !== '' &&
      email !== '' &&
      password !== ''
    ) {
      try {
        this.setState({ loading: true });
        await api.post('/users', {
          name,
          phone,
          cpf,
          data_nascimento: date,
          email,
          password,
          provider: true,
        });
        alert('Cadastro realizado com sucesso!');
        this.setState({
          loading: false,
          name: '',
          phone: '',
          cpf: '',
          date: '',
          email: '',
          password: '',
        });
      } catch (error) {
        this.setState({ loading: false });
        alert(error ? error.response.data.error : 'Falha na conexão');
      }
    } else {
      alert('Por favor preencha todos os dados para cadastro!');
    }
    // Fim da trtativa de registro do usuário

    // Código de alerta ne a conextidade com o serviço do servidor estiver indósponível no memento
  };

  render() {
    const { loading, name, phone, cpf, date, email, password } = this.state;
    return (
      <Container>
        <h5 style={{ color: '#FFF' }}>Registro de administrador</h5>
        <hr />
        <Form onSubmit={this.handleSubmitRegister}>
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
            <ButtonSubmitText>
              {loading ? <ClipLoader size={14} color="#FFF" /> : 'Registrar-me'}
            </ButtonSubmitText>
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
