import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('http://localhost:5173', () => {
    return HttpResponse.json({
      firstName: 'Fon',
      lastName: 'dant',
    });
  }),
];

export default handlers;
