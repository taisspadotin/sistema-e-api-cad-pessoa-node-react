import React,{Component} from 'react';
import './style-login.scss';

class Login extends Component{
	login = () =>{
		window.location.href = "/";
	}
	render(){
		return(
			<>
				<div className="login">
					<div className="login-1"></div>
					<div className="login-2">
						<div className="login-content" align="center">	
							<h1>ACCONT LOGIN</h1>
							<input className="input-login" placeholder="User"/>
							<input className="input-login" placeholder="Password"/>
							<br/>
							<button className="botao-login" onClick={()=>this.login()}>SING IN</button>
							<br/>
							<p>Forgot <a href="/">User name / password </a>?</p>
							<br/>
							<h5>SING UP</h5>
						</div>	
						
					</div>
				</div>
				
			</>
		)
	}
}
export default Login;