import React from 'react';
import {Link} from 'react-router-dom'



class CreationItem extends React.Component {
  render() {  
  return (
   
    <div className="col-xl-4 col-md-6 col-xs-12 my-3">  
    <Link to={`/item/${this.props.itemName}`}>
      <div className="productTitle mx-auto" style={{ width:"18em", marginBottom:"4em"}}>
        <div className="overlay-image">
            <img className="image" style={{height:"18em", objectFit:"contain"}} src={this.props.itemPhoto} alt={this.props.itemName} />
            <div className="normal">
              <div className="text"></div>
            </div>
            <div className="hover">
              <img className="imageBlur" style={{height:"18em", objectFit:"contain"}} src={this.props.itemPhoto} alt={this.props.itemName} />
            <div className="text">{this.props.itemName}<br/>{this.props.itemSize}</div>
            </div>
        </div>
      </div>
      </Link>
    </div> 
  
  )}
}
export default CreationItem ;