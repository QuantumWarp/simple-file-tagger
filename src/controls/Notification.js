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

  addNotification(newNotification) {
    const notification = { ...newNotification };
    const { notifications } = this.state;
    if (!notification.key) {
      this.count += 1;
      notification.key = this.count;
    }

    if (!notifications.find((x) => x.key === notification.key)) {
      setTimeout(() => this.clearNotification(notification), 3000);
      this.setState({ notifications: notifications.concat([notification]) });
    }
  }

  clearNotification(notification) {
    const { notifications } = this.state;
    if (notifications.includes(notification)) {
      this.setState({ notifications: notifications.filter((x) => x !== notification) });
    }
  }

  render() {
    const { notifications } = this.state;
    return (
      <div className="Notification">
        {notifications.map((x) => (
          <button
            type="button"
            key={x.key}
            className={`Item ${x.type}`}
            onClick={() => this.clearNotification(x)}
          >
            <div className="Icon">
              {x.type === 'Success' && <FaCheckCircle />}
              {x.type === 'Info' && <FaInfoCircle />}
              {x.type === 'Warning' && <MdWarning />}
              {x.type === 'Error' && <MdError />}
            </div>
            <span>{x.message}</span>
          </button>
        ))}
      </div>
    );
  }
}

export default Notification;
