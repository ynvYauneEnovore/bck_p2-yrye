import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { SerieService } from './serie.service';
import { SerieEntity } from './entities/serie.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('serie')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  @ApiCreatedResponse({ type: SerieEntity })
  @ApiOperation({ summary: 'Crea un nuevo intérprete'})
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @Get()
  @ApiOkResponse({ type: SerieEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de intérpretes'})
  findAll() {
    return this.serieService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SerieEntity })
  @ApiOperation({ summary: 'Obtiene un intérprete con base al identificador'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serieService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SerieEntity })
  @ApiOperation({ summary: 'Actualiza los datos de un intérprete con base al identificador'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSerieDto: UpdateSerieDto,
  ) {
    return this.serieService.update(id, updateSerieDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un intérprete con base al identificador'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serieService.remove(id);
  }
}
