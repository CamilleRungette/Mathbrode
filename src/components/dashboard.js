import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Col, Form, Row} from 'react-bootstrap';
import '../App.css';
import NavbarAdmin from './dashboardComponents/NavbarAdmin';
import FooterAdmin from './dashboardComponents/footerAdmin'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ip from './ip'


class Dashboard extends Component {
  constructor(props){
  super(props);
  this.ItemSubmit = this.ItemSubmit.bind(this);
  this.EventSubmit = this.EventSubmit.bind(this);
  this.WorkshopSubmit = this.WorkshopSubmit.bind(this);
  this.onDrop = this.onDrop.bind(this);
  this.uploadItemImage = this.uploadItemImage.bind(this);
  this.uploadEventImage = this.uploadEventImage.bind(this);
  this.uploadWorkshopImage = this.uploadWorkshopImage.bind(this)
  this.state = {
          CreateItemName: '',
          CreateItemPrice: '',
          CreateItemSize: '',
          CreateItemDesc: '',
          CreateItemShipFee: '',
          CreateItemPhoto: '',
          CreateItemFirstPres: false,
          CreateEventName: '',
          CreateEventAddress: '',
          CreateEventDate:'',
          CreateEventPhoto:'',
          CreateEventStart: '',
          CreateEventEnd: '',
          CreateEventLink:'',
          loading: '',
          CreateWorkshopTitle: '',
          CreateWorkshopDesc: '',
          CreateWorkshopPrice: '',
          CreateWorkshopDuration: '',
          CreateWorkshopPhoto: '',
          allItems: '',
        }
  }
  
  onDrop(picture) {
    this.setState({
        CreateItemPhoto: this.state.CreateItemPhoto.concat(picture),
    });
  }

  ItemSubmit(){
    let ctx = this
    fetch(`${ip}/admins/create-item`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `name=${this.state.CreateItemName}&price=${this.state.CreateItemPrice}&size=${this.state.CreateItemSize}&description=${this.state.CreateItemDesc}&shipping_fee=${this.state.CreateItemShipFee}&copy=1&photo=${this.state.CreateItemPhoto}&first_presentation=${this.state.CreateItemFirstPres}`
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({
      CreateItemName: '',
      CreateItemPrice: '',
      CreateItemSize: '',
      CreateItemDesc: '',
      CreateItemShipFee: '',
      CreateItemPhoto: '',
      CreateItemFirstPres: false,

})
     console.log("THE STATE ===========>", ctx.state.allItems)
    })
   }

  EventSubmit(){
    let ctx = this
    fetch(`${ip}/admins/create-event`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${this.state.CreateEventName}&address=${this.state.CreateEventAddress}&date=${this.state.CreateEventDate}&starting_time=${this.state.CreateEventStart}&ending_time=${this.state.CreateEventEnd}&photo=${this.state.CreateEventPhoto}&link=${this.state.CreateEventLink}`
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({
        CreateEventName: '',
        CreateEventAddress: '',
        CreateEventDate:'',
        CreateEventPhoto:'',
        CreateEventStart: '',
        CreateEventEnd: '',
        CreateEventLink: '',
      })
    })
  }

  WorkshopSubmit(){
    console.log("hello")
    let ctx = this
    fetch(`${ip}/admins/create-workshop`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `title=${this.state.CreateWorkshopTitle}&desc=${this.state.CreateWorkshopDesc}&price=${this.state.CreateWorkshopPrice}&duration=${this.state.CreateWorkshopDuration}&photo=${this.state.CreateWorkshopPhoto}`
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({
        CreateWorkshopTitle: '',
        CreateWorkshopDesc: '',
        CreateWorkshopPrice: '',
        CreateWorkshopDuration: '',
        CreateWorkshopPhoto: '',
      })
    })
  }

  async uploadItemImage(e){
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
    
    this.setState({CreateItemPhoto: file.secure_url})
    this.setState({loading: false})
  }


  async uploadEventImage(e){
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
    
    this.setState({CreateEventPhoto: file.secure_url})
    this.setState({loading: false})
  }

  async uploadWorkshopImage(e){
    console.log("THE STATE =====>", this.state.loading)
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
    
    this.setState({CreateWorkshopPhoto: file.secure_url})
    this.setState({loading: false})
      console.log(this.state.CreateWorkshopPhoto)
  }


  
    render(){
      if (this.props.adminConnected === false || this.props.adminConnected == null){
         return <Redirect to="/loginadmin" />
      }
      
      return(
<div style={{fontFamily:"Raleway"}}>
       
  


  <div style={{display:"flex", flexDirection:"column" }} className="mainBack" >
  <NavbarAdmin/>
  <div style={{height:"6em"}}></div>

  

    <div style={{maxHeight:"150vh", overflow:"auto"}}>
      <Col lg={{offset:3, span:6 }}>
        <Card>
          <Card.Header style={{fontSize:"1.8em",textAlign:"center"}}>Ajouter un produit</Card.Header>
            <Card.Body>
                        
            <Form>

            <Form.Group as={Row} controlId="formHorizontalPicture">
              <Form.Label  column sm={2}>Photo</Form.Label>
                <Col sm={4}>
                <input type="file"
                placeholder="upload an image"
                onChange={this.uploadItemImage} 
                />
                  
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img src={this.state.CreateItemPhoto} alt=" " style={{width:"10em", marginLeft:'8em'}} />
                )}
                 </Col> 
            
              <Form.Label column sm={2}>Mise en avant</Form.Label>
                <Col sm={4}>
                  {this.state.CreateItemFirstPres === false? (
                    <Form.Check type="checkbox" onClick={() => this.setState({CreateItemFirstPres: !this.state.CreateItemFirstPres})} />
                  ):(
                    <Form.Check type="checkbox" checked onClick={() => this.setState({CreateItemFirstPres: !this.state.CreateItemFirstPres})} />
                  )}
                </Col>  
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
                <Col sm={6}>
                  <Form.Control type="name" placeholder="Nom" onChange={(e)=> this.setState({CreateItemName: e.target.value})}
                        value={this.state.CreateItemName} />
                </Col>  
           
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Prix" onChange={(e)=> this.setState({CreateItemPrice: e.target.value})}
                        value={this.state.CreateItemPrice} />
                </Col>  
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalSize">
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Taile" onChange={(e)=> this.setState({CreateItemSize: e.target.value})}
                        value={this.state.CreateItemSize}/>
                </Col> 


                <Col sm={6}>
                  <Form.Control type="textarea" placeholder="Frais de port" onChange={(e)=> this.setState({CreateItemShipFee: e.target.value})}
                        value={this.state.CreateItemShipFee} />
                </Col>  
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalDesc">
                <Col>
                  <Form.Control as="textarea" placeholder="Description " onChange={(e)=> this.setState({CreateItemDesc: e.target.value})}
                        value={this.state.CreateItemDesc} />
                </Col>  
            </Form.Group>

            <Form.Group style={{textAlign:"center"}} as={Row}>
                <Col sm={{ offset: 1 }}>
                  <Button onClick={this.ItemSubmit} style={{border:"none", backgroundColor:"#1B263B"}}>Valider</Button>
                </Col>
            </Form.Group>
          </Form>

          </Card.Body>
        </Card>
      </Col> 
 


<div style={{height:"12em"}}></div>


<Col lg={{offset:3, span:6 }}>
        <Card>
          <Card.Header style={{fontSize:"1.8em",textAlign:"center"}}>Ajouter un événement</Card.Header>
            <Card.Body>
                        
            <Form>

            <Form.Group as={Row} controlId="formHorizontalPicture">
              <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={10}>
                <input type="file"
                placeholder="upload an image"
                onChange={this.uploadEventImage} 
                />
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img alt=" " src={this.state.CreateEventPhoto} style={{width:"10em"}} />
                )}

                </Col>  
            </Form.Group>

              <Form.Group as={Row}>
                  <Col sm={6}>
                    <Form.Control type="name" placeholder="Nom" onChange={(e)=> this.setState({CreateEventName: e.target.value})}
                          value={this.state.CreateEventName} />
                  </Col>  
            
             
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Lien" onChange={(e)=> this.setState({CreateEventLink: e.target.value})}
                        value={this.state.CreateEventLink}/>
                </Col>  
            </Form.Group>

            <Form.Group as={Row}>
                <Col>
                  <Form.Control type="text" placeholder="Adresse" onChange={(e)=> this.setState({CreateEventAddress: e.target.value})}
                        value={this.state.CreateEventAddress} />
                </Col>  
            </Form.Group>

          

            <Form.Group as={Row} controlId="formHorizontalSize">
                <Col sm={4}>
                  <Form.Control type="date" onChange={(e)=> this.setState({CreateEventDate: e.target.value})}
                        value={this.state.CreateEventDate}/>
                </Col>  
           
                <Col sm={4}>
                  <Form.Control placeholder="Heure de début" type="text" onChange={(e)=> this.setState({CreateEventStart: e.target.value})}
                        value={this.state.CreateEventStart} />
                </Col> 
                <Col sm={4}>
                  <Form.Control placeholder="Heure de fin" type="text" onChange={(e)=> this.setState({CreateEventEnd: e.target.value})}
                        value={this.state.CreateEventEnd} />
                </Col>  
            </Form.Group>

            <Form.Group style={{textAlign:"center"}} as={Row}>
                <Col sm={{ offset: 1 }}>
                  <Button onClick={this.EventSubmit} style={{border:"none", backgroundColor:"#1B263B"}}>Valider</Button>
                </Col>
            </Form.Group>
          </Form>

          </Card.Body>
        </Card>
      </Col> 



      <div style={{height:"12em"}}></div>

 <Col lg={{offset:3, span:6 }}>
        <Card>
          <Card.Header style={{fontSize:"1.8em",textAlign:"center"}}>Ajouter un atelier</Card.Header>
            <Card.Body>
                        
            <Form>
            <Form.Group as={Row} >
                <Col>
                  <Form.Control type="text" placeholder="Titre" onChange={(e)=> this.setState({CreateWorkshopTitle: e.target.value})}
                        value={this.state.CreateWorkshopTitle} />
                </Col>  
            </Form.Group>

            <Form.Group as={Row} >
                <Col>
                  <Form.Control as="textarea" placeholder="Description" onChange={(e)=> this.setState({CreateWorkshopDesc: e.target.value})}
                        value={this.state.CreateWorkshopDesc} />
                </Col>  
            </Form.Group>

            <Form.Group as={Row} >
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Prix" onChange={(e)=> this.setState({CreateWorkshopPrice: e.target.value})}
                        value={this.state.CreateWorkshopPrice} />
                </Col>  
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Durée" onChange={(e)=> this.setState({CreateWorkshopDuration: e.target.value})}
                        value={this.state.CreateWorkshopDuration} />
                </Col>  
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPicture">
              <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={10}>
                <input type="file"
                placeholder="upload an image"
                onChange={this.uploadWorkshopImage} 
                />
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img alt=" " src={this.state.CreateWorkshopPhoto} style={{width:"10em"}} />
                )}

                </Col>  
            </Form.Group>


                <Col style={{textAlign:'center'}}>
                  <Button onClick={this.WorkshopSubmit} style={{border:"none", margin:'auto', backgroundColor:"#1B263B"}}>Valider</Button>
                </Col>
          </Form>

          </Card.Body>
        </Card>
      </Col> 
 
</div>

<div style={{height:"8em"}}></div>



</div>
<FooterAdmin/>

</div>
      )
    
  }
}

function mapStatetoProps(state){
  return {adminConnected: state.admin.isAdminExist}
}


export default connect(
  mapStatetoProps,
  null
  )(Dashboard);
