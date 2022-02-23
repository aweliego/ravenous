import React from 'react';

class Suggestion extends React.Component {
  render() {
    return <li>{this.props.suggestion}</li>;
  }
}

export default Suggestion;
