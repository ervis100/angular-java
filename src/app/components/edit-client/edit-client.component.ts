import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/general/Client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService
  ) { }

  client: Client;
  edit = true;

  editClientForm: FormGroup;
  name;
  email;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.edit = params['id'] !== undefined;
        if (this.edit) {
          this.clientService.getClient(params['id'])
            .subscribe(
              client => {
                this.client = new Client(client.name, client.email, client.id);
                this.editClientForm.get('email').setValue(this.client.email)
                this.editClientForm.get('name').setValue(this.client.name)
              }

            )
        }

      }
    )
    this.editClientForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.editClientForm.valid) {
      if (this.edit) {
        this.clientService.updateClient({ name: this.editClientForm.value.name, email: this.editClientForm.value.email }, this.client.id)
          .subscribe({
            next: result => {
              this.clientService.fetchClients(0, 5)
            },
            error: error => {

            }
          });
      } else {
        this.clientService.storeClient({ name: this.editClientForm.value.name, email: this.editClientForm.value.email })
          .subscribe({
            next: result => {
              this.clientService.fetchClients(0, 5)
            },
            error: error => {

            }
          });
      }
    }
  }

  onReset() {
    if (this.edit) {
      this.editClientForm.reset({
        email: this.client.email,
        name: this.client.name
      })
    } else {
      this.editClientForm.reset({
        email: '',
        name: ''
      })
    }
  }
}
