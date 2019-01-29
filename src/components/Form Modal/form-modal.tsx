import * as React from 'react';
import { Modal, FormSelect } from 'materialize-css';

export interface FormModalProps {
  addContent(): void;
  type: string;
  body: string;
  handleChange(e: React.ChangeEvent<any>): void;
}

export interface FormModalState {}

class FormModal extends React.Component<FormModalProps, FormModalState> {
  componentDidMount = () => {
    const modal = document.querySelectorAll('.modal');
    const select = document.querySelectorAll('select');

    Modal.init(modal, {
      preventScrolling: true,
      dismissible: false
    });
    FormSelect.init(select);
  };

  createInstance = () => {
    const elem = document.querySelector('.modal');
    if (elem) {
      return Modal.getInstance(elem);
    } else {
      throw new Error('No Element found!');
    }
  };

  openFormModal = () => {
    const instance = this.createInstance();
    instance.open();
  };

  render() {
    return (
      <React.Fragment>
        <div className="fixed-action-btn">
          <button
            onClick={this.openFormModal}
            className="btn-floating btn-large white waves-effect z-depth-5"
          >
            <i className="fas fa-plus indigo-text" />
          </button>
        </div>

        <div className="modal">
          <div className="modal-content">
            <h4 className="center">Add Content</h4>
            <div className="row">
              <div className="input-field col s6">
                <select name="type" onChange={e => this.props.handleChange(e)}>
                  {['Title', 'Code', 'Paragraph', 'Image', 'Note'].map(val => (
                    <option key={val} value={val.toLowerCase()}>
                      {val}
                    </option>
                  ))}
                </select>
                <label>Choose type</label>
              </div>

              {this.props.type !== 'image' ? (
                <div className="input-field col s12">
                  <textarea
                    name="body"
                    value={this.props.body}
                    onChange={e => this.props.handleChange(e)}
                    id={this.props.type}
                    className="materialize-textarea"
                  />
                  <label htmlFor={this.props.type}>{this.props.type}</label>
                </div>
              ) : (
                <div className="file-field input-field col s12">
                  <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <a
              onClick={this.props.addContent}
              className="modal-close waves-effect waves-green btn-flat"
            >
              Add
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Close
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormModal;
