import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
    getAuthorsQuery,
    addBookMutation,
    getBooksQuery
} from "../queries/queries";
import styled from "styled-components";

const AddBookContainer = styled.div`
    background: #ffffff;
    color: #222022;
    padding: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;

    @media (max-width: 700px) {
        position: relative;
    }
`;

const Title = styled.h2`
    margin: 5px 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Field = styled.div`
    display: flex;
    width: 100%;
`;

const Label = styled.label`
    display: flex;
    width: 30%;

    @media (max-width: 700px) {
        display: none;
    }
`;

const Input = styled.input`
    margin: 4px;
    padding: 6px;
    width: 70%;
    @media (max-width: 700px) {
        width: 100%;
    }
`;

const Select = styled.select`
    margin: 4px;
    width: 74%;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

const Button = styled.button`
    font-size: 1rem;
    width: 5rem;
    color: #ffffff;
    background: #6ead3a;
    cursor: pointer;
    margin: 12px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ceccce;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
`;

class AddBook extends Component {
    state = {
        name: "",
        genre: "",
        authorId: ""
    };

    renderAuthors = () => {
        const data = this.props.getAuthorsQuery;

        if (data.loading) {
            return <option>Loading authors...</option>;
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    };

    submitForm = e => {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    };

    render() {
        return (
            <AddBookContainer>
                <Title>Add Book</Title>
                <Form onSubmit={this.submitForm}>
                    <Field>
                        <Label>Book name:</Label>
                        <Input
                            type="text"
                            placeholder="Book Name"
                            onChange={e =>
                                this.setState({ name: e.target.value })
                            }
                        />
                    </Field>
                    <Field>
                        <Label>Genre:</Label>
                        <Input
                            type="text"
                            placeholder="Genre"
                            onChange={e =>
                                this.setState({ genre: e.target.value })
                            }
                        />
                    </Field>
                    <Field>
                        <Label>Author:</Label>
                        <Select
                            onChange={e =>
                                this.setState({ authorId: e.target.value })
                            }
                        >
                            <option>Select author</option>
                            {this.renderAuthors()}
                        </Select>
                    </Field>
                    <Button>Add</Button>
                </Form>
            </AddBookContainer>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
