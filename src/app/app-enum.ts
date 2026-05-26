export enum EUOM {
    mm = 1,
    cm = 2,
    inch = 3

}
export enum ESHAPE {
 cyliender = 1,
 reactangle = 2

}

export interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}