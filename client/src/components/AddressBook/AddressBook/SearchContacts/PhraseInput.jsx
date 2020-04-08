import React from "react";
import PropTypes from "prop-types";

import "./PhraseInput.css";

class PhraseInput extends React.Component {

  static propTypes = {
    phrase: PropTypes.string.isRequired,
    onPhraseChange: PropTypes.func.isRequired,
    downshiftGetInputProps: PropTypes.func.isRequired,
  };

  componentDidMount () {
    this.inputRef.focus();
  }

  render () {
    const {
      phrase,
      onPhraseChange,
      downshiftGetInputProps,
    } = this.props;

    return (
      <input
        {...downshiftGetInputProps({
          // TODO something is wrong here - fixed inputRef.value
          className: "PhraseInput",
          ref: inputRef => this.inputRef = inputRef,
          placeholder: "Type a name and select a contact…",
          value: phrase,
          onChange: event => onPhraseChange(this.inputRef.value),
        })}
      />
    );
  }

}

export default PhraseInput;