import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import api from '../../services/api';
import {
  ContainerLoader,
  Img,
  Table,
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
    autenticated: true,
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
    cep: '',
    endereco: false,
    bairro: '',
    rua: '',
    cidade: '',
    estado: '',
    numero: '',
    referencia: '',
    // Dados de contato
    telFixo: '',
    telCel: '',
    telCel2: '',
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
      });
      // alert('Dados Carregados com sucesso!');
      console.log(response.data);
    } catch (error) {
      alert('Usuário não existe ');
      <Redirect to="/painel" />;
    }
  }

  render() {
    const {
      loading,
      autenticated,
      // dados do usuário
      user,
    } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}

        <div
          className="container"
          style={{
            width: '100%',
            margin: '0 auto',
            height: '1000px',
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
                <center>
                  <table className="table col-md-10">
                    <tr>
                      <td className="col-md-4">
                        <Img
                          src={Logo1}
                          style={{
                            width: '120px',
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
                          <strong style={{ fontSize: '15px' }}>
                            PREFEITURA MUNICIPAL DE MARABA
                          </strong>
                          <br />
                          <strong>
                            Secretaria de Assistência Social da Prefeitura
                          </strong>
                          <br />
                          <br />
                          <strong>FICHA CADASTRAL - SCFV</strong>
                        </center>
                      </td>

                      <td className="col-md-4">
                        <Img
                          src={Logo2}
                          style={{
                            width: '100px',
                            float: 'right',
                          }}
                        />
                      </td>
                    </tr>
                  </table>
                </center>

                <div className="row" style={{ marginTop: '10px' }}>
                  <div
                    className="col-md-12"
                    style={{ width: '80%', margin: '0 auto' }}
                  >
                    <strong>CRAS: BELA-VISTA</strong>
                    <br />
                    <br />
                    <h3>Identificação</h3>
                    <hr />
                    <strong>PAIF:</strong>
                    <br />
                    <br />

                    <Table>
                      <tr>
                        <td colSpan="3">
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
