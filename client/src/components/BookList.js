import React from 'react'
import { useQuery } from '@apollo/client';
import {getBooksQuery} from '../queries/queries'

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery)
  console.log(data)

  const displayBooks = (data) => {
    if(loading || error || !data || !data.books){
      return( <div>Loading books...</div> );
    } else {
      return data.books.map(book => {
        return(
          <li key={ book.id }>{ book.name }</li>
        )
      })
    }
  }

  return (
    <div>
      <ul id="book-list">
          {displayBooks(data)}
      </ul>
    </div>
  )
}

export default BookList;
