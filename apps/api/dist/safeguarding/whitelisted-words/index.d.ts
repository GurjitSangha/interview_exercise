import { Languages } from '../../enums/languages';
declare const whiteListedSet: {
    [key in Languages]: RegExp | null;
};
export { whiteListedSet };
