import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';

const StyleModal = styled(Modal)`
  overflow-y: hidden !important;
  > .modal-dialog {
    height: 100vh;
    > .modal-content {
      height: 100vh;
      background-color: transparent !important;
      border: none;
    }
  }
`;

const StyledModalBody = styled(Modal.Body)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderComponent = props => {
  const { loading } = props;
  return (
    <StyleModal show={loading}>
      <StyledModalBody>
        <PulseLoader
          css={{
            display: 'block',
            margin: '0 auto'
          }}
          loading={loading}
        />
      </StyledModalBody>
    </StyleModal>
  );
};

LoaderComponent.propTypes = {
  loading: bool
};

LoaderComponent.defaultProps = {
  loading: false
};

export default LoaderComponent;
