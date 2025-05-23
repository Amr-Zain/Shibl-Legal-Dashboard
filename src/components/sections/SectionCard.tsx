import { Badge } from "@/components/ui/badge";
import { fullbackImage } from "@/util/data";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import type { SectionResponse } from "@/util/responsesTypes";
import UpdateDeleteModals from "../util/UpdateDeleteModals";

interface SectionProps {
  section: SectionResponse;
  isBanner?: boolean;
}

function SectionCard({ section, isBanner }: SectionProps) {
  const { locale } = useThemeConfig();

  return (
    <div className="border rounded-lg p-4 md:p-6 mb-4 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-row justify-between items-start gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="hidden sm:block">
            {section.type}
          </Badge>
        </div>
        <UpdateDeleteModals
          endpoint={`admin/sections/${section.id}`}
          mutationKey={isBanner ? "banners" : "sections"}
          updatUrl={`/${isBanner ? "banners" : "sections"}/edit/${section.id}`}
          state={section}
          is_active={section.is_active!}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Section Content */}
        <div className="space-y-4 ">
          {section.icon && (
            <img
              src={section.icon.url}
              onError={(e) => (e.currentTarget.src = fullbackImage)}
              alt="Section icon"
              className="w-16 h-16 object-contain mb-4"
            />
          )}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              {section[locale].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {section[locale].description}
            </p>
          </div>
        </div>

        {section.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden max-h-64 order-1 md:order-2">
            <img
              src={section.image?.url}
              alt="Section image"
              className="object-cover w-full h-full rounded-md"
              onError={(e) => (e.currentTarget.src = fullbackImage)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionCard;
