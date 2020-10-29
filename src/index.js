import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Loader from 'react-loader';
import './index.css';

const zipcode = '4307742';
const modalCustomeStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay: {
    background: '#000000',
    opacity: 0.9
  }
};

Modal.setAppElement('#root');

const pass = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      address:   '',
      loaded:    false,
      showModal: false,
    };

    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios.get(`https://api.zipaddress.net/?zipcode=${zipcode}`)
      .then(async function (response) {
        await pass(3000); // msec

        self.onSuccess(response.data.data.address);
        //self.handleOpenModal();
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  componentWillUnmount() {
  }

  onSuccess(address) {
    this.setState({
      address: address,
      loaded:  true
    });
    this.handleOpenModal();
  }

  onFailure() {
    // TODO: error handling
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        <Loader loaded={this.state.loaded}/>
        <Modal 
          isOpen={this.state.showModal}
          style={modalCustomeStyles}
        >
          <h2>{this.state.address}</h2>
          <button onClick={this.handleCloseModal}>閉じる</button>
        </Modal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<App {...props} />, document.getElementById('root'))
