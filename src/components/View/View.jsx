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
  const [response, setResponse] = useState([]);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const prevQuery = useRef(searchQuery);

  useEffect(() => {
    const setInitialState = () => {
      prevQuery.current = searchQuery;
      setIsLoading(true);
      setCurrentPage(1);
    };
    if (searchQuery.trim() !== '') {
      if (searchQuery !== prevQuery.current) {
        setInitialState();
      }
      fetchPictures(searchQuery, currentPage)
        .then(data => {
          if (currentPage === 1) {
            setResponse(data.hits);
          } else {
            setResponse(prevResponse => [...prevResponse, ...data.hits]);
          }

          if (data.totalHits === 0) {
            toast.error('Sorry! There are no pictures matching your query.');
          }

          setLength(data.totalHits);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error.message);
          toast.error(`${error.message}`);
          setIsLoading(false);
        });
    }
  }, [searchQuery, currentPage]);

  const onButtonClickHandler = () => {
    setCurrentPage(page => page + 1);
    scroll.scrollToBottom();
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
      {isLoading && <Loader />}
      {!isLoading && response.length !== 0 && (
        <ImageGallery
          pictures={response}
          onClickHandler={toggleModal}
          getPictureUrl={getUrl}
        />
      )}
      {picturesLeft !== 0 && !isLoading && (
        <Button onClickHandler={onButtonClickHandler} />
      )}
      {modalVisibility && largeImageUrl && (
        <Modal url={largeImageUrl} closeModal={toggleModal}></Modal>
      )}
    </>
  );
};

export default View;
