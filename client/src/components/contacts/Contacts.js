import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <>
      <TransitionGroup>
        {(filtered ? filtered : contacts).map((contact) => (
          <CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
