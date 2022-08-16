
import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: ${p => p.theme.space[3]}px;
  color: ${p => p.theme.colors.white};
  background-color: ${p => p.theme.colors.accent};
  font-family: inherit;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.m};
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: ${p => p.theme.radii.normal};
  border-width: 0;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover:not(:disabled), :focus:not(:disabled) {
    background-color: ${p => p.theme.colors.hover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: initial;
  }
  
  svg {
    @media screen and (min-width: 768px) {
      margin-right: ${prop => prop.theme.space[2]}px;
      vertical-align: bottom;
    }
  }
`;