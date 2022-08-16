import ContactListItem from "components/ContactListItem";
import { Item } from './ContactList.styled';
import { useGetContactsQuery } from "redux/services/contactsApi";
import { useSelector } from "react-redux";
import { getFilter } from "redux/contactSelectors";
import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "components/Box";

const ContactList = () => {
    const { data: contacts, error, isLoading } = useGetContactsQuery();
    const filter = useSelector(getFilter);
    const getVisibleContacts = () => {
        if (!isLoading) {
            const normalizedFilter = filter.toLowerCase();
            return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
        }
    };
    const visibleContacts = useSelector(getVisibleContacts);

    return (
        <>
            {error && (<p>Something went wrong. Please try again.</p>)}
            {isLoading ? (<Box display="flex" justifyContent="center" pt={4}><ClipLoader color="#757575" /></Box>) :
                (<ul>
                    {visibleContacts.map((contact) => (
                        <Item key={contact.id}>
                            <ContactListItem contact={contact} />
                        </Item>
                    ))}
                </ul>)
            }
        </>
    )
}

export default ContactList;