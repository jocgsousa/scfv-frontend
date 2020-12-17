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
    dataUser: [],
    dataFicha: [],
    autenticated: true,
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
      const response = await api.get(`/fichaencaminhamento/${userId}`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      this.setState({
        loading: false,
        // Dados do usuário
        dataUser: response.data.user,
        dataFicha: response.data,
      });
    } catch (error) {
      console.log(error.response);
      alert('Falha ao carregar os dados por favor tente novamente mais tarde');
      <Redirect to="/painel" />;
    }
  }

  render() {
    const {
      loading,
      autenticated,
      // dados do usuário
      dataFicha,
      dataUser,
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
                  <Link to="/encaminhamentos/">
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
                            FICHA DE ENCAMINHAMENTO - SCFV
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
                    <strong>UNIDADE DE ORIGEM: CRAS BELA-VISTA</strong>
                    <br />
                    <br />

                    <Table>
                      <tr>
                        <td>
                          <strong>Descrição: </strong>
                          <br />
                          <p>
                            Encaminho o(a) Sr.(a){' '}
                            <strong>{dataUser.name} </strong> e solicito atenção
                            para para seu atendimento na unidade
                            <strong>{dataFicha.unidade}</strong> localizado no
                            endereço {dataFicha.endereco_unidade}, tendo em
                            consideração as dificuldades identificadas pela
                            Assistência Social e expostas a seguir:
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong style={{ textAlign: 'left' }}>
                            Objetivo:{' '}
                          </strong>
                          <br />
                          <p>{dataFicha.objetivo}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style={{ textAlign: 'left' }}>
                            Necessidades identificadas:
                          </strong>
                          <br />
                          <p>{dataFicha.necessidades}</p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong style={{ textAlign: 'left' }}>
                            Necessidades identificadas:
                          </strong>
                          <br />
                          <p>{dataFicha.necessidades}</p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong style={{ textAlign: 'left' }}>
                            Observações:
                          </strong>
                          <br />
                          <p>
                            {dataFicha.obs ? dataFicha.obs : 'SEM OBSERVAÇÕES'}
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong style={{ textAlign: 'left' }}>
                            Telefone para contato:
                          </strong>
                          <br />
                          <p>
                            {dataFicha.contato
                              ? dataFicha.contato
                              : 'SEM CONTATO'}
                          </p>
                          <br />

                          <center>_______________________________</center>

                          <center>
                            <strong> Técnico do SUAS</strong>
                          </center>
                        </td>
                      </tr>
                      <tr>
                        <center>
                          <span>
                            <a
                              href="https://www.gesuas.com.br/"
                              style={{ textDecoration: 'none' }}
                              target="_blanck"
                            >
                              {' '}
                              Instrumental de acordo com a NOB/SUAS e demais
                              normativas como todo o sistema GESUAS.
                            </a>
                          </span>
                        </center>
                      </tr>
                    </Table>
                  </div>
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
