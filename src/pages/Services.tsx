import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { TitleFeatureFormValues } from "@/schemas";
import { sectionsData } from "@/util/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import TitleFeature from "@/components/sections/TitleFeature";
import { TitleFeatureForm } from "@/components/sections/TitleFeatueForm";

function Services() {
  const services = sectionsData.filter((sec) => sec.type === "our_services")[0]
    .features;
  const [createModal, setCreatModal] = useState(false);

  const createWhyUsFeature = async (data: TitleFeatureFormValues) => {
    console.log("Creating section:", data);
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Services Feacture</h1>
        <Button onClick={() => setCreatModal(true)}>Add New Feature</Button>
      </div>
      {services.map((feature) => (
        <TitleFeature feature={feature as SectionFeatureDetailed} />
      ))}
      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <TitleFeatureForm
            onSubmit={createWhyUsFeature}
            onCancel={() => setCreatModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Services;
