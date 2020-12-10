import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
// import api from '../../services/api';
import {
  Header,
  Option,
  ContainerLoader,
  ButtonLogout,
  Form,
  InputName,
  InputPhone,
  InputCPF,
  InputDate,
  InputEmail,
  SelectSexo,
  Options,
} from './styles';

export default class Register extends Component {
  state = {
    loading: false,
    username: '',
    token: '',
    autenticated: true,
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

    // try {
    //   const response = await api.get('/alunos', {
    //     headers: {
    //       Authorization: `Bearer ${key}`,
    //     },
    //   });
    //   this.setState({
    //     loading: false,
    //     ativos: response.data.alunosAtivados.count,
    //     desativados: response.data.alunosDesativados.count,
    //   });

    //   const { ativos, desativados } = this.state;
    //   // const total = ativos + desativados;
    //   this.setState({
    //     data: {
    //       labels: [`Ativos: ${ativos}`, `Desativados: ${desativados}`],
    //       datasets: [
    //         {
    //           label: 'Usuários cadastrados',
    //           data: [`${ativos}`, `${desativados}`],
    //           backgroundColor: ['purple', 'green'],
    //         },
    //       ],
    //     },
    //   });
    // } catch (error) {
    //   console.log(error.response.data.error);
    // }
  }

  logoff = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ autenticated: false });
  };

  render() {
    const { username, loading, autenticated } = this.state;

    return (
      <>
        {autenticated ? '' : <Redirect to="/" />}
        <Header>
          SCFV - {username}{' '}
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
                  <Form>
                    <div className="row form-group ">
                      <strong>Formulário de registro</strong>
                      <div className="col-md-12">
                        <span>Nome: </span>
                        <InputName />
                      </div>
                      <div className="col-md-6">
                        <span>Telefone: </span>
                        <InputPhone />
                      </div>
                      <div className="col-md-6">
                        <span>CPF: </span>
                        <InputCPF maxlength="10" />
                      </div>
                      <div className="col-md-6">
                        <span>Data de Nascimento: </span>
                        <InputDate />
                      </div>
                      <div className="col-md-6">
                        <span>Sexo: </span>
                        <SelectSexo>
                          <Options>M</Options>
                          <Options>F</Options>
                        </SelectSexo>
                      </div>
                      <div className="col-md-12">
                        <span>E-mail: </span>
                        <InputEmail />
                      </div>
                    </div>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
