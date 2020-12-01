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
  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Painel extends Component {
  state = {};

  render() {
    return (
      <>
        <Header>
          <Title>SCFV - CRAS BELA VISTA</Title>
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

          <HeaderRight>Painel</HeaderRight>
        </Container>
      </>
    );
  }
}
