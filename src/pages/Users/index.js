import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';

import api from '../../services/api';
import {
  Header,
  Option,
  ContainerLoader,
  ButtonLogout,
  List,
  Item,
  Desativar,
  Ficha,
  Ativar,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Users extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    charData: [],
    ativos: [],
    qdtAtivos: 0,
    desativados: [],
    qdtDesativados: 0,

    autenticated: true,
  };

  async componentDidMount() {
    const user = localStorage.getItem('username');
    const key = localStorage.getItem('token');

    if (!key) {
      this.setState({ autenticated: false });
    }

    this.setState({
      username: user,
      token: key,
      loading: true,
    });

    // Se for recebido algum paramêtro de usuário realizar a pesquisa

    try {
      const response = await api.get(`/alunos`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      this.setState({
        loading: false,
        ativos: response.data.alunosAtivados.rows,
        qdtAtivos: response.data.alunosAtivados.count,
        desativados: response.data.alunosDesativados.rows,
        qdtDesativados: response.data.alunosDesativados.count,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  handleDesativa = async (id) => {
    const { ativos, desativados, qdtAtivos, qdtDesativados } = this.state;
    const key = localStorage.getItem('token');
    const bearerToken = {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };

    try {
      // Desativa o aluno
      await api.put(`/desativar/${id}`, {}, bearerToken);

      // Listamos a nova lista de alunos e atualizamos todos os estados da renderização
      const newAtivos = ativos.filter((user) => user.id !== id);
      const newDesativado = ativos.find((user) => user.id === id);
      const Increment = qdtDesativados + 1;
      const Decrement = qdtAtivos - 1;
      // Atualizando dados do state
      this.setState({
        ativos: newAtivos,
        desativados: [...desativados, newDesativado],
        qdtAtivos: Decrement,
        qdtDesativados: Increment,
      });
    } catch (error) {
      alert('Erro ao desativar aluno, tente novamente mais tarde.');
    }
  };

  handleAtiva = async (id) => {
    const { ativos, desativados, qdtAtivos, qdtDesativados } = this.state;
    const key = localStorage.getItem('token');
    const bearerToken = {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };

    try {
      // Desativa o aluno
      await api.put(`/ativar/${id}`, {}, bearerToken);

      // Listamos a nova lista de alunos e atualizamos todos os estados da renderização
      const newDesativados = desativados.filter((user) => user.id !== id);
      const desativado = desativados.find((user) => user.id === id);
      const Increment = qdtAtivos + 1;
      const Decrement = qdtDesativados - 1;
      // Atualizando dados do state
      this.setState({
        ativos: [...ativos, desativado],
        desativados: newDesativados,
        qdtAtivos: Increment,
        qdtDesativados: Decrement,
      });
    } catch (error) {
      alert('Erro ao ativar aluno, tente novamente mais tarde.');
    }
  };

  checkIdade = (idade) => {
    if (idade > 17) {
      return <span style={{ marginLeft: '10px', color: 'red' }}>Adulto</span>;
    }
    return '';
  };

  render() {
    const {
      username,
      loading,
      autenticated,
      ativos,
      desativados,
      qdtAtivos,
      qdtDesativados,
    } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}
        <Header>
          SCFV - {username}
          <ButtonLogout onClick={this.logoff}>SAIR</ButtonLogout>
        </Header>
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/painel">
                <Option>Painel</Option>
              </Link>
              <Link to="/users">
                <Option style={{ color: 'red' }}>Usuários</Option>
              </Link>
              <Link to="/register">
                <Option>Novo Registro</Option>
              </Link>
              <Link to="/encaminhamentos">
                <Option>Encaminhamentos</Option>
              </Link>
            </div>

            <div className="col-md-9">
              {loading ? (
                <>
                  <ContainerLoader>
                    <center>
                      <ClipLoader />
                    </center>
                  </ContainerLoader>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="row">
                      <strong className="form-control">
                        ATIVOS:
                        <span>{qdtAtivos}</span>
                      </strong>
                      <br />
                      <List>
                        {ativos.map((user) => (
                          <Item key={user.id}>
                            {user.name}
                            {this.checkIdade(user.idade)}
                            <Desativar
                              onClick={() => this.handleDesativa(user.id)}
                            >
                              Desativar
                            </Desativar>
                            <Link to={`/ficha/${encodeURIComponent(user.id)}`}>
                              <Ficha> Abrir ficha</Ficha>
                            </Link>
                          </Item>
                        ))}
                      </List>
                    </div>
                    <div className="row">
                      <strong className="form-control">
                        DESATIVADOS:
                        <span>{qdtDesativados}</span>
                      </strong>
                      <br />
                      <List>
                        {desativados.map((user) => (
                          <Item>
                            {user.name} {this.checkIdade(user.idade)}
                            <Ativar onClick={() => this.handleAtiva(user.id)}>
                              Ativar
                            </Ativar>
                          </Item>
                        ))}
                      </List>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Users.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       users: PropTypes.number,
//     }),
//   }).isRequired,
// };
