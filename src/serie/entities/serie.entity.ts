import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('series')
export class SerieEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 250 })
  titulo: string;

  @Column({ length: 5000 })
  sinopsis: string;

  @Column({ length: 100 })
  director: string;

  @Column({ type: 'int' })
  duracion: number;

  @Column({ type: 'date' })
  fecha_estreno: Date;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;
}
