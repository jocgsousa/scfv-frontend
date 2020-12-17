import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BsCardList, BsFileEarmarkText } from 'react-icons/bs';

import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';

// import api from '../../services/api';
import {
  Header,
  Option,
  ContainerLoader,
  ButtonLogout,
  Options,
  Op,
  InputDate,
  InputUnidade,
  InputEndereco,
  InputObjetivo,
  InputContato,
  InputObs,
  InputNecessidade,
  ButtonSubmit,
  ButtonForm,
  ButtonList,
  ButtonOption,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Encaminhamentos extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    data: [],
    list: [],
    autenticated: true,
    form: true,
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
      // const total = ativos + desativados;
      this.setState({
        loading: false,
        data: response.data.alunosAtivados.rows,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  optionForm = () => {
    this.setState({ form: true });
  };

  optionList = () => {
    this.setState({ form: false });
    this.listEncaminhados();
  };

  listEncaminhados = async () => {
    this.setState({ loading: true });
    const { token } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.get('/encaminhamentos', config);
      console.log(response.data);
      this.setState({ loading: false, list: response.data });
      // Retorna um element jsx
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.response.data.error);
    }
  };

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  render() {
    const { username, loading, autenticated, data, form, list } = this.state;

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
        <div className="container" style={{ height: '1000px' }}>
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
                  <div className="container">
                    <div className="row">
                      <ButtonForm onClick={this.optionForm}>
                        Encaminhamento
                      </ButtonForm>
                      <ButtonList onClick={this.optionList}>
                        Listar <BsCardList />
                      </ButtonList>
                      <hr />
                      {form ? (
                        <>
                          <div className="row">
                            <span>
                              Selecione o usuário para o encaminhamento:{' '}
                            </span>
                            <Options>
                              {data.length ? (
                                data.map((op) => <Op key={op.id}>{op.name}</Op>)
                              ) : (
                                <Op>SEM ALUNOS CADATRADOS NO MOMENTO...</Op>
                              )}
                            </Options>
                            <span>Informe a data do encaminhamento: </span>
                            <InputDate />
                            <span>Informe a unidade de atendimento: </span>
                            <InputUnidade />
                            <span>Informe o endereço da unidade: </span>
                            <InputEndereco />
                            <span>Objetivo do encaminhamento: </span>
                            <InputObjetivo />
                            <span>
                              Informe a necessidade do encaminhamento:{' '}
                            </span>
                            <InputNecessidade />
                            <span>Informe o contato do estabelecimento: </span>
                            <InputContato />
                            <span>
                              Observações em relação ao encaminhamento:{' '}
                            </span>
                            <InputObs />
                            <ButtonSubmit>Salvar</ButtonSubmit>
                          </div>
                        </>
                      ) : (
                        <>
                          <h5>Encaminhados</h5>
                          {list ? (
                            <>
                              {list.map((item) => (
                                <span
                                  className="border form-control"
                                  key={item.id}
                                >
                                  <strong>Unidade: </strong>
                                  {item.unidade}/<strong> Nome: </strong>
                                  {item.user.name}
                                  <Link
                                    to={`/encaminhaficha/${encodeURIComponent(
                                      item.id
                                    )}`}
                                  >
                                    <ButtonOption className="btn btn-primary">
                                      Gerar ficha
                                      <BsFileEarmarkText
                                        size={20}
                                        style={{ marginLeft: '10px' }}
                                      />
                                    </ButtonOption>
                                  </Link>
                                </span>
                              ))}
                            </>
                          ) : (
                            <>
                              <span>Sem encaminhamentos no momento!</span>
                            </>
                          )}
                        </>
                      )}
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
