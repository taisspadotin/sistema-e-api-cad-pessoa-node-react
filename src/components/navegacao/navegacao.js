import React ,{ Component} from 'react';
import { Popup } from 'semantic-ui-react'
import './style.scss';
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navegacao extends Component{
	state = {}

   
	render(){
		return(
		<>
		<Navbar collapseOnSelect expand="lg" style={{background: this.props.fundo}} className="navegacao">
		  <LinkContainer to="/"><Navbar.Brand><Popup content='Home' trigger={<i className="paper plane icon" ></i>}/></Navbar.Brand></LinkContainer>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse  id="responsive-navbar-nav" className="conteudo-nav">
			<Nav  className="mr-auto">
			  <LinkContainer to="/cadastro"><Nav.Link>Cadastro</Nav.Link></LinkContainer>
			  <LinkContainer to="/usuario"><Nav.Link>Usuários</Nav.Link></LinkContainer>
			  <LinkContainer to="/login"><Nav.Link>Entrar</Nav.Link></LinkContainer>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
  
  </>
		)
	}
}
export default Navegacao;