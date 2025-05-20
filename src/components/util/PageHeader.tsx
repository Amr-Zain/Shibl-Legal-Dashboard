import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

function PageHeader({
  header,
  onClick,
}: {
  header: string;
  onClick?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg md:text-2xl font-bold">{header}</h1>
      {onClick && (
        <Button onClick={onClick} dir="ltr">
          <Plus />
          {t("buttons.add")}
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
