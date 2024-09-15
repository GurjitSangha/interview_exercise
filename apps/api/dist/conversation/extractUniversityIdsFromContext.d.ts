import { ContextSchema, ContextType } from './models/ContextSchema.dto';
export declare function extractUniversityIdsFromContext({ conversationContext, }: {
    conversationContext: ContextSchema[];
}): string[];
export declare function getUniversityContexts(conversationContext: ContextSchema[]): {
    id: string;
    type: ContextType;
}[];
