import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';

const Error = styled.h4`
  color: red;
`;
export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div>
          <Error>Something went wrong.</Error>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired
};
