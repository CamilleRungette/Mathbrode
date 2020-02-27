import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar2'
import Footer from './Footer'
import {Card, Form, Row, Col, Button, Modal} from 'react-bootstrap'
import ip from './ip'

const titre={
  fontWeight:"bold"
}

let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Open Sans"
}

class Profil extends Component{
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    this.uploadPhoto = this.uploadPhoto.bind(this)
    this.updatePhoto = this.updatePhoto.bind(this)
    this.state={
      loading: "",
      id:this.props.userSigned._id,
      first_name: this.props.userSigned.first_name ,
      last_name: this.props.userSigned.last_name,
      email: this.props.userSigned.email,
      address: this.props.userSigned.address,
      zipcode: this.props.userSigned.zip_code,
      city: this.props.userSigned.city,
      details: this.props.userSigned.details,
      photo: this.props.userSigned.photo,
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

  async uploadPhoto(e){
    const files = e.target.files
    const data= new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'camille')
    this.setState({loading: true})
    const res = await fetch('https://api.cloudinary.com/v1_1/dduugb9jy/image/upload', {
        method: 'POST',
        body: data
      })
    const file = await res.json()
    
    this.setState({photo: file.secure_url})
    this.setState({loading: false})
  }

  updatePhoto(){
    let ctx = this;
    fetch(`${ip}/users/update-photo`,{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `id=${this.state.id}&photo=${this.state.photo}`
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      ctx.setState({photo: data.photo, loading: ""})
    })
  }



  render(){
    console.log("USER", this.state.photo)
    if (this.props.connected === false || this.props.connected === null){
      return <Redirect to="/" />
    }

    return(
      <div>
        <div style={{fontFamily:"Open Sans"}}>
          <Navbar/>
          <div style={{height:"7em"}}></div>
          <h1 style={{textAlign:"center", marginTop:'0.5emem'}}>Ton Profil</h1>
          <div style={{height:"4em"}}></div>
            <div style={{fontSize:'1.8em', textAlign:'center'}} >Salut {this.props.userSigned.first_name} ! Voilà tes infos:</div>
            <div style={{height:"4em"}}></div>

              <div style={{borderTop:"1px solid #D3D3D3", borderBottom:"1px solid #D3D3D3"}}>
                <div style={{display:'flex', justifyContent:"space-around", minHeight:"45vh", alignItems:"center", width:"70%", margin:"auto"}}>
                  <div>
                    {this.state.photo === "" || this.state.photo === undefined ?(
                      <img src="/logo-bis.png" style={{width:'18em', height:'18em', objectFit:"cover", borderRadius:'50%', marginBottom:'6%'}} />
                      ):(
                        <img src={this.state.photo} style={{width:'18em', height:'18em', objectFit:"cover", borderRadius:'50%', marginBottom:'6%'}} />
                      )}
                    <Form>
                      <Form.Group>
                      <Form.Label style={{marginLeft:"20%",fontSize:'110%', fontWeight:'bold'}}>Choisir une photo</Form.Label><br/>
                    <input type="file"
                    placeholder=""
                    onChange={this.uploadPhoto} 
                    /> 
                    {this.state.loading ? (
                      <h6> Chargement ...</h6>
                    ) : (null)}
                    {this.state.loading === false? (
                      <div>
                        <img src={this.state.photo} alt="Profile" style={{width:"7em", marginTop:'2%', marginRight:"5%"}} />
                        <Button className="btn-warning" style={{color:"white"}} onClick={this.updatePhoto}> Valider </Button>
                      </div>
                    ):(null)}
                    </Form.Group>
                    </Form>
                  </div>
                  <div style={{fontSize:"1.2em"}}>
                    <div> <span style={titre}>Nom:</span> <br/>{this.props.userSigned.first_name} {this.props.userSigned.last_name} </div>
                    <div> <span style={titre}>Adresse e-mail:</span> <br/> {this.props.userSigned.email}</div>
                      <div><span style={titre}>Adresse postale:</span></div>
                      
                    {this.props.userSigned.address}
                    {this.state.zipcode != null?(
                      <div> {this.state.zipcode}, {this.state.city} <br/>
                      {this.state.details} </div>
                     ):(
                      <div></div>
                    )} 
                    <br/>
                      <Button style={{backgroundColor:"#1B263B", border:"none", fontSize:"1.1em"}}  onClick={this.handleShow}>Modifier</Button>
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

                  <Button style={{backgroundColor:"#1B263B", border:"none", fontSize:"1.2em"}} onClick={this.handleSubmitUpdate}>
                    Enregistrer
                </Button>
                </Form>
  
                </Modal.Body>
         </div>
       </Modal>

            </div>
            <div style={{height:"6em"}}></div>

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

