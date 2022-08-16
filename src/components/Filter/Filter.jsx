import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/contactActions';
import { getFilter } from 'redux/contactSelectors';
import { Input, Label } from './Filter.styled';

const Filter = () => {
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const changeFilterValue = e => {
        dispatch(changeFilter(e.target.value));
    };
    
    return (
        <Label>
            Find contacts by name
            <Input type="text" value={filter} onChange={changeFilterValue} />
        </Label>
    );
}

export default Filter;