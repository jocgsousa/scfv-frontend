import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
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

      const { ativos, desativados } = this.state;
      // const total = ativos + desativados;
      this.setState({
        data: {
          labels: [`Ativos: ${ativos}`, `Desativados: ${desativados}`],
          datasets: [
            {
              label: 'Usuários cadastrados',
              data: [`${ativos}`, `${desativados}`],
              backgroundColor: ['purple', 'green'],
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  logoff = () => {
    localStorage.removeItem('token', 'username');
    this.setState({ autenticated: false });
  };

  render() {
    const { username, loading, autenticated, data } = this.state;

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
                <Option>Inicio</Option>
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
                    <div className="col-md-6">
                      <HorizontalBar
                        data={data}
                        options={{
                          maintainAspectRatio: true,
                          title: {
                            display: true,
                            text: 'Usuários registrados',
                            fontSize: 25,
                          },
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Doughnut
                        data={data}
                        options={{
                          maintainAspectRatio: true,
                          title: {
                            display: true,
                            text: 'Índice',
                            fontSize: 25,
                          },
                        }}
                      />
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
