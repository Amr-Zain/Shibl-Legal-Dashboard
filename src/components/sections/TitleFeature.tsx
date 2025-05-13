import type { TitleFeatureFormValues } from "@/schemas";
import { TitleFeatureForm } from "./TitleFeatueForm";
import UpdateDeleteModals from "../util/UpdateDeleteModals";

function TitleFeature({ feature }: { feature: SectionFeatureDetailed}) {
  const updateFeature = async (data: TitleFeatureFormValues) => {
    console.log("Updated data:", data);
  };

  const deleteFeatureHandler = async () => {
    console.log("Deleting feature:", feature);
  };

  const formate = (question: SectionFeatureDetailed) => ({
    titleEn: question.title,
    titleAr: question.title,
    descriptionAr: question.description,
    descriptionEn: question.description,
  });

  return (
    <div className="space-y-2 flex flex-col rounded-md border border-muted bg-white p-4 shadow-sm">
      <div className="flex gap-2 items-center">
        <img
          src={feature.icon}
          alt="Feature icon"
          className="w-8 h-8 object-contain rounded-full border border-muted-foreground"
        />
        <div>
          <h5 className="font-semibold text-lg">{feature.title}</h5>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
      <div className="flex justify-end gap-2">
        <UpdateDeleteModals onDelete={deleteFeatureHandler}>
          <TitleFeatureForm
            defaultValues={formate(feature)}
            onSubmit={updateFeature}
          />
        </UpdateDeleteModals>
      </div>
    </div>
  );
}

export default TitleFeature;