import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.querySelector('html').classList.add('no-scroll');
    document.addEventListener('keydown', this.handleEscapeClose);
  }

  componentWillUnmount() {
    document.querySelector('html').classList.remove('no-scroll');
    document.removeEventListener('keydown', this.handleEscapeClose);
  }

  handleEscapeClose = ({ key }) => {
    if (key !== 'Escape') return;
    this.props.onModalClose();
  };

  handleOverlayClose = evt => {
    if (evt.target !== evt.currentTarget) return;
    this.props.onModalClose();
  };

  render() {
    const { largeURL, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlayClose}>
        <div className={css.modal}>
          <img src={largeURL} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
