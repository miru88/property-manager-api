import { Body, Controller, Put, Get, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from 'src/entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Public } from 'src/decorators/public.decorator';


@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    @Public()
    @Post('create')
    async createProperty(@Body() body: {property: CreatePropertyDto}) {

        const newPropertyInfo: Partial<CreatePropertyDto> = body.property;

        if(newPropertyInfo && newPropertyInfo.name && newPropertyInfo.address && newPropertyInfo.userId) {
            return await this.propertyService.createproperty(newPropertyInfo.name, newPropertyInfo.address, newPropertyInfo.userId);
        }

    }


    @Public()
    @Get('test')
    async test() {

    }
}
