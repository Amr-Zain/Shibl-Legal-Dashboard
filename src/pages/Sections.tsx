import SectionCard from "@/components/sections/SectionCard";
import SectionForm from "@/components/sections/SectionForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { sections, sectionsData } from "@/util/data";
import { useEffect, useState } from "react";
import { type FormSection } from "@/schemas";


function Sections() {
  const handleUpdate = async (section: FormSection) => {
    console.log("Updating section:", section);
  };

  const createSection = async (data: FormSection) => {
    console.log("Creating section:", data);
    setCreatModal(false);
  };

  const [createModal, setCreatModal] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Sections";
  }, []);

  const SecionsList = sectionsData
    .filter(
      (item) => sections.findIndex((sec) => sec.type === item.type) !== -1
    )
    .map((sec) => (
      <SectionCard key={sec.id || sec.type} section={sec}>
        <SectionForm section={sec as unknown as FormSection} submit={handleUpdate} isUpdate />
      </SectionCard>
    ));

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Sections Management</h1>
        <Button onClick={() => setCreatModal(true)}>
          Add New Section
        </Button>
      </div>

      <div className="grid grid-cols-1">
         {SecionsList}
      </div>

      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <SectionForm submit={createSection} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Sections;