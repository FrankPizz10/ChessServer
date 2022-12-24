import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Player } from "./player.model";

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    async addPlayer(userName: string, password: string, elo: number) {
        const newPlayer = new this.playerModel({
            userName: userName, 
            password: password,
            elo: elo,
        });
        const result = await newPlayer.save();
        return result.id as string;
    }

    async getPlayers() {
        const players = await this.playerModel.find().exec();
        return players.map(player => ({
            id: player.id,
            userName: player.userName,
            password: player.password,
            elo: player.elo,
        }));
    }

    async getPlayerByID(playerId: string) {
        const player = await this.findPlayerById(playerId);
        return {
            id: player.id,
            userName: player.userName,
            password: player.password,
            elo: player.elo,
        }
    }

    async getPlayerByUserName(userName: string) {
        const player = await this.findPlayerByUserName(userName);
        return {
            id: player.id,
            userName: player.userName,
            password: player.password,
            elo: player.elo,
        }
    }

    async updatePlayerById(
        playerId: string, 
        newUserName: string, 
        newPassowrd: string, 
        newElo: number
    ) {
        const updatedPlayer = await this.findPlayerById(playerId);
        if (newUserName) {
            updatedPlayer.userName = newUserName;
        }
        if (newPassowrd) {
            updatedPlayer.password = newPassowrd;
        }
        if (newElo) {
            updatedPlayer.elo = newElo;
        }
        updatedPlayer.save();
    }

    async updatePlayerByUserName(
        userName: string,
        newUserName: string,
        newPassowrd: string,
        newElo: number
    ) {
        const updatedPlayer = await this.findPlayerByUserName(userName);
        if (newUserName) {
            updatedPlayer.userName = newUserName;
        }
        if (newPassowrd) {
            updatedPlayer.password = newPassowrd;
        }
        if (newElo) {
            updatedPlayer.elo = newElo;
        }
        updatedPlayer.save();
    }

    async deletePlayerById(playerId: string) {
        const result = await this.playerModel.deleteOne({ _id: playerId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find player.');
        }
    }

    async deletePlayerByUserName(userName: string) {
        const result = await this.playerModel.deleteOne({ userName: userName }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find player.');
        }
    }

    private async findPlayerById(playerId: string): Promise<Player> {
        let player;
        try {
            player = await this.playerModel.findById(playerId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find player.');
        }
        if (!player) {
            throw new NotFoundException('Could not find player.');
        }
        return player;
    } 
    
    private async findPlayerByUserName(userName: string): Promise<Player> {
        let player;
        try {
            player = await this.playerModel.findOne({ userName: userName }).exec();
        } catch (error) {
            throw new NotFoundException('Could not find player.');
        }
        if (!player) {
            throw new NotFoundException('Could not find player.');
        }
        return player;
    }
}