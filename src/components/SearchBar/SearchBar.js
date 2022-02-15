import React from 'react';
import './SearchBar.css';

// The search bar will communicate with the Yelp API
// Requests to the Yelp API must follow formatting and naming conventions set by the API.

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
    };
  }

  // Styles selected option
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  // Lets API know which sort option has been selected
  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption,
    });
  }

  // Sets the typed input as the search term
  handleTermChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  // Sets the typed input as the search location
  handleLocationChange(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleAutocomplete(e) {
    this.props.autocomplete(e.target.value);
  }

  // Let's Go button functionality
  handleSearch(e) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
    e.preventDefault();
  }

  // Used to render the ul element (the search options) in render()
  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }
  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <form autoComplete="off" onSubmit={this.handleSearch} className="SearchBar-form">
          <div className="SearchBar-fields">
            <input
              onChange={this.handleTermChange}
              onChange={this.handleAutocomplete}
              placeholder="Search Businesses"
            />
            <div id="suggestions"></div>
            <input onChange={this.handleLocationChange} placeholder="Where?" />
          </div>
          <input type="submit" value="Let's Go" className="SearchBar-submit" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
