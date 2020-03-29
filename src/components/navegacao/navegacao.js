import React ,{ Component} from 'react';
import { Menu, Popup } from 'semantic-ui-react'
import './style.scss';
import {Link} from 'react-router-dom';
import {Navbar, NavDropdown, Nav, FormControl, Button, Form} from 'react-bootstrap';

class Navegacao extends Component{
	state = {}

   
	render(){
		return(
		<>
		<Navbar collapseOnSelect expand="lg" style={{background: this.props.fundo}} className="navegacao">
		  <Navbar.Brand href="/"><Popup content='Home' trigger={<i className="paper plane icon" ></i>}/></Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse  id="responsive-navbar-nav" className="conteudo-nav">
			<Nav  className="mr-auto">
			  <Nav.Link href="/cadastro">Cadastro</Nav.Link>
			  <Nav.Link eventKey={2} href="/">Opções</Nav.Link>
			  <Nav.Link eventKey={2} href="/">Entrar</Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Navbar>
  
  </>
		)
	}
}
export default Navegacao;