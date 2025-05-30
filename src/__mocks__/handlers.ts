import { http, HttpResponse } from 'msw';

import { events } from '../__mocks__/response/events.json' assert { type: 'json' };
import { Event } from '../types';

export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json({ events });
  }),

  http.post('/api/events', async ({ request }) => {
    const newEvent = (await request.json()) as Event;
    newEvent.id = String(events.length + 1);
    return HttpResponse.json(newEvent, { status: 201 });
  }),

  http.put('/api/events/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedEvent = (await request.json()) as Event;
    const index = events.findIndex((event) => event.id === id);

    return index !== -1
      ? HttpResponse.json({ ...events[index], ...updatedEvent })
      : new HttpResponse(null, { status: 404 });
  }),

  http.delete('/api/events/:id', ({ params }) => {
    const { id } = params;
    const index = events.findIndex((event) => event.id === id);

    return index !== -1
      ? new HttpResponse(null, { status: 204 })
      : new HttpResponse(null, { status: 404 });
  }),

  http.post('/api/events-list', async ({ request }) => {
    const newEvent = (await request.json()) as Event;
    newEvent.id = String(events.length + 1);
    return HttpResponse.json(newEvent, { status: 201 });
  }),

  http.put('/api/events-list', async ({ request }) => {
    const updatedEvent = (await request.json()) as Event;
    const index = events.findIndex((event) => event.id === updatedEvent.repeat.id);

    return index !== -1
      ? HttpResponse.json({ ...events[index], ...updatedEvent })
      : new HttpResponse(null, { status: 404 });
  }),

  http.delete('/api/events-list/:id', ({ params }) => {
    const { id } = params;
    const index = events.findIndex((event) => event.id !== id);

    return index !== -1
      ? new HttpResponse(null, { status: 204 })
      : new HttpResponse(null, { status: 404 });
  }),
];
