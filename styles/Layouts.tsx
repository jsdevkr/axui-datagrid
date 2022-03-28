import styled from '@emotion/styled';

export const Container: React.FC = ({ children }) => {
  return <SContainer>{children}</SContainer>;
};

const SContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
