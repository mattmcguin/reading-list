import React, { Component } from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

const Main = styled.div`
    box-sizing: border-box;
    padding: 0;
    width: 60%;
    height: 100%;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    color: #222022;
    text-align: center;
`;

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Main>
                    <Title>Reading List</Title>
                    <BookList />
                </Main>
            </ApolloProvider>
        );
    }
}

export default App;
