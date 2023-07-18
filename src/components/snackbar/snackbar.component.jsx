import React from 'react';

import { VscChromeClose } from "react-icons/vsc";

import {
  SnackbarContainer,
  SnackbarHeader
} from './snackbar.styles';

const Snackbar = ({ msg, type="err", show }) => {

    return (
      <SnackbarContainer type={ type }>
        <SnackbarHeader>
          <VscChromeClose onClick={() => show()} />
        </SnackbarHeader>
        { msg }
      </SnackbarContainer>
    );
}

export default Snackbar;