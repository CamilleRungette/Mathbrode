import React, {Component} from 'react';
import {injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkout'

var Purchase = injectStripe(CheckoutForm);
    
export default class StripeCheckout extends Component { 

  render () {
    return(
    <StripeProvider apiKey="pk_test_XzsmxxXobCTTVQyEjOjzFz3600AqJATxPX">
        <div className="example">
          <Elements>
            <Purchase />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}