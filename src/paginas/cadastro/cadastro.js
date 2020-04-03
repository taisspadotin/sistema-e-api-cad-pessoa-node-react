import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import { Button, Table, Message, Popup, Pagination, Icon} from 'semantic-ui-react';
import axios, {serviceUrl, onSuccess,onFailure} from 'axios';
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
	componentDidMount() {
		
		axios.defaults.baseURL = 'http://localhost:3020/pessoas?page=0&limit=5';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data.pessoas);
			this.setState({paginas: resp.data.total_paginas});
			const registros = [];
			let id_pessoa, nome, email, nascimento, telefone, sobre;
			d.map((row)=>{
				id_pessoa = row.id_pessoa;
				nome = row.nome === undefined? '':  row.nome;
				email = row.email === undefined? '':  row.email;
				telefone = row.telefone === undefined? '':  row.telefone;
				nascimento = row.nascimento === undefined? '':  row.nascimento;
				sobre = row.sobre === undefined? '':  row.sobre;
				
				registros.push({
					id_pessoa,
					nome,
					email,
					telefone,
					nascimento, 
					sobre
				});}
			);
			
			this.setState({registros: registros})//paginas: resp.data.paginas
			//console.log(resp.data);
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	selecionaRegistro = async (id) =>{
		/*mudar a cor da tr*/
		
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		const url = 'http://localhost:3020/pessoas/'+id;
		const resp = await axios.get(url);
		let d = (resp.data.pessoa);
		
		let nomeValue = d.nome;
		let emailValue = d.email === undefined? '':  d.email;
		let telefoneValue = d.telefone === undefined? '':  d.telefone;
		let nascimentoValue = d.nascimento === undefined? '':  d.nascimento;
		let sobreValue = d.sobre === undefined? '':  d.sobre;
			
		this.setState({nomeValue, emailValue, telefoneValue, nascimentoValue, sobreValue});
		//console.log(resp);
	}
	 cadastrar = async () =>{
		 //const history = useHistory();
		if(this.state.idSelecionado !== ''){
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
				const resp = await axios.post('http://localhost:3020/pessoas', enviar);
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
	handlePaginationChange = (e, { activePage }) => {
		let pagina = (activePage - 1);
		console.log(pagina);
		this.setState({pagina_atual: activePage});
		axios.defaults.baseURL = 'http://localhost:3020/pessoas?page='+pagina+'&limit=5';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data.pessoas);
			this.setState({registros: d})
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	
	alterar = async () =>{
		
		if(this.state.idSelecionado === ''){
			alert('selecione um registro!');
		}
		else{
			const id = this.state.idSelecionado;
			let enviar = { id_pessoa: id, nome: this.refNome.current.value, email: this.refEmail.current.value, telefone:this.refTelefone.current.value, sobre:this.refSobre.current.value, nascimento:this.refNascimento.current.value};
			const resp = await axios.put('http://localhost:3020/pessoas', enviar);
			alert(resp.data.mensagem);
			document.location.reload();
			//const response = await api.put('/pessoas', enviar);
		
        }
	}
	
	deletar = async () =>{
		if(this.state.idSelecionado === ''){
			alert('selecione um registro!');
		}
		else{
			const id = this.state.idSelecionado;
			const resp = await axios.delete(`http://localhost:3020/pessoas/${id}`);
			alert(resp.data.mensagem);
			document.location.reload();
			
		}
	}
	novo = () =>{
		return <Route patch="/cadastro"/>;
	}
	render(){
		const { nomeValue, sobreValue, emailValue, telefoneValue, nascimentoValue} = this.state;   
		let paginas = (this.state.paginas);
		let registroBanco = '';
		//console.log(this.state.registros.length);
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
					<Table.HeaderCell>Nome</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Nascimento</Table.HeaderCell>
				  </Table.Row>
				</Table.Header>
				<Table.Body>
				{this.state.registros.map((row)=>
				  <Table.Row key={row.id_pessoa} onClick={()=>this.selecionaRegistro(row.id_pessoa)}>
					<Table.Cell>{row.nome}</Table.Cell>
					<Table.Cell>{row.email}</Table.Cell>
					<Table.Cell>{row.nascimento}</Table.Cell>
				  </Table.Row>
				)}
				</Table.Body>
			  </Table>
			  <br/>
				<Pagination className="paginacao" 
							boundaryRange={0}
							ellipsisItem={null}
							firstItem={null}
							lastItem={null}
							activePage ={this.state.pagina_atual}
							siblingRange={1}
							totalPages={paginas}
							 onPageChange={this.handlePaginationChange}
						  />
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
				 {/*<fieldset>
				 <legend>Informações</legend>*/}
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
					{/*</fieldset>*/}
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