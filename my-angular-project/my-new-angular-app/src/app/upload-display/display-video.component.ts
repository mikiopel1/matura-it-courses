import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
})
export class DisplayVideoComponent {
  @Input() videoUrl: string = '';
}
