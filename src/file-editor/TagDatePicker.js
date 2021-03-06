import PropTypes from 'prop-types';
import React from 'react';

import './TagDatePicker.css';

class TagDatePicker extends React.Component {
  get parsedDate() {
    const { value } = this.props;

    if (!value) {
      return {
        date: '',
        day: false,
        month: false,
        year: false,
      };
    }

    const valueSplit = value.split('-');
    return {
      date: value + (valueSplit[1] ? '' : '-01') + (valueSplit[2] ? '' : '-01'),
      year: Boolean(valueSplit[0]),
      month: Boolean(valueSplit[1]),
      day: Boolean(valueSplit[2]),
    };
  }

  correctOrdering(updatedParsedDate) {
    const { day, month, year } = updatedParsedDate;
    const isValidOrdering = year >= month && month >= day;

    if (isValidOrdering) return updatedParsedDate;

    const isChecking = year > this.parsedDate.year
      || month > this.parsedDate.month
      || day > this.parsedDate.day;

    if (isChecking) {
      return {
        ...updatedParsedDate,
        day,
        month: day || month,
        year: day || month || year,
      };
    }

    return {
      ...updatedParsedDate,
      day: year && month && day,
      month: year && month,
      year,
    };
  }

  dateChanged(updatedProps) {
    const newlyCreatedDate = !this.parsedDate.date && updatedProps.date;

    let updatedParsedDate = {
      ...this.parsedDate,
      ...updatedProps,
      ...(newlyCreatedDate ? {
        day: true,
        month: true,
        year: true,
      } : {}),
    };

    updatedParsedDate = this.correctOrdering(updatedParsedDate);

    let {
      date, day, month, year,
    } = updatedParsedDate;

    if (!date) return;

    const splitDate = date.split('-');
    year = year ? splitDate[0] : '';
    month = month ? `-${splitDate[1]}` : '';
    day = day ? `-${splitDate[2]}` : '';
    date = year + month + day;

    const { onChange } = this.props;
    onChange(date);
  }

  render() {
    const {
      date, day, month, year,
    } = this.parsedDate;

    return (
      <div className="Tag-date-picker">
        <label htmlFor="date-tag">
          <span>Date</span>
          <input
            id="date-tag"
            type="date"
            value={date}
            onChange={(event) => this.dateChanged({ date: event.target.value })}
          />
        </label>

        <div className="Parts">
          <label
            htmlFor="tag-day"
            className="checkbox"
          >
            <input
              id="tag-day"
              type="checkbox"
              checked={day}
              onChange={(event) => this.dateChanged({ day: event.target.checked })}
            />
            <div className="box" />
            <span>Day</span>
          </label>

          <label
            htmlFor="tag-month"
            className="checkbox"
          >
            <input
              id="tag-month"
              type="checkbox"
              checked={month}
              onChange={(event) => this.dateChanged({ month: event.target.checked })}
            />
            <div className="box" />
            <span>Month</span>
          </label>

          <label
            htmlFor="tag-year"
            className="checkbox"
          >
            <input
              id="tag-year"
              type="checkbox"
              checked={year}
              onChange={(event) => this.dateChanged({ year: event.target.checked })}
            />
            <div className="box" />
            <span>Year</span>
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
