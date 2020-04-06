import React,{Component} from 'react';
import './style-login.scss';
import axios from 'axios';
import { realizaLogin, logout } from "../../services/auth";

class Login extends Component{
	
	login = async () =>{
		const enviar = {
			email: this.state.emailValue,
			senha: this.state.senhaValue
		};
		if(enviar.email === ''){
			alert('Preencha o email');
		}
		else if(enviar.senha === ''){
			alert('Preencha a senha');
		}
		else{
			
			const resp = await axios.post('http://localhost:3020/usuarios/login', enviar);
			//verificar se a pessoa logou
			if(resp.data.codigo === 1){
				alert(resp.data.mensagem);
				//salvar no localstorage o token
				//localStorage.setItem('token', resp.data.token);
				realizaLogin(resp.data.token);
				window.location.href = "/";
			}
			else{
				alert('DADOS INCORRETOSS');
				//console.log(resp);
			}
			
		}
		
	}
	state = {
		emailValue: '',
		senhaValue: ''
	};
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 
	logout_sistema = () => {
		logout();
	}
	render(){
		const {emailValue, senhaValue} = this.state;
		return(
			<>
				<div className="login">
					<div className="login-1"></div>
					<div className="login-2">
						<div className="login-content" align="center">	
							<h1>ACCONT LOGIN</h1>
							<input className="input-login" type="text" onChange={this.inputChange} name='emailValue' value={emailValue} placeholder="User"/>
							<input className="input-login" type="password" placeholder="Password" onChange={this.inputChange} name="senhaValue" value={senhaValue}/>
							<br/>
							<button className="botao-login" type="button" onClick={()=>this.login()}>SING IN</button>
							<br/>
							<p>Forgot <a href="/">User name / password </a>?</p>
							<br/>
							<h5 onClick={()=>this.logout_sistema()}>SING OUT</h5>
						</div>	
						
					</div>
				</div>
				
			</>
		)
	}
}
export default Login;