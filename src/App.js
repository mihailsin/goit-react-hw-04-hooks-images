import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

import Searchbar from './components/Searchbar';
import View from './components/View';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuery = inputValue => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleQuery} />
      <View searchQuery={searchQuery}></View>
      <ToastContainer />
    </div>
  );
};

export default App;
