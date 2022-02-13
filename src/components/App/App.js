import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [] };
    this.searchYelp = this.searchYelp.bind(this);
    this.autocomplete = this.autocomplete.bind(this);
  }
  // Let's Go button functionality
  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
      console.log(this.state.businesses[0]);
    });
  }

  autocomplete(text) {
    Yelp.autocomplete(text);
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar
          searchYelp={this.searchYelp}
          autocomplete={this.autocomplete}
        />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;