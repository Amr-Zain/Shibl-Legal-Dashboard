import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WhyUsForm } from "@/components/whyUs/WhyUsForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyValueFeature from "@/components/sections/KeyValueFeature";
import { Plus } from "lucide-react";
import useFetch from "@/hooks/UseFetch";
import type { WhyUsResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";

function WhyUs() {
  const [createModal, setCreatModal] = useState(false);
  const { t } = useTranslation();
  const { data, isPending } = useFetch<{ data: WhyUsResponse[] }>({
    endpoint: "admin/why-us",
    queryKey: ["admin/why-us"],
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const features = data?.data as WhyUsResponse[];
  const { locale } = useThemeConfig();

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">{t("sidebar.whyUs")}</h1>
        <Button onClick={() => setCreatModal(true)}>
          <Plus />
          {t("buttons.add")}
        </Button>
      </div>

      {isPending ? (
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg p-4"></div>
            ))}
          </div>
        </div>
      ) : (
        features?.map((feature) => (
          <KeyValueFeature
            key={feature.id}
            feature={{
              id: feature.id,
              key: feature[locale]?.key,
              value: feature?.value,
              icon: feature?.icon?.path,
              url: feature?.icon?.url,
              is_active: feature?.is_active,
            }}
          >
            <WhyUsForm
              defaultValues={{
                id: feature.id,
                keyEn: feature.en?.key,
                keyAr: feature.ar?.key,
                value: Number(feature?.value),
                icon: feature?.icon?.path as string,
                is_active: feature?.is_active,
                url: feature?.icon?.url,
              }}
              isUpdate
            />
          </KeyValueFeature>
        ))
      )}

      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Feature</DialogTitle>
          </DialogHeader>
          <WhyUsForm onCancel={() => setCreatModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WhyUs;
