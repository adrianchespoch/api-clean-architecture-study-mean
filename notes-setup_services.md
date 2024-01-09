# Skeleton Setup


- --- Install initial Deps:

  `pnpm add express dotenv env-var compression cors helmet`

  `pnpm add -D typescript @types/node ts-node-dev rimraf @types/express @types/compression tsc-alias tsconfig-paths @types/cors`


  - -- Sequelize:
    - run:  `pnpm add sequelize mysql2`

  - -- TypeORM:
    - run:  `pnpm add typeorm mysql2`

- --- Iniciamos el    tsconfig.json
  - run:	`pnpm exec tsc --init --outDir dist/ --rootDir src`



- --- Another deps
  - run:  `pnpm add awilix mongoose`






## Configurar   Aliases   en TS con Node.js (ts-node-dev):   @/
- --- Configuramos el     `tsconfig.json`
  - -- ts-node requiere q registremos el path del alias creado
  - -- tsc-alias: en build time resuelve estos aliases
    ```json
      {
        "include": ["src/**/*"],
        "exclude": ["node_modules", "dist", "**/*.spec.ts","**/*.test.ts"],     

        "compilerOptions": {
          "baseUrl": "src",
          "paths": {
            "@/*": ["*"],
          },
        }
      }
    ```




## Jest
- --- Configuramos JEST con nuestros Alisases de TS
  - -- Instalamos las deps:
    `pnpm add -D jest @types/jest ts-jest supertest @types/supertest`

  - -- Configuramos:
    - run:		`npx jest --init`   ||   `pnpm exec jest --init`
    - 'package.json': yes  >>  TS: yes   >>  node >>  Coverage?: y  >> Istrument Coverage: v8 
      	>> Auto clear mock calls, instances, etc.: Yes


	- -- En el    `jest.config.ts`    agregamos:
		```ts
			import { pathsToModuleNameMapper } from 'ts-jest';

		 	{
				preset: 'ts-jest',
				testEnvironment: "jest-environment-node",
				modulePaths: ["src"],
				moduleNameMapper: pathsToModuleNameMapper({
					"@/*": ["*"],
				}),

				setupFiles: [
					// usar .env.test con jest
					'<rootDir>/setup-tests.ts',

					'dotenv/config'
				],
			}
		```










## Eslint
- --- Iniciamos
  - -- run:
    ```
      # Instalamos:
      pnpm add -D eslint

      # Config acorde a lo q necesitemos:
      pnpm create @eslint/config

      # Optional:   npx eslint --init
    ```    












## PostgreSQL & Prisma ORM
- --- Vamos a W con     `Prisma ORM`     q ademas es Type Safety
  - -- Instalamos Prisma CLI:
    - run:		`pnpm add -D prisma`

	- -- Inicializamos Prisma con el Provider de interes, en este caso PostgreSQL
  	- run:		`pnpm exec prisma init --datasource-provider PostgreSQL`
    	- Esto nos crea:
      	- /prisma
        	- schema.prisma
			- DATABASE_URL en el   .env


- --- Creamos los   `Models`    en el    schema.prisma
  - -- Acorde a nuestra Entity



- --- Corremos la    `Migration`    para mantener un historico de cambios a nuestra DB lo cual es poderosisisisisisimo
  - --- Las Migraciones son importantisimas xq nos permite hacer rollbacks y navegar como lo hace git entre commits
    - run:		`pnpm exec prisma migrate dev`
      - Crea el    /migrations    q contiene toda la migration
				- Ademas en auto nos crea el   PrismaClient   y genera los tipos de TS para w con ellos

		- En caso de no correr migraciones, debemos generar manualmente los tipos de TS para usarlos en la App:
  		- run:		`pnpm exec prisma generate`

		- Si la DB Ya existe, debemos crear los   Schemas   basado en esa tabla con:
  		- run:		`prisma db pull`


	- -- URL:
  	- Prisma Docs
				https://www.prisma.io/docs/getting-started/quickstart
				https://www.prisma.io/docs/reference/api-reference/command-reference

















