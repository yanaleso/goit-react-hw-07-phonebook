import PropTypes from 'prop-types';
import { useDeleteContactMutation, useToggleFavouriteMutation } from 'redux/services/contactsApi';
import { Button, CheckboxLabel, Call } from './ContactListItem.styled';
import { IoMdTrash, IoIosCall, IoMdCreate, IoIosStar } from 'react-icons/io';
import { Box } from 'components/Box';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import EditForm from 'components/EditForm';
import ClipLoader from "react-spinners/ClipLoader";


const ContactListItem = ({ contact: { name, phone, id, favourite } }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const [toggleFavorite] = useToggleFavouriteMutation();

  const removeContact = async id => {
    try {
      await deleteContact(id);
      toast.success('Contact is deleted')
    } catch (error) {
      toast.error('Unable to delete contact. Please try again');
      console.log(error);
    }
  };
    
  return (
    <>
      <p>{name}: {phone}</p>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="50%">
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={favourite}
            onChange={() => toggleFavorite({ id, favourite: !favourite })}
          />
          <IoIosStar />
        </CheckboxLabel>
        <Call href={`tel:${phone}`}>
          <IoIosCall size={16} />
          <span>Call</span>
        </Call>
        <Button type="button" onClick={() => toggleModal()} disabled={isLoading}><IoMdCreate size={16} />Edit</Button>
        <Button type="button" onClick={() => removeContact(id)} disabled={isLoading}>{isLoading ? <ClipLoader color="#FFFFFF" size={16} /> : <IoMdTrash size={16} />}Delete</Button>
      </Box>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <EditForm onCloseModal={toggleModal} id={id} />
        </Modal>
      )}
    </>
  );
}

ContactListItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactListItem;