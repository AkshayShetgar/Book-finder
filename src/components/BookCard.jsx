const BookCard = ({ books }) => {
  if (!books || books.length === 0) return;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6 w-full max-w-5xl">
      {books.map((book, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center"
        >
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="w-[200px] h-[250px] rounded-md"
          />
          <h3 className="font-bold mt-3 text-center ">{book.title}</h3>
          <p className="text-sm text-gray-600 font-bold">
            {book.author_name ? book.author_name[0] : 'Unknown Author'}
          </p>
          <p className="text-sm text-gray-500 font-bold">
            {book.first_publish_year || 'N/A'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
