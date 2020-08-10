import React from 'react';
import NotificationHelper from './helper/notification-helper';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('catch')
    NotificationHelper.notify({ type: 'Error', message: 'Something went wrong' });
  }

  render() {
    return this.props.children; 
  }
}

export default ErrorBoundary;
