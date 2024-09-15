import { ConfigurationManager } from '../configuration/configuration-manager';
import { IPusherConfig } from '../configuration/configuration';
export interface PusherTypes {
    channel: string;
    event: string;
    message: string;
}
export interface ISocketsService {
    send(data: PusherTypes): void;
    getFormattedName(channelName: string, isPrivate: boolean): string;
}
export declare class SocketsService implements ISocketsService {
    private configurationManager;
    pusherConfig: IPusherConfig;
    pusher: any;
    constructor(configurationManager: ConfigurationManager);
    send(data: PusherTypes): void;
    getFormattedName(channelName: string, isPrivate?: boolean): string;
}
export interface BaseEventType {
    name: string;
    message: Record<any, any>;
}
export interface IChannel<EventType> {
    send(event: EventType, channelId: string): void;
}
export declare class Channel<EventType extends BaseEventType> implements IChannel<EventType> {
    private name;
    private isPrivate;
    protected socketClient: SocketsService;
    constructor(name: string, isPrivate: boolean, socketClient: SocketsService);
    private getName;
    send(event: EventType, channelId: string): void;
}
