import SectionForm from "@/components/SectionForm";

const AddSection = () => {
  const createSection = async (data: Section) => {
    console.log(data);
    //react reaquest
  };

  return (
    <div className="space-y-8 p-6 mt-6">
      <h3 className="text-center text-2xl font-semibold">Add Section Form</h3>
      <SectionForm submit={createSection} />;
    </div>
  );
};

export default AddSection;
