import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    this.setState({ loading: true });
    const { email, password } = this.state;

    try {
      const response = await api.post('/session', {
        email,
        password,
      });

      localStorage.setItem('username', response.data.user.name);
      localStorage.setItem('token', response.data.token);

      this.setState({ loading: false, redirect: true });
    } catch (error) {
      alert(error.response.data.error);
      this.setState({ loading: false });
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
          <Title>Login</Title>
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
        </Form>
      </Container>
    );
  }
}
