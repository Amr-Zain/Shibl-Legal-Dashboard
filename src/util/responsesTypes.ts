interface QuestionTranslation {
    question: string;
    answer: string
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

interface Image{
    path: string;
    url: string
}
export interface SectionResponse{
    id: number
    ar:Header;
    en: Header;
    type: BannerTypes;
    image?: Image;
    icon?: Image;
    is_active?: boolean;

}



