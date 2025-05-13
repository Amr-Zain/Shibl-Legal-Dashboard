import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, Trash2 } from "lucide-react";
import { useState } from "react";

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

  const handleDelete = () => {
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

        <div className="flex gap-2">
          {/* Edit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">{children}</DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this section?
              </AlertDialogDescription>
              <div className="flex justify-end gap-4 mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Section
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
                  // Detailed Feature
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <img
                        src={feature.icon}
                        alt="Feature icon"
                        className="w-8 h-8 object-contain"
                      />
                      <h5 className="font-medium">{feature.title}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ) : (
                  // Key-Value Feature
                  <div className="flex items-center gap-3">
                    {feature.icon && (
                      <img
                        src={feature.icon}
                        alt="Feature icon"
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <div>
                      {feature.key && (
                        <span className="text-sm font-medium">
                          {feature.key}:{" "}
                        </span>
                      )}
                      <span>{feature.value}</span>
                    </div>
                  </div>
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
