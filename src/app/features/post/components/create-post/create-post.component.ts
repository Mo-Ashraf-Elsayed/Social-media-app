import {
  Component,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-create-post',
  imports: [NgbDatepickerModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postsService = inject(PostsService);
  private readonly formData = new FormData();
  private modalService = inject(NgbModal);
  body = new FormControl('', [Validators.required]);
  image!: File;
  closeResult: WritableSignal<string> = signal('');
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  getFile(e: Event) {
    if (e.target && 'files' in e.target) {
      const input = e.target as HTMLInputElement;
      if (input.files) {
        this.image = input.files[0];
      }
    }
  }
  createPost() {
    const formData = new FormData()
    if (this.body.value) {
    this.formData.append('body', this.body.value || '');
    }
    if (this.image) {
      this.formData.append('image', this.image);
    }
    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  resetBodyInput() {
    this.body.setValue('');
  }
  submitForm() {
    if (this.body.valid || this.image) {
      this.createPost();
      this.body.setValue('');
    }
  }
}
