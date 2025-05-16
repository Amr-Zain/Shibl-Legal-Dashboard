import { TitleFeatureForm } from "./TitleFeatueForm";
import UpdateDeleteModals from "../util/UpdateDeleteModals";

function TitleFeature({ feature }: { feature: SectionFeatureDetailed}) {

  const formate = (featuer: SectionFeatureDetailed) => ({
    titleEn: featuer.title,
    titleAr: featuer.title,
    descriptionAr: featuer.description,
    descriptionEn: featuer.description,
    icon: featuer.icon,
    path: featuer.path!,
    is_active: featuer.is_active
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
        <UpdateDeleteModals endpoint={`admin/our-features/${feature.id}`} mutationKey={`admin/our-features/${feature.id}`}>
          <TitleFeatureForm
            defaultValues={formate(feature)}
            isUpdate
          />
        </UpdateDeleteModals>
      </div>
    </div>
  );
}

export default TitleFeature;