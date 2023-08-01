import React from 'react';
import './bookNow.css';
import Packages from './Packages/packages';
import MyCalendar from './Calendar/myCalendar';
import Header from '../../Component/Header';
import Sidepanel from './Calendar/SidePanel/sidepanel';
import BookingForm from './BookingForm/bookingForm';
import { useState } from 'react';

function BookNow() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <>
        <Sidepanel />
        {isOpen && (
          <div className="Modal">
            <div className="Modal-content">
              <MyCalendar />
            </div>
            <button
              className="modal-close-button"
              onClick={() => handleClose()}
            >
              <span className="modal-inner-content">
                <span className="label">Close</span>
              </span>
            </button>
          </div>
        )}

        <div
          className="overlay-Img"
          style={{ position: isOpen ? 'fixed' : 'relative' }}
        >
          <Header />
          <div
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Packages />
            <BookingForm
              handleOpen={() => setIsOpen(true)}
              name={name}
              setName={setName}
            />
            {/* {isOpen ? null : <Packages />}
            {isOpen ? null : <BookingForm />} */}
          </div>
        </div>
      </>
    </>
  );
}

export default BookNow;
