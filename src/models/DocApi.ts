export class DocApi{
    path: string = "";
    method: string = "";
    authenticated: boolean = false;
   constructor(path: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", authenticated: boolean){
    this.path = `/api${path}`,
    this.method = method,
    this.authenticated = authenticated
   }
  }