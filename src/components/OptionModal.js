import React from 'react';
import Modal from 'react-modal';

const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    className="modal"
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    onRequestClose={props.handleClearSelectedOptions}
  >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && (
      <p className="modal__body">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOptions}>
      Okay
    </button>
  </Modal>
);

export default OptionModal;
