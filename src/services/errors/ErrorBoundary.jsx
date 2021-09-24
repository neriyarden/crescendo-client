import React from 'react'
import ErrorFallback from './ErrorFallback';

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback errorMsg={this.state.error.message} />;
    }

    return this.props.children;
  }
}