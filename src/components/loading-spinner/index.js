import React from 'react';

import SpinnerIcon from '@app/components/icon/spinner';
import { StyledRoot, StyledLabel } from './styled';

const LoadingSpinner = ({ className }) => (
  <StyledRoot className={className}>
    <SpinnerIcon />
    <StyledLabel>Carregando dados...</StyledLabel>
  </StyledRoot>
);

export default LoadingSpinner;
