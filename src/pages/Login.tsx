import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useTranslation } from "react-i18next";
import { useMutate } from "@/hooks/UseMutate";
import Swal from "sweetalert2";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, error, logout } = useContext(AuthContext)!;
  const [err, setErr] = useState("");
  const { mutate, isPending } = useMutate({
    mutationKey: ["login"],
    endpoint: `admin/auth/login`,
    onSuccess: (data: any) => {
      login(data?.data?.data);

      window.location.replace("/");
      Swal.fire({
        title: data?.data.message,
        icon: "success",
        timer: 2000,
      });
    },
    onError: (err: any) => {
      console.log(err);
      Swal.fire({
        title: err.response?.data.message,
        icon: "success",
        timer: 2000,
      });
      setErr(err.response.data.message);
      logout();
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="min-h-[calc(100vh)] flex justify-center items-center bg-gray-100 rounded shadow">
      <div className="w-full max-w-sm mx-auto bg-gray-100 sm:bg-white sm:shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl text-gray-700 text-center font-semibold mb-4">
          {t("fields.login")}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fields.email")}
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("fields.password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
            {(error || err) && (
              <p className="text-red-500 text-sm mb-4">{error || err}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
