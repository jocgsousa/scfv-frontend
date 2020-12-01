import React, { Component } from 'react';

import {
  Container,
  Header,
  Title,
  HeaderLeft,
  HeaderRight,
  ButtonGroup,
  Option,
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
              <Option>Inicio</Option>
              <Option>Inicio</Option>
              <Option>Inicio</Option>
              <Option>Inicio</Option>
            </ButtonGroup>
          </HeaderLeft>

          <HeaderRight>direita</HeaderRight>
        </Container>
      </>
    );
  }
}
