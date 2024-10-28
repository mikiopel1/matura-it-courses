import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment'; // Import środowiska

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
})
export class UploadVideoComponent {
  selectedFile: File | null = null;
  videoUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${environment.apiUrl}/api/videos/upload`, formData, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        this.videoUrl = response;
      });
  }
}
