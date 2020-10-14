import { ApolloProvider } from "@apollo/react-hooks";
import { AUTH } from "apollo/queries";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import Nprogress from "nprogress";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { initializeApollo, useApollo } from "../apollo";
import initializeStore from "../redux";
import cookies from "next-cookies";


const MyApp = ({ Component, pageProps }) => {
  const store = initializeStore(pageProps.store);
  const apolloClient = useApollo(pageProps.apollo);

  return (
    <Fragment>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </Fragment>
  );
};

MyApp.getInitialProps = async (appctx) => {
  let { ctx } = appctx;
  const reduxStore = initializeStore();
  let apolloClient = initializeApollo();

  let token;
  let user;

  const pageProps = await App.getInitialProps(appctx);

  const accessToken = cookies(ctx) || null;
  if (accessToken.token) {
    token = accessToken.token;
    apolloClient = initializeApollo(null, token);
    try {
      const { data } = await apolloClient.query({
        query: AUTH,
      });
      if (data) {
        user = data.auth;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    pageProps: {
      ...pageProps,
      store: reduxStore.getState(),
      apollo: apolloClient.cache.extract(),
      user,
    },
  };
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
