import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  Title,
  HeaderLeft,
  HeaderRight,
  ButtonGroup,
  Option,
  BoxGroup,
  BoxItem,
  BoxItemTitle,
  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Painel extends Component {
  state = {
    loading: false,
    username: '',
  };

  componentDidMount() {
    const user = localStorage.getItem('username');
    this.setState({ username: user });
  }

  render() {
    const { username } = this.state;
    return (
      <>
        <Header>
          <Title>SCFV - CRAS Bela Vista - {username}</Title>
        </Header>

        <Container>
          <br />

          <HeaderLeft>
            <ButtonGroup>
              <Link to="/painel">
                <Option>Início</Option>
              </Link>

              <Link to="/register">
                <Option>Novo Cadastro</Option>
              </Link>

              <Link to="/users">
                <Option>Usuários</Option>
              </Link>

              <Link to="/encaminhamentos">
                <Option>Encaminhamentos</Option>
              </Link>
            </ButtonGroup>
          </HeaderLeft>

          <HeaderRight>
            <BoxGroup>
              <BoxItem>
                <BoxItemTitle>Usuários ativos no momento</BoxItemTitle>
                <hr />
              </BoxItem>
              <BoxItem>
                <BoxItemTitle>Usuários inativos do sistema</BoxItemTitle>
                <hr />
              </BoxItem>
              <BoxItem>
                <BoxItemTitle>Usuários encaminhados</BoxItemTitle>
                <hr />
              </BoxItem>
            </BoxGroup>
          </HeaderRight>
        </Container>
      </>
    );
  }
}
