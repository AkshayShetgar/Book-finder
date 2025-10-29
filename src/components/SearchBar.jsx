import axios from 'axios';
import React, { useState } from 'react';
import BookCard from './BookCard';

function SearchBar() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  const fetchBooks = async () => {
    if (!query) {
      setError('Please enter a search term');
      setBooks([]);
      return;
    }

    setLoading(true);
    setBooks([]);
    setError('');

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );

      console.log('API Response:', response.data);

      if (response.data.docs.length === 0) {
        setError('No books found');
      } else {
        setBooks(response.data.docs);
      }
    } catch (error) {
      setError('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  const clearQuery = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === '') {
      setBooks([]);
      setError('');
      setCurrentPage(1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">📚 Book Finder</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={clearQuery}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {loading && <p className="text-gray-600">Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}{' '}
      <div>{query && <BookCard books={currentBooks} />}</div>
      {books.length > 0 && (
        <div className="mt-6 flex gap-2 mb-10">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map(
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
