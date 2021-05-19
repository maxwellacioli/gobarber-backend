import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import User from '../models/User';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appointmentExists =
      await appointmentsRepository.findByDate(appointmentDate);

    if (appointmentExists) {
      throw Error('Already exists an appointment with same date');
    }

    const appointment = appointmentsRepository.create({
      date: appointmentDate,
      provider_id
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;