import { Component } from '@angular/core';
import { MasterService } from "../services/master.service";
import * as _ from "lodash";
import { MessageService } from 'primeng/api';
import { UtilService } from "../../../shared/util.service";
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent {
  public loading = [false, false, false, false];
  public DimLists: any = [];
  public lists: any[] = [];
  public name: string = "";
  public desc: string = "";
  public buttonName: string = "Save";
  private id: number = 0;
  public CategoryLists = [];
  constructor(private MasterService: MasterService, private messageService: MessageService, private utilService: UtilService) {
    this.Load();
    this.utilService.GetProductCategory({}).then(response => {
      if (response.status) {
        this.CategoryLists = response.data;
      }
    });
  }

  /**
   * Add
   */
  public Add() {
    this.DimLists = [...this.DimLists, { length: "", height: "", width: "", time: "", desc: "", DimensionId: 0, ModelID: 0, category: null, categoryId: 0 }];

  }
  /**
   * Remove
   */
  public Remove(i: number) {
    this.DimLists.splice(i, 1);

  }

  /**
   * Load
   */
  public Load() {

    try {
      this.loading[0] = true;
      this.name = "";
      this.desc = "";
      this.DimLists = [];
      this.lists = [];
      this.buttonName = "Save";
      this.id = 0;
      this.MasterService.GetModelMaster({ Modelid: 0 }).then(response => {

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
      let filter: any[] = _.filter(this.DimLists, va => {
        return (Number(va.length) == 0 || Number(va.height) == 0 || Number(va.width) == 0)
      })
      if ((this.name).trim() == "" || !this.name) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter product  name.' });
        return;
      }
      else if (this.DimLists.length == 0 || filter.length > 0) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter dimensional  details.' });
        return;
      }
      this.loading[1] = true;
      if (this.id > 0) this.Update(); else this.SaveData()





    } catch (error) {
      console.log(error)

    }

  }
  /**
   * Save
   */
  public SaveData() {
    this.MasterService.ModelMasterSave({
      modelName: this.name,
      modelDescription: this.desc,
      dimension: this.DimLists
    }).then(response => {
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
      this.MasterService.ModelMasterUpdate({
        modelId: this.id,
        modelName: this.name,
        modelDescription: this.desc,
        dimension: this.DimLists
      }).then(response => {
        this.loading[1] = false;
        if (response.status) {
          this.Load();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
        }
      });

    } catch (error) {

    }//////

  }
  /**
   * ViewProduct
   */
  public ViewProduct(data: any) {
    try {
      this.loading[2] = true;
      this.MasterService.ViewModelMaster({ Modelid: data.ModelID }).then(response => {
        this.loading[2] = false;
        if (response.status) {
          // this.lists=response.data;
          if (response.data.length > 0) {
            if (response.data[0].length > 0 && response.data[1].length > 0) {
              this.buttonName = "Update";
              this.name = response.data[0][0].ModelName;
              this.desc = response.data[0][0].Description;
              this.id = response.data[0][0].ModelID;
              this.DimLists = response.data[1];
              this.DimLists = _.map(this.DimLists, (va: any) => {
                if (va.CategoryId && va.CategoryId > 0) {
                  va.category = { name: va.Category, value: va.CategoryId }

                }
                return va
              })

            }

          }
        }
      });

    } catch (error) {

    }
  }
  /**
   * ViewProduct
   */
  public DeleteProduct(data: any) {
    try {
      this.loading[3] = true;
      this.MasterService.DeleteModelMaster(data.ModelID).then(response => {
        this.loading[3] = false;
        if (response) {
          this.Load();
          if (response.status) {
            // this.lists=response.data;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        }
      });

    } catch (error) {

    }
  }

  /**
   * onChangeCategory
   */
  public onChangeCategory(data: any) {
    data.CategoryId = 0;
    if (data.category && data.category.value && data.category.value > 0) {
      data.CategoryId = data.category.value;
    }
  }

}
