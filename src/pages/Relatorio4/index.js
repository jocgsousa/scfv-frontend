import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container, Table, Tr, Td } from './styles';

import api from '../../services/api';

export default class Relatorio1 extends Component {
  state = {
    auth: true,
    users: [],
    criancaMatutino: [],
    criancaVespertino: [],
    loading: false,
    token: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ auth: false });
    }

    this.setState({ token });

    const bearerToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.get('/alunos', bearerToken);

      this.setState({
        loading: false,
      });
      // Vamos pegar todos os adolescentes e colocar no array
      const users = response.data.alunosAtivados.rows;

      const criancaMatutino = users.filter(
        (user) =>
          user.idade >= 6 && user.idade <= 11 && user.turno === 'Matutino'
      );
      console.log(criancaMatutino);

      const criancaVespertino = users.filter(
        (user) =>
          user.idade >= 6 && user.idade <= 11 && user.turno === 'Vespertino'
      );

      this.setState({
        criancaMatutino: criancaMatutino || '',
        criancaVespertino: criancaVespertino || '',
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.response.data.error ? error.response.data.error : '');
    }
  }

  render() {
    const {
      auth,
      loading,
      // criancaMatutino,
      criancaVespertino,
    } = this.state;
    return (
      <>
        {auth ? '' : <Redirect to="/" />}

        {loading ? (
          <ClipLoader size={20} color="#7159c1" />
        ) : (
          <Container>
            {criancaVespertino.length ? (
              <>
                <h4>
                  USUÁRIOS MATRICULADOS TURNO VESPERTINO SERVIÇOS DE CONVIVÊNCIA
                  DE FORTALECIMENTO DE VINCULOS SCFV {new Date().getFullYear()}{' '}
                  - (06 a 11 anos)
                </h4>
                <Table>
                  <Tr style={{ background: '#eeee' }}>
                    <th>N.</th>
                    <th>NOME</th>
                    <th>IDADE</th>
                    <th>CELULAR DO RESPONSAVEL</th>
                  </Tr>

                  {criancaVespertino.map((user, index) => (
                    <>
                      <Tr>
                        <Td>{index}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.idade}</Td>
                        <Td>
                          {user.contato
                            ? user.contato.tel_celular
                            : 'Sem Contatos'}
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Table>
              </>
            ) : (
              <center>
                <h5 style={{ marginTop: '20%' }}>Sem matriculas no momento!</h5>
              </center>
            )}
          </Container>
        )}
      </>
    );
  }
}
