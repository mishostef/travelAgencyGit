import { ArrayType } from "@angular/compiler/src/output/output_ast";

enum transportType {
  "bus" = 0,
  "plane" = 1,
}
export interface ITrip {
  "_id": string,
  "destination": string,
  "type": transportType,
  "taken": number,
  "participants": ArrayType
  "startAt": Date,
  "endAt": Date,
  "price": number,
  "img": string,
  "seats": number,
  "description": string
}