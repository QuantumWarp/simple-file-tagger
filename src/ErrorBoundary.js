import React from 'react';
import PropTypes from 'prop-types';
import NotificationHelper from './helper/notification-helper';

class ErrorBoundary extends React.Component {
  componentDidCatch() {
    NotificationHelper.notify({ type: 'Error', message: 'Something went wrong' });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
