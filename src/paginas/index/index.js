import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import './style.scss';
import {Row, Col} from 'react-bootstrap';
import {Accordion} from 'semantic-ui-react';


class Index extends Component{
	render(){
		return(
		<>
		<div className="imagem-nav">
			<Navegacao fundo={'none'}/>
			<br/>
			<div className="conteudo-meio">
				<h1>Cadastros</h1>
				<p>Site feito em React com back-end em node para cadastro de pessoas.
				<br/>Navegue pelo site para descobrir todas as opções disponíveis, saiba quais são nossos objetivos.</p>
			</div>
		</div>	
		<div className='index2'>
			<Row align="center">
				<Col sm={3}>
					<h4>ops I did it again</h4>
					
				</Col>
				<Col sm={9}>
					<p>I think I did it again
I made you believe we're more than just friends
Oh baby
It might seem like a crush
But it doesn't mean that I'm serious
'Cause to lose all my senses
That is just so typically me
Oh baby, baby
Oops, I did it again
I played with your heart, got lost in the game
Oh baby, baby
Oops, you think I'm in love
That I'm sent from above
I'm not that innocent
You see my problem is this
I'm dreaming away</p>
				</Col>
			</Row>
		
		</div>
		</>
		)

	}
}
export default Index;