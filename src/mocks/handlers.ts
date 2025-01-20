import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000', () => {
    return HttpResponse.json({
      firstName: 'Sechan',
      lastName: 'Park',
    });
  }),
];
