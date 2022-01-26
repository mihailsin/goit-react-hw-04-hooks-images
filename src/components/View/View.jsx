import React, { Component } from 'react';
import api from '../../services/';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Button from '../Button';
import Modal from '../Modal';

import { toast } from 'react-toastify';

const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

class View extends Component {
  state = {
    response: [],
    length: 0,
    status: 'idle',
    showModal: false,
    largeImageUrl: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery &&
      this.props.searchQuery.trim() !== ''
    ) {
      this.setState({ status: 'pending' });
      api.resetPage();
      try {
        const data = await api.fetchPictures(this.props.searchQuery);
        if (data.hits.length === 0) {
          toast.error('Sorry! There are no pictures matching your query.');
        }
        this.setState({
          response: data.hits,
          length: data.totalHits,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        console.log(error.message);
        toast.error(`${error.message}`);
      }
    }
  }

  onButtonClickHandler = async () => {
    api.pageIncrement();
    try {
      const data = await api.fetchPictures(this.props.searchQuery);
      this.setState(prevState => {
        return {
          response: [...prevState.response, ...data.hits],
          status: 'resolved',
        };
      });
      scroll.scrollToBottom();
    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error.message);
      toast.error(`${error.message}`);
    }
  };

  toggleModal = e => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  getUrl = url => {
    this.setState({ largeImageUrl: url });
  };

  render() {
    const { response, length, status, showModal, largeImageUrl } = this.state;
    const picturesLeft = length - response.length;
    return (
      <>
        {status === 'pending' && <Loader />}
        {status === 'resolved' && response.length !== 0 && (
          <ImageGallery
            pictures={response}
            onClickHandler={this.toggleModal}
            getPictureUrl={this.getUrl}
          />
        )}
        {picturesLeft !== 0 && status !== 'pending' && (
          <Button onClickHandler={this.onButtonClickHandler} />
        )}
        {showModal && largeImageUrl && (
          <Modal url={largeImageUrl} closeModal={this.toggleModal}></Modal>
        )}
      </>
    );
  }
}

export default View;
