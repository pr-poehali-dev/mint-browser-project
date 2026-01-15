import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
}

const AuthModal = ({ open, onOpenChange, onAuthSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!email || !password || !name) {
      setError("Заполните все поля");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mintbrowser_users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      setError("Этот email уже зарегистрирован");
      return;
    }

    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem("mintbrowser_users", JSON.stringify(users));
    localStorage.setItem("mintbrowser_current_user", JSON.stringify({ email, name }));

    onAuthSuccess({ email, name });
    onOpenChange(false);
    resetForm();
  };



  const handleLogin = () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mintbrowser_users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      setError("Неверный email или пароль");
      return;
    }

    localStorage.setItem("mintbrowser_current_user", JSON.stringify({ email: user.email, name: user.name }));
    onAuthSuccess({ email: user.email, name: user.name });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal text-center">
            {mode === "login" ? "Войти" : "Регистрация"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "login" 
              ? "Введите свои данные для входа" 
              : "Создайте аккаунт MintBrowser"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} />
                    {error}
                  </p>
                </div>
              )}

          <Button
            onClick={mode === "login" ? handleLogin : handleRegister}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Нет аккаунта?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="text-primary hover:underline font-medium"
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-primary hover:underline font-medium"
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;