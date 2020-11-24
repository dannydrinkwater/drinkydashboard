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
        todos: todos
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
          notes,
          todos
        });
      } catch (error) {
        console.log("error creating journal entry", error.message);
      }
    }

    return entryRef;
  };

  handleChangeDate = (event, date) => {
    event.preventDefault();
    console.log("HandleDateChange", new Date(date));
    this.setState({ selectedDate: date });
    this.getJournalEntryDocument(date);
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
