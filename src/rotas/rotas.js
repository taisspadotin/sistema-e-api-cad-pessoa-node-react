import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cadastro from '../paginas/cadastro/cadastro';
import Index from '../paginas/index/index';

const Main = () =>(
	<Switch>
		<Route exact path="/" component={Index} />
		<Route path="/cadastro" component={Cadastro} />
	</Switch>
)
export default Main;
