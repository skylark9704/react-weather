import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
export default class DoubleButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(event, name) {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        }
        else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }
    render() {
        return (
            <React.Fragment>
                {!ApiCalendar.sign ? <button onClick={(e) => this.handleItemClick(e, 'sign-in')}>sign-in</button>:<button onClick={(e) => this.handleItemClick(e, 'sign-out')}>sign-out</button>}
            </React.Fragment>
        );
    }
}