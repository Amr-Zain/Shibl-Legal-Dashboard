import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import { toast } from "sonner";
import { fullbackImage } from "@/util/data";

interface SectionProps {
  section: Section;
  children: React.ReactNode;
  onDelete?: (sectionId: number) => void;
}

function SectionCard({ section, children, onDelete }: SectionProps) {
  const [isActive, setIsActive] = useState(section.is_active);
  const { t } = useTranslation();
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

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(section.id);
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-4 bg-card shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <Badge variant={isActive ? "default" : "secondary"}>
            {section.type}
          </Badge>
          <Switch
            dir="ltr"
            checked={isActive}
            onCheckedChange={handleStatusToggle}
            className="data-[state=checked]:bg-green-500"
          />
          <span className="text-sm font-medium">
            {isActive ? t("sections.active") : t("sections.inactive")}
          </span>
        </div>
        <UpdateDeleteModals onDelete={handleDelete}>
          {children}
        </UpdateDeleteModals>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Section Content */}
        <div className="space-y-4">
          {section.icon && (
            <img
              src={section.icon}
              onError={(e) => (e.currentTarget.src = fullbackImage)}
              alt="Section icon"
              className="w-12 h-12 object-contain"
            />
          )}
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold">{section.title}</h3>
          </div>

          <p className="text-muted-foreground">{section.description}</p>
        </div>

        {section.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={section.image}
              alt="Section image"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://shebl9.azmy.aait-d.com/storage/images/Section/onq0yVoIcuRfHEtNip3hOB9fCehq6CRKESSeKTki.png")
              }
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionCard;
