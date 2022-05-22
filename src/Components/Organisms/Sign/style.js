import styled from 'styled-components';

export const BoxContainer = styled.section`
  padding: ${({ $padding }) => $padding}px 20px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.55s ease;
`;

export const FormContainer = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
  box-sizing: border-box;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(57, 54, 54, 0.8);
  font-weight: 500;
  text-decoration: none;
  margin: 5px 0;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const SubmitButton = styled.button`
  width: 30%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 15px;
  font-weight: 600;
  margin: 20px 0;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    ${({ theme }) => theme.colors.primary} 20%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;
