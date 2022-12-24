import { Body, Param, Controller, Get, Post, Patch, Delete } from "@nestjs/common";
import { PlayersService } from "./players.service";

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}
    
    @Post()
    async addNewPlayer(
        @Body('userName') userName: string, 
        @Body('password') password: string, 
        @Body('elo') elo: number
    ) {
        const generatedId = await this.playersService.addPlayer(userName, password, elo);
        return { id: generatedId };
    }

    @Get()
    async getAllPlayers() {
        const players = await this.playersService.getPlayers();
        return players;
    }

    @Get(':id')
    async getPlayerById(@Param('id') playerId: string) {
        return await this.playersService.getPlayerByID(playerId);
    }

    @Get('getByUserName/:userName')
    async getPlayerByUserName(@Param('userName') userName: string) {
        const player = await this.playersService.getPlayerByUserName(userName);
        return player;
    }

    @Patch(':id')
    async updatePlayerById(
        @Param('id') playerId: string,
        @Body('newUserName') newUserName: string,
        @Body('newPassowrd') newPassowrd: string,
        @Body('newElo') newElo: number
    ) {
        await this.playersService.updatePlayerById(playerId, newUserName, newPassowrd, newElo);
        return null;
    }

    @Patch('updateByUserName/:userName')
    async updatePlayerByUserName(
        @Param('userName') userName: string,
        @Body('newUserName') newUserName: string,
        @Body('newPassowrd') newPassowrd: string,
        @Body('newElo') newElo: number
    ) {
        await this.playersService.updatePlayerByUserName(userName, newUserName, newPassowrd, newElo);
        return null;
    }

    @Delete(':id')
    async removePlayerById(@Param('id') playerId: string) {
        await this.playersService.deletePlayerById(playerId);
        return null;
    }

    @Delete('deleteByUserName/:userName')
    async removePlayerByUserName(@Param('userName') userName: string) {
        await this.playersService.deletePlayerByUserName(userName);
        return null;
    }
}