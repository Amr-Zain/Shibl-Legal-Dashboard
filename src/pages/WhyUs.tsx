import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WhyUsForm } from "@/components/whyUs/WhyUsForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyValueFeature from "@/components/sections/KeyValueFeature";
import useFetch from "@/hooks/UseFetch";
import type { WhyUsResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";

function WhyUs() {
  const [createModal, setCreatModal] = useState(false);
  const { t } = useTranslation();
  const { data, isPending } = useFetch<{ data: WhyUsResponse[] }>({
    endpoint: "admin/why-us",
    queryKey: ["why-us"],
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const features = data?.data as WhyUsResponse[];

  return (
    <div className="space-y-8 p-6 mt-6">
      <PageHeader
        header={t("sidebar.whyUs")}
        onClick={() => setCreatModal(true)}
      />
      {isPending ? (
        <div className="container mx-auto md:p-6">
          <Skeleton count={5} h={12} />
        </div>
      ) : (
        features?.map((feature) => (
          <KeyValueFeature key={feature.id} feature={feature}></KeyValueFeature>
        ))
      )}

      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("formsTitle.addFeature")}</DialogTitle>
          </DialogHeader>
          <WhyUsForm onCancel={() => setCreatModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WhyUs;
