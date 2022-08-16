import { ToastContainer } from 'react-toastify';
import { IoMdPersonAdd } from 'react-icons/io';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { Box } from './Box';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
// import { Button } from './ContactForm/ContactForm.styled';


export default function App() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Box width="l" p={2} as="div" m="0 auto">
      <h1>Phonebook</h1>
      <Button type="button" onClick={toggleModal}>
        <IoMdPersonAdd size={18} /> Add Contact
      </Button>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <ContactForm onCloseModal={toggleModal} />
        </Modal>
      )}
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
      <ToastContainer autoClose={3000} pauseOnHover />
    </Box>
  );
 
}