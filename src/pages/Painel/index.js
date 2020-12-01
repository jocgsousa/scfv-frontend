import React, { Component } from 'react';

import { Container, Header, Title, HeaderLeft, HeaderRight } from './styles';

export default class Painel extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Title>SCFV - CRAS BELA VISTA</Title>
        </Header>

        <br />

        <HeaderLeft>esquerda</HeaderLeft>

        <HeaderRight>direita</HeaderRight>
      </Container>
    );
  }
}
