import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { SocketService } from 'src/services/socket.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @Input()
  game: Game;

  color: string;
  newWidth: boolean = false;
  resetDrawArea: boolean = false;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.sendDrawMoment(this.game.id);
  }

  changeColor(newColor: string) {
    this.color = newColor;
  }

  resetCanvas(): void {
    this.resetDrawArea = true;
  }

  changeWidthCanvas(): void {
    this.newWidth = true;
  }

  changeWidthOk(): void {
    this.newWidth = false;
  }

  resetOk(): void {
    this.resetDrawArea = false;
  }

}
