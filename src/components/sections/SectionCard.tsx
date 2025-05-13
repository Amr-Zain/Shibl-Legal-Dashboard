import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import TitleFeature from "./TitleFeature";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import KeyValueFeature from "./KeyValueFeature";

interface SectionProps {
  section: Section;
  children: React.ReactNode;
  onDelete?: (sectionId: number) => void;
}

function SectionCard({ section, children, onDelete }: SectionProps) {
  const [isActive, setIsActive] = useState(section.is_active);

  const handleStatusToggle = async (checked: boolean) => {
    try {
      // Add actual API call here
      setIsActive(checked);
    } catch (error) {
      console.error("Error updating section status:", error);
    }
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
            checked={isActive}
            onCheckedChange={handleStatusToggle}
            className="data-[state=checked]:bg-green-500"
          />
          <span className="text-sm font-medium">
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <UpdateDeleteModals onDelete={handleDelete}>
          {children}
        </UpdateDeleteModals>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Section Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {section.icon && (
              <img
                src={section.icon}
                alt="Section icon"
                className="w-12 h-12 object-contain"
              />
            )}
            <h3 className="text-xl font-semibold">{section.title}</h3>
          </div>

          <p className="text-muted-foreground">{section.description}</p>

          {section.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={section.image}
                alt="Section image"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-4">
          <h4 className="font-medium">Features</h4>
          <div className="space-y-2">
            {section.features.map((feature) => (
              <div key={feature.id} className="p-3 border rounded-lg">
                {"title" in feature ? (
                  <TitleFeature feature={feature} />
                ) : (
                  <KeyValueFeature feature={feature} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionCard;
