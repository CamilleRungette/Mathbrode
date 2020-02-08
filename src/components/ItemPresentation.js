import React  from 'react';
import {  Button} from 'reactstrap';
import '../App.css'
import { Col, Row, Form, FormGroup, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'
import {connect} from 'react-redux'
import ip from './ip'

class ItemPresentation extends React.Component {
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this)
    this.state={
      name: '',
      desc: '',
      copy:'',
      photo: '',
      price: '',
      shipping_fee: '',
      size:'',
      userName: '',
      userEmail: '',
      content: '',
      item_id: '',
      item:[],
        }
    console.log("PROPS", this.props.match.params.id)  
  }

  componentDidMount(){
    let ctx = this
  fetch(`${ip}/find-items?name=${this.props.match.params.id}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data){
        ctx.setState({
          name: data.thisItem.name,
          desc: data.thisItem.description,
          copy: data.thisItem.copy,
          photo: data.thisItem.photo,
          price: data.thisItem.price,
          shipping_fee: data.thisItem.shipping_fee,
          size: data.thisItem.size,
          item_id: data.thisItem._id,
          item: data.thisItem
        })
      })
    }

    sendMessage(){
      if (this.props.user == null){
      fetch(`${ip}/users/create-message`,{
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `object=${this.props.match.params.id}&content=${this.state.content}&sender_email=${this.state.userEmail}&sender_name=${this.state.userName}&item_id=${this.state.item_id}`
      })} else if (this.props.user != null){
        fetch(`${ip}/users/create-message`,{
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `object=${this.props.match.params.id}&content=${this.state.content}&sender_email=${this.props.user.email}&sender_name=${this.props.user.first_name}&item_id=${this.state.item_id}&user_id=${this.props.user._id}`
      })
    }
  }

    render() {
   return(
<div>
  <Navbar/>
    <div className="row justify-content-center" style={{fontFamily:"Raleway"}}>
      <div className="col-lg-10" >
      <div style={{height:"10em"}}></div>
        <div>
          <p style={{textAlign:"center", fontSize:"4em"}}>{this.state.name}</p>
        </div>

        <div className="row col-lx-6 col-lg-9 col-xs-11 border" style={{margin:"auto", fontSize:'1.1em'}} >
        <div class="hover mb-3">
          <div class="zoom ">
            <img src={this.state.photo} className=" col-lg-8" style={{height:"40em", objectFit:"contain", margin:"auto"}} alt="Alt text" />
          </div>
        </div>
          <div className="col-sm-11 col-md-10" style={{margin:"auto"}}>
              <Row> 
                <Col lg={8} style={{maxWidth:'28em', margin:'auto'}}>          
                  <p style={{display:"flex", alignItems:"center", fontSize:"1em",marginBottom: "2rem", height:"8em"}}>{this.state.desc}</p>
                </Col>
                <Col lg={4} style={{minWidth:'10em', maxWidth:'15em', margin:"auto"}}>
                  <p style={{ fontSize:"1.2em",marginBottom: "2rem",padding:"0.5rem" ,backgroundColor:"#1b263b",color:"white"}}>Info Pratiques :<br/>
                  Prix: {this.state.price}€<br/>
                  Exemplaire: {this.state.copy}<br/>
                  Taille: {this.state.size}
                  </p>
                </Col>
            </Row>          
              <div className="d-flex justify-content-center my-4" >
              <Link to="/items"><Button color="secondary" style={{marginRight:"2em", fontSize:'1.2em'}}> Retour </Button></Link>
                {this.props.user == null ? (
                  <Link to="/login" ><Button style={{backgroundColor:"#1b263b", fontSize:'1.2em'}}>Ajouter au panier</Button></Link>
                ):(
                  <Button onClick={() => this.props.onBuyClick(this.state.item)} style={{backgroundColor:"#1b263b", fontSize:'1.2em'}}>Ajouter au panier</Button>
                )}
              </div>
          </div>
        </div>

            <div className="text-block-black-small">
              <p>Une Question?</p>
            </div>
            <Form className="col-lg-9 mx-auto">
              <Row form>
                <Col lg={6}>
                  <FormGroup>
                    {this.props.user == null ?(
                      <Input type="text" placeholder="Nom" onChange={(e)=> this.setState({userName: e.target.value})}
                      value={this.state.userName}/>
                    ):(
                      <Input type="text" placeholder="Nom" value={this.props.user.first_name}/>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    {this.props.user == null ?(
                      <Input type="Email" placeholder="Email" onChange={(e)=> this.setState({userEmail: e.target.value})}
                      value={this.state.userEmail} />
                    ):(
                      <Input type="email" placeholder="Email" value={this.props.user.email} />
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Input type="textarea" rows="4" name="Message" placeholder="Message"  onChange={(e)=> this.setState({content: e.target.value})}
                value={this.state.content} />
              </FormGroup>
              <div className="d-flex justify-content-center" >
                <Link to="/"><Button  style={{backgroundColor:"#1b263b"}} onClick={this.sendMessage}>Envoyer</Button> </Link> 
              </div>
            <div style={{height:"5em"}}></div>
            </Form>
      </div>
    </div>
  <Footer/>
</div>
)}
}

function mapStatetoProps(state){
  console.log(state)
  return  {user: state.user.userSigned}
}

function mapDispatchToProps(dispatch){
  return{
    onBuyClick: function(data){
      console.log("info envoyée au reducer", data)
      dispatch({type: 'carted', item: data})
    }
  }
}


export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ItemPresentation);
