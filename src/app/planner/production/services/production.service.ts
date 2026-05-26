import { Injectable } from '@angular/core';

import { CommonHttpService } from "../../../shared/common-http.service";
import { AppConstant } from 'src/app/app.constant';
@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private httpService:CommonHttpService) { }

  
  public async GetModelMaster(data:any): Promise<any>{
   return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.PRODUCTION.GETMODELS,  data).then(res1=>{
     return res1;
    });
  }

  public async GetProductionLists(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.PRODUCTION.LIST,  data).then(res1=>{
      return res1;
     });
   }
   public async Save(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.PRODUCTION.SAVE,  data).then(res1=>{
      return res1;
     });
   }

   public async GetTypeTwoModels(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.PRODUCTION.TYPETWO.GETMODELS,  data).then(res1=>{
      return res1;
     });
   }
}
