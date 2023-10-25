/** React Imports */
import React from 'react';

/** Styles */
import './CopyCodeButton.scss';

/** Assets */
import { CopyIcon } from '../../../../../assets/svg/icons';

type CopyCodeButtonProps = {
  code: string;
};

const CopyCodeButton = ({ code }: CopyCodeButtonProps) => {
  function copyToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className="copy-code-button" onClick={copyToClipboard}>
      <div className="copy-code-button__icon">
        <CopyIcon />
      </div>
      <span className="copy-code-button__content">Sala #{code}</span>
    </button>
  );
};

export default CopyCodeButton;
