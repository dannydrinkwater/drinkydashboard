import React from "react";
import "./time.styles.scss";

import dayjs from "dayjs";

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: dayjs().format("HH:mm") };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: dayjs().format("HH:mm")
    });
  }

  render() {
    return (
      <time className="time" dateTime="2019-02-03">
        {this.state.date}
      </time>
    );
  }
}

export default Time;
