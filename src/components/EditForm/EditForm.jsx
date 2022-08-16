import { Formik } from 'formik';
import * as yup from "yup";
import { useUpdateContactMutation, useGetContactByIdQuery } from 'redux/services/contactsApi';
import { toast } from 'react-toastify';
import { FormBox, FormError, Input, Label } from '../ContactForm/ContactForm.styled';
import Button from 'components/Button';
import ClipLoader from "react-spinners/ClipLoader";

export default function EditForm({onCloseModal, id}) {
  const [updateContact] = useUpdateContactMutation();
  const { data: contact = [], isLoading } = useGetContactByIdQuery(id);
  const initialValues = {
    name: contact.name,
    phone: contact.phone,
  };
  const phoneRegExp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
  const contactSchema = yup.object().shape({
    name: yup.string()
      .min(2, 'Name must be more than 2 characters!')
      .max(30, 'Name must be less than 30 characters!')
      .required('The name field is required.'),
    phone: yup.string()
      .min(6, 'Phone must be more than 6 characters!')
      .max(13, 'Phone must be less than 13 characters!')
      .matches(phoneRegExp, 'Phone number is not valid.')
      .required('The phone field is required.'),
  });

  const setContact = async (fields) => {
    try {
      await updateContact({id, ...fields});
      toast.success('Contact is updated')
    } catch (error) {
      toast.error('Unable to update contact. Please try again');
      console.log(error);
    }
  };

  const handleUpdateContact = (values) => {
    setContact(values);
    onCloseModal();
  };

  return (
    <>
      {isLoading ? (<ClipLoader color="#757575" />) :
                (<Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleUpdateContact}>
      <FormBox>
        <Label>
          Name
          <Input type="text" name="name" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer."/>
          <FormError name="name" />
        </Label>
        <Label>
          Phone
          <Input type="tel" name="phone" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"/>
          <FormError name="phone" />
        </Label>

        <Button type="submit">Update contact</Button>
      </FormBox>
    </Formik>)
            }
    </>
  );
}