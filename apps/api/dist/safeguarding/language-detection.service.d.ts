import LanguageDetect from 'languagedetect';
import { Languages } from '../enums/languages';
export declare class LanguageDetectionService {
    private languageDetect;
    constructor(languageDetect: LanguageDetect);
    detectLanguage(message: string): Languages;
}
