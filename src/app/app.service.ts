import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  constructor (private http: Http) {}

  getTemperatureBy(lambda, from, to, interval) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(
      'http://localhost:8000/api/mesures/<function>/temp/from/<from>/to/<to>/by/<interval>'
      .replace('<function>', lambda)
      .replace('<from>', from)
      .replace('<to>', to)
      .replace('<interval>', interval),
      {headers: headers}
     )
    .map((res:Response) => res.json());
  }

  public _state: InternalStateType = { };

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
