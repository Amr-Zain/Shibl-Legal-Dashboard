import SectionCard from "@/components/sections/SectionCard";
import SectionForm from "@/components/sections/SectionForm";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { WhyUsForm } from "@/components/whyUs/WhyUsForm";
import type { FormSection, WhyUsFormValues } from "@/schemas";
import { sectionsData } from "@/util/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

function WhyUs() {
  const whyUs = sectionsData.filter((sec) => sec.type === "why_us")[0];
  const [createModal, setCreatModal] = useState(false);

  const handleUpdate = async (section: FormSection) => {
    console.log("Updating section:", section);
  };

  const createWhyUsFeature = async (data: WhyUsFormValues) => {
    console.log("Creating section:", data);
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Why Us</h1>
        <Button onClick={() => setCreatModal(true)}>Add New Feature</Button>
      </div>
      <SectionCard section={whyUs}>
        <SectionForm
          section={whyUs as unknown as FormSection}
          submit={handleUpdate}
          isUpdate
        />
      </SectionCard>

      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Feature</DialogTitle>
          </DialogHeader>
          <WhyUsForm
            onSubmit={createWhyUsFeature}
            onCancel={() => setCreatModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WhyUs;