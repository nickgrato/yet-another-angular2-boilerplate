
declare module App {
  interface Service {
    name: string;
    url: string;
  }

  export interface Configuration {
    services: Service[];
  }
}


declare var AppConfig: App.Configuration;