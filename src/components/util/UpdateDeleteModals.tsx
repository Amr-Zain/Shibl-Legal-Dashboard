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
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateDeleteModalsProps {
  children: React.ReactNode;
  endpoint: string;
  mutationKey: string;
  updateModal: boolean;
  setUpdateModal: (value: boolean) => void;
}
function UpdateDeleteModals({
  children,
  endpoint,
  mutationKey,
  updateModal,
  setUpdateModal,
}: UpdateDeleteModalsProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const {
    isPending,
    mutateAsync: deleteItem,
    isError,
  } = useMutate({
    endpoint,
    method: "delete",
    mutationKey: [mutationKey],
    onSuccess: (data: { message?: string }) => {
      const title = data?.message || t("successMessages.dataDeleted");
      Swal.fire({
        title,
        icon: "success",
        timer: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: [mutationKey],
      });
    },
    onError: (error: unknown) => {
      setError(error instanceof Error ? error.message : t("error"));
      console.error(error);
    },
  });

  const handleDelete = async () => {
    await deleteItem({});
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && (isPending || isError)) {
      return; // Don't allow closing during pending state or when there's an error
    }
    setDeleteModal(open);
  };

  return (
    <div className="flex gap-2">
      {/* Edit Dialog */}
      <Dialog open={updateModal} onOpenChange={setUpdateModal}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" dir="ltr">
            <PencilIcon className="w-4 h-4 mr-2" />
            <p className="hidden sm:block">{t("buttons.edit")}</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">{children}</DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteModal} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" dir="ltr">
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:block">{t("buttons.delete")}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmDeletion")}</AlertDialogTitle>
            <AlertDialogDescription>{t("comfirmText")}</AlertDialogDescription>
          </AlertDialogHeader>
          {isError && <p className="text-red-600">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteModal(false)}
              disabled={isPending}
            >
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
