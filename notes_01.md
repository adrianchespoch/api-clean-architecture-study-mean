# Crea tu Plataforma de cursos online con el STACK MEAN


## Notes Arch
- --- Clean Arch / Hexagonal Arch
  - -- Los    Repositories    NOOOO lanzan Exceptions
    - Si NO encuntra, retorna NULL
  - -- Los     UseCases        SIIII lanzan Exceptions
    - Si viene    null    en el   finder, ahi si lanzo la Exception de Dominio

- --- Creamos    UseCases    y sus      Adaptars     en infra/     para evitar reinventar la rueda
  - -- El bcryp es 1    adapter    1 injectamos cuando typamos con el    `ProcessPassword`
    - Asi nos desacoplanos, mantenemos la Inversion de Dependencia, evitamos reinventar el hash de passwords y todo esto con la    Dependency Injection    (Awilix)

- --- En     DDD     un      `Command d Domain`      es 1    `DTO`
  - -- Q mapea los VO a Primitives
    - Entonces, el     Domain     SIIII puede tener DTOs





## Init
- --- Definimos el     Skeleton    pa q esto funke


## User Entity & User Model
- --- Procedemos a crear el User (q seria d   DOMAIN)
  - -- Lo definimos como      `Entity`      x semantica, ademas como usamos Mongoose, este ODM W con Models y Schemas, asi q ya pues :v













## Auth
- --- Creamos el    `BcryptAdapter`     q sera lo q inyectemos como    `ProcessPassword`    x DI
  - -- Asi nos desacoplamos de infra, mantenemos el Dependency Inversion
    - Instalamos    bcryptjs
      - run:    `pnpm add bcryptjs`   `pnpm add -D @types/bcryptjs`

- --- Creamos el    `JwtAdapter`     q sera lo q inyectemos como     `HandleAuthToken`    x DI
  - -- Instalamos   jsonwebtoken:
    - run:    `pnpm add jsonwebtoken`   `pnpm add -D @types/jsonwebtoken`


- --- El    `UserRegistrator`      inyecta al      `UserCreator`
  - -- Asi tenemos 1 codigo mucho mas modular y reutilizable x casos de uso
    - En este caso el Registro de Auth requiere Crear al User con el     UserCreator
      - Pero llama al     UserRegistrator     xq SI requiere el JWT xq es REST
    - Pero tb podriamos tener 1    `Processor`     de    `RabbitMQ`     q ante 1 evento cree el user
      - De esta manera o x consola, NOOOO require 1 Auth Token, no require gener 1 JWT ni nada propio de Auth, x eso solo llamaria al    UserCreator





### Auth Middlewares
- --- Instalamos Express Validator para las validaciones en    infra/
  - -- Instalamos la dep
    - run:    `pnpm add express-validator`


  - -- Creamos el    `InputValidator`














connect-multiparty
@vimeo/vimeo



moduels:

  - -- Cart
  - -- Category (course)
  - -- Course
    - classes
    - classFile
    - section
    - student

  - -- cupone
  - -- discount
  
  - -- sale
  - -- user
  - -- auth












