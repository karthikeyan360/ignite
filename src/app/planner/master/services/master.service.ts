import { Injectable } from '@angular/core';
import { CommonHttpService } from "../../../shared/common-http.service";
import { AppConstant } from 'src/app/app.constant';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpService:CommonHttpService) { }

  
  public async GetModelMaster(data:any): Promise<any>{
   return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.MODEL.GET,  data).then(res1=>{
     return res1;
    });
  }
  public async ModelMasterSave(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.MODEL.CREATE,  data).then(res1=>{
      return res1;
     });
   }
   public async ModelMasterUpdate(data:any): Promise<any>{
     return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.MODEL.UPDATE,  data).then(res1=>{
       return res1;
      });
    }
   public async ViewModelMaster(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.MODEL.VIEW,  data).then(res1=>{
      return res1;
     });
   }
   public async DeleteModelMaster(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.MODEL.DELETE,  data).then(res1=>{
      return res1;
     });
   }
   public async CustomerMasterSave(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.CREATE,  data).then(res1=>{
      return res1;
     });
   }
   public async CustomerMasterUpdate(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.UPDATE,  data).then(res1=>{
      return res1;
     });
   }
   public async GetCustomerMaster(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.GET,  data).then(res1=>{
      return res1;
     });
   }
   public async GetCategoryMaster(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.CATEGORY,  data).then(res1=>{
      return res1;
     });
   }
   public async GetCountryMaster(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.COUNTRY,  data).then(res1=>{
      return res1;
     });
   }
   public async ViewCustomerMaster(data:any): Promise<any>{
    return this.httpService.globalGetService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.VIEW,  data).then(res1=>{
      return res1;
     });
   }
   public async DeleteCustomerMaster(data:any): Promise<any>{
    return this.httpService.globalPostService(AppConstant.API_ENDPOINT+AppConstant.API_URL.MASTER.CUSTOMER.DELETE,  data).then(res1=>{
      return res1;
     });
   }
}
