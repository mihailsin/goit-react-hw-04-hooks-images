import React, { useState, useEffect, useRef } from 'react';
import fetchPictures from '../../services/';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Button from '../Button';
import Modal from '../Modal';

import { toast } from 'react-toastify';

const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

const View = ({ searchQuery }) => {
  const stateMachine = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };
  const { IDLE, PENDING, RESOLVED, REJECTED } = stateMachine;

  const [response, setResponse] = useState([]);
  const [length, setLength] = useState(0);
  const [status, setStatus] = useState(IDLE);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const prevQuery = useRef(searchQuery);

  useEffect(() => {
    if (searchQuery !== prevQuery.current) {
      setCurrentPage(1);
      setStatus(PENDING);
    }
    if (searchQuery.trim() !== '') {
      fetchPictures(searchQuery, currentPage)
        .then(data => {
          if (searchQuery !== prevQuery.current && currentPage === 1) {
            setResponse(data.hits);
            setLength(data.totalHits);
            prevQuery.current = searchQuery;
            setStatus(RESOLVED);
            if (data.hits.length === 0) {
              toast.error('Sorry! There are no pictures matching your query.');
            }
          }
          if (searchQuery === prevQuery.current && currentPage !== 1) {
            setResponse(prevResponse => [...prevResponse, ...data.hits]);
            setStatus(RESOLVED);
            scroll.scrollToBottom();
          }
        })
        .catch(error => {
          setStatus(REJECTED);
          console.log(error.message);
          toast.error(`${error.message}`);
        });
    }
  }, [PENDING, REJECTED, RESOLVED, currentPage, prevQuery, searchQuery]);

  const onButtonClickHandler = () => {
    setCurrentPage(page => page + 1);
  };

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const getUrl = url => {
    setLargeImageUrl(url);
  };

  const picturesLeft = length - response.length;
  return (
    <>
      {status === PENDING && <Loader />}
      {status === RESOLVED && response.length !== 0 && (
        <ImageGallery
          pictures={response}
          onClickHandler={toggleModal}
          getPictureUrl={getUrl}
        />
      )}
      {picturesLeft !== 0 && status !== PENDING && (
        <Button onClickHandler={onButtonClickHandler} />
      )}
      {modalVisibility && largeImageUrl && (
        <Modal url={largeImageUrl} closeModal={toggleModal}></Modal>
      )}
    </>
  );
};

export default View;
