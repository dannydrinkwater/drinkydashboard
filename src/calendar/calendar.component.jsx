import React from "react";
import "./calendar.styles.scss";

import dayjs from "dayjs";

import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

class Calendar extends React.Component {
  // TODO:
  // Hookup the calendar, switch months, select days etc
  // When performing any calendar action, make sure note is saved away first
  constructor(props) {
    super(props);

    this.state = {};
  }

  getDaysInMonth() {
    const selectedDate = new Date(this.props.selectedDate);

    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
  }

  getFirstDayPosition() {
    const selectedYear = new Date(this.props.selectedDate).getFullYear(),
      selectedMonth = new Date(this.props.selectedDate).getMonth() + 1;
    return new Date(selectedYear, selectedMonth - 1, 1).getDay();
  }

  render() {
    const self = this;
    const selectedDate = new Date(this.props.selectedDate);

    return (
      <div className="calendar">
        <div className="month-indicator">
          <button
            className="month-indicator__btn"
            onClick={() => self.props.onChangeMonth(event, "prev")}
          >
            <FiArrowLeftCircle />
          </button>
          <time dateTime={this.props.selectedDate}>
            {dayjs(this.props.selectedDate).format("MMMM YYYY")}
          </time>
          <button
            className="month-indicator__btn"
            onClick={() => self.props.onChangeMonth(event, "next")}
          >
            <FiArrowRightCircle />
          </button>
        </div>
        <div className="day-of-week">
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
          <div>Su</div>
        </div>
        <div className="date-grid">
          {[...Array(this.getDaysInMonth())].map((day, index) => {
            const dayOfMonth = index + 1;
            return (
              <button
                key={index}
                className={`${
                  index === 0 ? "date-start-" + this.getFirstDayPosition() : ""
                } ${dayOfMonth === selectedDate.getDate() ? "is-today" : ""}`}
                onClick={() =>
                  self.props.onChangeDate(
                    event,
                    Date.parse(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        dayOfMonth
                      )
                    )
                  )
                }
              >
                <time dateTime={this.props.selectedDate}>{dayOfMonth}</time>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Calendar;
