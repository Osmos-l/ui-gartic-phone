import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  sendCreate(gameId: string) : void {
    this.socket.emit('create', gameId);
  }

  sendJoin(gameId: string): void {
    this.socket.emit('join', gameId);
  }

  sendStart(gameId: string): void {
    this.socket.emit('start', gameId);
  }

  getJoinResp(): Observable<Game> {
    return this.socket.fromEvent<Game>('game');
  }

  sendWriteMoment(gameId: string, player: Player): void {
    this.socket.emit('writeMoment', { gameId, player });
  }

  sendDrawMoment(gameId: string): void {
    this.socket.emit('drawMoment', gameId);
  }
}
