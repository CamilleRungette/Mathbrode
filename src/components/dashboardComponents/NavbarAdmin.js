import React from 'react';
import {Button, Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


class Navigbar extends React.Component{
  constructor(props){
    super(props);
    this.LogOut = this.LogOut.bind(this) 
   }

  LogOut(){
    this.props.onLogOutClick(this.props.connected) 
  }

    render(){
      if (this.props.adminConnected === false || this.props.adminConnected === undefined){
        return (
          <div>
              <Navbar className="px-5" light style={{fontFamily:"Raleway", width: "100%", height:"12*5em" , display:"flex", justifyContent:"space-between", margin:"auto", backgroundColor:'rgba(255, 255, 255, 0)', borderBottom:"1px solid #d3d3d3"}}>
                  <div style={{textAlign:"right"}}>
                      <NavbarBrand>
                      <Link to="/" ><img src="/logo-bis.png" alt="logo" style={{width:"5.3em"}} /> </Link>
                      </NavbarBrand>
                  </div>

                  <div xs="10">
                      <Nav navbar>
                        <Link to="/loginadmin" >  <Button color="secondary" style={{fontSize:'1.3em'}}>Se Connecter</Button> </Link>
                      </Nav>
                  </div>
              </Navbar>
          </div>
        )
      }

        return(

<div style={{marginLeft:"0px",marginRight:"0px"}}>

    <Navbar  expand="md" className="px-5 navb-link" style={{fontFamily:"Raleway", backgroundColor:'rgba(255, 255, 255, 0)', width: "100%", height:"12*5em" , display:"flex", justifyContent:"space-between", margin:"auto"}}s>
        <div style={{textAlign:"right"}}>
            <NavbarBrand>
            <Link to="/" ><img src="/logo-bis.png" alt="logo" style={{width:"5.3em"}} /> </Link>
            </NavbarBrand>
        </div>

        <div xs="10">
            <Nav navbar style={{fontSize:"1.3em"}}>
                <NavItem>
                  <Link to="/dashboard" class="navigbar nav-link">Accueil</Link>
                </NavItem>
                <NavItem>
                  <Link to="/orderTracking" class="navigbar nav-link">Commandes et suivi</Link>
                </NavItem>
                <NavItem>
                  <Link to="/messaging" class="navigbar nav-link">Messagerie</Link>
                </NavItem>
                <NavItem>
                  <Link to="/stock" class="navigbar nav-link">Liste du stock</Link>
                </NavItem>
                <NavItem>
                  <Link to="/services" class="navigbar nav-link">Ateliers & Évenements</Link>
                </NavItem>
                <Link to="/loginadmin"><Button color="secondary" style={{fontSize:'1em'}} onClick={this.LogOut}>Se déconnecter</Button> </Link>
            </Nav>
        </div>
    </Navbar>

</div>

        )}
}

function mapDispacthToProps(dispatch){
  return{
    onLogOutClick: function(data){
      dispatch({type: 'adminLogout', connected: data})
    }
  }
}


function mapStatetoProps(state){
  console.log("======>", state)
  return {adminConnected: state.admin.isAdminExist}
}


export default connect(
  mapStatetoProps,
  mapDispacthToProps
  )(Navigbar)