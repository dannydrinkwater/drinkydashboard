import React from "react";
import "./entry.styles.scss";

import dayjs from "dayjs";

class Entry extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    clearInterval(this.autoSaveTimer);
    this.props.setJournalEntryDocument();
  };

  handleChange = event => {
    const { value, name } = event.target;

    clearInterval(this.autoSaveTimer);
    this.autoSaveTimer = setInterval(() => this.handleSubmit(), 3000);

    this.props.handleUpdateEntry(name, value);
  };

  render() {
    let { selectedDate, date, notes, todos, lastUpdated } = this.props;

    return (
      <div className="entry">
        <div className="entry__title">
          {dayjs(selectedDate).format("dddd, D MMMM")}
        </div>
        <textarea
          name="notes"
          className="entry_notes"
          placeholder="Start entry..."
          value={notes ? notes : ""}
          onChange={this.handleChange}
          spellCheck="false"
        />
        {lastUpdated && (
          <p className="entry_saved">
            Last saved: {dayjs(lastUpdated).format("ddd D MMM, HH:mm:ss")}
          </p>
        )}
      </div>
    );
  }
}

export default Entry;
