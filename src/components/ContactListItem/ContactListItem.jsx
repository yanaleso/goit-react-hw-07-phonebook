import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/services/contactsApi';
import { Button, Call, Edit } from './ContactListItem.styled';
import { IoMdTrash, IoIosCall, IoMdCreate } from 'react-icons/io';
import { Box } from 'components/Box';
import { useState } from 'react';
import Modal from 'components/Modal';
import EditForm from 'components/EditForm';
import ClipLoader from "react-spinners/ClipLoader";


const ContactListItem = ({ contact: { name, phone, id } }) => {
    const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
    const [deleteContact, { isLoading }] = useDeleteContactMutation();
    
    return (
        <>
            <p>{name}: {phone}</p>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="50%">
                <Call href={`tel:${phone}`}>
                    <IoIosCall size={14} />
                    <span>Call</span>
                </Call>
                <Edit type="button" onClick={() => toggleModal()} disabled={isLoading}><IoMdCreate size={16} />Edit</Edit>
                <Button type="button" onClick={() => deleteContact(id)} disabled={isLoading}>{ isLoading? <ClipLoader color="#FFFFFF" size={12} />: <IoMdTrash size={16} />}Delete</Button>
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