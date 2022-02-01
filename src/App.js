import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import fetchPictures from './services';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';

import { toast } from 'react-toastify';

const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [response, setResponse] = useState([]);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      if (currentPage === 1) setIsLoading(true);
      fetchPictures(searchQuery, currentPage)
        .then(data => {
          setResponse(prevResponse => [...prevResponse, ...data.hits]);
          setLength(data.totalHits);
          scroll.scrollToBottom();
          if (data.totalHits === 0) {
            toast.error('Sorry! There are no pictures matching your query.');
          }
        })
        .catch(error => {
          console.log(error.message);
          toast.error(`${error.message}`);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    if (!searchQuery) return;
    if (searchQuery.trim() !== '') {
      fetchData();
    }
  }, [searchQuery, currentPage]);

  const onButtonClickHandler = () => {
    setCurrentPage(page => page + 1);
  };

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const getUrl = url => {
    setLargeImageUrl(url);
  };

  const handleQuery = inputValue => {
    setSearchQuery(inputValue);
    setCurrentPage(1);
    setResponse([]);
  };

  const picturesLeft = length - response.length;
  return (
    <div className="App">
      <Searchbar onSubmit={handleQuery} />
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
      <ToastContainer />
    </div>
  );
};

export default App;
