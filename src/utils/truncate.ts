import { EntitySchema } from "typeorm";
import { ObjectType } from "typeorm";

import { getConnection } from "typeorm";

export default async function truncateTable<T>(
    model: ObjectType<T> | EntitySchema<T> | string,
    connectionName: string = "default"
) {
    await getConnection(connectionName)
        .getRepository(model)
        .clear();
}
