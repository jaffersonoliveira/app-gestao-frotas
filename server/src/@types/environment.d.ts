declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      HOST: string;
      DATABASE: string;
      DBUSER: string;
      DBPWD: string;
    }
  }
}
export {};
