import { Formik } from 'formik';
import * as yup from "yup";
import { useAddContactMutation, useGetContactsQuery } from 'redux/services/contactsApi';
import { toast } from 'react-toastify';
import { FormBox, FormError, Input, Label, Checkbox } from './ContactForm.styled';
import Button from 'components/Button';

export default function ContactForm({onCloseModal}) {
  const initialValues = {
    name: '',
    phone: '',
    favourite: false,
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
  })

  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const setContact = async (newContact) => {
    try {
      const isContact = contacts.find(contact => contact.name === newContact.name);

      if (isContact) {
        return toast.error(`${newContact.name} is already in contact`);
      }

      await addContact(newContact);
      toast.success('Contact is added')
    } catch (error) {
      toast.error('Unable to add contact. Please try again');
      console.log(error);
    }
  };

  const handleSubmit = (values, {resetForm}) => {
    setContact(values);
    resetForm();
    onCloseModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}>
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
        <Label>
          <Checkbox
            type="checkbox"
            name="favourite"
          />
          Add to favourite
        </Label>

        <Button type="submit">Add contact</Button>
      </FormBox>
    </Formik>
  );
}
