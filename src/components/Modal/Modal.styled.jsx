import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  padding: ${p => p.theme.space[5]}px;
  background-color: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.radii.normal};
`

export const Button = styled.button`
  position: absolute;
  right: 2px;
  top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary};
  border-width: 0;
  cursor: pointer;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover, :focus {
   color: ${p => p.theme.colors.hover};
  }

  svg {
    fill: currentColor;
  }
`