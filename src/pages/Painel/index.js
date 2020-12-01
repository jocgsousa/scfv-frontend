import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';
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
  ContainerLoader,
  Ativos,
  Desativados,
  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Painel extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    data: [],
    ativos: 0,
    desativados: 0,
    autenticated: true,
  };

  async componentDidMount() {
    const user = localStorage.getItem('username');
    const key = localStorage.getItem('token');
    console.log(key);
    if (!key) {
      this.setState({ autenticated: false });
    }
    this.setState({ username: user, token: key, loading: true });

    try {
      const response = await api.get('/alunos', {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      this.setState({
        loading: false,
        ativos: response.data.alunosAtivados.count,
        desativados: response.data.alunosDesativados.count,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  render() {
    const { username, loading, autenticated, ativos, desativados } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}
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
            {loading ? (
              <ContainerLoader>
                <center>
                  <ClipLoader size={40} color="#7159c1" />
                </center>
              </ContainerLoader>
            ) : (
              <>
                <BoxGroup>
                  <BoxItem>
                    <BoxItemTitle>Usuários ativos no momento</BoxItemTitle>
                    <hr />
                    <Ativos>
                      <center>
                        Usuário ativos
                        <br />
                        {ativos}
                      </center>
                    </Ativos>
                    <Desativados>
                      <center>Usuários inativos {desativados}</center>
                    </Desativados>
                  </BoxItem>
                  <BoxItem>
                    <BoxItemTitle>Usuários encaminhados</BoxItemTitle>
                    <hr />
                  </BoxItem>
                </BoxGroup>
              </>
            )}
          </HeaderRight>
        </Container>
      </>
    );
  }
}
