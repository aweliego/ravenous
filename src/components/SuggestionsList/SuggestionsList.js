import React from 'react';
import Suggestion from '../Suggestion/Suggestion';

class SuggestionsList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.suggestions.map((suggestion) => (
          <Suggestion suggestion={suggestion} />
        ))}
      </ul>
    );
  }
}

export default SuggestionsList;
