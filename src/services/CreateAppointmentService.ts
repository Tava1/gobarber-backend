import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // Aplicando a regra de negocio.

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked');

    // Apenas cria a instâcia
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Salva no banco de dados passando a instâcia
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
