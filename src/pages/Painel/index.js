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
  Row,
  Form,
  Input,
  List,
  Item,
  ButtonOption,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Painel extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    src: '',
    users: [],
    finds: [],
    finded: false,
    charData: [],
    ativos: 0,
    desativados: 0,
    autenticated: true,
  };

  // Renderiza os dados de usuários para os gráficos já pre estabelecidos
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

  // Remove do localStorage os dados de autenticação do usuário
  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  // Faz a busca dos usuários automaticamente
  handleSearch = async (string) => {
    const { token, finds } = this.state;
    this.setState({ src: string.target.value });
    const response = await api.get('/alunos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.setState({
      users: response.data.alunosAtivados.rows,
      finds: this.filterItems(),
    });

    console.log(finds);
  };

  filterItems = () => {
    const { users, src } = this.state;
    const alert = [
      {
        id: 0,
        name: 'sem resultados',
      },
    ];

    if (src !== '') {
      const finds = users.filter(
        (item) => item.name.toLowerCase().indexOf(src.toLowerCase()) > -1
      );

      if (finds.length <= 0) {
        this.setState({ finded: false });
      }
      this.setState({ finded: true });
      return finds;
    }
    this.setState({ finded: false });
    return alert;
  };

  // Renderiza o conteúdo em tela para o usuário
  render() {
    const {
      username,
      loading,
      autenticated,
      data,
      src,
      finds,
      finded,
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
                  <Row className="row">
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
                          legend: {
                            display: false,
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
                  </Row>

                  <div className="row">
                    <Form>
                      <center>
                        <Input onChange={this.handleSearch} value={src} />
                      </center>
                    </Form>
                    {finded ? (
                      <List>
                        {finds.map((item) => (
                          <Item key={item.id}>
                            {item.name}
                            <ButtonOption className="badge bg-secondary">
                              Abrir ficha
                            </ButtonOption>
                          </Item>
                        ))}
                      </List>
                    ) : (
                      ''
                    )}
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
