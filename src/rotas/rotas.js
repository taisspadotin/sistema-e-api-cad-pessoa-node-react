import React, {Component} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import Cadastro from '../paginas/cadastro/cadastro';
import Index from '../paginas/index/index';
import Login from '../paginas/login/login';
import Usuario from '../paginas/usuario/usuario';
import { isAuthenticated } from "../services/auth";

/*const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Route path="/cadastro" component={Cadastro} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);
*/

class Main extends Component{
	render(){
		let rotasPrivada = '';
		if(isAuthenticated()){
			rotasPrivada = 
			<>
				<Route path="/cadastro" component={Cadastro} />
				<Route path="/usuario" component={Usuario}/>
			</>;
		}else{
			rotasPrivada = <Redirect to="/login"/>;
		}
		
		return(
		<Switch>
			<Route exact path="/" component={Index} />
			<Route path="/login" component={Login}/>
			{rotasPrivada}
			<Route path="*" component={() => <h1>Page not found</h1>} />
		</Switch>
	)
	}
}
export default Main;
