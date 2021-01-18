import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPrint, FaArrowLeft } from 'react-icons/fa';

// import path from 'path';

// import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';
import {
  ContainerLoader,
  Img,
  Table,
  Button,
  Container,
  // eslint-disable-next-line import/no-unresolved
} from './styles';

import Logo1 from './assets/logo1.png';
import Logo2 from './assets/logo2.jpg';

export default class FichaUser extends Component {
  state = {
    // dados de componentização e autenticação do operador do sistema
    loading: false,
    token: '',
    user: [],
    cursos: [],

    autenticated: true,
    // Faixa
    faixa: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const key = localStorage.getItem('token');

    if (!key) {
      this.setState({ autenticated: false });
    }

    this.setState({
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
        cursos: response.data.cursos ? response.data.cursos : null,
      });
      // alert('Dados Carregados com sucesso!');
      this.checkFaixa(response.data.idade);
    } catch (error) {
      alert('Usuário não existe ');
      <Redirect to="/painel" />;
    }
  }

  checkFaixa = (idade) => {
    if (idade <= 11) {
      this.setState({ faixa: '6 a 12 anos - CRIANÇAS' });
    }
    if (idade >= 12 && idade <= 17) {
      this.setState({ faixa: '12 a 17 anos - ADOLESCENTES' });
    }
    if (idade > 17) {
      this.setState({ faixa: 'Maior de 18 - ADULTOS' });
    }
  };

  render() {
    const {
      loading,
      autenticated,
      // dados do usuário
      user,
      faixa,
      cursos,
    } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}

        <div
          className="container"
          style={{
            width: '100%',
            margin: '0 auto',
            height: '1500px',
            position: 'relative',
            top: '20px',
          }}
        >
          <div className="row">
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
                <br />
                <Container>
                  <Link to={`/ficha/${encodeURIComponent(user.id)}`}>
                    <Button>
                      Voltar <FaArrowLeft />
                    </Button>
                  </Link>

                  <Button onClick={() => window.print()}>
                    Imprimir <FaPrint />
                  </Button>
                </Container>

                <center>
                  <table className="table col-md-12">
                    <tr>
                      <td className="col-md-4">
                        <Img
                          src={Logo1}
                          style={{
                            width: '150px',
                            float: 'left',
                          }}
                        />
                      </td>

                      <td className="col-md-4">
                        <center>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <strong style={{ fontSize: '18px' }}>
                            PREFEITURA MUNICIPAL DE MARABA
                          </strong>
                          <br />
                          <strong>
                            Secretaria de Assistência Social da Prefeitura
                          </strong>
                          <br />

                          <strong style={{ fontSize: '18px' }}>
                            FICHA CADASTRAL - SCFV
                          </strong>
                        </center>
                      </td>

                      <td className="col-md-4">
                        <Img
                          src={Logo2}
                          style={{
                            width: '120px',
                            float: 'right',
                            marginTop: '-10px',
                          }}
                        />
                      </td>
                    </tr>
                  </table>
                </center>

                <div className="row" style={{ marginTop: '10px' }}>
                  <div
                    className="col-md-12"
                    style={{ width: '100%', margin: '0 auto' }}
                  >
                    <strong>CRAS: BELA-VISTA</strong>
                    <br />

                    <strong>PAIF: </strong>
                    <u>{user.paif ? user.paif : 'S/D'}</u>
                    <br />

                    <h5>Identificação</h5>
                    <Table>
                      <tr>
                        <td colSpan="4">
                          <strong>NOME:</strong> {user.name}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>SEXO:</strong> {user.sexo}
                        </td>
                        <td>
                          <strong>NIS:</strong> {user.nis}
                        </td>
                        <td>
                          <strong>CPF:</strong> {user.cpf}
                        </td>
                        <td>
                          <strong>IDADE:</strong> {user.idade}
                        </td>
                      </tr>
                    </Table>
                    <h5>Dados do Responsável</h5>
                    <Table>
                      <tr>
                        <td>
                          <strong>RG:</strong> {user.rg}
                        </td>

                        <td>
                          <strong>DATA DE NASCIMENTO:</strong>
                          {user.dataNascimento}
                        </td>
                        <td>
                          <strong>NATURALIDADE:</strong>
                          {user.naturalidade}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <strong>NOME DA MÃE:</strong>
                          {user.name_mae}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="3">
                          <strong>NOME DO RESPONSÁVEL PELA FAMILIA:</strong>
                          {user.name_resp}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <strong>CPF RESPONSÁVEL:</strong>
                          {user.cpf_resp}
                        </td>

                        <td colSpan="3">
                          <strong>RG RESPONSÁVEL:</strong>
                          {user.rg_resp}
                        </td>
                      </tr>
                    </Table>
                    <h5>Dados de contato</h5>
                    <Table>
                      <tr>
                        <td>
                          <strong>Telefone Fixo:</strong>
                          {user.contato ? user.contato.tel_fixo : 'S/N'}
                        </td>
                        <td>
                          <strong>Celular I:</strong>
                          {user.contato ? user.contato.tel_celular : 'S/N'}
                        </td>
                        <td>
                          <strong>Celular II:</strong>
                          {user.contato ? user.contato.tel_celular2 : 'S/N'}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <strong>E-mail:</strong> {user.email}
                        </td>
                      </tr>
                    </Table>
                    <h5>Dados de Endereço</h5>
                    <Table>
                      <tr>
                        <td>
                          <strong>CEP:</strong>
                          {user.endereco ? user.endereco.cep : 'S/D'}
                        </td>
                        <td>
                          <strong>Rua:</strong>
                          {user.endereco ? user.endereco.rua : 'S/D'}
                        </td>
                        <td>
                          <strong>Bairro:</strong>
                          {user.endereco ? user.endereco.bairro : 'S/D'}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Nº:</strong>
                          {user.endereco ? user.endereco.numero : 'S/D'}
                        </td>
                        <td colSpan="2">
                          <strong>Referência:</strong>
                          {user.endereco ? user.endereco.referencia : 'S/D'}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cidade:</strong>
                          {user.endereco ? user.endereco.cidade : 'S/D'}
                        </td>
                        <td colSpan="2">
                          <strong>Estado:</strong>
                          {user.endereco ? user.endereco.estado : 'S/D'}
                        </td>
                      </tr>
                    </Table>
                    <br />
                    <br />
                    <h5>Situação do usuário</h5>
                    <Table>
                      <tr>
                        <td>
                          <strong>Situação:</strong>
                          {user.situacao ? user.situacao : 'S/D'}
                        </td>
                      </tr>
                    </Table>

                    <h5>Grupo SCFV</h5>
                    <Table>
                      <tr>
                        <td>
                          <strong>Faixa etária:</strong>
                          {faixa}
                        </td>
                        <td>
                          <strong>Turno:</strong>
                          {user.turno ? user.turno : 'TURNO NÃO INFORMADO'}
                        </td>
                      </tr>
                    </Table>

                    <h5>Cursos - realizados</h5>
                    <Table>
                      {cursos.length ? (
                        cursos.map((curso) => (
                          <>
                            <tr>
                              <td>
                                <strong>Nome do curso :</strong>
                                {curso.name}
                              </td>
                              <td>
                                <strong>Início :</strong>
                                {curso.inicio}
                                <strong>Final :</strong>
                                {curso.fim}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Duração do curso :</strong>
                                {curso.dias
                                  ? ` ${curso.dias} dias`
                                  : 'CURSO FINALIZADO'}
                              </td>
                              <td>
                                <strong>Local do curso:</strong>
                                {curso.orgao ? curso.orgao : 'SEM/LOCAL'}
                              </td>
                            </tr>

                            <br />
                          </>
                        ))
                      ) : (
                        <tr>
                          <td>O Aluno não possui cursos cadastrados</td>
                        </tr>
                      )}
                    </Table>
                  </div>

                  <strong>
                    Assinatura do responsável:
                    _________________________________________________
                  </strong>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

FichaUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      users: PropTypes.number,
    }),
  }).isRequired,
};
