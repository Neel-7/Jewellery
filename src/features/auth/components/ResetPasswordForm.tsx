import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetSchema, type ResetFormValues } from "../schemas";

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetFormValues) => {
    toast({
      title: "Password Reset Status",
      description: `Password reset flow validated for ${data.email} — session wiring coming next.`,
      variant: "success",
    });
    if (onSuccess) {
      onSuccess();
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

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};
