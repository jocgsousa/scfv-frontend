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

    paifUser: '',
    nisUser: '',
    cpfUser: '',
    rgUser: '',
    naturalidade: '',
    nameMae: '',
    nameResp: '',
    cpfResp: '',
    rgResp: '',
    situacao: '',
    emailUser: '',
    dataUser: '',
    sexoUser: '',
    turno: '',
    // Dados de endereco
    loadingCreateAndress: false,
    loadingUpdateAndress: false,
    loadingDeleteAndress: false,
    cep: '',
    endereco: false,
    bairro: '',
    rua: '',
    cidade: '',
    estado: '',
    numero: '',
    referencia: '',

    // Dados de contato do ususario
    contato: false,
    loadingCreateContato: false,
    loadingUpdateContato: false,
    loadingDeleteContato: false,
    idContato: '',
    telFixo: '',
    telCel: '',
    telCel2: '',
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
        // Dados do usuário
        user: response.data,
        paifUser: response.data.paif,
        nisUser: response.data.nis,
        nameUser: response.data.name,
        cpfUser: response.data.cpf,
        rgUser: response.data.rg,
        naturalidade: response.data.naturalidade,
        nameMae: response.data.name_mae,
        nameResp: response.data.name_resp,
        cpfResp: response.data.cpf_resp,
        rgResp: response.data.rg_resp,
        situacao: response.data.situacao,
        emailUser: response.data.email,
        dataUser: response.data.formatedDate,
        sexoUser: response.data.sexo,
        turno: response.data.turno,
        // Dados de endereço do usuário
        endereco: !!response.data.endereco,
        cep: response.data.endereco ? response.data.endereco.cep : null,
        bairro: response.data.endereco ? response.data.endereco.bairro : null,
        rua: response.data.endereco ? response.data.endereco.rua : null,
        cidade: response.data.endereco ? response.data.endereco.cidade : null,
        estado: response.data.endereco ? response.data.endereco.estado : null,
        numero: response.data.endereco ? response.data.endereco.numero : null,
        referencia: response.data.endereco
          ? response.data.endereco.referencia
          : null,

        // Dados de contato
        contato: response.data.contato ? response.data.contato : false,
        idContato: response.data.contato ? response.data.contato.id : null,
        telFixo: response.data.contato ? response.data.contato.tel_fixo : null,
        telCel: response.data.contato
          ? response.data.contato.tel_celular
          : null,
        telCel2: response.data.contato
          ? response.data.contato.tel_celular2
          : null,
      });
    } catch (error) {
      alert('Usuário não existe ');
      <Redirect to="/painel" />;
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

  handlePaif = (e) => {
    this.setState({ paifUser: e.target.value });
  };

  handleNIS = (e) => {
    this.setState({ nisUser: e.target.value });
  };

  // Tratativa do CPF do usuário
  handleCPF = (e) => {
    this.setState({ cpfUser: e.target.value });
  };

  handleRG = (e) => {
    this.setState({ rgUser: e.target.value });
  };

  handleNaturalidade = (e) => {
    this.setState({ naturalidade: e.target.value });
  };

  handleNameMae = (e) => {
    this.setState({ nameMae: e.target.value });
  };

  handleNameResp = (e) => {
    this.setState({ nameResp: e.target.value });
  };

  handleCPFREsp = (e) => {
    this.setState({ cpfResp: e.target.value });
  };

  handleRGResp = (e) => {
    this.setState({ rgResp: e.target.value });
  };

  handleSituacao = (e) => {
    this.setState({ situacao: e.target.value });
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

  // Tratativa do Turno do usuário
  handleTurno = (e) => {
    const { value } = e.target;
    this.setState({ turno: value });
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
  handleCep = (e) => {
    this.setState({ cep: e.target.value });
  };

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

  handleTelFixo = (e) => {
    this.setState({ telFixo: e.target.value });
  };

  handleTelCel = (e) => {
    this.setState({ telCel: e.target.value });
  };

  handleTelCel2 = (e) => {
    this.setState({ telCel2: e.target.value });
  };

  updateUser = async (e) => {
    this.setState({ loadingUpdate: true });
    e.preventDefault();
    const {
      token,
      paifUser,
      nisUser,
      cpfUser,
      rgUser,
      naturalidade,
      nameMae,
      nameResp,
      cpfResp,
      rgResp,
      situacao,
      nameUser,
      telefoneUser,
      emailUser,
      dataUser,
      turno,
      user,
      sexoUser,
    } = this.state;

    try {
      const object = {
        id: user.id,
        paif: paifUser,
        nis: nisUser,
        name: nameUser,
        phone: telefoneUser,
        email: emailUser,
        rg: rgUser,
        naturalidade,
        name_mae: nameMae,
        name_resp: nameResp,
        cpf_resp: cpfResp,
        rg_resp: rgResp,
        situacao,
        data_nascimento: dataUser,
        cpf: cpfUser,
        sexo: sexoUser,
        turno,
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
      cep,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
    } = this.state;
    // Object for andress
    const object = {
      cep,
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
      cep,
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
      cep,
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
        cep: '',
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

  createContato = async (e) => {
    this.setState({ loadingCreateContato: true });
    e.preventDefault();

    const { token, user, telFixo, telCel, telCel2 } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post(
        '/contatos',
        {
          id_user: user.id,
          tel_fixo: telFixo,
          tel_celular: telCel,
          tel_celular2: telCel2,
        },
        config
      );
      this.setState({
        loadingCreateContato: false,
        contato: response.data,
      });
    } catch (error) {
      this.setState({ loadingCreateContato: false });
      console.log(error.response.data.error);
      alert(
        'Falha ao cadastra os dados de contato, por favor contate a administração'
      );
    }
  };

  updateContato = async (e) => {
    this.setState({ loadingUpdateContato: true });
    e.preventDefault();

    const { token, contato, telFixo, telCel, telCel2 } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.put(
        '/contatos',
        {
          id: contato.id,
          tel_fixo: telFixo,
          tel_celular: telCel,
          tel_celular2: telCel2,
        },
        config
      );
      this.setState({
        loadingUpdateContato: false,
      });
    } catch (error) {
      this.setState({ loadingUpdateContato: false });
      console.log(error.response.data.error);
      alert(
        'Falha ao atualizar os dados de contato, por favor contate a administração'
      );
    }
  };

  deleteContato = async (e) => {
    this.setState({ loadingDeleteContato: true });
    e.preventDefault();

    const { token, contato } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.delete(`/contatos/${contato.id}`, config);
      this.setState({
        loadingDeleteContato: false,
        contato: false,
        telFixo: '',
        telCel: '',
        telCel2: '',
      });
    } catch (error) {
      this.setState({ loadingDeleteContato: false });
      console.log(error.response.data.error);
      alert(
        'Falha ao deletar os dados de contato, por favor contate a administração'
      );
    }
  };

  render() {
    const {
      username,
      loading,
      loadingUpdate,
      autenticated,
      // dados do usuário
      user,
      paifUser,
      nisUser,
      nameUser,
      cpfUser,
      rgUser,
      naturalidade,
      nameMae,
      nameResp,
      cpfResp,
      rgResp,
      situacao,
      emailUser,
      dataUser,
      sexoUser,
      turno,
      // dados de endereco
      loadingUpdateAndress,
      loadingCreateAndress,
      loadingDeleteAndress,
      cep,
      endereco,
      bairro,
      rua,
      cidade,
      estado,
      numero,
      referencia,
      // dados de contato do usuário
      contato,
      loadingUpdateContato,
      loadingCreateContato,
      loadingDeleteContato,
      telFixo,
      telCel,
      telCel2,
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
                              <span>Paif:</span>
                              <input
                                className="form-control"
                                onChange={this.handlePaif}
                                value={paifUser}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>NIS:</span>
                              <input
                                className="form-control"
                                onChange={this.handleNIS}
                                value={nisUser}
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
                              <span>RG:</span>
                              <input
                                className="form-control"
                                onChange={this.handleRG}
                                value={rgUser}
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
                              <span>Naturalidade:</span>
                              <input
                                type="text"
                                className="form-control"
                                onChange={this.handleNaturalidade}
                                value={naturalidade}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>Nome da Mãe:</span>
                              <input
                                type="text"
                                className="form-control"
                                onChange={this.handleNameMae}
                                value={nameMae}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>Nome do responsável:</span>
                              <input
                                type="text"
                                className="form-control"
                                onChange={this.handleNameResp}
                                value={nameResp}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>CPF Responsável:</span>
                              <input
                                className="form-control"
                                onChange={this.handleCPFREsp}
                                value={cpfResp}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>RG responsável:</span>
                              <input
                                className="form-control"
                                onChange={this.handleRGResp}
                                value={rgResp}
                              />
                            </div>

                            <div className="col-md-6">
                              <span>E-mail:</span>
                              <input
                                type="email"
                                className="form-control"
                                onChange={this.handleEmail}
                                value={emailUser}
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

                            <div className="col-md-6">
                              <span>Turno:</span>
                              <select
                                onChange={this.handleTurno}
                                name="sexo"
                                className="form-control"
                                value={turno}
                              >
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                              </select>
                            </div>

                            <div className="col-md-12">
                              <span>Situação:</span>
                              <select
                                className="form-control"
                                onChange={this.handleSituacao}
                                value={situacao}
                              >
                                <option value="Não está em situação de prioritária">
                                  Não está em situação de prioritária
                                </option>
                                <option value="Em situação de isolamento">
                                  Em situação de isolamento
                                </option>
                                <option value="Trabalho Infantil">
                                  Trabalho Infantil
                                </option>
                                <option value="Vivência de violência ou negligência">
                                  Vivência de violência ou negligência
                                </option>
                                <option
                                  value="Fora da escola ou com defasagem escola
                                  superior a 2(dois) anos"
                                >
                                  Fora da escola ou com defasagem escola
                                  superior a 2(dois) anos
                                </option>
                                <option value="Em situação de acolhimento">
                                  Em situação de acolhimento
                                </option>
                                <option
                                  value="Em cumprimento de medida socioeducativa em
                                  meio aberto"
                                >
                                  Em cumprimento de medida socioeducativa em
                                  meio aberto
                                </option>
                                <option value="Egressos de medidas socioeducativas">
                                  Egressos de medidas socioeducativas
                                </option>
                                <option value="Situação de abuso e/ou exploração sexual">
                                  Situação de abuso e/ou exploração sexual
                                </option>
                                <option
                                  value="Com medidas de proteção do Estatuto da Criança
                                  e do Adolescente - ECA"
                                >
                                  Com medidas de proteção do Estatuto da Criança
                                  e do Adolescente - ECA
                                </option>
                                <option value="Crianças e adolescentes em situação de rua">
                                  Crianças e adolescentes em situação de rua
                                </option>
                                <option
                                  value="Vulnerabilidade que diz respeito às pessoas
                                  com deficiência"
                                >
                                  Vulnerabilidade que diz respeito às pessoas
                                  com deficiência
                                </option>
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
                              <span>CEP:</span>
                              <input
                                className="form-control"
                                onChange={this.handleCep}
                                value={cep}
                              />
                            </div>

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

                        <h5>Dados de Contato</h5>
                        <hr />
                        <form>
                          <div className="row">
                            <div className="col-md-12">
                              <span>Telefone fixo:</span>
                              <input
                                className="form-control"
                                onChange={this.handleTelFixo}
                                value={telFixo}
                              />
                            </div>

                            <div className="col-md-12">
                              <span>Telefone celular:</span>
                              <input
                                className="form-control"
                                onChange={this.handleTelCel}
                                value={telCel}
                              />
                            </div>

                            <div className="col-md-12">
                              <span>Telefone Celular:</span>
                              <input
                                className="form-control"
                                onChange={this.handleTelCel2}
                                value={telCel2}
                              />
                            </div>

                            <div className="col-md-12">
                              {contato ? (
                                <>
                                  <ButtonSubmit onClick={this.updateContato}>
                                    {loadingUpdateContato ? (
                                      <ClipLoader size={20} color="#FFFF" />
                                    ) : (
                                      'Atualizar Contato'
                                    )}
                                  </ButtonSubmit>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ButtonSubmit onClick={this.deleteContato}>
                                    {loadingDeleteContato ? (
                                      <ClipLoader size={20} color="#FFFF" />
                                    ) : (
                                      'Excluir Contato'
                                    )}
                                  </ButtonSubmit>
                                </>
                              ) : (
                                <ButtonSubmit onClick={this.createContato}>
                                  {loadingCreateContato ? (
                                    <ClipLoader size={20} color="#FFFF" />
                                  ) : (
                                    'Cadastrar Contato'
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
