import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {

  try {
    const { provider, date } = req.body;

    const parseDate = parseISO(date);

    const createAppointmentService =
      new CreateAppointmentService();

    const appointment =
      await createAppointmentService.execute({ date: parseDate, provider });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});



export default appointmentsRouter;