import { inject } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environment/config';
import { InMemoryCache } from '@apollo/client/cache';

export const apollo = () => {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({
      uri: environment.apiUrl + '/graphql',
    }),
    cache: new InMemoryCache(),
    ssrMode: false,
  };
};
