import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from './GuestInputForm';

const Header = props => (
    <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <GuestInputForm 
            addGuest={(e) => props.addGuest(e)}
            pendingGuest={props.pendingGuest}
            handleNameInput={props.getInputName}
        />
    </header>
);

Header.propTypes = {
    addGuest: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired,
    getInputName: PropTypes.func.isRequired
};

export default Header;