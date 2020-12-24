import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Com o Entity iremos tornar um model como algo que irá ser salvo no banco de dados

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
