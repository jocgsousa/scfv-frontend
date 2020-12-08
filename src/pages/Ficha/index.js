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
  ContainerUser,
  Op,
  ButtonSubmit,

  // eslint-disable-next-line import/no-unresolved
} from './styles';

export default class Ficha extends Component {
  state = {
    // dados de componentização e autenticação do operador do sistema
    loading: false,
    loadingUpdate: false,
    username: '',
    token: '',
    charData: [],
    user: [],
    autenticated: true,
    nameUser: '',
    // dados da ficha do usuário
    cpfUser: '',
    telefoneUser: '',
    emailUser: '',
    dataUser: '',
    sexoUser: '',
    // Dados de endereco
    loadingCreateAndress: false,
    loadingUpdateAndress: false,
    loadingDeleteAndress: false,
    endereco: false,
    bairro: '',
    rua: '',
    cidade: '',
    estado: '',
    numero: '',
    referencia: '',
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
        nameUser: response.data.name,
        cpfUser: response.data.cpf,
        telefoneUser: response.data.phone,
        emailUser: response.data.email,
        dataUser: response.data.formatedDate,
        sexoUser: response.data.sexo,
        endereco: !!response.data.endereco,
        bairro: response.data.endereco ? response.data.endereco.bairro : null,
        rua: response.data.endereco ? response.data.endereco.rua : null,
        cidade: response.data.endereco ? response.data.endereco.cidade : null,
        estado: response.data.endereco ? response.data.endereco.estado : null,
        numero: response.data.endereco ? response.data.endereco.numero : null,
        referencia: response.data.endereco
          ? response.data.endereco.referencia
          : null,
      });
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

  // Tratativa do nome do usuário
  handleName = (e) => {
    this.setState({ nameUser: e.target.value });
  };

  // Tratativa do CPF do usuário
  handleCPF = (e) => {
    this.setState({ cpfUser: e.target.value });
  };

  // Tratativa do Telefone do usuário
  handleTelefone = (e) => {
    this.setState({ telefoneUser: e.target.value });
  };

  // Tratativa do Email do usuário
  handleEmail = (e) => {
    this.setState({ emailUser: e.target.value });
  };

  // Tratativa do Data de Nascimento do usuário
  handleDataNascimento = (e) => {
    this.setState({ dataUser: e.target.value });
  };

  // Tratativa do Email do usuário
  handleSexo = (e) => {
    const { value } = e.target;
    this.setState({ sexoUser: value });
  };

  checkForm = (e) => {
    if (e === 'M') {
      return (
        <>
          <Op selected value="M">
            MASCULINO
          </Op>
          ;<Op value="F">FEMININO</Op>;
        </>
      );
    }
    if (e === 'F') {
      return (
        <>
          <Op value="M">MASCULINO</Op>;
          <Op selected value="F">
            FEMININO
          </Op>
          ;
        </>
      );
    }
    return '';
  };

  // Tratativa dos dados de endereco do usuário
  handleBairro = (e) => {
    this.setState({ bairro: e.target.value });
  };

  handleRua = (e) => {
    this.setState({ rua: e.target.value });
  };

  handleCidade = (e) => {
    this.setState({ cidade: e.target.value });
  };

  handleEstado = (e) => {
    this.setState({ estado: e.target.value });
  };

  handleNumero = (e) => {
    this.setState({ numero: e.target.value });
  };

  handleReferencia = (e) => {
    this.setState({ referencia: e.target.value });
  };

  updateUser = async (e) => {
    this.setState({ loadingUpdate: true });
    e.preventDefault();
    const {
      token,
      nameUser,
      telefoneUser,
      emailUser,
      cpfUser,
      dataUser,
      user,
      sexoUser,
    } = this.state;

    try {
      const object = {
        id: user.id,
        name: nameUser,
        phone: telefoneUser,
        email: emailUser,
        data_nascimento: dataUser,
        cpf: cpfUser,
        sexo: sexoUser,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.put('/update', object, config);
      this.setState({ loadingUpdate: false });
    } catch (error) {
      alert('Falha ao atualizar dados, por favor tente novamente');
      console.log(error.response.data.error);
    }
  };

  updateAndress = async (e) => {
    e.preventDefault();

    this.setState({ loadingUpdateAndress: true });
    const {
      token,
      user,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
    } = this.state;
    // Object for andress
    const object = {
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.put(`/endereco/${user.id}`, object, config);
      this.setState({ loadingUpdateAndress: false });
    } catch (error) {
      this.setState({ loadingUpdateAndress: false });
      alert('Falha ao atualizar endereço, tente novamente mais tarde');
    }
  };

  createAndress = async (e) => {
    e.preventDefault();
    this.setState({ loadingCreateAndress: true });

    const {
      token,
      user,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
    } = this.state;
    // Object for andress
    const object = {
      id: user.id,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.post('/endereco', object, config);
      this.setState({ loadingCreateAndress: false, endereco: true });
    } catch (error) {
      this.setState({ loadingCreateAndress: false });
      alert('Falha ao cadastrar endereço tente novamente mais tarde.');
    }
  };

  deleteAndress = async (e) => {
    this.setState({ loadingDeleteAndress: true });
    e.preventDefault();
    const { token, user } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.delete(`/endereco/${user.id}`, config);

      this.setState({
        loadingDeleteAndress: false,
        endereco: false,
        bairro: '',
        rua: '',
        cidade: '',
        estado: '',
        referencia: '',
        numero: '',
      });
    } catch (error) {
      this.setState({ loadingDeleteAndress: false });
      alert('Erro ao deletar dados, por favor tente novamente mais tarde.');
    }
  };

  render() {
    const {
      username,
      loading,
      loadingUpdate,
      autenticated,
      user,
      nameUser,
      cpfUser,
      telefoneUser,
      emailUser,
      dataUser,
      sexoUser,
      // dados de endereco
      loadingUpdateAndress,
      loadingCreateAndress,
      loadingDeleteAndress,
      endereco,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
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
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Informaçoes pessoais: {user.name}</h5>
                      <hr />
                    </div>
                    <ContainerUser className="col-md-12">
                      <div className="row">
                        <form onSubmit={this.updateUser}>
                          <div className="row">
                            <div className="col-md-12">
                              <span>Nome Completo:</span>
                              <input
                                className="form-control"
                                onChange={this.handleName}
                                value={nameUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>CPF:</span>
                              <input
                                className="form-control"
                                onChange={this.handleCPF}
                                value={cpfUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>Telefone:</span>
                              <input
                                className="form-control"
                                onChange={this.handleTelefone}
                                value={telefoneUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>E-mail:</span>
                              <input
                                className="form-control"
                                onChange={this.handleEmail}
                                value={emailUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>Data/Nascimento:</span>
                              <input
                                type="date"
                                className="form-control"
                                onChange={this.handleDataNascimento}
                                value={dataUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>Sexo: selecionado [{sexoUser}]</span>
                              <select
                                onChange={this.handleSexo}
                                name="sexo"
                                className="form-control"
                              >
                                {this.checkForm(sexoUser)}
                              </select>
                            </div>
                            <br />
                            <div className="col-md-12">
                              <ButtonSubmit>
                                {loadingUpdate ? (
                                  <ClipLoader size={20} color="#FFFF" />
                                ) : (
                                  'Atualizar Informações'
                                )}
                              </ButtonSubmit>
                            </div>
                          </div>
                        </form>
                        <br />

                        <br />
                        <br />
                        <br />
                        <h5>Dados de Endereço</h5>
                        <hr />
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <span>Bairro:</span>
                              <input
                                className="form-control"
                                onChange={this.handleBairro}
                                value={bairro}
                              />
                            </div>

                            <div className="col-md-12">
                              <span>Rua:</span>
                              <input
                                className="form-control"
                                onChange={this.handleRua}
                                value={rua}
                              />
                            </div>
                            <div className="col-md-12">
                              <span>Cidade:</span>
                              <input
                                className="form-control"
                                onChange={this.handleCidade}
                                value={cidade}
                              />
                            </div>
                            <div className="col-md-12">
                              <span>Estado:</span>
                              <input
                                className="form-control"
                                onChange={this.handleEstado}
                                value={estado}
                              />
                            </div>
                            <div className="col-md-12">
                              <span>Referência:</span>
                              <input
                                className="form-control"
                                onChange={this.handleReferencia}
                                value={referencia}
                              />
                            </div>

                            <div className="col-md-12">
                              <span>Número:</span>
                              <input
                                className="form-control"
                                onChange={this.handleNumero}
                                value={numero}
                              />
                            </div>
                            <div className="col-md-12">
                              {endereco ? (
                                <>
                                  <ButtonSubmit onClick={this.updateAndress}>
                                    {loadingUpdateAndress ? (
                                      <ClipLoader size={20} color="#FFFF" />
                                    ) : (
                                      'Atualizar Endereço'
                                    )}
                                  </ButtonSubmit>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ButtonSubmit onClick={this.deleteAndress}>
                                    {loadingDeleteAndress ? (
                                      <ClipLoader size={20} color="#FFFF" />
                                    ) : (
                                      'Excluir endereço'
                                    )}
                                  </ButtonSubmit>
                                </>
                              ) : (
                                <ButtonSubmit onClick={this.createAndress}>
                                  {loadingCreateAndress ? (
                                    <ClipLoader size={20} color="#FFFF" />
                                  ) : (
                                    'Cadastrar Endereço'
                                  )}
                                </ButtonSubmit>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </ContainerUser>
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
