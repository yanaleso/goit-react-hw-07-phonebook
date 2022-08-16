import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const FormBox = styled(Form)`
  display: flex; 
  flex-direction: column;
  width: ${p => p.theme.sizes.m};
`;

export const Label = styled.label`
  margin-bottom: ${p => p.theme.space[3]}px;
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.primary};
`;
    
export const Input = styled(Field)`
  min-width: ${p => p.theme.sizes.s};
  padding: ${p => p.theme.space[3]}px;
  border: ${p => p.theme.borders.normal};
  border-color: ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radii.normal};
  outline: none;
  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :focus {
  border-color: ${p => p.theme.colors.accent};
}
`;

export const FormError = ({ name }) => {
  return (<ErrorMessage name={name} render={message => <ErrorText>{message}</ErrorText>} />)
};

const ErrorText = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.colors.red};
`;

// export const Button = styled.button`
//   padding: ${p => p.theme.space[3]}px;
//   color: ${p => p.theme.colors.white};
//   background-color: ${p => p.theme.colors.accent};
//   font-family: inherit;
//   font-weight: ${p => p.theme.fontWeights.bold};
//   font-size: ${p => p.theme.fontSizes.m};
//   cursor: pointer;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
//   border-radius: ${p => p.theme.radii.normal};
//   border-width: 0;
//   transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

//   :hover, :focus {
//     background-color: ${p => p.theme.colors.hover};
//   }
// `;