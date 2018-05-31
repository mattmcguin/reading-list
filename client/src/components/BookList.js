import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import styled from "styled-components";
import BookDetails from "./BookDetails";

// Styled Components
const BookList = styled.ul`
    padding: 0;
`;

const Book = styled.li`
    display: inline-block;
    margin: 12px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #6ead3a;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    color: #6ead3a;
`;

class _BookList extends Component {
    state = {
        selected: null
    };

    renderBooks = () => {
        const { data } = this.props;

        if (data.loading) {
            return <div>Books are loading...</div>;
        } else {
            return data.books.map(book => {
                return (
                    <Book
                        key={book.id}
                        onClick={e => this.setState({ selected: book.id })}
                    >
                        {book.name}
                    </Book>
                );
            });
        }
    };

    render() {
        return (
            <div>
                <BookList>{this.renderBooks()}</BookList>
                <BookDetails bookId={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(_BookList);
