import { LanguageDetectionService } from './language-detection.service';
export declare class SafeguardingService {
    private languageDetect;
    constructor(languageDetect: LanguageDetectionService);
    clean(message: string): string;
}
