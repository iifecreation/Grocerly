import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import NetworkError from './NetworkError';
import FullPageLoader from './FullPageLoader';

type GetRequestPageWrapperType = {
  response: {
    isError: boolean;
    isLoading: boolean;
    isFetching: boolean;
    refetch: unknown;
  };
  children: ReactNode;
};

const GetRequestPageWrapper = ({
  response,
  children,
}: GetRequestPageWrapperType) => {
  const isLoading = response?.isLoading || response?.isFetching;
  if (response?.isError) {
    return <NetworkError reload={response.refetch} />;
  }
  if (isLoading) {
    return <FullPageLoader />;
  }
  return children;
};

export default GetRequestPageWrapper;

const styles = StyleSheet.create({});
