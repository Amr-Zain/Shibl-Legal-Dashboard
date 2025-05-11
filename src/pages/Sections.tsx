import Section from "@/components/Section";
import SectionForm from "@/components/SectionForm";
import { sections, sectionsData } from "@/util/data";
import { useEffect } from "react";

function Sections() {
  const handleUpdate = async (section: Section) => {
    console.log(section);
  };
  useEffect(() => {
    document.title = "Dashboard | Sections";
  }, []);
  const SecionsList = sectionsData
    .filter(
      (item) => sections.findIndex((sec) => sec.type === item.type) !== -1//inital untill api connection
    )
    .map((sec) => (
      <Section section={sec}>
        <SectionForm section={sec} submit={handleUpdate} isUpdate />
      </Section>
    ));

  return <div className="space-y-8 p-6 mt-6">{SecionsList}</div>;
}

export default Sections;
