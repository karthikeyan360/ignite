import { Component } from '@angular/core';
import { MasterService } from "../services/master.service";
import * as _ from "lodash";
import { MessageService } from 'primeng/api';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  public loading = [false, false, false, false];
  public countryLists: any[] = [];
  public lists: any[] = [];

  public buttonName: string = "Save";
  private id: number = 0;
  public data: any = {};
  public categoryLists: any;
  constructor(private MasterService: MasterService, private messageService: MessageService) {
    this.MasterService.GetCategoryMaster({ Categoryname: '%' }).then(response => {
      this.categoryLists = [];

      if (response.status) {
        this.categoryLists = response.data;
      }
    });
    this.Load();
  }

  searchCountry(event: AutoCompleteCompleteEvent) {


    this.MasterService.GetCountryMaster({ CountryName: event.query }).then(response => {
      this.countryLists = [];

      if (response.status) {
        this.countryLists = response.data;
      }
    });

  }
  /**
   * Load
   */
  public Load() {

    try {
      this.loading[0] = true;
      this.data = {
        // customerName:"",
        // shortName:"",
        // address1:"",
        // address2:"",
        // address3:"",

        // address4:"",
        // zibCode:"",
        // mobile:"",
        // email:"",
        // gstin:"",

      };
      this.lists = [];
      this.buttonName = "Save";
      this.id = 0;
      this.MasterService.GetCustomerMaster({ CustomerId: 0 }).then(response => {

        this.loading[0] = false;
        if (response.status) {
          this.lists = response.data;
        }
      });
    } catch (error) {

    }
  }
  /**
   * save
   */
  public save() {
    try {

      if (!this.data || _.isEmpty(this.data)) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please customer details.' });
        return;
      }
      else if (this.data.category == undefined || !this.data.category) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Category.' });
        return;
      }
      else if (this.data.customerName == undefined || (this.data.customerName).trim() == "" || !this.data.customerName) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter customer  name.' });
        return;
      }
      else if (this.data.mobile == undefined || (this.data.mobile).trim() == "" || !this.data.mobile) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter mobile  number.' });
        return;
      }


      // this.loading[1] = true;
      this.data.categoryId=this.data.category.value;
      this.data.CountryId=this.data.country?.value ? this.data.country?.value : 0;
      if(this.id > 0) this.Update();else this.SaveData()





    } catch (error) {
      console.log(error)

    }

  }
  /**
   * Save
   */
  public SaveData() {
    this.MasterService.CustomerMasterSave(this.data).then(response => {
      this.loading[1] = false;
      if (response.status) {
        this.Load();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
      }
    });
  }
  private Update() {
    try {
      this.MasterService.CustomerMasterUpdate(this.data).then(response => {
        this.loading[1] = false;
        if (response.status) {
          this.Load();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      });

    } catch (error) {

    }

  }
  /**
   * ViewProduct
   */
  public ViewProduct(data: any) {
    try {
      this.loading[2] = true;
      this.data={};
      this.buttonName = "Save";
      this.id =0;
      this.MasterService.ViewCustomerMaster({ CustomerId: data.customerid }).then(response => {
        this.loading[2] = false;
        
        if (response.status) {
          // this.lists=response.data;
          if (response.data.length > 0) {
            if (response.data[0].length > 0 && response.data[0][0]) {
              this.buttonName = "Update";
              this.data=response.data[0][0];
              this.data.category={name: this.data.category,value:this.data.CategoryId};
             
              if(this.data.CountryId  > 0){
                this.data.country={name: this.data.countyName,value:this.data.CountryId};
              }else{ this.data.country=undefined;}
              
              this.id = response.data[0][0].customerid;


            }

          }
        }
      });

    } catch (error) {
console.log(error)
    }
  }
  /**
   * ViewProduct
   */
  public DeleteProduct(data: any) {
    try {
      this.loading[3] = true;
      this.MasterService.DeleteCustomerMaster(data.customerid ).then(response => {
        this.loading[3] = false;
        if (response) {
          if (response.status) {
            // this.lists=response.data;
            this.Load();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        }
      });

    } catch (error) {

    }
  }

}
