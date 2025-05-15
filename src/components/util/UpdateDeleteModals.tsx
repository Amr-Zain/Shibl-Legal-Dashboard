import { Button } from "../ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
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

function UpdateDeleteModals({
  onDelete,
  children,
}: {
  onDelete: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [updateModal, setUpdateModal] = useState(false);
  const{ t } = useTranslation();
  return (
    <div className="flex gap-2">
      {/* Edit Dialog */}
      <Dialog open={updateModal} onOpenChange={setUpdateModal}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PencilIcon className="w-4 h-4 mr-2" />
            <p className="hidden sm:block">{t('buttons.edit')}</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">{children}</DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden sm:block">{t('buttons.delete')}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDeletion')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('comfirmText')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              {t('buttons.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UpdateDeleteModals;
