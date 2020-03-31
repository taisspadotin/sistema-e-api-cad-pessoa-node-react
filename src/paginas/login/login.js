import React,{Component} from 'react';
import './style-login.scss';
import {Link} from 	'react-router-dom';

class Login extends Component{
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
							<Link to="/"><button className="botao-login">SING IN</button></Link>
							<br/>
							<p>Forgot <a>User name / password </a>?</p>
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