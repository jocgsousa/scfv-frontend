import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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

export default class Ficha extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    charData: [],
    user: [],
    autenticated: true,
  };

  async componentDidMount() {
    const { match } = this.props;
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
    const userId = decodeURIComponent(match.params.users);

    try {
      const response = await api.get(`/search/${userId}`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      this.setState({
        loading: false,
        user: response.data,
      });
      console.log(response.data);
    } catch (error) {
      alert('Usuário não existe ');
      <Redirect to="/painel" />;
      console.log(error.response.data.error);
    }
  }

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  render() {
    const { username, loading, autenticated, user } = this.state;

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
                    <div className="col-md-12">Ficha técnica - {user.name}</div>
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

Ficha.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      users: PropTypes.number,
    }),
  }).isRequired,
};
