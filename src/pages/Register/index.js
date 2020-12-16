import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';
import {
  Header,
  Option,
  ContainerLoader,
  ButtonLogout,
  ButtonSubmit,
  InputCPF,
} from './styles';

export default class Register extends Component {
  state = {
    loading: false,
    loadingRegister: false,
    username: '',
    token: '',
    autenticated: true,

    // Dados do formulário de matricula
    nameUser: '',
    paifUser: '',
    nisUser: '',
    cpfUser: '',
    rgUser: '',
    dataUser: '',
    naturalidade: '',
    nameMae: '',
    nameResp: '',
    cpfResp: '',
    rgResp: '',
    emailUser: '',
    sexoUser: '',
    situacao: '',
    turno: 'Matutino',
    // Confirmação de registro
    registered: false,
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
    });
  }
  // Alterando state do formulario

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

  handleTurno = (e) => {
    this.setState({ turno: e.target.value });
  };

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  handleRegister = async (e) => {
    const {
      token,
      nameUser,
      paifUser,
      nisUser,
      cpfUser,
      rgUser,
      dataUser,
      naturalidade,
      nameMae,
      nameResp,
      cpfResp,
      rgResp,
      emailUser,
      sexoUser,
      situacao,
      turno,
    } = this.state;

    e.preventDefault();

    if (
      nameUser !== '' &&
      paifUser !== '' &&
      nisUser !== '' &&
      cpfUser !== '' &&
      rgUser !== '' &&
      dataUser !== '' &&
      naturalidade !== '' &&
      nameMae !== '' &&
      nameResp !== '' &&
      cpfResp !== '' &&
      rgResp !== '' &&
      emailUser !== '' &&
      sexoUser !== '' &&
      situacao !== '' &&
      turno !== ''
    ) {
      this.setState({ loadingRegister: true });

      const beareToken = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await api.post(
          '/alunos',
          {
            paif: paifUser,
            nis: nisUser,
            name: nameUser,
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
          },
          beareToken
        );

        console.log(response);
        alert(
          'Cadastro Realizado com Sucesso!, redirecionando para página de usuários'
        );
        this.setState({ loadingRegister: false, registered: true });
      } catch (error) {
        this.setState({ loadingRegister: false, registered: false });
        console.log(error.response.data.error);
        alert(
          error.response.data.error
            ? error.response.data.error
            : 'Não foi possível realizar o cadastrao, contate o administrador do sistema'
        );
      }
    }

    if (
      nameUser === '' ||
      paifUser === '' ||
      nisUser === '' ||
      cpfUser === '' ||
      rgUser === '' ||
      dataUser === '' ||
      naturalidade === '' ||
      nameMae === '' ||
      nameResp === '' ||
      cpfResp === '' ||
      rgResp === '' ||
      emailUser === '' ||
      sexoUser === '' ||
      situacao === '' ||
      turno === ''
    ) {
      alert('Todos os campos devem ser preenchidos para realizar a matrícula');
    }
  };

  render() {
    const {
      username,
      loading,
      loadingRegister,
      autenticated,
      nameUser,
      paifUser,
      nisUser,
      cpfUser,
      rgUser,
      dataUser,
      naturalidade,
      nameMae,
      nameResp,
      cpfResp,
      rgResp,
      emailUser,
      sexoUser,
      situacao,
      turno,
      registered,
    } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}
        {registered ? <Redirect to="/users" /> : ''}
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
                <Option style={{ color: 'red' }}>Novo Registro</Option>
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
                  <form onSubmit={this.handleRegister}>
                    <div className="row">
                      <div className="col-md-12">
                        <h6>Formulário de registro</h6>
                      </div>
                      <hr />
                      <div className="col-md-12">
                        <span>
                          Nome Completo: <i style={{ color: 'red' }}>*</i>
                        </span>
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
                          maxLength="11"
                          value={nisUser}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>CPF:</span>
                        <InputCPF onChange={this.handleCPF} value={cpfUser} />
                      </div>

                      <div className="col-md-6">
                        <span>
                          RG: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          className="form-control"
                          onChange={this.handleRG}
                          value={rgUser}
                          maxLength="7"
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          Data/Nascimento: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          onChange={this.handleDataNascimento}
                          value={dataUser}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          Naturalidade: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleNaturalidade}
                          value={naturalidade}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          Nome da Mãe: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleNameMae}
                          value={nameMae}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          Nome do responsável: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleNameResp}
                          value={nameResp}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          CPF Responsável: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <InputCPF
                          className="form-control"
                          onChange={this.handleCPFREsp}
                          value={cpfResp}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          RG responsável: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          className="form-control"
                          onChange={this.handleRGResp}
                          value={rgResp}
                          maxLength="7"
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          E-mail: <i style={{ color: 'red' }}>*</i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          onChange={this.handleEmail}
                          value={emailUser}
                        />
                      </div>

                      <div className="col-md-6">
                        <span>
                          Sexo: selecionado [{sexoUser}]{' '}
                          <i style={{ color: 'red' }}>*</i>
                        </span>
                        <select
                          onChange={this.handleSexo}
                          name="sexo"
                          className="form-control"
                          value={sexoUser}
                        >
                          <option value="F">FEMININO</option>
                          <option value="M">MASCULINO</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <span>
                          Situação: <i style={{ color: 'red' }}>*</i>
                        </span>
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
                            Fora da escola ou com defasagem escola superior a
                            2(dois) anos
                          </option>
                          <option value="Em situação de acolhimento">
                            Em situação de acolhimento
                          </option>
                          <option
                            value="Em cumprimento de medida socioeducativa em
                                  meio aberto"
                          >
                            Em cumprimento de medida socioeducativa em meio
                            aberto
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
                            Com medidas de proteção do Estatuto da Criança e do
                            Adolescente - ECA
                          </option>
                          <option value="Crianças e adolescentes em situação de rua">
                            Crianças e adolescentes em situação de rua
                          </option>
                          <option
                            value="Vulnerabilidade que diz respeito às pessoas
                                  com deficiência"
                          >
                            Vulnerabilidade que diz respeito às pessoas com
                            deficiência
                          </option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <span>
                          Turno:
                          <i style={{ color: 'red' }}>*</i>
                        </span>
                        <select
                          onChange={this.handleTurno}
                          name="turno"
                          className="form-control"
                          value={turno}
                        >
                          <option value="Matutino">Matutino</option>
                          <option value="Vespertino">Vespertino</option>
                        </select>
                      </div>

                      <br />
                      <div className="col-md-12">
                        <ButtonSubmit>
                          {loadingRegister ? (
                            <ClipLoader size={20} color="#FFFF" />
                          ) : (
                            'Cadastrar'
                          )}
                        </ButtonSubmit>
                      </div>
                    </div>
                  </form>
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
