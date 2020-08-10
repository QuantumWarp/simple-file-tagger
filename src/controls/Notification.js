import React from 'react';
import './Notification.css';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { MdWarning, MdError } from 'react-icons/md';
import NotificationHelper from '../helper/notification-helper';

class Notification extends React.Component {
  count = 0;

  constructor(props) {
    super(props);
    this.state = { notifications: [] };
  }
  
  componentDidMount() {
    NotificationHelper.notify = this.addNotification.bind(this);
  }

  addNotification(notification) {
    if (!notification.key) {
      this.count = this.count + 1;
      notification.key = this.count;
    }

    if (!this.state.notifications.find((x) => x.key === notification.key)) {
      setTimeout(() => this.clearNotification(notification), 3000);
      this.setState({ notifications: this.state.notifications.concat([notification]) });
    }
  }

  clearNotification(notification) {
    if (this.state.notifications.includes(notification)) {
      this.setState({ notifications: this.state.notifications.filter((x) => x !== notification) });
    }
  }

  render() {
    return <div className="Notification">
    {this.state.notifications.map((x) =>
      <div
        key={x.key}
        className={`Item ${x.type}`}
        onClick={() => this.clearNotification(x)}
      >
        <div className="Icon">
          {x.type === 'Success' && <FaCheckCircle></FaCheckCircle>}
          {x.type === 'Info' && <FaInfoCircle></FaInfoCircle>}
          {x.type === 'Warning' && <MdWarning></MdWarning>}
          {x.type === 'Error' && <MdError></MdError>}
        </div>
        <span>{x.message}</span>
      </div>
    )}
    </div>;
  }
}

export default Notification;
