import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {getAuthorsQuery, addBookMutation} from '../queries/queries'
import { useState } from 'react'

function AddBook() {
  const [addBookState, setAddBookState] = useState({name: '', genre: '', authorId: ''})

  const { loading, error, data } = useQuery(getAuthorsQuery)
  const [addBook] = useMutation(addBookMutation)

  const displayAuthors = (data) => {

    if(loading || error || !data || !data.authors){
      return('')
    } else {
      return data.authors.map(author => {
          return( <option key={ author.id } value={author.id}>{ author.name }</option> )
      })
    }
  }

  const submitForm = (e) =>{
    e.preventDefault()
    addBook({
      variables: {
        name: addBookState.name,
        genre: addBookState.genre,
        authorId: addBookState.authorId
      }
    });  
  }

  return (
    <form id="add-book" onSubmit={ submitForm } >
      <div className="field">
        <label>Book name:</label>
        <input 
          type="text" 
          onChange={ (e) => setAddBookState({...addBookState, name: e.target.value }) } 
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input 
          type="text" 
          onChange={ (e) => setAddBookState({ ...addBookState, genre: e.target.value }) } 
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select 
          onChange={ (e) => setAddBookState({ ...addBookState, authorId: e.target.value }) } 
        >
          <option>Select author</option>
          { displayAuthors(data) }
        </select>
      </div>
      <button>+</button>
    </form>
  )
}

export default AddBook
