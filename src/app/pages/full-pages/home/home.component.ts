import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'app/core/model/customer.model';
import { CustomerService } from 'app/core/services/customer.service';
import { Subscription, Observable } from 'rxjs';





@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces:true
})

export class HomeComponent implements OnInit {
  isLoaded: boolean = false;
  customerselected: any = {
    name:"",
    email:"",
    birthDate: "",
  } 
  teste = "teste"
  customers:  Customer [] 
  public form: FormGroup;
  
  
  constructor(private cdr: ChangeDetectorRef,
    private modalService: NgbModal,  
    private customerService:CustomerService
  ) {  
  }


    open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       },
    );
  }

  openEdit(customer, content ) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     console.log("result")  }, (reason)=> { 
      this.customerselected = {
        name:"",
        email:"",
        birthDate: "" ,
      } 
     }
    );

    
    console.log("escreva: "  ,customer )
    
    this.customerselected = customer
  }



  saveEdit() { 

    this.customerService.update(this.customerselected).subscribe(()=>{
    
      })

    console.log ("testando123")
  } 
  
  
  save() {
    console.log( "customerselected" ,this.customerselected)
   const birthdateFormated = new Date  ( this.customerselected.birthDate)
    this.customerselected.birthDate = birthdateFormated
    this.customerService.create(this.customerselected).subscribe(()=> {


      
    }) 

    this.customerselected = {
      name:"",
      email:"",
      birthDate: new Date (),
    } 
  }

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }
// }


  ngOnInit(): void {
    
    this.customerService.get().subscribe((data)=>{
        console.log(data)
        this.customers = data 
        console.log ("customers: ",this.customers)
    }) 
  }  
}
