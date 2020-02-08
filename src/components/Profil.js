import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import {Card, Form, Row, Col, Button, Modal} from 'react-bootstrap'
import ip from './ip'

const titre={
  fontWeight:"bold"
}

let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Raleway"
}

class Profil extends Component{
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    this.state={
      id:this.props.userSigned._id,
      first_name: this.props.userSigned.first_name ,
      last_name: this.props.userSigned.last_name,
      email: this.props.userSigned.email,
      address: this.props.userSigned.address,
      zipcode: this.props.userSigned.zip_code,
      city: this.props.userSigned.city,
      details: this.props.userSigned.details,
      show: false,
    }
  }


  handleShow(){
    this.setState({show:true})
  }
  
  handleClose(){
    this.setState({show: false})
  }

  handleSubmitUpdate(){
    let ctx = this;
    this.setState({show: false})
    fetch(`${ip}/users/update-info`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `id=${this.state.id}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&email=${this.state.email}&address=${this.state.address}&zipcode=${this.state.zipcode}&city=${this.state.city}&details=${this.state.details}`
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data)
      ctx.setState({
      first_name: data.thisUser.first_name ,
      last_name: data.thisUser.last_name,
      email: data.thisUser.email,
      address: data.thisUser.address,
      zipcode: data.thisUser.zip_code,
      city: data.thisUser.city,
      details: data.thisUser.details
      })
    })
  }


  render(){
    console.log("USER", this.props.connected)
    if (this.props.connected === false || this.props.connected === null){
      return <Redirect to="/" />
    }

    return(
      <div>
        <div style={{fontFamily:"Raleway"}}>
          <Navbar/>
          <div >
          <div style={{height:"8em"}}></div>
          <Card className="col-xl-5 col-sm-8  col-xs-11 mx-auto"  style={{marginTop:"8em"}}>
          <h2 style={{textAlign:"center", fontSize:"3em", marginTop:'1em'}}>Ton Profil</h2>
          <div style={{height:"1em"}}></div>
            <div>
              <div style={{fontSize:'1.8em', textAlign:'center'}} >Salut {this.props.userSigned.first_name} !</div>
              <div style={{marginTop: "3em"}}>
                <div className="col-8 border" style={{margin:"auto", padding:"2em"}}>
                  <h4 style={{textAlign:"center"}} >Voilà tes infos :</h4>
                  <div style={{fontSize:"1.2em"}}>
                    <div> <span style={titre}>Nom:</span> {this.props.userSigned.first_name} {this.props.userSigned.last_name} </div>
                    <div> <span style={titre}>Adresse e-mail:</span> {this.props.userSigned.email}</div>
                      <div><span style={titre}>Adresse postale:</span></div>
                      
                     {this.props.userSigned.address}
                     {this.state.zipcode != null?(
                       <div>{this.state.zipcode}, {this.state.city} <br/>
                       {this.state.details} </div>
                     ):(
                      <div></div>
                     )}
                     <br/>
                     <div style={{textAlign:"center"}}>
                      <Button style={{backgroundColor:"#1B263B", border:"none"}}  onClick={this.handleShow}>Modifier</Button>
                    </div>
               </div>
                 </div>
              </div>


              <Modal show={this.state.show} onHide={this.handleClose} className="col-lg-10" >
         <div style={modalStyle}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier mes informations</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Form >
                  <Form.Group >
                    <Row>
                      <Col>
                    <Form.Label>Prénom </Form.Label>
                    <Form.Control type="text" onChange={(e)=> this.setState({first_name: e.target.value})}
                    value={this.state.first_name} />
                    </Col>
                    <Col>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" onChange={(e)=> this.setState({ last_name: e.target.value})}
                    value={this.state.last_name} />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e)=> this.setState({email: e.target.value})}
                    value={this.state.email} />
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Col sm={6}>
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" onChange={(e)=> this.setState({address: e.target.value})}  />
                      </Col>
                      <Col sm={6}>
                        <Form.Label>Bâtiment, étage ...</Form.Label>
                        <Form.Control type="text" onChange={(e)=> this.setState({details: e.target.value})}  />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group >
                    <Row>
                      <Col>
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control type="text" onChange={(e)=> this.setState({zipcode: e.target.value})} />
                  </Col>
                  <Col>
                    <Form.Label>Ville</Form.Label>
                    <Form.Control type="text" onChange={(e)=> this.setState({city: e.target.value})} />
                    </Col>
                    </Row>
                  </Form.Group>

                  <Button style={{backgroundColor:"#1B263B", border:"none"}} onClick={this.handleSubmitUpdate}>
                    Enregistrer
                </Button>
                </Form>
  
                </Modal.Body>
         </div>
       </Modal>

            </div>
            <div style={{height:"6em"}}></div>
            </Card>
            </div>
            <div style={{height:"8em"}}></div>
          <Footer/>
        </div>     
      </div>
    )
  }
}

function mapStatetoProps(state){
  return  {connected: state.user.isUserExist,
          userSigned: state.user.userSigned,
        }
}

export default connect(
  mapStatetoProps,
  null
  )(Profil);

