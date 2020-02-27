import React from 'react';
import {connect} from 'react-redux';
import { Button,  Navbar, NavbarBrand,  Nav,  NavItem,  NavLink, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHome, faShoppingCart, faCalendarAlt, faCut, faUser, faBoxOpen, faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import '../App.css'

class Navigbar2 extends React.Component{
  constructor(props){
    super(props);
    this.LogOut = this.LogOut.bind(this) 
    this.toggle = this.toggle.bind(this)
    this.state={
      redirect: false,
      dropdownOpen: false,
    }
   }

  LogOut(){
    this.props.onLogOutClick(this.props.connected) 
  }
  
  toggle(){
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
   
  render(){
    return(
      <div className="row topnav" style={{marginLeft:"0px",marginRight:"0px"}}>


    <Navbar expand="md" light style={{fontFamily:"Roboto", width: "95%", height:"12*5em" , display:"flex", justifyContent:"space-between", margin:"auto",padding:"0"}}>
            <NavbarBrand>
              <Link to="/"><img src="/logo-bis.png" alt="logo" style={{width:"6.4em", marginTop:"3%"}} /> </Link>
            </NavbarBrand>

      <div class="ml-auto burger-menu" >
        <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}  style={{marginRight:'3em'}} >
        <DropdownToggle style={{backgroundColor:"transparent", color:"grey", border:"transparent"}} >
          <FontAwesomeIcon className={"fa-4x"} icon={faBars} />
        </DropdownToggle>
        <DropdownMenu >
          <Link to="/shop" style={{fontSize:'1.2em'}}><DropdownItem>Boutique</DropdownItem></Link> 
          <Link to="/events" style={{fontSize:'1.2em'}}> <DropdownItem >Événements</DropdownItem></Link>
          <Link to="/classes" ><DropdownItem style={{fontSize:'1.2em'}}>Ateliers</DropdownItem></Link>
          {this.props.connected ? (
            <span> 
          <Link to="/profil" style={{fontSize:'1.2em'}}><DropdownItem>Mon profil</DropdownItem></Link>
          <Link to="/myorders" style={{fontSize:'1.2em'}}><DropdownItem>Mes commandes</DropdownItem></Link>
          <Link to="/basket" style={{fontSize:'1.2em'}}><DropdownItem >Panier</DropdownItem></Link>
          <Link to="/"><Button color="secondary" style={{marginLeft:'1em', fontSize:"1.2em"}} id="dropHover" onClick={this.LogOut}>Se Déconnecter</Button></Link>
          </span>
          ):(
            <Link to="/login" className="login-button"> <Button color="secondary "style={{marginLeft:'1em', fontSize:"1.1em"}}> Mon compte</Button></Link>
          )}
        </DropdownMenu>
      </Dropdown>
      </div>
    
        <div xs="10" class="menu" >
            <Nav navbar style={{fontSize:"1.4em"}}> 

            {this.props.connected ? (
              <div></div>
            ):(
                <NavItem>
                  <Link class="navb-link" to="/"><NavLink><FontAwesomeIcon icon={faHome}/> Accueil</NavLink> </Link>
                </NavItem>
            )}

                <NavItem>
                  <Link class="navb-link" to="/shop"> <NavLink><FontAwesomeIcon icon={faShoppingCart}/> Boutique</NavLink></Link>
                </NavItem>

                <NavItem>
                <Link class="navb-link" to ="/classes"><NavLink><FontAwesomeIcon icon={faCut}/> Ateliers</NavLink></Link>
                </NavItem>

                <NavItem>
                  <Link class="navb-link" to="/events"> <NavLink><FontAwesomeIcon icon={faCalendarAlt}/> Événements</NavLink></Link>
                </NavItem>
                 
                
                {this.props.connected ? (
                <NavItem>
                  <Link class="navb-link" to ="/profil" > <NavLink><FontAwesomeIcon icon={faUser}/> Mon profil</NavLink> </Link>
                </NavItem>
                ):(
                  <div></div>
                )}
             

                {this.props.connected ? (
                <NavItem>
                  <Link class="navb-link" to ="/myorders" > <NavLink><FontAwesomeIcon icon={faBoxOpen}/> Mes commandes</NavLink> </Link>
                </NavItem>
                ):(
                  <div></div>
                )}


                <NavItem>
                {this.props.connected ? (
            
                <NavItem>
                  <Link class="navb-link" to ="/basket" > <NavLink><FontAwesomeIcon icon={faShoppingBasket}/> Panier</NavLink> </Link>
                </NavItem>
                ):(
                  <div></div>
                )}
                </NavItem>
                

                <NavItem>
                {this.props.connected ? (
                  <div>
                  <Link to="/"><Button color="secondary" style={{fontSize:"1em"}} onClick={this.LogOut}>Se Déconnecter</Button></Link>
                  </div>
                ):(
                  <Link className="login-button" to="/login"><Button color="secondary" style={{fontSize:"1em"}}> Mon compte </Button></Link>
                )}
                </NavItem>

            </Nav>
        </div>
    </Navbar>
</div>

        )}
}

function mapDispacthToProps(dispatch){
  return{
    onLogOutClick: function(data){
      dispatch({type: 'logout', connected: data})
    }
  }
}

function mapStatetoProps(state){
  return  {user: state.user.userSigned, connected: state.user.isUserExist}
}


export default connect(
  mapStatetoProps,
  mapDispacthToProps
)(Navigbar2);