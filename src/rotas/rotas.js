import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cadastro from '../paginas/cadastro/cadastro';
import Index from '../paginas/index/index';
import Login from '../paginas/login/login';
import Usuario from '../paginas/usuario/usuario';

const Main = () =>(
	<Switch>
		<Route exact path="/" component={Index} />
		<Route path="/cadastro" component={Cadastro} />
		<Route path="/login" component={Login}/>
		<Route path="/usuario" component={Usuario}/>
	</Switch>
)
export default Main;
