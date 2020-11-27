import React from "react";
import "./journal.styles.scss";

import { firestore } from "../firebase/firebase.utils";

import Calendar from "../calendar/calendar.component";
import Entry from "../entry/entry.component";

class Journal extends React.Component {
  constructor(props) {
    super(props);

    const dateToday = new Date().setHours(0, 0, 0, 0);

    this.state = {
      selectedDate: dateToday,
      date: null,
      notes: null,
      todos: null,
      lastUpdated: null
    };
  }

  componentDidMount() {
    this.getJournalEntryDocument(this.state.selectedDate);
  }

  getJournalEntryDocument = async date => {
    const entryRef = await this.createJournalEntryDocument(date);
    entryRef.onSnapshot(entrySnapshot => {
      const { date, notes, todos } = entrySnapshot.data();
      this.setState({
        date: date,
        notes: notes,
        todos: todos,
        lastUpdated: null
      });
    });
  };

  setJournalEntryDocument = async () => {
    const { date, notes, todos } = this.state;

    const entryRef = firestore.doc(
      `users/${this.props.currentUser.uid}/journalEntries/${
        this.state.selectedDate
      }`
    );

    try {
      await entryRef.set({
        date,
        notes,
        todos
      });
      this.setState({ lastUpdated: Date.now() });
    } catch (error) {
      console.log("error saving journal entry", error.message);
    }
  };

  createJournalEntryDocument = async date => {
    const entryRef = firestore.doc(
      `users/${this.props.currentUser.uid}/journalEntries/${date}`
    );

    const entrySnapshot = await entryRef.get();

    if (!entrySnapshot.exists) {
      const { date, notes, todos } = this.state;

      try {
        await entryRef.set({
          date: new Date(this.state.selectedDate),
          notes: null,
          todos: null
        });
      } catch (error) {
        console.log("error creating journal entry", error.message);
      }
    }

    return entryRef;
  };

  handleChangeDate = (event, date) => {
    event.preventDefault();
    this.setState({ selectedDate: date });
    this.getJournalEntryDocument(date);
  };

  handleChangeMonth = (event, direction) => {
    event.preventDefault();
    // All of this due to JS not properly supporting subtraction of months (possibly because of setHours to zero)
    let { selectedDate } = this.state;
    selectedDate = new Date(selectedDate);

    const year = selectedDate.getFullYear();
    let month =
      direction === "prev"
        ? selectedDate.getMonth()
        : selectedDate.getMonth() + 2;
    month = month.toString().length === 1 ? "0" + month : month;
    const date = selectedDate.getDate();

    const dateString = year + "-" + month + "-" + date;
    const newDate = Date.parse(dateString);

    this.setState({ selectedDate: newDate });
    this.getJournalEntryDocument(newDate);
  };

  handleUpdateEntry = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { selectedDate } = this.state;
    const { currentUser } = this.props;

    return (
      <>
        {this.props.currentUser ? (
          <div className="journal">
            <Calendar
              selectedDate={selectedDate}
              onChangeDate={this.handleChangeDate}
              onChangeMonth={this.handleChangeMonth}
            />
            <Entry
              selectedDate={selectedDate}
              currentUser={currentUser}
              setJournalEntryDocument={this.setJournalEntryDocument}
              handleUpdateEntry={this.handleUpdateEntry}
              {...this.state}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default Journal;
