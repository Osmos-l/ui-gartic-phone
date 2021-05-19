import { Component, Input,Output, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable,fromEvent } from 'rxjs';
import { Canvas } from '../../../models/canvas';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  @Output() changeWidthOk : EventEmitter<any> = new EventEmitter();
  @Output() resetOk : EventEmitter<any> = new EventEmitter();

  @ViewChild('drowArea') public canvasElement : ElementRef;
  canvasHTML : HTMLCanvasElement;
  canvas : Canvas;
  
  @Input() set colorStyle(newColor: string){
    this.canvas.setColor(newColor);
  }

  @Input() set changeWidth(generateNewWidth : boolean){
    this.canvas.newWidth();
    this.changeWidthOk.emit();
  }

  @Input() set resetCanvas(resetArea : boolean){
    this.canvas.clearContent();
    this.resetOk.emit();
  }
   

  @Input()
  clearContext : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  initCanvas(canvas: HTMLCanvasElement): Canvas{
    return new Canvas (canvas);
  }

  ngAfterViewInit(): void {
    this.canvasHTML = this.canvasElement.nativeElement;
    this.canvas = this.initCanvas(this.canvasHTML);
    console.log(this.canvas);
  }

  pointerDown(): void {
    this.canvas.clickOn();
  }

  pointerUp(): void {
    this.canvas.clickOff();
  }

  pointerMove(event? : PointerEvent): void {
    this.canvas.listeningPointerMove(event);
  }

  setColor(newColor : string){
    this.canvas.setColor(newColor);
  }

}
