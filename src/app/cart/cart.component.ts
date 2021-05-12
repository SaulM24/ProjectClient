import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: string;
  brand: string;
  color: string;
  size: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  tshirts: [any];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
    // this.createCar('tshirt', { make: 'Tesla', model: 'X'});
    //this.updateCar('tshirt/id/1', { make: 'Ford', model: 'Fiesta'});

  }

  async refresh() {
    this.tshirts = await this.getTshirt('tshirt');
  }

  //getCars('tshirt');
  async getTshirt(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }

  async createTshirt() {
    const tshirt = {
      brand: null,
      color: null,
      size: null,
      price: null
    };
    const resp = await this.http.post('tshirt', tshirt);
    if (resp) {
     // this.refresh();
     this.tshirts.unshift(resp);
    }
    else {
      this.toastService.showToast('danger', 3000, 'Tshirt creation failed!');
    }
    return resp;
  }

  async updateTshirt(tshirt: any) {
    const resp = await this.http.put(`tshirt/id/${tshirt.id}`, tshirt);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Tshirt updated successfully!');
    }
    return resp;
  }

  async removeTshirt(tshirt: any, index: number) {
    //this.tshirts.splice(index, 1);
    const resp = await this.http.delete(`tshirt/id/${tshirt.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Delete tshirt failed!');
    }
  }

}
