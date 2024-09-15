import { MessageDto } from '../models/message.dto';
import { ChatMessageDocument } from '../models/message.model';
export declare function isDateDifferenceWithin7Days(date1: string, date2: string): boolean;
export declare function createRichContent(data: MessageDto, chatMessage: ChatMessageDocument): void;
