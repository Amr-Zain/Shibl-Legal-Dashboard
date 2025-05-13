



interface Features {
    name: string;
    desc: string;
    image: string;
    id: number
}

interface Page {
    title: string;
    content: string;
}
interface Service {
    icon: string;
    color: string;
    title: string;
    desc: string;
    service_slug: string;
    id: number
}

//interface TopIntro extends Page { }
interface MiddleIntro extends Page {
    button_name: string;
    video: string;
}

interface HomeType {
    features: Features[];
    top_intro: TopIntro;
    middle_intro: MiddleIntro;
    services: Service[];
    technology: Features[]
    partners: Features[]
    visions: General[]
}




interface Question {
    id: number;
    is_active: boolean| number
    question: string;
    answer: string;
}
interface FAQData {
    faq: Question[];
    banner: Banner
    footer_description: string;

}

interface OurServicesData {
    banner: Banner
    our_services: Feature[];
    footer_description: string;
}

type BannerTypes = 'privacy_policy' | 'terms' | 'main_banner' | 'about' | 'why_us' | 'our_services'
    | 'contact_info' | 'about_banner' | 'goals' | 'core_values' | 'our_vision' | 'qa_banner' |
    'contact_banner' | 'terms_banner' | 'privacy_banner';



interface Feature {
    id: number;
    key: string | null;
    valueAr: string;
    valueEn: string;
    icon: File;
    is_active?: boolean;
}

interface Banner {
    id: number;
    type: BannerTypes;
    title: string;
    description: string;
    image: string;
    icon: string;
    is_active: boolean;
    features: Feature[];
}

/* 
interface OverVeiw {
    faq: Question[];
    sections: { [key in BannerTypes]?: Section };
    banner: Banner;
    footer_description: string;
} */


interface SectionFeatureKeyVal {
    id: number;
    icon: string;
    key: string | null;
    value: string;
    is_active?: boolean; 
}

interface SectionFeatureDetailed {
    id: number;
    icon: string;
    background?: string;
    title: string;
    description: string;
}

interface Section  {
    id: number;
    type: SectionType;
    title: string;
    description: string;
    image: string;
    icon: string;
    is_active: boolean;
    features: (SectionFeatureKeyVal | SectionFeatureDetailed)[];
};

