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
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Switch } from "../ui/switch";

interface UpdateDeleteModalsProps {
  endpoint: string;
  mutationKey: string;
  updatUrl: string;
  state: unknown;
  is_active: boolean;
  hideActive?: boolean;
}
function UpdateDeleteModals({
  endpoint,
  mutationKey,
  updatUrl,
  state,
  is_active,
  hideActive,
}: UpdateDeleteModalsProps) {
  const [deleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(is_active);

  const { mutateAsync: taggleActive } = useMutate<void>({
    endpoint,
    method: "put",
    mutationKey: [mutationKey],
    formData: true,
    /*  onError: (error) => {
     
    },
     */
  });
  const handleStatusToggle = async (checked: boolean) => {
    await taggleActive({ is_active: checked });
    setIsActive(checked);
  };
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
      return;
    }
    setDeleteModal(open);
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-end gap-2">
      {/* Edit Dialog */}
      {!hideActive && (
        <div className="flex items-center gap-2">
          <Switch
            dir="ltr"
            checked={isActive}
            onCheckedChange={handleStatusToggle}
            className="data-[state=checked]:bg-green-500 scale-90 md:scale-100"
          />
         {/*  <Badge
            variant={isActive ? "default" : "secondary"}
            className="hidden sm:block"
          >
            {isActive ? t("sections.active") : t("sections.inactive")}
          </Badge> */}
        </div>
      )}
      <Button
        onClick={() => navigate(updatUrl, { state })}
        variant="outline"
        size="sm"
        dir="ltr"
      >
        <PencilIcon className="w-4 h-4 mr-2" />
        <p className="hidden sm:block">{t("buttons.edit")}</p>
      </Button>

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
