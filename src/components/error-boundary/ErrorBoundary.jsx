import React from 'react';

// We need to access life cycle methods for Error Boundaries
// That's why we have to declare Class Component here
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  // catches any error thrown inside of a children of this component
  static getDerivedStateFromError(error) {
    // process the error
    return { hasError: true };
  }

  // This will let React know that this component is Error Boundary component
  // info is which component threw an error
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    // no errors just render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
