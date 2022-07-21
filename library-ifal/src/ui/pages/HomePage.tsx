import Book from "../components/Book";
import BookFinder from "../components/BookFinder";
import BookList from "../components/BookList";

function HomePage() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', fontSize: 64 }}>Livros</h1>
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
  )
}

export default HomePage
