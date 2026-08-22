import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const LoginPage: React.FC = () => {
  const [resetOpen, setResetOpen] = React.useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (isAuthenticated) {
      const state = location.state as { from?: { pathname?: string } } | null;
      const from = state?.from?.pathname || "/account";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleClose = () => {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative select-none">
      {/* MINIMAL CHROME HEADER */}
      <header className="w-full flex items-center justify-between px-6 sm:px-8 py-6 border-b border-border bg-[#fdfbf7]">
        {/* Top-Left Brand Wordmark */}
        <span className="text-xl font-display font-light tracking-luxury text-foreground">
          LABONNO
        </span>

        {/* Close/Back button */}
        <button
          onClick={handleClose}
          className="p-1.5 hover:text-accent duration-300 transition-colors cursor-pointer text-foreground"
          aria-label="Close Authentication"
        >
          <X className="h-5 w-5 stroke-[1.5]" />
        </button>
      </header>

      {/* CENTERED LOGIN CARD */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-card border border-border p-8 md:p-10 shadow-sm rounded-none">
          <SectionHeading
            title="My Account"
            eyebrow="Authentication"
            align="center"
            className="mb-8"
          />

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none bg-secondary/50 p-1">
              <TabsTrigger value="login" className="rounded-none">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-none">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <LoginForm />
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setResetOpen(true)}
                  className="text-xs font-sans tracking-wide text-muted-foreground hover:text-accent duration-300 transition-colors cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-md bg-[#fdfbf7]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl italic font-normal text-center sm:text-left">
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-xs font-sans text-muted-foreground mt-1 text-center sm:text-left">
              Enter your email address below, and we will validate and send a reset link.
            </DialogDescription>
          </DialogHeader>
          <ResetPasswordForm onSuccess={() => setResetOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
