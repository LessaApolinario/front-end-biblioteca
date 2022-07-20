import React from 'react';

import Book from '../ui/components/Book';
import BookFinder from '../ui/components/BookFinder';
import BookList from '../ui/components/BookList';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <h1 style={{textAlign: 'center', fontSize: 64}}>Livros</h1>
      <BookFinder />
      <BookList>
        <Book
          title='1984'
          author='Orwell,
          George'
          year='2009'
          localization='823
          O79m
          ex.1'
        />
        <Book
          title='1984'
          year='2009'
          localization='823
          O79m
          ex.2'
        />
      </BookList>
    </div>
  );
}

export default App;
