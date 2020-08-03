import React from 'react';
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
    if (this.props.value !== prevProps.value) {
      this.parse(this.props.value);
      return;
    }

    const orderCorrected = this.correctOrdering(prevState);
    if (orderCorrected) return;

    const updateDate = this.state.date
      && (this.state.date !== prevState.date
      || this.state.day !== prevState.day
      || this.state.month !== prevState.month
      || this.state.year !== prevState.year);

    if (updateDate) {
      const splitDate = this.state.date.split('-');
      const year = this.state.year ? splitDate[0] : '';
      const month = this.state.month ? `-${splitDate[1]}` : '';
      const day = this.state.day ? `-${splitDate[2]}` : '';
      const date = year + month + day;
      this.props.onChange(date);
    }
  }

  parse(value) {
    if (!value) {
      this.setState(this.defaultState);
      return;
    }

    if (this.state.date.startsWith(value)) return;

    const valueSplit = value.split('-');
    this.setState({
      date: value + (valueSplit[1] ? '' : '-01') + (valueSplit[2] ? '' : '-01'),
      year: Boolean(valueSplit[0]),
      month: Boolean(valueSplit[1]),
      day: Boolean(valueSplit[2]),
    });
  }
  
  correctOrdering(prevState) {
    const isValidOrdering = this.state.year >= this.state.month && this.state.month >= this.state.day;

    if (isValidOrdering) return false;

    const isChecking = this.state.year > prevState.year || this.state.month > prevState.month || this.state.day > prevState.day;

    if (isChecking) {
      this.setState({
        month: this.state.day || this.state.month,
        year: this.state.day || this.state.month || this.state.year,
      });
    } else {
      this.setState({ 
        month: this.state.year && this.state.month,
        day: this.state.year && this.state.month && this.state.day,
      });
    }

    return true;
  }

  render() {
    return <div className="Tag-date-picker">

      { this.test }

      <div>
        <input
          type="date"
          value={this.state.date}
          onChange={(event) => this.setState({ date: event.target.value })}
        />
      </div>

      <div>
        <label>Day</label>
        <input
          type="checkbox"
          checked={this.state.day}
          onChange={(event) => this.setState({ day: event.target.checked })}
        />

        <label>Month</label>
        <input
          type="checkbox"
          checked={this.state.month}
          onChange={(event) => this.setState({ month: event.target.checked })}
        />

        <label>Year</label>
        <input
          type="checkbox"
          checked={this.state.year}
          onChange={(event) => this.setState({ year: event.target.checked })}
        />
      </div>
    </div>;
  }
}

export default TagDatePicker;
