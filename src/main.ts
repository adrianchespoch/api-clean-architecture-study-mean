import { diContainer, envs } from './shared/insfrastructure/config';
import { MongoDB } from './shared/insfrastructure/persistence/mongo';
import { AppRouter } from './shared/insfrastructure/server/router';
import { Server } from './shared/insfrastructure/server/server';


const main = async () => {

  // DI
  const AppRouter = diContainer.resolve<AppRouter>('AppRouter');


  /* MongoDB */
  await MongoDB.connect({
    mongoUri: envs.MONGODB_URI,
    dbName: envs.MONGO_NAME,
  });


  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
  });


  server.start();
};


(async () => {
  await main();
})();
