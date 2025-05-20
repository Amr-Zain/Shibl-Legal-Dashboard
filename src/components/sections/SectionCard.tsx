import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import { toast } from "sonner";
import { fullbackImage } from "@/util/data";
import SectionForm from "./SectionForm";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import type { SectionResponse } from "@/util/responsesTypes";

interface SectionProps {
  section: SectionResponse;
  isBanner: boolean;
}

function SectionCard({ section, isBanner }: SectionProps) {
  const [isActive, setIsActive] = useState(section.is_active);
  const [updateModal, setUpdateModal] = useState(false);
  const { t } = useTranslation();
  const { locale } = useThemeConfig();

  const { mutateAsync: taggleActive } = useMutate<void>({
    endpoint: `admin/sections/${section.id}`,
    method: "put",
    mutationKey: [`admin/sections/${section.id}`],
    formData: true,
    onError: (error) => {
      toast("someting went wrong", {
        description:
          error instanceof Error ? error.message : "please try again",
      });
    },
  });
  const handleStatusToggle = async (checked: boolean) => {
    await taggleActive({ is_active: checked });
    setIsActive(checked);
  };

  return (
    <div className="border rounded-lg p-4 md:p-6 mb-4 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="capitalize">
            {section.type}
          </Badge>
          <div className="flex items-center gap-2">
            <Switch
              dir="ltr"
              checked={isActive}
              onCheckedChange={handleStatusToggle}
              className="data-[state=checked]:bg-green-500 scale-90 md:scale-100"
            />
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? t("sections.active") : t("sections.inactive")}
            </Badge>
          </div>
        </div>
        <UpdateDeleteModals
          endpoint={`admin/sections/${section.id}`}
          mutationKey={isBanner ? "banners" : "sections"}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
        >
          <SectionForm
            closeModel={() => setUpdateModal(false)}
            section={section}
            isUpdate
            isBanner={isBanner}
          />
        </UpdateDeleteModals>
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