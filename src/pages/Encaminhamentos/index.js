import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BsCardList, BsFileEarmarkText } from 'react-icons/bs';

import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';

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
  ButtonDelete,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Encaminhamentos extends Component {
  state = {
    loading: false,
    loadingRegister: false,
    username: '',
    token: '',
    data: [],
    list: [],
    autenticated: true,
    form: true,
    // Form data
    userid: '',
    date: '',
    unidade: '',
    enderecounidade: '',
    objetivo: '',
    necessidades: '',
    obs: '',
    contato: '',
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
      this.setState({
        loading: false,
        data: null,
      });
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
      this.setState({
        loading: false,
        list: response.data ? response.data : null,
      });
      // Retorna um element jsx
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  deleteEncaminhamento = async (e) => {
    const { list, token } = this.state;
    const newList = list.filter((item) => item.id !== e);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await api.delete(`/encaminhamentos/${e}`, config);
      alert('Deletado com sucesso');
    } catch (error) {
      console.log(error.response.data.error);
    }
    this.setState({
      list: newList,
    });
  };

  handleUserid = (e) => {
    this.setState({ userid: e.target.value });
  };

  handleDate = (e) => {
    this.setState({ date: e.target.value });
  };

  handleUnidade = (e) => {
    this.setState({ unidade: e.target.value });
    switch (e.target.value) {
      case 'CREAS':
        this.setState({
          enderecounidade:
            'R. São Francisco, 2325 - Cidade Nova, Marabá - PA, 68501-690',
        });
        break;
      case 'CRAS BELA-VISTA':
        this.setState({
          enderecounidade:
            'Travessa São Jorge, 0 – Maraba – PA – CEP: 68500-000',
        });
        break;
      case 'CRAS-AMAPÁ':
        this.setState({
          enderecounidade:
            'Tv. Castanheira, 40 - Amapá, Marabá - PA, 68502-300',
        });
        break;
      default:
        this.setState({
          enderecounidade: '',
        });
    }
  };

  handleEnderecoUnidade = (e) => {
    this.setState({ enderecounidade: e.target.value });
  };

  handleObjetivo = (e) => {
    this.setState({ objetivo: e.target.value });
  };

  handleNecessidades = (e) => {
    this.setState({ necessidades: e.target.value });
  };

  handleObs = (e) => {
    this.setState({ obs: e.target.value });
  };

  handleContato = (e) => {
    this.setState({ contato: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      token,
      userid,
      date,
      unidade,
      enderecounidade,
      objetivo,
      necessidades,
      obs,
      contato,
    } = this.state;

    if (
      userid !== '' &&
      date !== '' &&
      enderecounidade !== '' &&
      objetivo !== '' &&
      necessidades !== '' &&
      obs !== '' &&
      contato !== ''
    ) {
      this.setState({ loadingRegister: true });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const object = {
        user_id: userid,
        date,
        unidade,
        endereco_unidade: enderecounidade,
        objetivo,
        necessidades,
        obs,
        contato,
      };

      try {
        await api.post('/encaminhamentos', object, config);
        alert('Encaminhamento registrado com sucesso!');
        this.setState({
          loadingRegister: false,
          userid: '',
          date: '',
          unidade: '',
          enderecounidade: '',
          objetivo: '',
          necessidades: '',
          obs: '',
          contato: '',
        });
      } catch (error) {
        alert('Falha ao registrar encaminhamento!');
        this.setState({ loadingRegister: false });

        console.log(error.response.data.error);
      }
    } else {
      alert('Por favor informe os dados para registro do encaminhamento!');
    }
  };

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  render() {
    const {
      username,
      loading,
      loadingRegister,
      autenticated,
      data,
      form,
      list,

      date,
      unidade,
      enderecounidade,
      objetivo,
      necessidades,
      obs,
      contato,
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
                            <h6>Novo encaminhamento</h6>
                            <span>
                              Selecione o usuário para o encaminhamento:{' '}
                            </span>
                            <Options onChange={this.handleUserid}>
                              <Op value="">Abrir lista</Op>
                              {data.length ? (
                                data.map((op) => (
                                  <Op key={op.id} value={op.id}>
                                    {op.name}
                                  </Op>
                                ))
                              ) : (
                                <Op value="">
                                  SEM ALUNOS CADATRADOS NO MOMENTO...
                                </Op>
                              )}
                            </Options>
                            <span>Informe a data do encaminhamento: </span>
                            <InputDate
                              onChange={this.handleDate}
                              value={date}
                            />
                            <span>Informe a unidade de atendimento: </span>

                            <InputUnidade
                              onChange={this.handleUnidade}
                              value={unidade}
                            >
                              <option value="">
                                SELECIONE A UNIDADE DE ATENDIMENTO...
                              </option>
                              <option value="CRAS-AMAPÁ">CRAS-AMAPÁ</option>
                              <option value="CREAS">CREAS</option>

                              <option value="CRAS BELA-VISTA">
                                CRAS BELA-VISTA
                              </option>
                            </InputUnidade>
                            <span>Informe o endereço da unidade: </span>
                            <InputEndereco
                              onChange={this.handleEnderecoUnidade}
                              value={enderecounidade}
                            />
                            <span>Objetivo do encaminhamento: </span>
                            <InputObjetivo
                              onChange={this.handleObjetivo}
                              value={objetivo}
                            />
                            <span>
                              Informe a necessidade do encaminhamento:{' '}
                            </span>
                            <InputNecessidade
                              onChange={this.handleNecessidades}
                              value={necessidades}
                            />
                            <span>Informe o contato do estabelecimento: </span>
                            <InputContato
                              onChange={this.handleContato}
                              value={contato}
                            />
                            <span>
                              Observações em relação ao encaminhamento:
                            </span>
                            <InputObs onChange={this.handleObs} value={obs} />
                            <ButtonSubmit onClick={this.handleSubmit}>
                              {loadingRegister ? (
                                <ClipLoader size={20} color="#FFFF" />
                              ) : (
                                'Salvar'
                              )}
                            </ButtonSubmit>
                          </div>
                        </>
                      ) : (
                        <>
                          <h5>Encaminhados</h5>
                          {list.length ? (
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
                                    <ButtonOption>
                                      Gerar ficha
                                      <BsFileEarmarkText
                                        size={20}
                                        style={{ marginLeft: '10px' }}
                                      />
                                    </ButtonOption>
                                  </Link>
                                  <ButtonDelete
                                    onClick={() =>
                                      this.deleteEncaminhamento(item.id)
                                    }
                                  >
                                    Deletar
                                    <BsFileEarmarkText
                                      size={20}
                                      style={{ marginLeft: '10px' }}
                                    />
                                  </ButtonDelete>
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
