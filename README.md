## Prisma Setup
1.
    ```bsh
    npm i -D prisma
    ```
2.
    ```bsh
    npm i @prisma/client
    ```
3.
    Then create a db file in lib folder:

    ```ts
    import {PrismaClient} from '@prisma/client';

    declare global {
        var prisma:PrismaClient | undefined;
    }

    export const db = global.prisma || new PrismaClient();

    if (process.env.NODE_ENV !== 'production') global.prisma = db;
    ```
4.
    ```bsh
    npx prisma init
    ```
5.
    ```bsh
    npx prisma generate
    ```
6.
    ```bsh
    npx prisma db push
    ```
    or
    ```bsh
    npx prisma migrate dev --name add-role-to-user
    ```

**Note:** Run 5 and 6 after changing in `schema.prisma`