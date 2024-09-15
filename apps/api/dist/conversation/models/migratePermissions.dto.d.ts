import { Permission } from './Permission.dto';
import { Product } from './ContextSchema.dto';
export declare class MigratePermissionsDTO {
    permissions: Permission[];
    product: Product;
    conversationIds: string[];
}
