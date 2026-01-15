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
  const [mode, setMode] = useState<"login" | "register" | "verify">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUserId, setTempUserId] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://functions.poehali.dev/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка регистрации");
      }

      setTempUserId(data.userId);
      setMode("verify");
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      setError("Введите код подтверждения");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://functions.poehali.dev/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: tempUserId, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Неверный код");
      }

      onAuthSuccess({ email, name });
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://functions.poehali.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка входа");
      }

      onAuthSuccess(data.user);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setVerificationCode("");
    setError("");
    setTempUserId("");
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
            {mode === "login" && "Войти"}
            {mode === "register" && "Регистрация"}
            {mode === "verify" && "Подтверждение email"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "login" && "Введите свои данные для входа"}
            {mode === "register" && "Создайте аккаунт MintBrowser"}
            {mode === "verify" && `Код отправлен на ${email}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {mode === "verify" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Код подтверждения</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Введите 6-значный код"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
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
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Проверка..." : "Подтвердить"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setMode("register")}
                className="w-full"
              >
                Отправить код повторно
              </Button>
            </>
          ) : (
            <>
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
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading
                  ? "Загрузка..."
                  : mode === "login"
                  ? "Войти"
                  : "Зарегистрироваться"}
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
