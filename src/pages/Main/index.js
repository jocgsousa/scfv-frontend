import React, { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
    senha: '',
    loading: false,
  };

  randleEmailInput = (e) => {
    this.setState({ email: e.target.value });
  };

  randleSenhaInput = (e) => {
    this.setState({ senha: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
  };

  render() {
    const { email, senha, loading } = this.state;
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
            value={senha}
          />
          <ButtonSubmit>
            {loading ? <ClipLoader size={20} color="#ffff" /> : 'Entrar'}
          </ButtonSubmit>
        </Form>
      </Container>
    );
  }
}
