import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBook from './Components/List_Book'
import BookSearch from './Components/Book_Search'
import './App.css'

class BooksApp extends Component {
  state = {
    Books: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({Books: books})
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={({history}) => (
            <BookSearch
              onChange={this.updateBook}
              myBooks={this.state.Books}/>
          )}/>
        <Route
          exact
          path="/"
          render={() => (
            <ListBook
              books={this.state.Books}
              onChange={this.updateBook}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
