import React, {Component} from 'react';
import {CardElement} from 'react-stripe-elements';
import Navbar from './Navbar'
import Footer from './Footer'
import {Button} from 'reactstrap'
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import ip from './ip'

let stripeStyle={
  hidePostalCode:true,
  base: {
    fontSize:'1.1em'
  }
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false, redirect: false};
    this.orderSubmit = this.orderSubmit.bind(this);
    this.persoOrderSubmit = this.persoOrderSubmit.bind(this);
    this.RedirectMethod = this.RedirectMethod.bind(this)
  }

  async orderSubmit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)
    let response = await fetch(`${ip}/charge`, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
  
    if (response.ok){

     this.setState({complete: true});
     
    
       let items = JSON.stringify(this.props.item);
       fetch(`${ip}/users/order`,{
         method: 'POST',
         headers: {'Content-Type':'application/x-www-form-urlencoded'},
         body: `user_id=${this.props.user._id}&total=${this.props.total.total}&items=${items}&name=${this.props.user.first_name}&email=${this.props.user.email}&in_person=${this.props.total.in_person}`
       },
       this.props.onResetClick()
       )
    }
  }

  async persoOrderSubmit(ev){
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)
    let response = await fetch(`${ip}/charge`, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
    if (response.ok){

      this.setState({complete: true});

      fetch(`${ip}/users/perso-order`,{
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`order=${this.props.persoOrder._id}`
      })
    }
  }



  RedirectMethod() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    console.log("CONNECTION USER:", this.props.persoOrder)
    if (this.props.connected == false || this.props.connected == null){
      return <Redirect to="/" />
    } else if (this.state.complete){
      this.RedirectMethod()
      return(
        <div style={{fontFamily:'Raleway'}}>
          <Navbar />
          <div style={{height:'75vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <h1> Commande validée ! </h1>
            <p>Vous allez être redirigé dans quelque secondes ... </p>
            {this.state.redirect === true? (<Redirect to='/'/>):(false ) }  
          </div>
          <Footer/>
      </div>
      )
      }

    return (
      <div style={{fontFamily:'Raleway'}}>
        <Navbar/>
          <div style={{height:"85vh"}}>
            <div style={{height:'10em'}}></div>
            <h1 style={{textAlign:'center', fontSize:'3.5em'}}>Paiement</h1>
            <div style={{height:'8em'}}></div>
              <div className="border col-xl-6 col-lg-8 col-sm-10 col-xs-11" style={{margin:'auto', padding:'2em', fontSize:'1.2em', display:'flex', flexDirection:"column"}}>
                <h3 style={{textAlign:"center"}}>Montant de la commande:  {this.props.total.total? (this.props.total.total):(this.props.persoOrder.total) } €</h3> <br/>
                <div style={{width:"80%", margin:"auto"}}>
                  <h5 style={{marginBottom:"0.4em"}}>Récapitulatif:</h5>
                  {this.props.persoOrder === undefined?(
                     <div>
                     {this.props.item.map((item, i) => (
                        <div className="border" style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingRight:'1em'}}>
                        <img src={item.photo} style={{width:"6em"}} />
                          <p> {item.name}</p>
                          <p> {item.price} €</p>
                        </div>
                      ))}
                      {this.props.total.in_person? (
                        <p>Remise en main propre</p>
                      ):(
                        <div></div>
                      )}
                    </div>
                  ):(
                    <div>
                        <div className="border" style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingRight:'1em'}}>
                          {this.props.persoOrder.photo?(
                            <img src={this.props.persoOrder.photo} style={{width:"6em", marginLeft:'2px'}} />
                          ):(
                            <div></div>
                          )}
                          <div style={{display:"flex", flexDirection:"column"}}>
                          <p> {this.props.persoOrder.description}</p>
                          <p> {this.props.persoOrder.total} €</p>
                          </div>
                        </div>
                        {this.props.persoOrder.in_person?(
                          <p>Remise en main propre</p>
                        ):(
                          <div></div>
                        )}

                    </div>
                  )}
                 
                </div>
                <br/>
                  <div style={{width:"60%", margin:'auto', marginBottom:'1em' }}>
                    <CardElement style={stripeStyle} />
                  </div> <br/>
                  <div style={{textAlign:"center"}}>
                    {this.props.persoOrder === undefined ?(
                      <Button onClick={this.orderSubmit} style={{backgroundColor:"#1b263b"}} >Payer</Button>
                    ):(
                      <Button onClick={this.persoOrderSubmit} style={{backgroundColor:"#1b263b"}} >Payer</Button>
                    )}
                  </div>
              </div>
          </div>
          <div style={{height:'8em'}}></div>
        <Footer />
      </div>
    );
  }
}

function mapStatetoProps(state){
  console.log("STATETETETE", state)
  return  {connected: state.user.isUserExist,
          user: state.user.userSigned,
          item: state.item,
          total: state.total,
          persoOrder: state.total.persoOrder
         }
}


function mapDispatchToProps(dispatch){
  console.log("DELETE FROM BASKET", dispatch)
  return {
    onResetClick: function(){
      console.log("SENDING CALL TO RESET METHOD")
      dispatch({type: 'reset', })
    }
  }
}


export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CheckoutForm);

