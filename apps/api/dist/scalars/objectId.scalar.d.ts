import { CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { ObjectID } from 'mongodb';
export declare class ObjectIDScalar implements CustomScalar<string, ObjectID> {
    description: string;
    serialize(value: ObjectID): string | null | undefined;
    parseValue(value: string): ObjectID;
    parseLiteral(ast: ValueNode): ObjectID;
}
