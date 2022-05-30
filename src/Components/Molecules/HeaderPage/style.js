import styled from 'styled-components';
import { Refresh } from '@styled-icons/heroicons-solid/Refresh';

export const StyleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 0;
`;

export const StyleActions = styled.div`
  button {
    margin-left: 10px;
  }
`;

export const StyleRefreshIcon = styled(Refresh)`
  color: ${({ theme }) => theme.colors.buttonText};
`;
