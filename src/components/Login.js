import React from 'react';
import { Button,   Col, Row, Form} from 'react-bootstrap';
import '../App.css';
import Navbar from './Navbar';
import {Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import ip from './ip'


class Login extends React.Component{
    constructor(){
super();
this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this)
this.state = {
     newUserFirstName:'',
     newUserLastName: '',
     newUserEmail: '',
     newUserPassword: '',
      SignInEmail:'',
      SignInPassword:'',
      isUserExist: false,
    }
}

  handleSubmitSignUp(){
    let ctx = this
    fetch(`${ip}/users/sign-up`,{
    method:"POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body:`first_name=${this.state.newUserFirstName}&last_name=${this.state.newUserLastName}&email=${this.state.newUserEmail}&password=${this.state.newUserPassword}`
    })
    .then(function(response, err){
      return response.json();
    }).then(data=>{
      if (data.isUserExists === false ){
        ctx.setState({isUserExist: true});
      }
    ctx.props.onSiginClick(data.user, this.state.isUserExist)
    });
  }


    handleSubmitSignIn(){   
      let ctx = this;     
    fetch(`${ip}/users/sign-in`,{
    method:"POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${this.state.SignInEmail}&password=${this.state.SignInPassword}`
  })
  .then(function(response, err){
    return response.json();
  }).then(data=>{
      if (data.isUserExists === true ){
        ctx.setState({isUserExist: true});
      }
      ctx.props.onSiginClick(data.userExists, this.state.isUserExist)
    });
}

      render(){
        if (this.state.isUserExist === true){
          console.log("CONDITION:", this.state.isUserExist)
          return < Redirect to="/" />
        }
        
        return(
          <div style={{position:"absolute", top: "0px", width:"100%"}}>
          <Navbar/>

            <div class="container" style={{marginTop:'5em', fontFamily:"Raleway"}}>
              <div style={{height:"10em"}}></div>
            <Row style={{justifyContent:"space-around"}}>
            <Col lg={5} xs={11}>
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

            <Col lg={5} xs={11}>              
              <h3 style={{marginBottom:"2em", textAlign:'center'}}>S'inscrire</h3>
                <Form>
                <Form.Group >
                  <Row>
                    <Col>
                  <Form.Label>Prénom </Form.Label>
                  <Form.Control type="text" onChange={(e)=> this.setState({newUserFirstName: e.target.value})}
                  value={this.state.newUserFirstName} />
                  </Col>
                  <Col>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" onChange={(e)=> this.setState({ newUserLastName: e.target.value})}
                  value={this.state.newUserLastName} />
                  </Col>
                  </Row>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={(e)=> this.setState({newUserEmail: e.target.value})}
                  value={this.state.newUserEmail} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control type="password" onChange={(e)=> this.setState({newUserPassword: e.target.value})} 
                  value={this.state.newUserPassword} />
                </Form.Group>
              </Form>
                <Button style={{backgroundColor:"#1B263B", border:"none"}} variant="secondary" onClick={this.handleSubmitSignUp}>
                  S'inscrire
              </Button>
            </Col>
            </Row>
            </div>
          </div>
        )}
}

function mapDispatchToProps(dispatch){
  return{
    onSiginClick: function(data, isUserExist){
      dispatch({type: 'signin', userSigned: data, isUserExist })
    }
  }
}

export default connect (
  null,
  mapDispatchToProps
)(Login)