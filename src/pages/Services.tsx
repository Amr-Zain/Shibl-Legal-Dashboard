import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import TitleFeature from "@/components/sections/TitleFeature";
import { TitleFeatureForm } from "@/components/sections/TitleFeatueForm";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import useFetch from "@/hooks/UseFetch";
import { useThemeConfig } from "@/context/ThemeConfigContext";

function Services() {
  const [createModal, setCreatModal] = useState(false);
  const { t } = useTranslation();
  /* const createWhyUsFeature = async (data: TitleFeatureFormValues) => {
    console.log("Creating section:", data);
  }; */
  const { data } = useFetch({
    endpoint: "admin/our-features",
    queryKey: ["admin/our-features"],
  });

  const { locale } = useThemeConfig();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const services = data?.data as ServiceReaspose[];
  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">
          {t("sidebar.services")}
        </h1>
        <Button onClick={() => setCreatModal(true)}>
          <Plus />
          {t("buttons.add")}
        </Button>
      </div>
      {services?.map((feature) => (
        <TitleFeature
          feature={{
            id: feature.id,
            title: feature[locale].title,
            description: feature[locale].description,
            icon: feature.icon.url,
            path: feature.icon.path
          }}
        />
      ))}
      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <TitleFeatureForm
            onCancel={() => setCreatModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Services;
