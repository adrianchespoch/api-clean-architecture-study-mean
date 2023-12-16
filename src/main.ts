import { envs } from './shared/insfrastructure/config';
import { MongoDB } from './shared/insfrastructure/persistence/mongo';
import { AppRouter } from './shared/insfrastructure/server/router';
import { Server } from './shared/insfrastructure/server/server';


const main = async () => {

  /* MongoDB */
  await MongoDB.connect({
    mongoUri: envs.MONGODB_URI,
    dbName: envs.MONGO_NAME,
  });


  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
    // public_path: envs.PUBLIC_PATH,
  });


  server.start();
}


(async () => {
  await main();
})();
