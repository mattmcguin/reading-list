import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
import styled from "styled-components";
import AddBook from "./AddBook";

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: #004080;
    padding: 30px;
    overflow: auto;
    box-shadow: -2px -3px 5px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    color: #ffffff;

    @media (max-width: 700px) {
        position: relative;
        width: 100%;
        padding: 0;
    }
`;

const Book = styled.div`
    @media (max-width: 700px) {
        padding: 30px;
    }
`;

class BookDetails extends Component {
    renderBookDetails = () => {
        const { book } = this.props.data;

        if (book) {
            return (
                <Book>
                    <h2>{book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul>
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>
                </Book>
            );
        } else {
            return <Book>No Book Selected</Book>;
        }
    };

    render() {
        return (
            <Container>
                {this.renderBookDetails()}
                <AddBook />
            </Container>
        );
    }
}

export default graphql(getBookQuery, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        };
    }
})(BookDetails);
