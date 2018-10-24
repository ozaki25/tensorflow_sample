import React from 'react';
import hello from '../utils/hello';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: 'loading...' };
  }

  async componentDidMount() {
    const result = await hello();
    this.setState({ result: result.toString() });
  }

  render() {
    return <div>{this.state.result}</div>;
  }
}

export default Hello;
