import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<boolean> {
    // const appointment = await this.findOne({
    //   where: { date }
    // });

    const appointment = await this.findOne({ date });

    return appointment != undefined ? true : false;
  }
}

export default AppointmentsRepository;