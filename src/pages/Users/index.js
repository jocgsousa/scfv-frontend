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

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Users extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    charData: [],
    users: [],

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
        users: response.data.alunosAtivados.rows,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  render() {
    const { username, loading, autenticated } = this.state;

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
                <Option>Usuários</Option>
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
                    <div className="col-md-12">Lista de usuários</div>
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
