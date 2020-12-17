import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';

// import api from '../../services/api';
import {
  Header,
  Option,
  ContainerLoader,
  ButtonLogout,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Encaminhamentos extends Component {
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

    if (!key) {
      this.setState({ autenticated: false });
    }

    this.setState({
      username: user,
      token: key,
      loading: true,
    });

    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      this.setState({ loading: false, data: response.data.alunosAtivados });
    } catch (error) {
      this.setState({ loading: false });
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
                <Option style={{ color: 'red' }}>Encaminhamentos</Option>
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
                    <h5>Formulário de encaminhamentos</h5>
                    <hr />
                    <select>{}</select>
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
