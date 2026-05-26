import { Component, ViewChild } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { UtilService } from "../../../shared/util.service";
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductionService } from "../services/production.service";
import * as _ from 'lodash';
import { EUOM } from 'src/app/app-enum';
@Component({
  selector: 'app-type-two-production-entry',
  templateUrl: './type-two-production-entry.component.html',
  styleUrls: ['./type-two-production-entry.component.scss']
})
export class TypeTwoProductionEntryComponent {
  @ViewChild('fullScreen') divRef: any;
  public loading = [false, false];
  public data: any = { model: "", shapeColour: '#19c279', box: 1, balPcs: 0 };
  public customerLists: any;
  public inputData: any[] = [
    {
      "position": {
        "name": "Standing",
        "value": 1
      },
      "loading": {
        "name": "Yes",
        "value": 1
      },
      "uom": {
        "name": "MM",
        "value": 1
      },
      "shape": {
        "name": "Cylinder",
        "value": 1
      },
      "length": null,
      "width": "100",
      "height": "420",
      "category": {
        "value": 1,
        "name": "Category 1"
      },
      "qty": 1,
      "volume": 13194689.15
    },
    {
      "position": {
        "name": "Standing",
        "value": 1
      },
      "loading": {
        "name": "Yes",
        "value": 1
      },
      "uom": {
        "name": "MM",
        "value": 1
      },
      "shape": {
        "name": "Cylinder",
        "value": 1
      },
      "length": null,
      "width": "140",
      "height": "380",
      "category": {
        "value": 1,
        "name": "Category 1"
      },
      "qty": 1,
      "volume": 23398582.08
    },
    {
      "position": {
        "name": "Standing",
        "value": 1
      },
      "loading": {
        "name": "Yes",
        "value": 1
      },
      "uom": {
        "name": "MM",
        "value": 1
      },
      "shape": {
        "name": "Cylinder",
        "value": 1
      },
      "length": null,
      "width": "120",
      "height": "190",
      "category": {
        "value": 1,
        "name": "Category 1"
      },
      "qty": 1,
      "index": 0,
      "name": "Category 1",
      "value": 1,
      "uomName": "MM",
      "uomId": 1,
      "loadingName": "Yes",
      "loadingId": 1,
      "volume": 8595397.5
    }
  ]
  public UomLists: any[] = [];
  public ShapeLists: any[] = [];
  items: MenuItem[] | undefined;
  CategoryLists: any = [];
  PositionLists = [{ name: 'Standing', value: 1 }, { name: 'Sleeping', value: 2 }];
  LoadingLists = [{ name: 'Yes', value: 1 }, { name: 'No', value: 2 }];
  public selectedCategory: any;
  private SelecteItem: any;


  activeIndex: number = 0;
  public scene$: any = {};
  public TypeTwoModelLists: any[] = [];
  SelectedItem: any;
  constructor(private UtilService: UtilService, private messageService: MessageService, private productionService: ProductionService) {
    this.UtilService.GetProductCategory({}).then(response => {
      if (response.status) {
        this.CategoryLists = response.data;
      }
    });
    this.items = [
      {
        label: 'Order',

      },
      {
        label: 'Models',

      },
      {
        label: 'View',

      },
      {
        label: 'Completed',

      },

    ];
    this.LoadUnitLists(); this.LoadShapeLists();

  }
  search(event: AutoCompleteCompleteEvent) {
    this.UtilService.GetCustomer({ CustomerName: event.query }).then(res => {
      if (res) {
        if (res.status) {
          this.customerLists = res.data;
        }
      }
    })
  }
  /**
 * LoadUnitLists
 */
  public LoadUnitLists() {
    this.UomLists = [];
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
   * add
   */
  public add() {
    if (this.ValidationForOrderDetails(true)) {
      this.inputData.push({ position: this.PositionLists[0], loading: this.LoadingLists[0] })
    }

  }

  private ValidationForOrderDetails(isAdd: boolean = false) {
    let isVaild = true;
    if ((!this.inputData || this.inputData.length == 0) && !isAdd) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Add Order Details' });
      isVaild = false;
    }
    else if (
      (_.filter(this.inputData, va => {
        if (!va.uom || !va.uom.value) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Uom' });
      isVaild = false;
    }
    else if (
      (_.filter(this.inputData, va => {
        if (!va.shape || !va.shape.value) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Shape' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if (!va.category || !va.category.value) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte category' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if ((!va.length || Number(va.length) == 0) && va.shape.value != 1) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte length' });
      isVaild = false;
    }
    else if (
      (_.filter(this.inputData, va => {
        if (!va.width || Number(va.width) == 0) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte width' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if (!va.height || Number(va.height) == 0) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte height' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if (!va.qty || Number(va.qty) == 0) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Qty' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if (!va.position || !va.position.value) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte position' });
      isVaild = false;
    }

    else if (
      (_.filter(this.inputData, va => {
        if (!va.loading || !va.loading.value) {
          return va
        }
      })).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Loading One Above Another One' });
      isVaild = false;
    }

    return isVaild

  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    // const elem = data.nativeElement;
    const elem = this.divRef.nativeElement;
    console.log(elem, elem.requestFullscreen);

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
  /**
   * Previous
   */
  public Previous() {
    switch (this.activeIndex) {
      case 1:
        this.activeIndex = 0;
        break;
      case 2:
        this.activeIndex = 1;
        break;
      case 3:
        this.activeIndex = 2;
        break;

      default:
        break;
    }

  }
  /**
  * Next
  */
  public Next() {
    console.log("inputdata", JSON.stringify(this.inputData));
    this.data.customername ={"name":"MM","value":1};
    switch (this.activeIndex) {
    
      case 0:
        if (!this.data || !this.data.customername || !this.data.customername.value) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Customer Name.' });
          return
        }
        else if (this.ValidationForOrderDetails()) {
          this.data.CategoryGroupQtyLists = [];

          let sortData = _.sortBy(this.inputData, f => { return (f.category.value && f.uom.value && f.loading.value) });
          sortData = _.sortedUniqBy(sortData, f => { return (f.category.value && f.uom.value && f.loading.value) });

          _.each(sortData, (va: any, i: number) => {
            const fa = _.filter(this.inputData, f => {
              return (f.category.value == va.category.value && f.uom.value == va.uom.value
                && f.loading.value == va.loading.value)
            });

            va.index = i;
            va.name = va.category.name;
            va.value = va.category.value;
            va.uomName = va.uom.name;
            va.uomId = va.uom.value;
            va.loadingName = va.loading.name;
            va.loadingId = va.loading.value;
            if (fa.length > 0) {
              let value = _.cloneDeep(va);
              value.totalQty = _.sumBy(fa, s => { return Number(s.qty) });
              value.allocatedQty = 0;
              value.balanceQty = value.totalQty - value.allocatedQty;
              value.itemDtls = _.map(fa, (m: any, i: number) => {
                let va = {
                  index: i,
                  uomId: m.uom.value,
                  shapeId: m.shape.value,
                  categoryId: m.category.value,
                  length: Number(m.length),
                  width: Number(m.width),
                  height: Number(m.height),
                  qty: m.qty,
                  position: m.position.value,
                  loading: m.loading.value,
                  volume : m.volume,
                }
                return va;
              })
              value.AllocatedtemDtls = [];
              value.BalanceItemDtls = value.itemDtls
              this.data.CategoryGroupQtyLists.push(value)
            }
          })
          this.activeIndex = 1
        }


        break;
      case 1:
        this.activeIndex = 2
        break;
      case 2:
        this.activeIndex = 3
        break;

      default:
        break;
    }
  }
  /**
   * onChangeCategory
   */
  public onChangeCategory(data: any) {
    data.categoryId = 0;
    if (data.category && data.category.value && data.category.value > 0) {
      data.categoryId = data.categoryId.value;
    }
  }

  /**
   * onChangeShape
   */
  public onChangeShape(data: any) {
    data.length = null;
    data.width = null;
    data.height = null;
    data.volume = 0;
  }

  /**
   * onChangeVolume
   */
  public onChangeVolume(data: any) {
    data.volume = 0;
    if(data.shape.value ==1){
      data.volume =_.round( Math.PI * data.width * data.width * data.height, 2);

    }
  }
  /**
   * Delete
   */
  public Delete(i: number) {
    this.inputData.splice(i, 1);
  }

  /**
   * Search
   */
  public Search() {
    this.TypeTwoModelLists = [];
    console.log(this.selectedCategory, this.data);

    if (this.selectedCategory === undefined || _.isEmpty(this.selectedCategory)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Selecte Any One Category' });
      return
    }
    let passParameter: any = {};
    passParameter.categoryId = this.selectedCategory.value;
    passParameter.balPcs = this.data.balPcs;
    passParameter.box = this.data.box;
    passParameter.ItemDetails = this.selectedCategory.BalanceItemDtls;
    console.log(JSON.stringify(passParameter));
    // this.productionService.GetTypeTwoModels({}).then(res=>{
    //   if(res){
    //     if(res.status){

    //     }

    //   }
    // })

    this.productionService.GetModelMaster({ categoryId: this.selectedCategory.value }).then(async res => {
      if (res) {
        if (res.status) {
          let data = [];
          data = res.data;
          _.each(data, async va => {
            va.boxDtls = [];
            va.itemDtls = [];
            if (va.ModelID === 14) {
              va.prodLength = va.Length;
              va.prodWidth = va.Width;
              va.prodHeight = va.Height;

              if (va.uomId == EUOM.cm) {
                va.prodLength = va.Length * 0.1;
                va.prodWidth = va.Width * 0.1;
                va.prodHeight = va.Height * 0.1;
              }

              if (va.uomId == EUOM.inch) {
                va.prodLength = va.Length * 0.03937008;
                va.prodWidth = va.Width * 0.03937008;
                va.prodHeight = va.Height * 0.03937008;
              }
              _.each(this.selectedCategory.BalanceItemDtls, (ba: any, i: number) => {
                ba.prodLength = va.prodLength;
                ba.prodWidth = va.prodWidth;
                ba.prodHeight = va.prodHeight;
                ba.allocatedLength = 0;
                ba.allocatedWidth = 0;
                ba.allocatedHeight = 0;
                ba.totalQtyPerBox = 0;
                ba.allocatedBox = 0;
                ba.allocatedQty = 0;
                ba.qty = Number(ba.qty)
                ba. diameter=ba.width;
                ba.quantity = ba.qty;
                ba.balQty = ba.qty - ba.allocatedQty;
                ba.radius =  ba. diameter;
                if (ba.shapeId == 1) {
                  ba.allocatedLength = Math.floor(ba.prodLength / (ba.width));
                  ba.allocatedWidth = Math.floor(ba.prodWidth / (ba.width));
                  ba.allocatedHeight = Math.floor(ba.prodHeight / (ba.height));
                  ba.totalQtyPerBox = (ba.allocatedLength * ba.allocatedWidth * ba.allocatedHeight);


                  // if (Number(ba.totalQtyPerBox) <= Number(ba.qty)) {
                  //   ba.allocatedBox = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)))

                  //   ba.allocatedQty = _.multiply(ba.totalQtyPerBox, ba.allocatedBox);
                  //   ba.balQty = ba.qty - ba.allocatedQty;
                  // }

                  // else if ( +ba.qty < +ba.totalQtyPerBox) {
                  //   ba.allocatedBox = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)))
                  //   ba.balQty = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)));
                  //   ba.allocatedQty = _.multiply(ba.qty, ba.allocatedBox);
                  //   }

                }


                va.itemDtls.push(_.clone(ba));


              });
              // this.SelectedItem = va;
              // await this.calcutionBalanceQty()
              this.TypeTwoModelLists.push(_.clone(va));
            }

          })
          console.log("JSON", JSON.stringify(this.TypeTwoModelLists));
// const Viewdata =this.packCylindricalItems(this.TypeTwoModelLists[0].itemDtls, this.TypeTwoModelLists[0]);
// console.log('Viewdata', Viewdata);

// const packedCylinders = await this.packCylindersInCarton(this.TypeTwoModelLists[0].itemDtls, this.TypeTwoModelLists[0].prodWidth, this.TypeTwoModelLists[0].prodHeight, this.TypeTwoModelLists[0].prodLength);
// console.log("Packed cylinders:", packedCylinders);
// setTimeout(async () => {
//   _.each(packedCylinders.jsonData,async va => {
//     const position =   await this.packCylindricalItemsIntoBox(va.BoxDtls,this.TypeTwoModelLists[0].prodLength,this.TypeTwoModelLists[0].prodWidth, this.TypeTwoModelLists[0].prodHeight)
//     console.log('position', position)

//   })
// }, 100);

const calculateTotalCylindricalBoxes = this .calculateTotalCylindricalBoxes(this.TypeTwoModelLists[0].prodLength,this.TypeTwoModelLists[0].prodWidth, this.TypeTwoModelLists[0].prodHeight, this.TypeTwoModelLists[0].itemDtls);
console.log('calculateTotalCylindricalBoxes', calculateTotalCylindricalBoxes)
          
        }
      }
    })

  }

   calculateTotalCylindricalBoxes(boxLength: number, boxWidth: number, boxHeight: number, cylinders: any[]) {

// Initialize an array to store details of each box
var boxes: any[] = [];

// Function to check if a given position is available within the box
 const isPositionAvailable = (position: { x: any; y: any; z: any; }, size: { width: any; height: any; depth: any; }) => {
    // Check if the position is within the box boundaries
    if (position.x < 0 || position.x + size.width > boxWidth || position.y < 0 || position.y + size.height > boxHeight || position.z < 0 || position.z + size.depth > boxLength) {
        return false;
    }
    // Check if the position overlaps with any already allocated object
    for (var i = 0; i < boxes.length; i++) {
        for (var j = 0; j < boxes[i].items.length; j++) {
            var item = boxes[i].items[j];
            if (position.x < item.position.x + item.size.width && position.x + size.width > item.position.x &&
                position.y < item.position.y + item.size.height && position.y + size.height > item.position.y &&
                position.z < item.position.z + item.size.depth && position.z + size.depth > item.position.z) {
                return false; // Position overlaps with an allocated object
            }
        }
    }
    return true; // Position is available
}

// Calculate the volume of a single box
var boxVolume = boxLength * boxWidth * boxHeight;

// Initialize variable to count the total volume of cylindrical objects
var totalCylinderVolume = 0;

// Calculate the total volume of all cylindrical objects
var cylinderQtys =[];
for (var i = 0; i < cylinders.length; i++) {
  cylinderQtys.push(cylinders[i].qty)
    var cylinderVolume = Math.PI * Math.pow(cylinders[i].radius, 2) * cylinders[i].height;
    totalCylinderVolume += cylinderVolume * cylinderQtys[i];
}

// Calculate the number of boxes needed to accommodate all cylindrical objects
var requiredBoxQty = Math.ceil(totalCylinderVolume / boxVolume);

// Allocate cylindrical objects into boxes
for (var i = 0; i < cylinders.length; i++) {
    var cylinderVolume = Math.PI * Math.pow(cylinders[i].radius, 2) * cylinders[i].height;
    var qtyInBox = Math.floor((cylinderVolume * cylinderQtys[i]) / boxVolume);
    var remainingQty = cylinderQtys[i];
    for (var j = 0; j < qtyInBox; j++) {
        var box:any = { id: boxes.length + 1, items: [], totalQty: 0 }; // Create a new box
        var position = { x: 0, y: 0, z: 0 }; // Starting position for each box
        while (remainingQty > 0 && position.y < boxHeight) {
            var size = { width: cylinders[i].radius * 2, height: cylinders[i].height, depth: cylinders[i].radius * 2 };
            if (isPositionAvailable(position, size)) {
                var itemQty = Math.min(Math.floor((cylinderVolume) / boxVolume), remainingQty);
                box.items.push({ type: "Cylinder " + (i + 1), position: { x: position.x, y: position.y, z: position.z }, quantity: itemQty, size: size });
                box.totalQty += itemQty;
                remainingQty -= itemQty;
            }
            position.x += cylinders[i].radius * 2; // Move to the next position along the x-axis
            if (position.x >= boxWidth) { // If reached the end of the box, move to the next row
                position.x = 0;
                position.z += cylinders[i].radius * 2;
                if (position.z >= boxLength) { // If reached the end of the box height, move to the next layer
                    position.z = 0;
                    position.y += cylinders[i].height;
                }
            }
        }
        boxes.push(box); // Add the box to the list of boxes
    }
}

// Output the details of each box and its allocated cylindrical objects
console.log("Box Details:");
boxes.forEach(function(box) {
    console.log("Box ID: " + box.id);
    console.log("Total Quantity: " + box.totalQty);
    box.items.forEach(function(item: { type: string; position: { x: string; y: string; z: string; }; quantity: string; }) {
        console.log("  Type: " + item.type + ", Position: (" + item.position.x + ", " + item.position.y + ", " + item.position.z + "), Quantity: " + item.quantity);
    });
});
}
  private async calcutionBalanceQty() {
    const This = this;
    return new Promise((resolve, reject) => {

      let filter = _.filter(This.SelectedItem.itemDtls, va => { return (va.balQty > 0 && va.totalQtyPerBox > 0) });
      let comnactionLists: any[] = [];
      if (filter.length > 0) {
       
        _.each(filter, va => {
          va.prodLength = (This.SelectedItem.prodLength - (va.balQty * va.width));
          va.prodWidth = (This.SelectedItem.prodWidth - (va.balQty * va.width));
          va.prodHeight = (This.SelectedItem.prodHeight - (va.balQty * va.height));
          va.combinItem = [];
          _.each((_.filter(This.SelectedItem.itemDtls, s => { return s.index != va.index })), (ba: any, i: number) => {
            ba.prodLength = va.prodLength;
            ba.prodWidth = va.prodWidth;
            ba.prodHeight = va.prodHeight;

            ba.allocatedLength = 0;
            ba.allocatedWidth = 0;
            ba.allocatedHeight = 0;
            ba.totalQtyPerBox = 0;
            ba.allocatedBox = 0;
            ba.allocatedQty = 0;
            ba.qty = Number(ba.balQty)
            ba.balQty = ba.qty;
            if (ba.shapeId == 1) {
              ba.allocatedLength = Math.floor(ba.prodLength / (ba.width));
              ba.allocatedWidth = Math.floor(ba.prodWidth / (ba.width));
              ba.allocatedHeight = Math.floor(ba.prodHeight / (ba.height));
              ba.totalQtyPerBox = (ba.allocatedLength * ba.allocatedWidth * ba.allocatedHeight);
              if(ba.totalQtyPerBox > 0) {
              if (ba.totalQtyPerBox > 0 && ba.totalQtyPerBox < ba.balQty) {

                ba.allocatedQty = ba.totalQtyPerBox;
              } else{
                ba.allocatedQty =   ba.balQty;
              }
             
            }
            va.combinItem .push(_.clone(ba));
          }
            });
            comnactionLists.push(_.clone(va));
        });

        console.log('comnactionLists', JSON.stringify(comnactionLists));
      } else {
        resolve(true);
      }
      // _.each(filter, va => {
      //   va.Length = ( this.SelectedItem.prodLength(va.allocatedLength * va.width));
      //   va.Width = ( this.SelectedItem.prodWidth(va.allocatedWidth * va.width));
      //   va.Height = (data.prodHeight(va.allocatedHeight * va.Height));
      //   va.boxDtls = [];
      //   _.each((_.filter(data.boxDtls, s => { return s.index != va.index })), (ba: any, i: number) => {
      //     ba.index = i;
      //     ba.prodLength = va.Length;
      //     ba.prodWidth = va.Width;
      //     ba.prodHeight = va.Height;

      //     ba.allocatedLength = 0;
      //     ba.allocatedWidth = 0;
      //     ba.allocatedHeight = 0;
      //     ba.totalQtyPerBox = 0;
      //     ba.allocatedBox = 0;
      //     ba.allocatedQty = 0;
      //     ba.qty = Number(ba.balQty)
      //     ba.balQty = ba.qty;
      //     if (ba.shapeId == 1) {
      //       ba.allocatedLength = Math.floor(ba.prodLength / (ba.width));
      //       ba.allocatedWidth = Math.floor(ba.prodWidth / (ba.width));
      //       ba.allocatedHeight = Math.floor(ba.prodHeight / (ba.height));
      //       ba.totalQtyPerBox = (ba.allocatedLength * ba.allocatedWidth * ba.allocatedHeight);

      //       if (Number(ba.totalQtyPerBox) <= Number(ba.qty)) {
      //         ba.allocatedBox = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)))

      //         ba.allocatedQty = _.multiply(ba.totalQtyPerBox, ba.allocatedBox);
      //         ba.balQty = ba.qty - ba.allocatedQty;
      //       }

      //       // else if ( +ba.qty < +ba.totalQtyPerBox) {
      //       //   ba.allocatedBox = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)))
      //       //   ba.balQty = this.beforeDecmialValue((_.divide(ba.qty, ba.totalQtyPerBox)));
      //       //   ba.allocatedQty = _.multiply(ba.qty, ba.allocatedBox);
      //       //   }

      //     }


      //     va.boxDtls.push(_.clone(ba));


      //   });


      // })

    });
  }
  private beforeDecmialValue(va: any) {
    var value = parseInt(va.toString().split(".")[0], 10);//before
    return value ? value : 0;
  }

  private afterDecmialValue(va: any) {
    var value = parseInt(((va.toString().split(".")[1]).split('')[0]), 10);//after
    return value ? value : 0;
  }
  /**
   * addModels
   */
  public addModels(data: any) {

    const find = _.find(data, va => {
      return va.categoryId === this.selectedCategory.value;
    });
    if (find != undefined && !_.isEmpty(find)) {
      const index = _.indexOf(this.TypeTwoModelLists, find, 1);
      if (index !== -1) {

      }
    }

  }

 





 
}