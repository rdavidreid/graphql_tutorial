import React from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/client';
import {getBooksQuery} from '../queries/queries'

// Components
import BookDetails from './BookDetails'

function BookList() {
  const [selectedBook, setSelectedBook] = useState(null)
  const { loading, error, data } = useQuery(getBooksQuery)

  const displayBooks = (data) => {
    if(loading || error || !data || !data.books){
      return( <div>Loading books...</div> );
    } else {
      return data.books.map(book => {
        return(
          <li 
            key={ book.id } 
            onClick={() => setSelectedBook(book.id) }>
            {book.name}
          </li>
        )
      })
    }
  }

  return (
    <div>
      <ul id="book-list">
          {displayBooks(data)}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  )
}

export default BookList;
