import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

// http://localhost:3333/appointments

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
