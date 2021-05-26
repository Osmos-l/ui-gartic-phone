import { Component, Input,Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Canvas } from '../../../models/canvas';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Player } from 'src/models/player';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  
  @Output()
  resetOk : EventEmitter<any> = new EventEmitter();

  @Input()
  localPlayer: Player;

  @Input()
  game: Game;

  @ViewChild('drawArea') 
  public canvasElement : ElementRef;

  canvas : Canvas;
  
  @Input() 
  set colorStyle(newColor: string) {
    this.canvas.setColor(newColor);
  }

  @Input() 
  set updateThickness(thickness : number) {
    this.canvas.updateLineThickness(thickness);
  }

  @Input() 
  set resetCanvas(resetArea : boolean) {
    this.canvas.clearContent();
    this.resetOk.emit();
  }
   
  timer: number = 0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    setTimeout(() => {
      const canvasHtml = this.canvasElement.nativeElement;
      const drawData = canvasHtml.getContext("2d")
                                .getImageData(0, 0, canvasHtml.height, canvasHtml.width)
                                .data;
      this.gameService.sendDrawing(drawData, this.game.id, this.localPlayer);
    }, environment.time * environment.timerMsToSec)
  }

  initCanvas(canvas: HTMLCanvasElement): Canvas { 
    return new Canvas(canvas);
  }

  ngAfterViewInit(): void {
    const canvasHTML = this.canvasElement.nativeElement;
    this.canvas = this.initCanvas(canvasHTML);
  }

  pointerDown(): void {
    this.canvas.clickOn();
  }

  pointerUp(): void {
    this.canvas.clickOff();
  }

  pointerMove(event?: PointerEvent): void {
    this.canvas.listeningPointerMove(event);
  }

  setColor(newColor: string): void {
    this.canvas.setColor(newColor);
  }
}
