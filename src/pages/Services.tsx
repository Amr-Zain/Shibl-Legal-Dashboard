import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import TitleFeature from "@/components/sections/TitleFeature";
import { TitleFeatureForm } from "@/components/sections/TitleFeatueForm";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";

function Services() {
  const [createModal, setCreatModal] = useState(false);
  const { t } = useTranslation();
  /* const createWhyUsFeature = async (data: TitleFeatureFormValues) => {
    console.log("Creating section:", data);
  }; */
  const { data, isPending } = useFetch({
    endpoint: "admin/our-features",
    queryKey: ["our-features"],
  });

  const { locale } = useThemeConfig();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const services = data?.data as ServiceReaspose[];
  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader
        header={t("sidebar.services")}
        onClick={() => setCreatModal(true)}
      />
      {isPending ? (
        <div className="container mx-auto p-6">
          <Skeleton count={4} h={30} />
        </div>
      ) : (
        services?.map((feature) => (
          <TitleFeature
            feature={{
              id: feature.id,
              title: feature[locale].title,
              description: feature[locale].description,
              icon: feature.icon.url,
              path: feature.icon.path,
            }}
          />
        ))
      )}
      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("formsTitle.addService")}</DialogTitle>
          </DialogHeader>
          <TitleFeatureForm onCancel={() => setCreatModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Services;
