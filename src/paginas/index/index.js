import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import './style.scss';
import {Row, Col} from 'react-bootstrap';
/*import {Accordion} from 'semantic-ui-react';*/


class Index extends Component{
	render(){
		return(
		<>
		<div className="imagem-nav">
			<Navegacao fundo={'none'}/>
			<br/>
			<div className="conteudo-meio">
				<h1>Cadastros</h1> 
				<hr className="hr-inicio"/>
				<p>Site feito em React com back-end em node para cadastro de pessoas.
				<br/>Navegue pelo site para descobrir todas as opções disponíveis, saiba quais são nossos objetivos.</p>
			</div>
		</div>	
		<div className='index2'>
			<Row align="center">
				<Col sm={3}>
					<h4>Varius sit amet mattis</h4>
					
				</Col>
				<Col sm={9}>
					<p>
					Velit euismod in pellentesque massa. A erat nam at lectus urna duis. Quam id leo in vitae turpis massa sed elementum tempus. Iaculis nunc sed augue lacus viverra vitae congue. Sed libero enim sed faucibus turpis in eu mi. Facilisi morbi tempus iaculis urna id volutpat lacus. Amet justo donec enim diam vulputate ut. Id semper risus in hendrerit. Diam vulputate ut pharetra sit. Consectetur lorem donec massa sapien faucibus. Justo nec ultrices dui sapien eget mi.
					</p>
				</Col>
			</Row>
		
		</div>
		</>
		)

	}
}
export default Index;