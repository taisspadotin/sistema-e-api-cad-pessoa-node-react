import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import {Col, Row} from 'react-bootstrap';
import { Button, Icon, Popup, Message, Table} from 'semantic-ui-react';
import axios, {serviceUrl, onSuccess,onFailure} from 'axios';

export default class Usuario extends Component{
	state = {
		registros: []
	};
	componentDidMount() {
		
		///axios.defaults.baseURL = 'http://localhost:3001/cadastro?page=0&limit=5';
		axios.defaults.baseURL = 'http://localhost:3020/usuarios';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data.usuarios);
			this.setState({registros: d})
		})
		.catch(error => {
			console.log(error);
		})
	}
	cadastrar(){
		alert('teste');
	}
	render(){
		let registroBanco = '';
		if(this.state.registros.length === 0)
		{
			registroBanco = 
			<Message negative style={{textAlign:'center'}}>
				<Message.Header>Nenhum registro encontrado!</Message.Header>
				<p>Verifique sua conexão com o banco</p>
			</Message>;
		}
		else
		{
			registroBanco = <>
				<Table celled fixed singleLine className="tabela">
				<Table.Header>
				  <Table.Row>
					<Table.HeaderCell>Usuário</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
				  </Table.Row>
				</Table.Header>
				<Table.Body>
				{this.state.registros.map((row)=>
				  <Table.Row key={row.id_usuario}>
					<Table.Cell>{row.usuario}</Table.Cell>
					<Table.Cell>{row.email}</Table.Cell>
					</Table.Row>
				)}
				</Table.Body>
			  </Table>
			 
			  </>;
		}
		return(
			<>
				<div className="conteudo-corpo">
				<Navegacao fundo={'none'}/>
				<br/>
					<div className="geral">
					<br/>
						<div className="titulo">
								<h2>Cadastro de Usuários</h2>
						</div>
						<form className="form">
							<br/>
							<Row className="mb-3">
								<Col>
									<label>Usuário:</label>
									<input name='nomeValue' placeholder="user name" type='text' />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col>
									<label>Email:</label>
									<input name='emailValue' placeholder="example@mail.com" type='text' />
								</Col>
								<Col>
									<label>Senha:</label>
									<input name='senhaValue' placeholder="*********" type='password' />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col>
									<label>Pessoa:</label>
									<input name='pessoaValue' placeholder="Pessoa cadastrada" type='text' />
								</Col>
							</Row>
							<br/>
							<Row align="center">
								<Col>
									<Button animated type="button" className="botao" >
									  <Button.Content visible>Novo</Button.Content>
									  <Button.Content hidden>
										<Icon name='add' />
									  </Button.Content>
									</Button>
									<Button animated className="botao" type="button" onClick={()=>this.cadastrar()}>
									  <Button.Content visible>Cadastrar</Button.Content>
									  <Button.Content hidden>
										<Icon name='arrow right' />
									  </Button.Content>
									</Button>
									<Button animated className="botao" type="button">
									  <Button.Content visible>Alterar</Button.Content>
									  <Button.Content hidden>
										<Icon name='pencil' />
									  </Button.Content>
									</Button>
									 <Popup content='Deletar registro' trigger={
										 <Button animated className="botao" type="button">
										  <Button.Content visible>Deletar</Button.Content>
										  <Button.Content hidden>
											<Icon name='trash alternate' />
										  </Button.Content>
										</Button>
										 
									 }/>
								</Col>
							</Row>
							<br/>
							{registroBanco}
						</form>
						
					</div>
					<br/>
				</div>
			</>
		)
	}
}