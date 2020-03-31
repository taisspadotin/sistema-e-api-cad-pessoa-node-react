import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cadastro from '../paginas/cadastro/cadastro';
import Index from '../paginas/index/index';
import Login from '../paginas/login/login';

const Main = () =>(
	<Switch>
		<Route exact path="/" component={Index} />
		<Route path="/cadastro" component={Cadastro} />
		<Route path="/login" component={Login}/>
	</Switch>
)
export default Main;
