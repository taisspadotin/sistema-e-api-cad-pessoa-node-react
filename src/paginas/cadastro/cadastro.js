import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import { Button, Checkbox, Form, Table, Message, Divider, Header, Popup, Pagination} from 'semantic-ui-react';
import axios, {serviceUrl, onSuccess,onFailure} from 'axios';
import * as Scroll from 'react-scroll';
import './style.scss';
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
		axios.defaults.baseURL = 'http://localhost:3001/cadastro?page=0&limit=5';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data._Array);
			this.setState({registros: d, paginas: resp.data.paginas})
			//console.log(resp.data);
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	selecionaRegistro = (id) =>{
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		//colocar os valores nos campos:
		axios.defaults.baseURL = 'http://localhost:3001/cadastro?id='+id;
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			//let d = (resp.data._Array);
			//this.setState({registros: d, paginas: resp.data.paginas})
			//console.log(resp.data);
			
			/*this.refNome.current.value = resp.data[0].nome;
			this.refEmail.current.value = resp.data[0].email;
			this.refTelefone.current.value = resp.data[0].telefone;
			this.refNascimento.current.value = resp.data[0].nascimento;
			this.refSobre.current.value = resp.data[0].sobre;*/
			this.setState({nomeValue: resp.data[0].nome, emailValue:resp.data[0].email, telefoneValue:resp.data[0].telefone, nascimentoValue:resp.data[0].nascimento, sobreValue:resp.data[0].sobre});
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	cadastrar = () =>{
		const {nomeValue, emailValue, telefoneValue, nascimentoValue, sobreValue} = this.state;
		if(nomeValue === ''){
			this.refNome.current.focus();
			alert('Preencha o nome');
		}
		else
		{	
			let enviar = { nome: nomeValue, email: emailValue, telefone:telefoneValue, sobre:sobreValue};

			fetch('http://localhost:3001/cadastro', {
				method: 'post',
				body: JSON.stringify(enviar)
			  }).then(function(response) {
				if(response.status === 201){
					alert('cadastro realizado com sucesso');
					document.location.reload();
				}
				
			  });
			  /*axios.post(`http://localhost:3001/cadastro`, (enviar))
		.then(resp =>{
			alert(resp.data.message);
			document.location.reload();*/
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
		axios.defaults.baseURL = 'http://localhost:3001/cadastro?page='+activePage+'&limit=5';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		.then(resp => {
			let d = (resp.data._Array);
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
			let enviar = { id: id, nome: this.refNome.current.value, email: this.refEmail.current.value, telefone:this.refTelefone.current.value, sobre:this.refSobre.current.value};

			fetch('http://localhost:3001/cadastro', {
				method: 'post',
				body: JSON.stringify(enviar)
			  }).then(function(response) {
				if(response.status === 201){
					alert('dados alterados com sucesso');
					document.location.reload();
				}
				
			  });
		}
	}
	
	deletar = () =>{
		if(this.state.idSelecionado === ''){
			alert('selecione um registro!');
		}
		else{
			const id = this.state.idSelecionado;
			axios.delete(`http://localhost:3001/cadastro`, {params: {id: id}})
			.then(resp =>{
				alert(resp.data.message);
				document.location.reload();
			});
		}
	}
	render(){
		const { nomeValue, aboutValue, emailValue, telefoneValue, nascimentoValue} = this.state;   
		
		let registroBanco = '';
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
			  <Table.Row key={row._id} onClick={()=>this.selecionaRegistro(row._id)}>
			    <Table.Cell>{row.nome}</Table.Cell>
				<Table.Cell>{row.email}</Table.Cell>
				<Table.Cell>{row.nascimento}</Table.Cell>
			  </Table.Row>
			)}
			</Table.Body>
		  </Table>
		  <br/>
		    
		  </>;
		let paginas = (this.state.paginas);
		
		return(
		<>
			<Navegacao ativo="cadastro"/>
			<div className="geral">
				 <Form>
					<Form.Field>
					  <label>Nome</label>
					  <input onChange={this.inputChange} name='nomeValue' ref={this.refNome} type='text' value={nomeValue}/>
					  
					</Form.Field>
					<Form.Field>
					  <label>Email</label>
					  <input onChange={this.inputChange} name='emailValue' ref={this.refEmail} type='email' value={emailValue}/>
					</Form.Field>
					<Form.Field>
						<label>Sobre</label>
						<textarea ref={this.refSobre} onChange={this.inputChange} name='aboutValue' value={aboutValue} placeholder='Tell us more about you...' />
						
					</Form.Field>
					<Form.Group widths='equal'>
						<Form.Field>
							<label>Telefone</label>
							<input ref={this.refTelefone} value={telefoneValue} onChange={this.inputChange} name='telefoneValue' />
						</Form.Field>
						<Form.Field>
							<label>Nascimento</label>
							<input ref={this.refNascimento} value={nascimentoValue} onChange={this.inputChange} name='nascimentoValue' />
						</Form.Field>
						
					</Form.Group>
					<br/>
					<Form.Field align="center">
						<Button onClick={() =>document.location.reload()}>
						  Limpar
						</Button>
						<Button onClick={() => this.cadastrar()}>
						  Cadastrar
						</Button>
						<Button onClick={()=>this.alterar()}>
						  Alterar
						</Button>
						<Button onClick={()=>this.deletar()}>
						  Deletar
						</Button>
					</Form.Field>
					<br/>
					{registroBanco}
					<Pagination style={{width: '200px', position: 'relative'}}
							boundaryRange={0}
							ellipsisItem={null}
							firstItem={null}
							lastItem={null}
							activePage ={this.state.pagina_atual}
							siblingRange={1}
							totalPages={paginas}
							 onPageChange={this.handlePaginationChange}
						  />
			   </Form>
			   
			</div>
		</>	
		)
	}
}