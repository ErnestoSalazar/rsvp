import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import GuestList from './MainContent/GuestList';
import Counter from './MainContent/Counter';
import MainContent from './MainContent';
import ConfirmedFilter from './MainContent/ConfirmedFilter';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
    ]
  }

  toggleGuestPorpertyAt = (property, id) => this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (guest.id === id) {
        return {
          ...guest,
          [property]: !guest[property]
        };
      }
      else {
        return guest;
      }
    })
  });

  toggleConfirmationAt = id => this.toggleGuestPorpertyAt("isConfirmed", id);

  removeGuestAt = id => this.setState({guests: this.state.guests.filter(guest => id !== guest.id)});

  toggleEditingAt = id => this.toggleGuestPorpertyAt("isEditing", id);

  setNameAt = (name, id) => this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (guest.id === id) {
        return {
          ...guest,
          name
        };
      }
      else {
        return guest;
      }
    })
  });

  addGuest = (e) => {
    e.preventDefault();
    if (this.state.pendingGuest.length) {
      this.setState(prevState => {
        return {
          guests: [
            {
              name: this.state.pendingGuest,
              isConfirmed: false,
              isEditing: false,
              id: new Date().getTime()
            },
            ...prevState.guests,
          ],
          pendingGuest: ""
        }
      });
    }
  };

  toggleFilter = () => this.setState({isFiltered: !this.state.isFiltered});

  handleNameInput = (e) => this.setState({pendingGuest: e.target.value});

  getTotalInvited = () => this.state.guests.length;
  getAttendingGuests = () => this.state.guests.reduce((total, guest) => guest.isConfirmed ? total+1 : total, 0);

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
      <Header 
        addGuest={this.addGuest}
        pendingGuest={this.state.pendingGuest}
        getInputName={this.handleNameInput}
      />
      <MainContent>
        <div>
          <h2>Invitees</h2>
          <ConfirmedFilter 
            toggleFilter={this.toggleFilter}
            isFiltered={this.state.isFiltered}
          />
        </div>
        <Counter
         totalInvited={totalInvited}
         numberAttending={numberAttending}
         numberUnconfirmed={numberUnconfirmed}
         />
        <GuestList
          guests={this.state.guests} 
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          isFiltered={this.state.isFiltered}
          pendingGuest={this.state.pendingGuest}
        />
      </MainContent>
    </div>
    );
  }
}

export default App;
