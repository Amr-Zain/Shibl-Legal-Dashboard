import SectionCard from "@/components/sections/SectionCard";
import SectionForm from "@/components/sections/SectionForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
/* import { sections } from "@/util/data";
 */import { useEffect, useState } from "react";
import { type FormSection } from "@/schemas";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import useFetch from "@/hooks/UseFetch";
import type { SectionResponse } from "@/util/responsesTypes";
import { useThemeConfig } from "@/context/ThemeConfigContext";

function Sections() {
  const { t } = useTranslation();
  const { data, isPending } = useFetch<{ data: SectionResponse }>({
    endpoint: "admin/sections",
    queryKey: ["admin/faq"],
  });
  const { locale } = useThemeConfig();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const secionsList = data?.data as SectionResponse[];

  const createSection = async (data: FormSection) => {
    console.log("Creating section:", data);
    setCreatModal(false);
  };

  const [createModal, setCreatModal] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Sections";
  }, []);
  const SecionsList = secionsList?.map((sec) => (
    <SectionCard
      key={sec.id}
      section={{
        id:sec.id,
        title: sec[locale].title,
        description: sec[locale].description,
        type: sec.type,
        image: sec.image?.url,
        icon: sec.icon?.url,
        is_active: sec.is_active!,
      }}
    >
      <SectionForm
        section={sec}
        isUpdate
      />
    </SectionCard>
  ));

  return (
    <div className="space-y-8 p-6 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">
          {t("sidebar.sections")}
        </h1>
        <Button onClick={() => setCreatModal(true)}>
          <Plus />
          {t("buttons.add")}
        </Button>
      </div>

      {isPending ? (
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg p-4"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1">{SecionsList}</div>
      )}

      <Dialog open={createModal} onOpenChange={setCreatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("sections.addSection")}</DialogTitle>
          </DialogHeader>
          <SectionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Sections;
