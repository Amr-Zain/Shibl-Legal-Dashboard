import { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useMutate } from "@/hooks/UseMutate";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type ImageInputProps = {
  name: string;
  label: string;
  image?: string;
  path?: string;
  onChange: ( path: string) => void;
};

function ImageInput({ name, label, image, path, onChange }: ImageInputProps) {
  const [preview, setPreview] = useState<string | undefined>(image);
  const {
    mutateAsync: uploadMutate,
    isPending: isUploading,
    data,
  } = useMutate<{ path: string }>({
    general: true,
    endpoint: `attachment`,
    method: "post",
    mutationKey: ["image-upload"],
    formData: true,
    onError: (error) => {
      toast("someting went wrong", {
        description:
          error instanceof Error ? error.message : "please try again",
      });
    },
  });

  const { mutateAsync: deleteMutate, isPending: isDeleting } = useMutate<void>({
    general: true,
    endpoint: `attachment/delete`,
    method: "post",
    mutationKey: ["image-delete"],
    onError: (error) => {
      if (error?.response?.status < 500) {
        setPreview(undefined);
        onChange("");
      }
      toast("someting went wrong", {
        description:
          error instanceof Error ? error.message : "please try again",
      });
    },
  });

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;

    handleRemove();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("attachment_type", "image");
    formData.append("model", "Section");
    console.log("fromData", formData);
    await uploadMutate(formData);
    console.log(data);
    const newUrl = data?.path || "";
    setPreview(newUrl);
    onChange(newUrl);
  };

  const handleRemove = async () => {
    if (path) {
      await deleteMutate({ path });
      setPreview(undefined);
      onChange( "");
    }
  };
  
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {preview && (
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
                disabled={isDeleting}
              >
                <Trash2 />
              </Button>
            </div>
          )}
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              disabled={isUploading || isDeleting || !!preview}
              onChange={(e) => {
                const file = e.target.files?.[0];
                handleFileChange(file);
              }}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default ImageInput;
