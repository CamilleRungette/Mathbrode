import React from 'react';
import {Card,   Col, Table, ListGroupItem} from 'react-bootstrap';
import NavbarAdmin from './NavbarAdmin';
import FooterAdmin from './footerAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import DateFormat from '../function';
import {Modal, Form, Button, ListGroup, Row} from 'react-bootstrap'
import '../../App.css';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import ip from '../ip'


let modalStyle={
  width:"50em",
  backgroundColor: "white",
  fontFamily: "Raleway"
}


class tracking extends React.Component{
  constructor(){
    super();
    this.handleClose = this.handleClose.bind(this)
    this.handlePersoClose = this.handlePersoClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handlePersoShow = this.handlePersoShow.bind(this)
    this.checkOrderSent = this.checkOrderSent.bind(this); 
    this.orderSent = this.orderSent.bind(this) 
    this.persoOrderSent = this.persoOrderSent.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.handleCreateShow = this.handleCreateShow.bind(this)
    this.handleCreateClose = this.handleCreateClose.bind(this)
    this.persoOrderCreate = this.persoOrderCreate.bind(this)
    this.state={
      orders:[],
      show: false,
      items: [],
      order: [],
      user: [],
      sent: '',
      createShow:false,
      persoShow: false,
      persoOrderUser :'',
      persoOrderTotal: '',
      persoOrderInPerson: false,
      persoOrderPhoto: '',
      persoOrderShippingFee: '',
      persoOrderDesc: '',
      loading: false,
      persoOrders: [],
    }
  }

  handleClose(){
    this.setState({show: false})
  }

   
  handleShow(order){
    this.setState({show:true})
    let ctx = this;
    fetch(`${ip}/admins/order?id=${order._id}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({items: data.items, order: data.thisOrder, user: data.thisUser})
      console.log("THE STATE ===========>", ctx.state.items)
    })
    .catch(function(error) {
      console.log('Request failed ->', error)
    });
  }
  
  checkOrderSent(){
    this.setState({sent: !this.state.sent})
  }
  
  orderSent(order){
    let ctx = this;
    this.setState({show: false})
    console.log(this.state.show)
    if (this.state.sent === true){
      fetch(`${ip}/admins/update-order`,{
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `order=${order}`
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data){
        console.log(data)
        ctx.setState({orders: data.allOrders})
        console.log("THE STATE QUE JE CHERCHE ===========>", ctx.state.orders)
      })
      .catch(function(error) {
        console.log('Request failed ->', error)
      });
      
    }
  }

  handlePersoShow(order){
    this.setState({persoShow: true})
    let ctx = this;
    fetch(`${ip}/admins/perso-order?id=${order._id}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data)
      ctx.setState({order: data.thisOrder, user: data.thisUser})
      console.log("THE STATE ===========>", ctx.state.user)
    })
    .catch(function(error) {
      console.log('Request failed ->', error)
    });
  }
  
  handlePersoClose(){
    this.setState({persoShow: false})
  }
  
  handleCreateShow(){
    this.setState({createShow: true})
  }

  handleCreateClose(){
    this.setState({createShow: false})
  }


  persoOrderCreate(){
    let ctx = this;
    this.setState({createShow: false})
    fetch(`${ip}/admins/create-perso-order`,{
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `user=${this.state.persoOrderUser}&total=${this.state.persoOrderTotal}&shipping_fee=${this.state.persoOrderShippingFee}&in_person=${this.state.persoOrderInPerson}&photo=${this.state.persoOrderPhoto}&description=${this.state.persoOrderDesc}`
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({persoOrders: data.allPersoOrders})
      console.log("========> LES PERSO ORDERS", ctx.state.persoOrders)
    })
    .catch(function(error) {
      console.log('Request failed ->', error)
    });
  }

  persoOrderSent(order){
    let ctx = this;
    this.setState({persoShow: false})
    if (this.state.sent === true){
      fetch(`${ip}/admins/update-perso-order`,{
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `order=${order}`
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data){
        ctx.setState({persoOrders: data.allOrders})
      })
      .catch(function(error) {
        console.log('Request failed ->', error)
      });
      
    }
  }

  async uploadImage(e){
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
    
    this.setState({persoOrderPhoto: file.secure_url})
    this.setState({loading: false})
  }

  componentDidMount(){
    let ctx = this;
    fetch(`${ip}/admins/orders`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      ctx.setState({orders: data.allOrders, 
        persoOrders: data.allPersoOrders})
    })
    .catch(function(error) {
      console.log('Request failed ->', error)
  });
  }

    render(){
      console.log("=======================================>",this.state.orders)
      if (this.props.adminConnected == false || this.props.adminConnected == null){
        return <Redirect to="/loginadmin" />
     }

      return(
  <div style={{fontFamily:"Raleway"}} className="mainBack">
  <NavbarAdmin/>
    
    <div style={{textAlign:'center'}} >
      <Button onClick={this.handleCreateShow} style={{backgroundColor:'#1b263b', border:'#fff', marginTop:'5em', fontSize:'1.2em'}}>Créer une commande</Button>
    </div>

    <Modal show={this.state.createShow} onHide={this.handleCreateClose} className="col-lg-8" >
  <div style={modalStyle}>
    <Modal.Header closeButton>
      <Modal.Title>Créer une commande personnalisée :</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        
      <Form>
            <Form.Group as={Row}>
            <Form.Label column sm={2}>Email client</Form.Label>
            <Col sm={10}>
                <Form.Control type="email" onChange={(e)=> this.setState({persoOrderUser: e.target.value})}
                value={this.state.persoOrderUser} />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
            <Form.Label column sm={2}>Description</Form.Label>
            <Col sm={10}>
                <Form.Control as="textarea" onChange={(e)=> this.setState({persoOrderDesc: e.target.value})}
                value={this.state.persoOrderDesc} />
                </Col>
            </Form.Group>

              <Form.Group as={Row}>
              <Form.Label column sm={2}>Total</Form.Label>
              <Col>
                  <Form.Control type="text" onChange={(e)=> this.setState({persoOrderTotal: e.target.value})}
                  value={this.state.persoOrderTotal} />
                  </Col>
              </Form.Group>

              <Form.Group as={Row}>
              <Form.Label column sm={2}>Frais de port</Form.Label>
              <Col>
                  <Form.Control type="text" onChange={(e)=> this.setState({persoOrderShippingFee: e.target.value})}
                  value={this.state.persoOrderShippingFee} />
                  </Col>

                <Form.Label column sm={2}>Remise en main propre</Form.Label>
              <Col sm={4}>
                  <Form.Check type="checkbox" onClick={() => this.setState({persoOrderInPerson: !this.state.persoOrderInPerson})} />
              </Col> 

              </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPicture">
              <Form.Label column sm={2}>Photo</Form.Label>
                <Col sm={10}>
                <input type="file"
                placeholder=""
                onChange={this.uploadImage} 
                />
                  </Col>  
                {this.state.loading ? (
                  <h6> Chargement ...</h6>
                ) : (
                 <img src={this.state.SendMessagePhoto} alt="item chosen photo" style={{width:"10em", marginLeft:'8em'}} />
                )}
            </Form.Group>
          </Form>

        <Button style={{backgroundColor:"#1B263B", border:"none", marginLeft:'47%', marginTop:'2em'}} variant="secondary" onClick={this.persoOrderCreate}>
          Enregistrer
        </Button>
      </Modal.Body>
  </div>
</Modal>

      <div style={{ height:"100%", paddingTop:"5%"}}>
        <Col style={{margin: "auto"}} lg={9}>
          <Card style={{maxHeight:"80vh", overflow:"auto"}}>
          <Card.Header style={{fontSize:'1.7em',  textAlign:'center'}}>Commandes du site</Card.Header>
            <Card.Body>

              <Table striped>
                <thead>
                  <tr>
                  <th>Date de commande</th>
                  <th>Statut</th>
                  <th>Montant</th>
                  <th>Date de livraison</th>
                  <th>Remise</th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orders.map((order,i) =>(               
                  <tr>                                  
                    <td>{DateFormat(order.date)}</td>
                    {order.sent == false ?(
                      <td> En préparation</td>
                    ):(
                    <td>Envoyée</td>
                    )}
                    <td>{order.total}€</td>
                    <td>{DateFormat(order.shipping_date)}</td>
                    {order.in_person == true?(
                      <td>Main propre</td>
                    ):(
                      <td>Livraison</td>
                    )}
                    {order.sent == true ?
                    (
                      <td><FontAwesomeIcon icon={faCheck} style={{color:"green"}} /> </td>
                      ):(
                        <td> <FontAwesomeIcon style={{color:"red"}} icon={faTimes} /> </td>
                    )}
                    <td onClick={() => this.handleShow(order)}> Détails</td>
                  </tr>
                  ))}
                </tbody>
               </Table>
            </Card.Body>
          </Card>
          </Col>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose} className="col-lg-8" >
                    <div style={modalStyle}>
                      <Modal.Header closeButton>
                        <Modal.Title>Détails de la commande :</Modal.Title>
                      </Modal.Header>
                        <Modal.Body>
                          <Card style={{ width: "90%", margin:"auto" }}>
                            <Card.Body>
                              <Card.Title> <strong>Produits: </strong></Card.Title>
                              <Card.Text>
                                {this.state.items.map((item, i) =>(
                                  <ListGroup.Item> - {item.name} ({item.price}€)</ListGroup.Item>
                                ))}
                              </Card.Text>
                              <Card.Title> <strong>Acheteur: </strong></Card.Title>
                              <Card.Text>
                                  <ListGroup.Item style={{display:"flex", justifyContent:"space-around"}}> 
                                    <div>
                                      {this.state.user.first_name} {this.state.user.last_name}: <br/>
                                      {this.state.user.email} <br/>
                                    </div>
                                    {this.state.order.in_person === false?(
                                   <div>
                                     {this.state.user.address} <br/>
                                     {this.state.user.zip_code}, {this.state.user.city}
                                   </div>
                                   ):(
                                     <div>Remise en main propre</div>
                                   )}
                                  </ListGroup.Item>
                              </Card.Text>
                                
                                <Card.Text>
                                  <ListGroup.Item style={{display:"flex"}}>
                                    {this.state.order.sent === false? (
                                      <Form.Check onClick={() => this.checkOrderSent(this.state.order)} type="checkbox"/>
                                    ): (
                                      <FontAwesomeIcon style={{marginRight:'1em'}} icon={faCheck} />
                                    )}
                                    Commande envoyée 
                                  </ListGroup.Item>
                                </Card.Text>
          
                            </Card.Body>
                          </Card>
                          <Button style={{backgroundColor:"#1B263B", border:"none", marginLeft:'47%', marginTop:'2em'}} variant="secondary" onClick={() => this.orderSent(this.state.order._id)}>
                          Enregistrer
                          </Button>
                        </Modal.Body>
                    </div>
                  </Modal>




      <div style={{ height:"100%", paddingTop:"5%"}}>
        <Col style={{margin: "auto"}} lg={9}>
          <Card style={{maxHeight:"80vh", overflow:"auto"}}>
          <Card.Header style={{fontSize:'1.7em',  textAlign:'center'}}>Commandes personnalisées</Card.Header>
            <Card.Body>

              <Table striped>
                <thead>
                  <tr>
                  <th>Date de commande</th>
                  <th>Statut</th>
                  <th>Montant</th>
                  <th>Date de livraison</th>
                  <th>Remise</th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.persoOrders.map((order,i) =>(               
                  <tr>                                  
                    <td>{DateFormat(order.date)}</td>
                    {order.sent == false ?(
                      <td> En préparation</td>
                    ):(
                    <td>Envoyée</td>
                    )}
                    <td>{order.total}€</td>
                    {order.paid === true?(
                      <td>{DateFormat(order.shipping_date)}</td>
                    ):(
                      <td>A payer</td>
                    )}
                    {order.in_person == true?(
                      <td>Main propre</td>
                    ):(
                      <td>Livraison</td>
                    )}
                    {order.sent == true ?
                    (
                      <td><FontAwesomeIcon icon={faCheck} style={{color:"green"}} /> </td>
                      ):(
                        <td> <FontAwesomeIcon style={{color:"red"}} icon={faTimes} /> </td>
                    )}
                    <td onClick={() => this.handlePersoShow(order)}> Détails</td>
                  </tr>
                  ))}
                </tbody>
               </Table>
            </Card.Body>
          </Card>
          </Col>
          </div>


          <Modal show={this.state.persoShow} onHide={this.handlePersoClose} className="col-lg-8" >
                    <div style={modalStyle}>
                      <Modal.Header closeButton>
                        <Modal.Title>Détails de la commande :</Modal.Title>
                      </Modal.Header>
                        <Modal.Body>
                          <Card style={{ width: "90%", margin:"auto" }}>
                            <Card.Body>
                              <Card.Title> <strong>Description: </strong></Card.Title>
                              <Card.Text>
                                <ListGroupItem>
                                {this.state.order.description}
                                </ListGroupItem>
                              </Card.Text>

                              <Card.Title> <strong>Acheteur: </strong></Card.Title>
                              <Card.Text>
                                 <ListGroupItem style={{display:"flex", justifyContent:"space-around"}}>
                                   <div>
                                    {this.state.user.first_name} {this.state.user.last_name}: <br/>
                                    {this.state.user.email}
                                   </div>
                                   {this.state.order.in_person === false?(
                                   <div>
                                     {this.state.user.address} <br/>
                                     {this.state.user.zip_code}, {this.state.user.city}
                                   </div>
                                   ):(
                                     <div>Remise en main propre</div>
                                   )}
                                 </ListGroupItem>
                              </Card.Text>
                              
                              {this.state.order.photo != "" ? (
                                <div>
                              <Card.Title> <strong>Photo: </strong></Card.Title>
                                <Card.Text>
                                  <ListGroupItem>
                                 <img src={this.state.order.photo} style={{width:"10em"}} />
                                 </ListGroupItem>
                                </Card.Text>
                                </div>
                              ):(
                                <div></div>
                              )}

                                <Card.Text>
                                  <ListGroup.Item style={{display:"flex", marginTop:'1em'}}>
                                    {this.state.order.sent === false? (
                                      <Form.Check onClick={() => this.checkOrderSent(this.state.order)} type="checkbox"/>
                                    ): (
                                      <FontAwesomeIcon style={{marginRight:'1em'}} icon={faCheck} />
                                    )}
                                    Commande envoyée 
                                  </ListGroup.Item>
                                </Card.Text>
          
                            </Card.Body>
                          </Card>
                          <Button style={{backgroundColor:"#1B263B", border:"none", marginLeft:'47%', marginTop:'2em'}} variant="secondary" onClick={() => this.persoOrderSent(this.state.order._id)}>
                            Enregistrer
                          </Button>
                        </Modal.Body>
                    </div>
                  </Modal>



    <div style={{height:"6em"}}></div>


    




   
  <FooterAdmin/>
  </div>
 )}
}


function mapStatetoProps(state){
  console.log("======>", state)
  return {adminConnected: state.admin.isAdminExist}
}


export default connect(
  mapStatetoProps,
  null
  )(tracking);