import { Button } from "../ui/button";
import { PencilIcon, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import { toast } from "sonner";

interface UpdateDeleteModalsProps {
  onDelete?: () => Promise<void>;
  children: React.ReactNode;
  endpoint: string;
  mutationKey: string;
}

function UpdateDeleteModals({
  onDelete,
  children,
  endpoint,
  mutationKey,
}: UpdateDeleteModalsProps) {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();

  const { isPending, mutate: deleteItem } = useMutate({
    endpoint,
    method: "delete",
    mutationKey: [mutationKey],
    onSuccess: () => {
      toast('t("success")', {
        description: 't("deleteSuccessMessage")',
      });
      setDeleteModal(false);
    },
    onError: (error) => {
      toast('title: t("error")', {
        description:
          error instanceof Error ? error.message : t("deleteErrorMessage"),
      });
    },
  });

  const handleDelete = async () => {
    if (onDelete) await onDelete();
    await deleteItem({});
  };

  return (
    <div className="flex gap-2">
      {/* Edit Dialog */}
      <Dialog open={updateModal} onOpenChange={setUpdateModal}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PencilIcon className="w-4 h-4 mr-2" />
            <p className="hidden sm:block">{t("buttons.edit")}</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">{children}</DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:block">{t("buttons.delete")}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmDeletion")}</AlertDialogTitle>
            <AlertDialogDescription>{t("comfirmText")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              {t("buttons.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {t("buttons.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UpdateDeleteModals;
