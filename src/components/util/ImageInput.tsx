import { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useMutate } from "@/hooks/UseMutate";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRef } from "react";

type ImageInputProps = {
  label: string;
  image?: string;
  path?: string;
  onChange: (path: string | undefined) => void;
  error?: string;
};

function ImageInput({ label, image, path, error, onChange }: ImageInputProps) {
  const imageRef = useRef(null);
  const [preview, setPreview] = useState<string | undefined>(image);
  const [disPlayError, setError] = useState(error);
  const { mutateAsync: uploadMutate, isPending: isUploading } = useMutate<{
    data: { path: string };
  }>({
    general: true,
    endpoint: `attachment`,
    method: "post",
    mutationKey: ["image-upload"],
    formData: true,
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const message = error?.response?.message;
      setError(message || "Please try again With png, jpg, jpeg extintions");
    },
    onSuccess: (data) => {
      const newPath = data?.data.path || "";
      onChange(newPath);
    },
  });

  const { mutateAsync: deleteMutate, isPending: isDeleting } = useMutate<void>({
    general: true,
    endpoint: `attachment/delete`,
    method: "post",
    mutationKey: ["image-delete"],
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      if (error?.response?.status < 500) {
        setPreview(undefined);
        onChange(undefined);
        if (imageRef?.current) imageRef.current.value = "";
      }
      toast("someting went wrong", {
        description:
          error instanceof Error ? error.message : "please try again",
      });
    },
  });
  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    setError("");

    handleRemove();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("attachment_type", "image");
    formData.append("model", "Section");
    await uploadMutate(formData);
    const pre = URL.createObjectURL(file);
    setPreview(pre);
  };

  const handleRemove = async () => {
    await deleteMutate({ path });
    setPreview(undefined);
    onChange("");
    if (imageRef?.current) imageRef.current.value = "";
  };

  return (
    <FormItem>
      <FormLabel className={disPlayError || error ? "border-red-500" : ""}>
        {label}
      </FormLabel>
      <FormControl>
        <div className="space-y-2">
          <div className="flex flex-col items-start gap-2">
            {preview && (
              <div className="relative group shrink-0">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-38 w-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemove}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="relative flex-1">
              <Input
                type="file"
                accept="image/*"
                disabled={isUploading || isDeleting || !!preview}
                className={disPlayError || error ? "border-red-500" : ""}
                ref={imageRef}
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
          <p className="text-sm text-red-500">{disPlayError || error}</p>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default ImageInput;
