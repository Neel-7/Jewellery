import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormValues } from "../schemas";
import { loginUser } from "../authSlice";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        const user = resultAction.payload.user;
        toast({
          title: "Welcome Back",
          description: `Welcome back, ${user.name}!`,
          variant: "success",
        });
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Sign-in failed. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="flex flex-col">
        <label className="text-[11px] font-sans tracking-luxury uppercase text-foreground/80 mb-2">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="your.email@domain.com"
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-[10px] font-sans text-destructive tracking-wide flex items-center gap-1.5 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <XCircle className="h-3.5 w-3.5" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-[11px] font-sans tracking-luxury uppercase text-foreground/80 mb-2">
          Password
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="text-[10px] font-sans text-destructive tracking-wide flex items-center gap-1.5 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
            <XCircle className="h-3.5 w-3.5" />
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2"
      >
        {isSubmitting ? "Validating..." : "Sign In"}
      </Button>
    </form>
  );
};
