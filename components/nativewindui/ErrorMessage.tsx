import React from 'react';
import {Text} from './Text';

export default function ErrorMessage({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) {
  return (
    <Text className="text-sm font-bold text-rose-500">{errorMessage}</Text>
  );
}
