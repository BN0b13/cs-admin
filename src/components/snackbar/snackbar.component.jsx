import React from 'react';

import { GrClose } from 'react-icons/gr';

import {
  SnackbarContainer,
  SnackbarHeader
} from './snackbar.styles';

const Snackbar = ({ msg, type="err", show }) => {

    return (
      <SnackbarContainer type={ type }>
        <SnackbarHeader>
          <GrClose onClick={() => show()} />
        </SnackbarHeader>
        { msg }
      </SnackbarContainer>
    );
}

export default Snackbar;