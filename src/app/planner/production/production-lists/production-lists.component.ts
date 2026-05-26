import { Component } from '@angular/core';
import { ProductionService } from "../services/production.service";
@Component({
  selector: 'app-production-lists',
  templateUrl: './production-lists.component.html',
  styleUrls: ['./production-lists.component.scss']
})
export class ProductionListsComponent {
  public lists:any[]=[];
  constructor (private ProductionService :ProductionService){
   this.load();
  }
  /**
   * load
   */
  public load() {
    this.lists = [];
    this.ProductionService.GetProductionLists({}).then(response => {
      if (response.status) {
        this.lists = response.data;
      }
    });
  }

}
