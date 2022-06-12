import styled from 'styled-components';
import Button from '../../../Atoms/Button';

export const AddButton = styled(Button)`
  margin: 10px 0;
  width: 100%;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textModal};
`;
