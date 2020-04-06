import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import { Button, Table, Message, Popup, Pagination, Icon} from 'semantic-ui-react';
import * as Scroll from 'react-scroll';
import './style.scss';
import {Col, Row} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import api from '../../api';


export default class Cadastro extends Component{
	constructor(props){
		super(props);
		
		//refs
		this.refNome  = React.createRef();
		this.refEmail  = React.createRef();
		this.refSobre = React.createRef();
		this.refTelefone = React.createRef();
		this.refNascimento = React.createRef();
	}
	
	state = {
		nomeValue: '',
		emailValue: '',
		sobreValue: '',
		telefoneValue: '',
		valores: [],
		nascimentoValue: '',
		registros: [],
		paginas: 0,
		pagina_atual: 1,
		idSelecionado: ''
	}  
	
	componentDidMount = async() => {
		const resp = await api.get('/pessoas?page=0&limit=5');
		let d = (resp.data.pessoas);
		this.setState({paginas: resp.data.total_paginas});
		const registros = [];
		
		d.map((row)=>{
				registros.push({
					id_pessoa: row.id_pessoa,
					nome: row.nome,
					email: row.email,
					telefone: row.telefone,
					nascimento: row.nascimento, 
					sobre: row.sobre
				})
		});
			
		this.setState({registros: registros})	
	}
	
	selecionaRegistro = async (id) =>{
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		const resp = await api.get(`/pessoas/${id}`);
		let d = (resp.data.pessoa);
		
		this.setState({
			nomeValue: d.nome, 
			emailValue: d.email, 
			telefoneValue: d.telefone, 
			nascimentoValue: d.nascimento, 
			sobreValue: d.sobre
			});
	}
	
	cadastrar = async () => {
		if(this.state.idSelecionado !== '')
		{
			alert('Esse registro já existe no banco!');
		}
		else
		{
			const {nomeValue, emailValue, telefoneValue, nascimentoValue, sobreValue} = this.state;
			if(nomeValue === ''){
				this.refNome.current.focus();
				alert('Preencha o nome');
			}
			else
			{
				let enviar = { nome: nomeValue, email: emailValue, telefone:telefoneValue, sobre:sobreValue, nascimento:nascimentoValue};
				const resp = await api.post(`/pessoas`, enviar);
				alert(resp.data.mensagem);
				document.location.reload();  
			}
		}
	}
  
    inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 
	
	handlePaginationChange = async (e, { activePage }) => {
		let pagina = (activePage - 1);
		this.setState({pagina_atual: activePage});
		
		const resp = await api.get(`/pessoas?page=${pagina}&limit=5`);
		let d = (resp.data.pessoas);
		this.setState({registros: d})
		
	}
	
	alterar = async () => {
		if(this.state.idSelecionado === '')
		{
			alert('selecione um registro!');
		}
		else
		{
			const id = this.state.idSelecionado;
			let enviar = { id_pessoa: id, nome: this.refNome.current.value, email: this.refEmail.current.value, telefone:this.refTelefone.current.value, sobre:this.refSobre.current.value, nascimento:this.refNascimento.current.value};
			const resp = await api.patch(`/pessoas/${id}`, enviar);
			alert(resp.data.mensagem);
			document.location.reload();	
        }
	}
	
	deletar = async () => {
		if(this.state.idSelecionado === '')
		{
			alert('selecione um registro!');
		}
		else
		{
			const id = this.state.idSelecionado;
			const resp = await api.delete(`/pessoas/${id}`);
			alert(resp.data.mensagem);
			document.location.reload();
		}
	}
	
	novo = () => {
		return <Route patch="/cadastro"/>;
	}
	
	render(){
		const { nomeValue, sobreValue, emailValue, telefoneValue, nascimentoValue} = this.state;   
		let paginas = (this.state.paginas);
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
			registroBanco = 
			<>
				<Table celled fixed singleLine className="tabela">
					<Table.Header>
					  <Table.Row>
						<Table.HeaderCell>Nome</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
						<Table.HeaderCell>Nascimento</Table.HeaderCell>
					  </Table.Row>
					</Table.Header>
				<Table.Body>
					{this.state.registros.map((row)=>
					  <Table.Row key={row.id_pessoa} onClick={()=>this.selecionaRegistro(row.id_pessoa)} style={{background: row.id_pessoa === this.state.idSelecionado && '#76002c30'}}>
						<Table.Cell>{row.nome}</Table.Cell>
						<Table.Cell>{row.email}</Table.Cell>
						<Table.Cell>{row.nascimento}</Table.Cell>
					  </Table.Row>
					)}
				</Table.Body>
			  </Table>
			  <br/>
				
			  <Pagination className="paginacao" boundaryRange={0} ellipsisItem={null} firstItem={null} lastItem={null}	activePage ={this.state.pagina_atual}
						  siblingRange={1} totalPages={paginas} onPageChange={this.handlePaginationChange}/>
						  
			</>;
		}
		
		
		return(
		<>
			<div className="conteudo-corpo">
			<Navegacao fundo={'none'}/>
			<br/>
			
			<div className="geral">
				<div className="titulo">
					<h2>Cadastro de pessoas</h2>
				</div>
				
			   <form className="form">
				 <br/>
				 
					<Row className="mb-3">
						<Col>
							<label>Nome</label>
							<input onChange={this.inputChange} name='nomeValue' ref={this.refNome} type='text' value={nomeValue}/>
						</Col>
					</Row>
					
					<Row className="mb-3">
						<Col>
							<label>Email</label>
							<input onChange={this.inputChange} name='emailValue' ref={this.refEmail} type='email' value={emailValue}/>
						</Col>
					</Row>
					
					<Row className="mb-3">
						<Col>
							<label>Sobre</label>
							<textarea ref={this.refSobre} onChange={this.inputChange} name='sobreValue' value={sobreValue} placeholder='Tell us more about you...' />
						</Col>
					</Row>
					
					<Row className="mb-3">
						<Col sm>
							<label>Telefone</label>
							<input ref={this.refTelefone} value={telefoneValue} onChange={this.inputChange} name='telefoneValue' />
						</Col>
						<Col sm>
							<label>Nascimento</label>
							<input ref={this.refNascimento} value={nascimentoValue} onChange={this.inputChange} name='nascimentoValue' />
						</Col>
					</Row>
					
					<br/>
					<Row align="center">
						<Col>
						<Button animated className="botao" type="button" onClick={() =>this.novo()}>
						  <Button.Content visible>Novo</Button.Content>
						  <Button.Content hidden>
							<Icon name='add' />
						  </Button.Content>
						</Button>
						
						<Button animated className="botao" type="button" onClick={() => this.cadastrar()}>
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