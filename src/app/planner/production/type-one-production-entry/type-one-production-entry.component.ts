import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { VisualizationService } from 'src/app/services/visualization.service';
import {  UtilService} from "../../../shared/util.service";

import { Router } from '@angular/router';
import * as ThreeJS from 'three';
import * as _ from "lodash";

import { MessageService } from 'primeng/api';
const fadeInAnimation = trigger('fadeIn', [
  state('void', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition('void => *', [
    animate('.5s ease-out')
  ])
]);
import { ProductionService } from "../services/production.service";
import { AutoCompleteCompleteEvent, ESHAPE, EUOM } from 'src/app/app-enum';
@Component({
  selector: 'app-type-one-production-entry',
  templateUrl: './type-one-production-entry.component.html',
  styleUrls: ['./type-one-production-entry.component.scss'],
  animations: [fadeInAnimation],
})
export class TypeOneProductionEntryComponent {
  constructor(private router:Router,private UtilService:UtilService,private messageService:MessageService,private _visualizationService: VisualizationService, private ProductionService: ProductionService) {
    this.LoadModelLists();

    this.LoadUnitLists();
    this.LoadShapeLists();

  }
  @ViewChild('fullScreen') divRef:any;
  public loading = [false, false];
  public ProductLists: any[] = [];
  public scene$: any = {};
  public data: any = { model: "",shapeColour:'#19c279'};
  public ModelLists: any[] = [];
  public UomLists: any[] = [{ name: "cm", value: 1 }, { name: "mm", value: 2 }, { name: "inch", value: 3 }];
  public ShapeLists: any[] = [{ name: "Cyliender", value: 1 }, { name: "Reactangle ", value: 2 }];
  public customerLists:any;
  public showLoad:boolean =false;
public totalpcsperbox:number=0;
public JsonFormateData:any;

search(event: AutoCompleteCompleteEvent) {
 this.UtilService.GetCustomer({CustomerName:event.query}).then(res => {
  if (res) {
    if (res.status) {
      this.customerLists = res.data;
    }
  }
})
}

  /**
   * LoadModelLists
   */
  public LoadModelLists() {
    this.ProductionService.GetModelMaster({categoryId : 0}).then(res => {
      if (res) {
        if (res.status) {
          this.ModelLists = res.data;
        }
      }
    })

  }
  /**
   * LoadUnitLists
   */
  public LoadUnitLists() {
    this.UomLists=[];
    this.UtilService.GetUnit({}).then(res => {
      if (res) {
        if (res.status) {
          this.UomLists = res.data;
        }
      }
    })

  }

   /**
   * LoadShapeLists
   */
   public LoadShapeLists() {
    this.ShapeLists = [];
    this.UtilService.GetShape({}).then(res => {
      if (res) {
        if (res.status) {
          this.ShapeLists = res.data;
        }
      }
    })

  }

  /**
   * save
   */
  public save() {
    try {
      if(!this.data || _.isEmpty(this.data)){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please production details.' });
        return;
      } else  if( this.data.customername == undefined ||  !this.data.customername){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Customer Name.' });
         return;
      }
      else  if( this.JsonFormateData == undefined ||  _.isEmpty(this.JsonFormateData)){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please click Generate Button.' });
         return;
      }
      // let PassData:any={
      //   customeId:this.data.customername.value,
      //   modelId:this.data.model.id,
      //   uom:this.data.uom.value,
      //   shapeId:this.data.shape,
      //   length:0,
      //   height:0,
      //   width:0,
      //   customeraddress:"",
      //   shapeColour:"",
      //   uomConvertBoxLength:this.data.customername.value,
      //   uomConvertBoxWidth:this.data.customername.value,
      //   uomConvertBoxHeight:this.data.customername.value,
      //   shapeLength:0,
      //   shapeWidth:0,
      //   shapeHeight:0,
      //   totalaLoadQty:0,
      //   jsonFormateData:[]

      // }
     
      let PassData:any = {};
      PassData.priority=[{
        modelId:this.data.model.id,
        shapeId:this.data.shape.value,
        priority :1,
        // Add New
        length:this.data.model.ConvertLength,
        height:this.data.model.ConvertHeight,
        width: this.data.model.ConvertWidth,
      }];
      PassData.productionType = 1;
      PassData.customerId = this.data.customername.value;
      PassData.unitId = this.data.uom.value;
      PassData.description = '';

      PassData.prod =[];
      _.each(this.JsonFormateData.container.goods , va=>{
        PassData.prod.push(
          {
            modelId:this.data.model.id,
            shapeId:this.data.shape.value,
            length : va.length,
            height : va.height,
            width : va.width,
            qty : 1,
            remarks : va.colour,
            priority : va.index,
            x : va.xCoord,
            y : va.yCoord,
            z : va.zCoord,
            colour : va.colour
          }
        );
      });

      console.log(PassData);
      this.ProductionService.Save(PassData).then(res=>{
        if(res){
          if (res.status) {
            
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.router.navigate(['production/list']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        }
      })
      
      
    } catch (error) {
      
    }

  }
  /**
   * Load
   */
  public Load() {

  }
  /**
   * onChangeModel
   */
  // public onChangeModel(event: any) {
  //   console.log(this.data, event);
  //   this.Load3DImage();
  // }
  /**
   * Load3DImage
   */

  public ConvetUOM() {
    try {
     
      if(this.data?.uom?.value > 0 && this.data?.model?.id > 0){
        this.data.model.ConvertHeight=this.data.model.Height;
        this.data.model.ConvertLength=this.data.model.Length ;
        this.data.model.ConvertWidth=this.data.model.Width;
        if(this.data?.uom?.value  == EUOM.cm){
          this.data.model.ConvertHeight=this.data.model.Height *0.1;
          this.data.model.ConvertLength=this.data.model.Length *0.1;
          this.data.model.ConvertWidth=this.data.model.Width *0.1;
        }
        if(this.data?.uom?.value  == EUOM.inch){
          this.data.model.ConvertHeight=this.data.model.Height *0.03937008;
          this.data.model.ConvertLength=this.data.model.Length *0.03937008;
          this.data.model.ConvertWidth=this.data.model.Width *0.03937008;
        }

      }
      
    } catch (error) {
      
    }
    
  }
  /**
   * ClearImage
   */
  public ClearImage() {
   this.JsonFormateData={};
    this.scene$ =null;
  }
  public Load3DImage() {
    try {
      
      this.data.totalcylienderpcsperbox = 0;
      this.data.totalcyliender = 0;
      this.JsonFormateData ={};
      if (this.data && this.data.model?.Height > 0 && this.data.model?.Length > 0 && this.data.model?.Width > 0 && this.data.cylienderdia > 0 && this.data.cylienderheight > 0 && this.data?.shape?.value == 1) {
        this.showLoad = true;
        let convertLength=this.data.model.ConvertLength;
        let converWidth=this.data.model.ConvertWidth;
        let ConverHeigth=this.data.model.ConvertHeight;
        let convetcylienderdia=this.data.cylienderdia;
        let convertcylienderheight=this.data.cylienderheight;

        if(this.data?.uom?.value  == EUOM.cm){
          ConverHeigth=this.data.model.ConvertHeight *10;
          convertLength=this.data.model.ConvertLength *10;
          converWidth=this.data.model.ConvertWidth *10;
          convetcylienderdia=this.data.cylienderdia*10;
          convertcylienderheight=this.data.cylienderheight*10;
        }
        if(this.data?.uom?.value  == EUOM.inch){
          ConverHeigth=this.data.model.ConvertHeight *25.4;
          convertLength=this.data.model.ConvertLength *25.4;
          converWidth=this.data.model.ConvertWidth *25.4;
          convetcylienderdia=this.data.cylienderdia*25.4;
          convertcylienderheight=this.data.cylienderheight*25.4;

          convertLength= _.round(convertLength);
          converWidth= _.round(converWidth);
          ConverHeigth= _.round(ConverHeigth);
          convetcylienderdia= _.round(convetcylienderdia);
          convetcylienderdia= _.round(convetcylienderdia);

        }

        let length: number = Math.floor(this.data.model?.ConvertLength / (this.data.cylienderdia ));
        let height: number = Math.floor(this.data.model?.ConvertHeight / this.data.cylienderheight);
        let width: number = Math.floor(this.data.model?.ConvertWidth / (this.data.cylienderdia ));
        this.data.totalcylienderpcsperbox = (length * height * width);
        this.data.totalcyliender = this.data.totalcylienderpcsperbox * (Number(this.data?.noofBox));
        this.data.totalLengthCyliender = length;
        this.data.totalHeigthCyliender = height;
        this.data.totalWidthCyliender = width;
        this.JsonFormateData = this._visualizationService.TypeOneJsonFormate(Number(convertLength),
          Number(converWidth),
          Number(ConverHeigth),
          Number(convetcylienderdia),
          Number(convertcylienderheight), this.data.shapeColour,this.data?.shape?.value);
        console.log("JSON formate", JSON.stringify(this.JsonFormateData))
        // this._visualizationService.configureSolutionScene(this.currentSolution$,  new ThreeJS.Scene() , 'rgb(238,238,238)').then(res=>{
        this._visualizationService.configureSolutionScene(this.data?.shape?.value,this.JsonFormateData, new ThreeJS.Scene(), this.data.shapeColour).then(res => {
          console.log(res)
      
          if (res) {
            this.scene$ = res.scene;
          }
          this.showLoad = false;
        });
      }
      
      
      
      
      
      else if (this.data && this.data.model?.Height > 0 && this.data.model?.Length > 0 && this.data.model?.Width > 0 
        && this.data.width > 0 && this.data.heigth > 0  && this.data.length > 0 && this.data?.shape?.value == ESHAPE.reactangle) {
          this.showLoad = true;
      //Convert UOM
      let convertLength=this.data.model.ConvertLength;
      let converWidth=this.data.model.ConvertWidth;
      let ConverHeigth=this.data.model.ConvertHeight;
      let convetShapeLength=this.data.length;
      let convertShapeWidth=this.data.width;
      let convertShapeHeigth=this.data.heigth;

      if(this.data?.uom?.value  == EUOM.cm){
        ConverHeigth=this.data.model.ConvertHeight *10;
        convertLength=this.data.model.ConvertLength *10;
        converWidth=this.data.model.ConvertWidth *10;
        convetShapeLength=this.data.length*10;
        convertShapeWidth=this.data.width*10;
        convertShapeHeigth=this.data.heigth*10;
      }

      if(this.data?.uom?.value  == EUOM.inch){
        ConverHeigth=this.data.model.ConvertHeight *25.4;
        convertLength=this.data.model.ConvertLength *25.4;
        converWidth=this.data.model.ConvertWidth *25.4;
        convetShapeLength=this.data.length*25.4;
        convertShapeWidth=this.data.width*25.4;
        convertShapeHeigth=this.data.heigth*25.4;

        convertLength= _.round(convertLength);
        converWidth= _.round(converWidth);
        ConverHeigth= _.round(ConverHeigth);
        convetShapeLength= _.round(convetShapeLength);
        convertShapeWidth= _.round(convertShapeWidth);
        convertShapeHeigth= _.round(convertShapeHeigth);

      }
        let length: number = Math.floor(this.data.model?.ConvertLength / (this.data.length));
        let height: number = Math.floor(this.data.model?.ConvertHeight / (this.data.heigth));
        let width: number = Math.floor(this.data.model?.ConvertWidth / (this.data.width));
        this.data.totalcylienderpcsperbox = (length * height * width);
        this.totalpcsperbox =  this.data.totalcylienderpcsperbox;
        this.data.totalcyliender = this.data.totalcylienderpcsperbox * (Number(this.data?.noofBox));
        this.data.totalLengthCyliender = length;
        this.data.totalHeigthCyliender = height;
        this.data.totalWidthCyliender = width;

       this.JsonFormateData= this._visualizationService.TypeOneReactangelandsqureJsonFormate(Number(convertLength),
          Number(converWidth),
          Number(ConverHeigth),
          Number(convetShapeLength),
          Number(convertShapeWidth), Number(convertShapeHeigth),this.data.shapeColour,this.data?.shape?.value);

          this._visualizationService.configureSolutionScene(this.data?.shape?.value, this.JsonFormateData, new ThreeJS.Scene(), 'rgb(238,238,238)').then(res => {
            console.log(res)
            if (res) {
              this.scene$ = res.scene;
            }
            this.showLoad = false;
          });
      }else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill mandatory fields.' });
      }
    } catch (error) {

    }

  }
  /**
   * OnchageShape
   */
  // public OnchageShape(event: any) {
  //   console.log("event", event, this.data);
  // }
  /**
   * onChangeWidth
   */
  public onChangeWidth() {
    try {
      if (this.data?.shape?.value == 3) {
        this.data.length = this.data.width;
      }

    } catch (error) {

    }

  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    // const elem = data.nativeElement;
    const elem = this.divRef.nativeElement;
    console.log(elem,elem.requestFullscreen);

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
}
