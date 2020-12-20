import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  Title,
  TitleInput,
  ButtonSubmit,
} from './styles';

export default class Main extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    redirect: false,
  };

  randleEmailInput = (e) => {
    this.setState({ email: e.target.value });
  };

  randleSenhaInput = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      this.setState({ loading: true });
      try {
        const response = await api.post('/session', {
          email,
          password,
        });

        localStorage.setItem('username', response.data.user.name);
        localStorage.setItem('token', response.data.token);

        this.setState({ loading: false, redirect: true });
      } catch (error) {
        alert(
          error.response.data.error
            ? error.response.data.error
            : 'Banco de dados indísponivel'
        );
        this.setState({ loading: false });
      }
    }
    if (email.length <= 0 && password.length <= 0) {
      alert('Por favor insira os dados para fazer login!');
    }
  };

  render() {
    const { email, password, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/painel" />;
    }
    return (
      <Container>
        <center>
          <Title>Login - SCFV</Title>
        </center>

        <Form onSubmit={this.handleSubmit}>
          <TitleInput>E-mail</TitleInput>
          <Input
            type="email"
            onChange={(e) => this.randleEmailInput(e)}
            value={email}
          />
          <TitleInput>Senha</TitleInput>
          <Input
            type="password"
            onChange={(e) => this.randleSenhaInput(e)}
            value={password}
          />
          <ButtonSubmit>
            {loading ? <ClipLoader size={20} color="#ffff" /> : 'Entrar'}
          </ButtonSubmit>
          <Link
            className="btn bg-success"
            to="regprovider"
            style={{ width: '100%', marginTop: '10px', color: 'white' }}
          >
            Registrar-me
          </Link>
        </Form>
      </Container>
    );
  }
}
