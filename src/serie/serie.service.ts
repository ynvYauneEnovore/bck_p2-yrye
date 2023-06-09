import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { SerieEntity } from './entities/serie.entity';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(SerieEntity)
    private serieRepository: Repository<SerieEntity>,
  ) {}

  async create(
    createSerieDto: CreateSerieDto,
  ): Promise<SerieEntity> {
    const existe = await this.serieRepository.findOneBy({
      titulo: createSerieDto.titulo.trim(),
      sinopsis: createSerieDto.sinopsis.trim(),
      director: createSerieDto.director.trim(),
      duracion: createSerieDto.duracion,
      fecha_estreno: createSerieDto.fecha_estreno,

    });

    if (existe) {
      throw new ConflictException(`El intérprete ${createSerieDto.titulo} ya existe.`);
    }

    return this.serieRepository.save({
      titulo: createSerieDto.titulo.trim(),
      sinopsis: createSerieDto.sinopsis.trim(),
      director: createSerieDto.director.trim(),
      duracion: createSerieDto.duracion,
      fecha_estreno: createSerieDto.fecha_estreno,
    });
  }

  async findAll(): Promise<SerieEntity[]> {
    return this.serieRepository.find();
  }

  async findOne(id: number): Promise<SerieEntity> {
    const serie = await this.serieRepository.findOneBy({id});

    if (!serie) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSerieDto) {
    const serie = await this.serieRepository.findOneBy({id});

    if (!serie) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    const serieUpdate = Object.assign(serie, updateSerieDto);
    return this.serieRepository.save(serieUpdate);
  }

  async remove(id: number) {
    const existe = await this.serieRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return this.serieRepository.delete(id);
  }
}
