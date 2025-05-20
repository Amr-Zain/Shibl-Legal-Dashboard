import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("buttons.save")}
        </>
      ) : (
        t("buttons.save")
      )}
    </Button>
  );
}

export default SubmitButton;
