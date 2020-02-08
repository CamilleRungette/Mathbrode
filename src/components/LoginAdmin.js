import React, { useState } from 'react';
import {Card, Button,   Col, Row, Table, Form} from 'react-bootstrap';
import '../App.css';
import Navbar from './dashboardComponents/NavbarAdmin';
import {Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import ip from './ip'


class LoginAdmin extends React.Component{
    constructor(){
super();
this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this)
this.state = {
      SignInEmail:'',
      SignInPassword:'',
      isAdminExist: false,
    }
}


    handleSubmitSignIn(){
      let ctx = this;     
    fetch(`${ip}/admins/sign-in`,{
    method:"POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${this.state.SignInEmail}&password=${this.state.SignInPassword}`
    })
    .then(function(response, err){
      return response.json();
    }).then(data=>{
        if (data.isAdminExists === true ){
          console.log("c'est vrai")
          ctx.setState({isAdminExist: true});
        }
      ctx.props.onSiginClick(data.adminExists, this.state.isAdminExist)
    });
  }

      render(){
        if (this.state.isAdminExist === true || this.props.adminConnected == true){
          console.log("CONDITION:", this.state.isAdminExist)
          return < Redirect to="/dashboard" />
        }
        
        return(
          <div>
          <Navbar></Navbar>
            <div class="container" style={{marginTop:'5em', fontFamily:"Raleway"}}>
            <Row style={{justifyContent:"space-around"}}>
            <Col lg={5} md={8}>
              <h3 style={{marginBottom:"2em", textAlign:'center'}}>Se connecter</h3>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e)=> this.setState({SignInEmail: e.target.value})}
                    value={this.state.SignInEmail} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" onChange={(e)=> this.setState({SignInPassword: e.target.value})} 
                    value={this.state.SignInPassword} />
                  </Form.Group>
                </Form>
                  <Button style={{backgroundColor:"#1B263B", border:"none"}} variant="secondary" onClick={this.handleSubmitSignIn}>
                    Se Connecter
                  </Button>
            </Col>

            </Row>
            </div>
          </div>
        )}
}

function mapStatetoProps(state){
  console.log("======>", state)
  return {adminConnected: state.admin.isAdminExist}
}


function mapDispatchToProps(dispatch){
  return{
    onSiginClick: function(data, isAdminExist){
      dispatch({type: 'adminSignin', adminSigned: data, isAdminExist })
    }
  }
}

export default connect (
  mapStatetoProps,
  mapDispatchToProps
)(LoginAdmin)