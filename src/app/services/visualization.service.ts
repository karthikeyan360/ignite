import { Injectable } from '@angular/core';

import * as ThreeJS from 'three';

import { defaultGoodEdgeColor, infinityReplacement } from '../globals';
import { v4 as generateGuid } from 'uuid';
// import * as ThreeJS_addon from "../../assets/three-addons/build/three-addons.min.js"
import { ESHAPE } from '../app-enum';


// import { IPositionedElement } from '../interfaces/i-positioned.interface';
// import { IPosition } from '../interfaces/i-position.interface';
// import { Store } from '@ngrx/store';
// import { ISolution } from '../interfaces/i-solution.interface';
// import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
// import getContainerPosition from '../methods/get-container-position.shared-methods';
// import { selectGroups } from '../store/selectors/i-group.selectors';



@Injectable()
export class VisualizationService {
  nextUnitSize = [
    { unit: 'mm', next: 10, threshold: 100 },
    { unit: 'cm', next: 100, threshold: 100 },
    { unit: 'm', next: 1000, threshold: 1000 },
    { unit: 'km', next: null, threshold: null },
  ];
  constructor() { }

  /**
   * TypeOneJsonFormate
   */
  public TypeOneJsonFormate(containerLength: number, containerWidth: number, containerHeight: number, CylinderDia: number,
    CylinderHeight: number, colour: string, shape: number): any {
    try {

      CylinderDia = (CylinderDia / 2)
      let length: number = Math.floor(containerLength / (CylinderDia * 2));
      let height: number = Math.floor(containerHeight / CylinderHeight);
      let width: number = Math.floor(containerWidth / (CylinderDia * 2));
      let TotalCylinder: number = (length * height * width);
      // alert(TotalCylinder)
      // let TotalCylinder: number = 4;
      let Json: any = {};
      Json.container = {
        xCoord: 0,
        yCoord: 0,
        zCoord: 0,
        height: containerHeight,
        width: containerWidth,
        length: containerLength,
        unit: "mm",
        goods: []
      };
      let MultipluyXaxis: number = 1;
      let MultipluYaxis: number = 0;
      let MultipluyZaxis: number = 0;



      for (let index = 1; index <= TotalCylinder; index++) {
        let pushValue: any = {
          id: generateGuid(),
          height: CylinderHeight,
          width: CylinderDia,//Width Use for Dia for cyclinder
          length: 0,//Not Use length shoew value is 0
          rotated: false,
          xCoord: 0,
          yCoord: 0,
          zCoord: 0,
          group: "b100811a-76b0-4313-8823-87d4b290f84b",
          colour: colour,
          sequenceNr: index,
          index: index,
          rCoord: (CylinderDia * 2),
          tCoord: CylinderHeight,
          fCoord: (CylinderDia * 2),
          ShapeId: shape

        };




        if (Json.container.goods.length > 0) {





          if (((index - 1) % width) == 0) {
            pushValue.xCoord = 0;
            MultipluyZaxis++;



            pushValue.rCoord = (CylinderDia * 2);

            pushValue.zCoord = Json.container.goods[Json.container.goods.length - 1].fCoord;
            pushValue.fCoord = Json.container.goods[Json.container.goods.length - 1].fCoord + (CylinderDia * 2);
            pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].yCoord;
            pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;

          }

          else {
            pushValue.xCoord = Json.container.goods[Json.container.goods.length - 1].rCoord;
            pushValue.rCoord = Json.container.goods[Json.container.goods.length - 1].rCoord + (CylinderDia * 2)

            pushValue.zCoord = Json.container.goods[Json.container.goods.length - 1].zCoord;
            pushValue.fCoord = Json.container.goods[Json.container.goods.length - 1].fCoord;

            pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;
            pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].yCoord;
          }



        }


        if (MultipluyZaxis == length) {
          console.log(MultipluyZaxis, length, index);
          MultipluyZaxis = 0;
          pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;
          pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord + CylinderHeight;

          pushValue.xCoord = 0;
          pushValue.zCoord = 0;

          pushValue.rCoord = (CylinderDia * 2);
          pushValue.fCoord = (CylinderDia * 2);
          // console.log(MultipluyZaxis,length,index,Json.container.goods[Json.container.goods.length-1]);


        }





        Json.container.goods.push(pushValue)

      }


      return Json
      // GetJoson(containerLength,containerWidth,containerHeight, (CylinderDia/2),CylinderHeight)

    } catch (error) {
      console.log(error)
    }


  }
  /**
  * TypeOneJsonFormate
  */
  public TypeOneReactangelandsqureJsonFormate(containerLength: number, containerWidth: number, containerHeight: number, boxlength: number, boxwidth: number, boxheight: number
    , colour: string, shape: number): any {
    try {

      let length: number = Math.floor(containerLength / boxlength);
      let height: number = Math.floor(containerHeight / boxheight);
      let width: number = Math.floor(containerWidth / boxwidth);
      let TotalCylinder: number = (length * height * width);
      // alert(TotalCylinder)
      // let TotalCylinder: number = 4;
      let Json: any = {};
      Json.container = {
        xCoord: 0,
        yCoord: 0,
        zCoord: 0,
        height: containerHeight,
        width: containerWidth,
        length: containerLength,
        unit: "mm",
        goods: []
      };
      let MultipluyXaxis: number = 1;
      let MultipluYaxis: number = 0;
      let MultipluyZaxis: number = 0;



      for (let index = 1; index <= TotalCylinder; index++) {
        let pushValue: any = {
          id: generateGuid(),
          height: boxheight,
          width: boxwidth,//Width Use for Dia for cyclinder
          length: boxlength,//Not Use length shoew value is 0
          rotated: false,
          xCoord: 0,
          yCoord: 0,
          zCoord: 0,
          group: "b100811a-76b0-4313-8823-87d4b290f84b",
          colour: colour,
          sequenceNr: index,
          index: index,
          rCoord: boxwidth,
          tCoord: boxheight,
          fCoord: boxlength,
          ShapeId: shape

        };




        if (Json.container.goods.length > 0) {





          if (((index - 1) % width) == 0) {
            pushValue.xCoord = 0;
            MultipluyZaxis++;



            pushValue.rCoord = boxwidth;

            pushValue.zCoord = Json.container.goods[Json.container.goods.length - 1].fCoord;
            pushValue.fCoord = Json.container.goods[Json.container.goods.length - 1].fCoord + boxlength;
            pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].yCoord;
            pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;

          }

          else {
            pushValue.xCoord = Json.container.goods[Json.container.goods.length - 1].rCoord;
            pushValue.rCoord = Json.container.goods[Json.container.goods.length - 1].rCoord + boxwidth

            pushValue.zCoord = Json.container.goods[Json.container.goods.length - 1].zCoord;
            pushValue.fCoord = Json.container.goods[Json.container.goods.length - 1].fCoord;

            pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;
            pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].yCoord;
          }



        }


        if (MultipluyZaxis == length) {
          console.log(MultipluyZaxis, length, index);
          MultipluyZaxis = 0;
          pushValue.yCoord = Json.container.goods[Json.container.goods.length - 1].tCoord;
          pushValue.tCoord = Json.container.goods[Json.container.goods.length - 1].tCoord + boxheight;

          pushValue.xCoord = 0;
          pushValue.zCoord = 0;

          pushValue.rCoord = boxwidth;
          pushValue.fCoord = boxlength;
          // console.log(MultipluyZaxis,length,index,Json.container.goods[Json.container.goods.length-1]);


        }





        Json.container.goods.push(pushValue)

      }


      return Json
      // GetJoson(containerLength,containerWidth,containerHeight, (CylinderDia/2),CylinderHeight)

    } catch (error) {
      console.log(error)
    }


  }

  public async configureSolutionScene(ShapeType: number, solution: any, scene: ThreeJS.Scene = new ThreeJS.Scene(), fillColor: boolean | string = false, addBaseGrid: boolean = true, addUnloadingArrow: boolean = true) {
    scene.clear();

    let goodMeshes: { goodId: string, mesh: ThreeJS.Mesh }[] = [];
    if (!!solution?.container) {
      if (fillColor) {

        // scene.background = new ThreeJS.Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
        scene.background = new ThreeJS.Color('rgb(238,238,238)');
      }
      const containerPosition = getContainerPosition(solution.container);
      const containerResult: any = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');

      // containerResult.edges.isObject3D=false;
      scene.add(containerResult.edges);

      // const groups = await selectSnapshot(this._store.select(selectGroups));
      const groups = [{ "id": "b100811a-76b0-4313-8823-87d4b290f84b", "sequenceNumber": 1, "color": "#ff0066", "desc": "Test AG" }, { "id": "a630887e-b30c-497e-9535-ce7670797453", "sequenceNumber": 2, "color": "#554e4e", "desc": "Beispiel SE" }]
      // let good =solution.container!.goods[0];
      for (let good of solution.container!.goods) {
        const group = groups.find(group => group.id === good.group);

        const goodResult = VisualizationService.generateFilledBoxMesh(ShapeType, getContainerPosition(good), (typeof good.colour === 'string' ? good.colour : 'rgb(255,255,255)'), 'good', containerPosition);
        goodResult.mesh.userData['goodId'] = good.id;
        goodResult.mesh.userData['groupId'] = good.group;
        goodMeshes.push({ goodId: good.id, mesh: goodResult.mesh });
        scene.add(goodResult.edges, goodResult.mesh);
      }
      // if (addBaseGrid) {
      //   scene.add(VisualizationService.getContainerBaseGrid(solution.container.height, solution.container.length));
      // scene.background = new ThreeJS.Color(0xff0000); // red+++++--    // }
      if (addUnloadingArrow) {
        scene.add(VisualizationService.getContainerUnloadingArrow(solution.container.height, solution.container.length));
      }
    }
    return { scene, goodMeshes };
  }

  public static generateFilledBoxMesh(ShapeType: number, position: any, surfaceColor: string, type: string, relativeToParent?: any, borderColor: string = defaultGoodEdgeColor, borderWidth: number = 0) {
    let geometry = null
   
    if (ShapeType == 1) {
      geometry = new ThreeJS.CylinderGeometry(position.width, position.width, position.height, 64, 64, false);
    } else if (ShapeType == ESHAPE.reactangle) { geometry = new ThreeJS.BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length); }
    else {
      geometry = new ThreeJS.PlaneGeometry(position.width, position.height);
    }




    const material = new ThreeJS.MeshBasicMaterial({ color: surfaceColor });

    const mesh = new ThreeJS.Mesh(geometry, material);
    let relativePosition = null;
    // mesh.rotation.x = Math.PI/2;
    if (ShapeType == ESHAPE.cyliender) relativePosition = this.calculateRelativePositionCylinder(position, relativeToParent);
    else relativePosition = this.calculateRelativePosition(position, relativeToParent);

    // console.log("relativePosition for filled box", relativePosition, position, relativeToParent);
    // relativePosition.xCoord=0;
    // relativePosition.yCoord=0;
    // relativePosition.zCoord=0;

    mesh.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
    mesh.userData = { type: type };

    const edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(mesh.geometry),
      new ThreeJS.LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
    edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
    edges.userData = { type: type, positionId: position.id };
    // edges.rotation.x = Math.PI/2;

    return { mesh, edges };
  }
  public static calculateRelativePositionCylinder(position: any, relativeToParent?: any): any {
    // console.log("calculateRelativePositionCylinder", position, relativeToParent);
    return {
      xCoord: relativeToParent ? position.xCoord! - (relativeToParent.width! / 2) + (position.width!) : position.xCoord,
      yCoord: relativeToParent ? position.yCoord! - (relativeToParent.height! / 2) + (position.height! / 2) : position.yCoord,
      zCoord: relativeToParent ? position.zCoord! - (relativeToParent.length! / 2) + (position.width!) : position.zCoord
    }
  }
  public static calculateRelativePosition(position: any, relativeToParent?: any): any {
    return {
      xCoord: relativeToParent ? position.xCoord! - (relativeToParent.width! / 2) + (position.width! / 2) : position.xCoord,
      yCoord: relativeToParent ? position.yCoord! - (relativeToParent.height! / 2) + (position.height! / 2) : position.yCoord,
      zCoord: relativeToParent ? position.zCoord! - (relativeToParent.length! / 2) + ((position.length === Infinity ? infinityReplacement : position.length!) / 2) : position.zCoord
    }
  }

  public static generateOutlinedBoxMesh(position: any, type: string, relativeToParent?: any, borderColor: string = defaultGoodEdgeColor, borderWidth: number = 1) {

    const geometry = new ThreeJS.BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length);


    const edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(geometry), new ThreeJS.LineBasicMaterial({
      color: borderColor,
      linewidth: 0
    }));
    const relativePosition = this.calculateRelativePosition(position, relativeToParent);
    // console.log("relativePosition", relativePosition, position, relativeToParent);
    edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);

    edges.userData = { type: type, positionId: position.id };

    return { edges };
  }


  public static getContainerUnloadingArrow(containerHeight: number, containerLength: number, arrowColor: string = "#e33268") {
    const from = new ThreeJS.Vector3(0, (containerHeight / -2), (containerLength / 2));
    const to = new ThreeJS.Vector3(0, (containerHeight / -2), (containerLength / 2) + 1000);
    const direction = to.clone().sub(from);
    const length = direction.length();
    const arrowHelper = new ThreeJS.ArrowHelper(direction.normalize(), from, length, arrowColor, (.2 * length), ((.2 * length) * .5));
    return arrowHelper;
  }
  public static getContainerLengthFont(containerHeight: number, containerLength: number, arrowColor: string = "#e33268") {
    // new ThreeJS_addon.TextGeometry( containerHeight, {

    //   size: 80,
    //   height: 5,
    //   curveSegments: 12,
    //   bevelEnabled: true,
    //   bevelThickness: 10,
    //   bevelSize: 8,
    //   bevelOffset: 0,
    //   bevelSegments: 5
    // } );

  }

  public static getContainerBaseGrid(containerHeight: number, containerLength: number): ThreeJS.GridHelper {
    const gridHelper = new ThreeJS.GridHelper(1.5 * containerLength, 0, "");
    gridHelper.position.set(0, (containerHeight / -2), 0);

    return gridHelper;
  }





}
function GetColour() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getContainerPosition(container: any, index: number = 0): any {
  return {
    id: generateGuid(),
    index: index,
    height: container.height,
    width: container.width,
    length: container.length,
    rotated: false,
    xCoord: container.xCoord,
    yCoord: container.yCoord,
    zCoord: container.zCoord,
    rCoord: container.xCoord + container.width,
    tCoord: container.yCoord + container.height,
    fCoord: container.zCoord + container.length,
  } as any;
}


function GetJoson(containerLength: number, containerWidth: number, containerHeight: number, CylinderDia: number, CylinderHeight: number) {

  const solution: any = {
    id: generateGuid(),
    description: "",
    container: {
      id: generateGuid(),
      xCoord: 0,
      yCoord: 0,
      zCoord: 0,
      height: containerHeight,
      width: containerWidth,
      length: containerLength,
      goods: [],
      unit: 'mm'
    },
    // calculated: moment().format(),
    // calculationSource: {
    //     staticAlgorithm: Algorithm.StartLeftBottom,
    //     title: this._description
    // },
    steps: [],
  };
  let sequenceNumber = 0;
  let lastGood: any = null;




  for (let index = 0; index < 10; index++) {
    let position: { xCoord: number, yCoord: number, zCoord: number, stackedOn: null | string } = lastGood === null ? { xCoord: 0, yCoord: 0, zCoord: 0, stackedOn: null } : _getNextPosition(solution.container!, {
      width: CylinderDia,
      length: CylinderDia,
      height: CylinderHeight
    }, lastGood);
    lastGood = {
      desc: "",
      height: CylinderHeight,
      id: generateGuid(),
      length: CylinderDia,
      width: CylinderDia,
      xCoord: position.xCoord,
      yCoord: position.yCoord,
      zCoord: position.zCoord,
      stackedOnGood: position.stackedOn,
      turned: false,
      group: "b100811a-76b0-4313-8823-87d4b290f84b",
      // turningAllowed: order.turningAllowed,
      // stackingAllowed: order.stackingAllowed,
      sequenceNr: sequenceNumber,
      orderGuid: 1
    };
    solution.container!.goods.push(lastGood);
    sequenceNumber++;
  }


  solution.container!.length = Math.max(...solution.container!.goods.map((x: any) => x.zCoord + x.length), 0);

  return solution;
}



function _getNextPosition(container: any, order: any, lastGood: any): { xCoord: number, yCoord: number, zCoord: number, stackedOn: null | string } {
  if (lastGood.stackingAllowed && lastGood.length >= order.length && lastGood.width >= order.width && container.height >= lastGood.yCoord + order.height + lastGood.height) return { xCoord: lastGood.xCoord, yCoord: lastGood.yCoord + lastGood.height, zCoord: lastGood.zCoord, stackedOn: lastGood.id };
  else {
    if (lastGood.stackedOnGood === null) {
      let space = {
        width: container.width - lastGood.xCoord - lastGood.width,
        height: container.height,
        length: lastGood.length
      };
      if (canPlaceOrderIntoSpace(order, space).notTurned) {
        return { xCoord: lastGood.xCoord + lastGood.width, yCoord: lastGood.yCoord, zCoord: lastGood.zCoord, stackedOn: null };
      }
    }
    else {
      let underneath = container.goods.find((x: any) => x.id === lastGood.stackedOnGood);
      while (underneath) {
        let space = {
          width: underneath.width - lastGood.xCoord - lastGood.width,
          height: container.height - underneath.yCoord - underneath.height,
          length: underneath.length - lastGood.zCoord - lastGood.length
        };
        if (canPlaceOrderIntoSpace(order, space).notTurned) {
          return { xCoord: lastGood.xCoord + lastGood.width, yCoord: lastGood.yCoord, zCoord: lastGood.zCoord, stackedOn: underneath.id };
        }
        if (typeof underneath.stackedOnGood !== 'number') break;
        underneath = container.goods.find((x: any) => x.id === underneath!.stackedOnGood);
      }
      if (underneath) {
        let space = {
          width: container.width - underneath.xCoord - underneath.width,
          height: container.height,
          length: underneath.length
        };
        if (canPlaceOrderIntoSpace(order, space).notTurned) {
          return { xCoord: underneath.xCoord + underneath.width, yCoord: 0, zCoord: underneath.zCoord, stackedOn: null };
        }
      }
    }
    return { xCoord: 0, yCoord: 0, zCoord: lastGood.zCoord + lastGood.length, stackedOn: null };
  }
}

function canPlaceOrderIntoSpace(order: any, space: any): { notTurned: boolean, turned: boolean } {
  return {
    notTurned: space.width >= order.width && space.length >= order.length && space.height >= order.height,
    turned: space.width >= order.length && space.length >= order.width && space.height >= order.height,
  };




}
// function addText(text: any, cube: any, l: any, w: any) {
//   var loader = new ThreeJS_addon.FontLoader()
//   loader.load('helvetiker_regular.typeface.json', (font: any) => {
//     const textSize = 0.2
//     var textGeo = new ThreeJS_addon.TextGeometry(text, {
//       font: font,

//       size: textSize,
//       height: 0,
//       curveSegments: 100,
//     });

//     var textMaterial = new ThreeJS.MeshPhongMaterial({ color: "red" });

//     textGeo.computeBoundingBox()
//     const textWidth = textGeo.boundingBox.max.x

//     if (textWidth > w) {
//       return;
//     }

//     var textMesh = new ThreeJS.Mesh(textGeo, textMaterial);
//     textMesh.position.set(0 + textWidth / 2, 0 - textSize / 2, 0 - l / 2 - 0.01)
//     textMesh.rotation.y = Math.PI

//     cube.add(textMesh);
//   })
// }


