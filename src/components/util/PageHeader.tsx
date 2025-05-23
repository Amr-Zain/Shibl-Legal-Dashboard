import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function PageHeader({ header, url }: { header: string; url?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg md:text-2xl font-bold">{header}</h1>
      {url && (
        <Button
          onClick={() => {
            navigate(url!);
          }}
          dir="ltr"
        >
          <Plus />
          {t("buttons.add")}
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
