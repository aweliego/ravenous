import React from 'react';
import './Business.css';

// The purpose of the <Business /> component is to represent how a business (a restaurant) in Ravenous will be formatted and styled.

class Business extends React.Component {
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <a href={this.props.business.site} target="_blank">
            <img src={this.props.business.imageSrc} alt="" />
          </a>
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${this.props.business.latitude}%2C${this.props.business.longitude}`}
            target="_blank"
          >
            <div className="Business-address">
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>
                {`${this.props.business.state} ${this.props.business.zipCode}`}
              </p>
            </div>
          </a>
          <div className="Business-reviews">
            <h3>{this.props.business.category.toUpperCase()}</h3>
            <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
            <p>{`${this.props.business.reviewCount} reviews`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
