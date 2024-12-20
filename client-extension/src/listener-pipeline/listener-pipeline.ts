export class ListenerPipeline<T> {

  private middlewares: ((arg: T) => T)[] = [];
  private _listener: (arg: T) => void;

  public constructor(
    listener: (arg: T) => void,
  ){
    this._listener = listener;
  }

  public use(middleware: (arg: T) => T) {
    this.middlewares.push(middleware);
  }

  private execute(arg: T): any{
    let result: null | T = null;
    for(const middleware of this.middlewares) {
      if(result === null) {
        result = middleware(arg);
      }
      else{
        result = middleware(result);
      }
    }
    if(result === null) { return; }
    this._listener(result);
  }

  get listener(): (arg: T) => void{
    return this.execute.bind(this);
  }

}
