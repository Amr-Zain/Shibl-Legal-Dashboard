interface QuestionTranslation {
    question: string;
    answer: string;
}

export interface QuestionResponse {
    en: QuestionTranslation;
    ar: QuestionTranslation;
    id: number;
    is_active: boolean;
}

/***************************** */
interface Header {
    title: string;
    description: string;
}

interface Image {
    path: string;
    url: string;
}

interface Feature {
    id: number;
    key: string | null;
    ar: { value: string; }
    en: { value: string; }
    icon: Image;
    is_active?: boolean;
}

export interface SectionResponse {
    id: number;
    ar: Header;
    en: Header;
    type: BannerTypes;
    image?: Image;
    icon?: Image;
    is_active?: boolean;
    features?: Feature[]
}

/***************************** */
export interface WhyUsResponse {
    id: number;
    icon?: Image
    ar: {
        key: string;
    };
    en: {
        key: string;
    };
    value: string;
    is_active: boolean;
}
export interface ServiceReaspose {
    en: Header;
    ar: Header;
    icon: Image;
    background: Image;
}