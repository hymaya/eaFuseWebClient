import {Injectable} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../components/login/login.component';


@Injectable()
export class LoginModalService {
  private _closeResult: string;

  constructor(private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      this._closeResult = `Closed with: ${result}`;
      console.log(this._closeResult);
    }, (reason) => {
      this._closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this._closeResult);
    });
    return modalRef;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  get closeResult(): string {
    return this._closeResult;
  }
}
