import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import { Button, Table, Message, Popup, Pagination, Icon} from 'semantic-ui-react';
import axios, {serviceUrl, onSuccess,onFailure} from 'axios';
import * as Scroll from 'react-scroll';
import './style.scss';
import {Col, Row} from 'react-bootstrap';
import {Route} from 'react-router-dom';



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
		
		///axios.defaults.baseURL = 'http://localhost:3001/cadastro?page=0&limit=5';
		axios.defaults.baseURL = 'http://localhost:3020/pessoas';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data.pessoas);
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
	selecionaRegistro = (id) =>{
		/*mudar a cor da tr*/
		
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		//colocar os valores nos campos:
		//axios.defaults.baseURL = 'http://localhost:3001/cadastro?id='+id;
		axios.defaults.baseURL = 'http://localhost:3020/pessoas/'+id;
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data.pessoa);
			
			let nomeValue = d.nome;
			let emailValue = d.email === undefined? '':  d.email;
			let telefoneValue = d.telefone === undefined? '':  d.telefone;
			let nascimentoValue = d.nascimento === undefined? '':  d.nascimento;
			let sobreValue = d.sobre === undefined? '':  d.sobre;
			
			this.setState({nomeValue, emailValue, telefoneValue, nascimentoValue, sobreValue});
			
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	cadastrar = () =>{
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

				/*fetch('http://127.0.0.1:3333/pessoas', {
					method: 'post',
					body: JSON.stringify(enviar)
				  }).then(function(response) {
					if(response.status === 201){
						alert('cadastro realizado com sucesso');
						document.location.reload();
					}
					else{
						alert('erro');
					}
					
				  });*/
				  
				  

				  /*axios.post(`http://localhost:3001/cadastro`, (enviar))
			.then(resp =>{
				alert(resp.data.message);
				document.location.reload();*/
				
		axios.post('http://localhost:3020/pessoas', enviar)
  .then(function(response){
    alert('sim');
	//return <Route patch="/cadastro"/>;
	//history.push('/cadastro');
  }); 
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
		this.setState({pagina_atual: activePage});
		axios.defaults.baseURL = 'http://localhost:3020/pessoas?page='+activePage+'&limit=5';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			//let d = (resp.data._Array);
			let d = (resp.data.response);
			//console.log((resp.data.response));
			//let d = resp.data;
			//console.log(resp.data);
			this.setState({registros: d, paginas: resp.data.paginas})
			//console.log(resp.data);
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	
	alterar = () =>{
		if(this.state.idSelecionado === ''){
			alert('selecione um registro!');
		}
		else{
			const id = this.state.idSelecionado;
			let enviar = { id_pessoa: id, nome: this.refNome.current.value, email: this.refEmail.current.value, telefone:this.refTelefone.current.value, sobre:this.refSobre.current.value, nascimento:this.refNascimento.current.value};

			/*fetch('http://localhost:3020/pessoas', {
				method: 'post',
				body: JSON.stringify(enviar)
			  }).then(function(response) {
				if(response.status === 201){
					alert('dados alterados com sucesso');
					document.location.reload();
				}
				
			  });*/
			/*  axios.patch('http://localhost:3020/pessoas', enviar)
  .then(function(response){
    alert('sim');
  }); */
  
  axios.patch('http://localhost:3020/pessoas', enviar)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
		}
	}
	
	deletar = () =>{
		if(this.state.idSelecionado === ''){
			alert('selecione um registro!');
		}
		else{
			const id = this.state.idSelecionado;
			axios.delete(`http://localhost:3020/pessoas/${id}`)
			.then(resp =>{
				alert(resp.data.mensagem);
				document.location.reload();
			});
		}
	}
	novo = () =>{
		return <Route patch="/cadastro"/>;
	}
	render(){
		const { nomeValue, aboutValue, emailValue, telefoneValue, nascimentoValue} = this.state;   
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
							<textarea ref={this.refSobre} onChange={this.inputChange} name='aboutValue' value={aboutValue} placeholder='Tell us more about you...' />
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
						<Button animated className="botao" >
						  <Button.Content visible>Novo</Button.Content>
						  <Button.Content hidden onClick={() =>this.novo()}>
							<Icon name='add' />
						  </Button.Content>
						</Button>
						<Button animated className="botao" >
						  <Button.Content visible>Cadastrar</Button.Content>
						  <Button.Content hidden onClick={() => this.cadastrar()}>
							<Icon name='arrow right' />
						  </Button.Content>
						</Button>
						<Button animated className="botao" >
						  <Button.Content visible>Alterar</Button.Content>
						  <Button.Content hidden  onClick={()=>this.alterar()}>
							<Icon name='pencil' />
						  </Button.Content>
						</Button>
						 <Popup content='Deletar registro' trigger={
							 <Button animated className="botao" >
							  <Button.Content visible>Deletar</Button.Content>
							  <Button.Content hidden onClick={()=>this.deletar()}>
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