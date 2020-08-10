import React from 'react';
import PropTypes from 'prop-types';
import './TagDatePicker.css';

class TagDatePicker extends React.Component {
  defaultState = {
    date: '',
    day: false,
    month: false,
    year: false,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, onChange } = this.props;
    if (value !== prevProps.value) {
      this.parse(value);
      return;
    }

    const orderCorrected = this.correctOrdering(prevState);
    if (orderCorrected) return;

    let {
      date, day, month, year,
    } = this.state;
    const updateDate = date
      && (date !== prevState.date
      || day !== prevState.day
      || month !== prevState.month
      || year !== prevState.year);

    if (updateDate) {
      const splitDate = date.split('-');
      year = year ? splitDate[0] : '';
      month = month ? `-${splitDate[1]}` : '';
      day = day ? `-${splitDate[2]}` : '';
      date = year + month + day;
      onChange(date);
    }
  }

  parse(value) {
    if (!value) {
      this.setState(this.defaultState);
      return;
    }

    const valueSplit = value.split('-');
    this.setState({
      date: value + (valueSplit[1] ? '' : '-01') + (valueSplit[2] ? '' : '-01'),
      year: Boolean(valueSplit[0]),
      month: Boolean(valueSplit[1]),
      day: Boolean(valueSplit[2]),
    });
  }

  correctOrdering(prevState) {
    const { day, month, year } = this.state;
    const isValidOrdering = year >= month && month >= day;

    if (isValidOrdering) return false;

    const isChecking = year > prevState.year || month > prevState.month || day > prevState.day;

    if (isChecking) {
      this.setState({
        month: day || month,
        year: day || month || year,
      });
    } else {
      this.setState({
        month: year && month,
        day: year && month && day,
      });
    }

    return true;
  }

  dateChanged(newDate) {
    const { date } = this.state;
    const hadDate = !date;
    if (hadDate) {
      this.setState({
        date: newDate, day: true, month: true, year: true,
      });
    } else {
      this.setState({ date });
    }
  }

  render() {
    const {
      date, day, month, year,
    } = this.state;

    return (
      <div className="Tag-date-picker">
        <label htmlFor="date-tag">
          Date
          <input
            id="date-tag"
            type="date"
            value={date}
            onChange={(event) => this.dateChanged(event.target.value)}
          />
        </label>

        <div className="Parts">
          <label
            htmlFor="tag-day"
            className="checkbox"
          >
            Day
            <input
              id="tag-day"
              type="checkbox"
              checked={day}
              onChange={(event) => this.setState({ day: event.target.checked })}
            />
            <div className="box" />
          </label>

          <label
            htmlFor="tag-month"
            className="checkbox"
          >
            Month
            <input
              id="tag-month"
              type="checkbox"
              checked={month}
              onChange={(event) => this.setState({ month: event.target.checked })}
            />
            <div className="box" />
          </label>

          <label
            htmlFor="tag-year"
            className="checkbox"
          >
            Year
            <input
              id="tag-year"
              type="checkbox"
              checked={year}
              onChange={(event) => this.setState({ year: event.target.checked })}
            />
            <div className="box" />
          </label>
        </div>
      </div>
    );
  }
}

TagDatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TagDatePicker.defaultProps = {
  value: '',
};

export default TagDatePicker;
