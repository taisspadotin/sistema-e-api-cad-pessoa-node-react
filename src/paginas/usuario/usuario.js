import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import {Col, Row} from 'react-bootstrap';
import { Button, Icon, Popup, Message, Table, Pagination} from 'semantic-ui-react';
import * as Scroll from 'react-scroll';
import api from '../../api';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

export default class Usuario extends Component{
	state = {
		registros: [],
		userValue: '',
		personValue: '',
		passwordValue: '',
		emailValue: '',
		idSelecionado: '',
		dataSource: [],
		pagina_atual: 1,
		paginas: 0
	};
	
	componentDidMount = async () => {
		const resp = await api.get('/usuarios?page=0&limit=5')
		
		let d = (resp.data.usuarios);
		this.setState({paginas: resp.data.total_paginas});
		this.setState({registros: d});
		
	}
	
	handlePaginationChange = async (e, { activePage }) => {
		let pagina = (activePage - 1);
		this.setState({pagina_atual: activePage});
		const resp = await api.get(`/usuarios?page=${pagina}&limit=5`)
		
		let d = (resp.data.usuarios);
		this.setState({registros: d});
	}
	
	cadastrar = async () => {
		if(this.state.userValue === '')
		{
			alert('Preencha o nome');
		}
		else
		{
			const enviar = {
				usuario: this.state.userValue,
				email: this.state.emailValue,
				senha: this.state.passwordValue
			};
			
			const resp = await api.post('/usuarios/cadastro', enviar);
			alert(resp.data.mensagem);	
		}
	}
	
	selecionaRegistro = async ( id, th) =>{
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		const resp = await api.get('/usuarios/'+id);
		let d = (resp.data.usuario);
		
		this.setState({
				userValue:d.usuario, 
				emailValue:d.email
			});
	}
	
	alterar = async () =>{
		let id = this.state.idSelecionado;
		if(this.state.idSelecionado === "")
		{
			alert("Nenhum usuario selecionado!");
		}
		else
		{
			const enviar = {
					usuario: this.state.userValue,
					email: this.state.emailValue,
					senha: this.state.passwordValue
				};
			const resp = await api.patch(`/usuarios/${id}`, enviar);
			alert(resp.data.mensagem);
			document.location.reload();
		}
	}
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 
	
	onSearch = async (searchText) => {
	const resp = await api.get(`/pessoas/auto_pessoa?nome_pessoa=${searchText}`);
	const pessoas_buscadas = (resp.data.pessoas);
	
	const array_busca = [];
	
	pessoas_buscadas.map((row)=>{ array_busca.push(row.nome); });
	
    if(searchText !== '')
	{
		this.setState({
				dataSource: array_busca,
			});
	}
	else
	{
		this.setState({
				dataSource: '',
			});
	}
	
  }
  
    deletar = async() =>{
	   const id = this.state.idSelecionado;
	   if(id === '')
	   {
		   alert('Seleciona um registro!');
	   }
	   else
	   {
		   const resp = await api.delete(`/usuarios/${id}`);
	   }
    }
  
	render(){
		let paginas = (this.state.paginas);
		let registroBanco = '';
		const {userValue, personValue, emailValue, passwordValue, dataSource} = this.state;
	    
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
			registroBanco = 
			<>
			    <Table celled fixed singleLine className="tabela">
					<Table.Header>
					  <Table.Row>
						<Table.HeaderCell>Usuário</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
					  </Table.Row>
					</Table.Header>
				<Table.Body>
					{this.state.registros.map((row)=>
						<Table.Row key={row.id_usuario} onClick={this.selecionaRegistro.bind(this, row.id_usuario)} style={{background: row.id_usuario === this.state.idSelecionado && '#76002c30'}}>
							<Table.Cell>{row.usuario}</Table.Cell>
							<Table.Cell>{row.email}</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			  </Table>
			  
			  <br/>
			  <Pagination className="paginacao" boundaryRange={0} ellipsisItem={null} firstItem={null} lastItem={null}
							activePage ={this.state.pagina_atual} siblingRange={1} totalPages={paginas} onPageChange={this.handlePaginationChange} />
			  
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
										<input name='userValue' onChange={this.inputChange} value={userValue} placeholder="user name" type='text' />
									</Col>
								</Row>
								
								<Row className="mb-3">
									<Col>
										<label>Email:</label>
										<input name='emailValue' onChange={this.inputChange} value={emailValue} placeholder="example@mail.com" type='text' />
									</Col>
									<Col>
										<label>Senha:</label>
										<input name='passwordValue' onChange={this.inputChange} value={passwordValue} placeholder="*********" type='password' />
									</Col>
								</Row>
								
								<Row className="mb-3">
									<Col>
										<label>Pessoa:</label>
										<br/>	
										<AutoComplete dataSource={dataSource} style={{ width: '100%' }} onSelect={onSelect}
										  onSearch={this.onSearch} className='ac-input' placeholder="input here"/>
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
										
										<Button animated className="botao" type="button" onClick={()=>this.alterar()}>
										  <Button.Content visible>Alterar</Button.Content>
										  <Button.Content hidden>
											<Icon name='pencil' />
										  </Button.Content>
										</Button>
										
										<Popup content='Deletar registro' trigger={
											 <Button animated className="botao" type="button" onClick={()=>this.deletar()}>
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