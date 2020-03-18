import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cadastro from '../paginas/cadastro/cadastro';

const Main = () =>(
	<Switch>
		<Route exact path="/" component={Cadastro} />
	</Switch>
)
export default Main;
