import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TabType = "home" | "history" | "bookmarks" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("mintbrowser_current_user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mintbrowser_current_user");
    setCurrentUser(null);
  };

  const quickAccessSites = [
    { name: "YouTube", url: "https://youtube.com", bgColor: "bg-emerald-50", iconColor: "text-emerald-600", icon: "Youtube" },
    { name: "Почта", url: "https://mail.google.com", bgColor: "bg-emerald-100", iconColor: "text-emerald-700", icon: "Mail" },
    { name: "Карты", url: "https://maps.google.com", bgColor: "bg-green-50", iconColor: "text-green-600", icon: "Map" },
    { name: "Новости", url: "https://news.google.com", bgColor: "bg-green-100", iconColor: "text-green-700", icon: "Newspaper" },
    { name: "Переводчик", url: "https://translate.google.com", bgColor: "bg-teal-50", iconColor: "text-teal-600", icon: "Languages" },
    { name: "Фото", url: "https://photos.google.com", bgColor: "bg-teal-100", iconColor: "text-teal-700", icon: "Image" },
    { name: "Диск", url: "https://drive.google.com", bgColor: "bg-emerald-50", iconColor: "text-emerald-600", icon: "HardDrive" },
    { name: "Календарь", url: "https://calendar.google.com", bgColor: "bg-green-50", iconColor: "text-green-600", icon: "Calendar" },
  ];

  const historyItems = [
    { title: "Разработка веб-приложений 2025", url: "example.com/web-dev", time: "10:30", date: "Сегодня" },
    { title: "React лучшие практики", url: "reactjs.org/docs", time: "09:15", date: "Сегодня" },
    { title: "TypeScript документация", url: "typescriptlang.org", time: "14:45", date: "Вчера" },
    { title: "Дизайн систем UI/UX", url: "example.com/design", time: "16:20", date: "Вчера" },
    { title: "GitHub репозиторий", url: "github.com/user/repo", time: "11:00", date: "2 дня назад" },
  ];

  const bookmarkFolders = [
    {
      name: "Работа",
      bookmarks: [
        { title: "Почта Gmail", url: "gmail.com", icon: "Mail" },
        { title: "Календарь", url: "calendar.google.com", icon: "Calendar" },
        { title: "Документы", url: "docs.google.com", icon: "FileText" },
      ],
    },
    {
      name: "Разработка",
      bookmarks: [
        { title: "GitHub", url: "github.com", icon: "Code" },
        { title: "Stack Overflow", url: "stackoverflow.com", icon: "HelpCircle" },
        { title: "MDN Web Docs", url: "developer.mozilla.org", icon: "Book" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 right-0 p-4 flex items-center gap-3 z-50">
        {activeTab === "home" && (
          <>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              Почта
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              Картинки
            </Button>
          </>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Icon name="Grid3x3" className="text-gray-600" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-4">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab("history")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon name="Clock" className="text-blue-600" size={24} />
                </div>
                <span className="text-xs text-gray-700">История</span>
              </button>
              <button
                onClick={() => setActiveTab("bookmarks")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Icon name="Star" className="text-yellow-600" size={24} />
                </div>
                <span className="text-xs text-gray-700">Закладки</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon name="Settings" className="text-gray-600" size={24} />
                </div>
                <span className="text-xs text-gray-700">Настройки</span>
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer border-2 border-primary hover:border-primary/80 transition-colors">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`} />
                <AvatarFallback className="bg-primary text-white">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <Separator className="my-1" />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={() => setShowAuthModal(true)}
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Войти
          </Button>
        )}
      </header>

      <AuthModal 
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      {activeTab === "home" && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-2xl space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 mb-8">
                <span className="text-7xl font-light text-primary">M</span>
                <span className="text-7xl font-light text-emerald-500">i</span>
                <span className="text-7xl font-light text-green-500">n</span>
                <span className="text-7xl font-light text-primary">t</span>
                <span className="text-7xl font-light text-emerald-600">B</span>
                <span className="text-7xl font-light text-green-600">r</span>
                <span className="text-7xl font-light text-primary">o</span>
                <span className="text-7xl font-light text-emerald-500">w</span>
                <span className="text-7xl font-light text-green-500">s</span>
                <span className="text-7xl font-light text-primary">e</span>
                <span className="text-7xl font-light text-emerald-600">r</span>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-white shadow-md group-hover:shadow-lg transition-shadow" />
              <div className="relative flex items-center gap-3 px-6 py-4">
                <Icon name="Search" className="text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск в MintBrowser или введите URL"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <Icon name="Mic" className="text-primary cursor-pointer hover:bg-primary/10 rounded-full p-1" size={24} />
                <Icon name="Camera" className="text-primary cursor-pointer hover:bg-primary/10 rounded-full p-1" size={24} />
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button 
                onClick={handleSearch}
                variant="outline" 
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 px-6"
              >
                Поиск в MintBrowser
              </Button>
              <Button 
                onClick={handleSearch}
                variant="outline" 
                className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 px-6"
              >
                Мне повезёт!
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-16">
              {quickAccessSites.map((site) => (
                <button
                  key={site.name}
                  onClick={() => window.open(site.url, '_blank')}
                  className="flex flex-col items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-full ${site.bgColor} flex items-center justify-center group-hover:shadow-md transition-shadow`}>
                    <Icon name={site.icon as any} className={site.iconColor} size={28} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{site.name}</span>
                </button>
              ))}
            </div>
          </div>

          <footer className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200">
            <div className="px-6 py-3 text-sm text-gray-600">
              Россия
            </div>
            <Separator />
            <div className="px-6 py-3 flex items-center justify-between text-sm text-gray-600">
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Реклама</a>
                <a href="#" className="hover:underline">Для Бизнеса</a>
                <a href="#" className="hover:underline">Всё о MintBrowser</a>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Конфиденциальность</a>
                <a href="#" className="hover:underline">Условия</a>
                <a href="#" className="hover:underline">Настройки</a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {activeTab === "history" && (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab("home")}
                className="rounded-full"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-normal text-gray-800">История</h1>
            </div>

            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <Input
                  placeholder="Поиск в истории..."
                  className="max-w-md"
                />
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Trash2" size={16} />
                  Очистить историю
                </Button>
              </div>

              <ScrollArea className="h-[600px]">
                <div className="space-y-8">
                  {Array.from(new Set(historyItems.map(item => item.date))).map((date) => (
                    <div key={date}>
                      <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        {date}
                      </h3>
                      <div className="space-y-1">
                        {historyItems
                          .filter((item) => item.date === date)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Icon name="Globe" className="text-gray-500" size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-normal text-gray-900 truncate text-sm">
                                  {item.title}
                                </p>
                                <p className="text-xs text-blue-600 truncate hover:underline">{item.url}</p>
                              </div>
                              <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                              <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full">
                                <Icon name="MoreVertical" size={16} className="text-gray-400" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "bookmarks" && (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab("home")}
                className="rounded-full"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-normal text-gray-800">Закладки</h1>
            </div>

            <Card className="p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-800">Мои закладки</h2>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" size={18} />
                  Добавить папку
                </Button>
              </div>

              <div className="space-y-8">
                {bookmarkFolders.map((folder) => (
                  <div key={folder.name}>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Folder" className="text-gray-500" size={20} />
                      <h3 className="text-base font-medium text-gray-800">{folder.name}</h3>
                      <span className="text-sm text-gray-400">({folder.bookmarks.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-8">
                      {folder.bookmarks.map((bookmark, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Icon name={bookmark.icon as any} className="text-gray-600" size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-normal text-gray-800 truncate text-sm">
                              {bookmark.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{bookmark.url}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab("home")}
                className="rounded-full"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-normal text-gray-800">Настройки</h1>
            </div>

            <Card className="p-6 shadow-sm">
              <div className="space-y-8">
                <div>
                  <h3 className="text-base font-medium mb-4 flex items-center gap-2 text-gray-800">
                    <Icon name="Shield" size={20} />
                    Приватность и безопасность
                  </h3>
                  <div className="space-y-3 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-normal text-gray-800 text-sm">Блокировка рекламы</p>
                        <p className="text-xs text-gray-500">Автоматически блокировать рекламу</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-normal text-gray-800 text-sm">Режим инкогнито</p>
                        <p className="text-xs text-gray-500">Не сохранять историю</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-normal text-gray-800 text-sm">Защита от отслеживания</p>
                        <p className="text-xs text-gray-500">Блокировать трекеры</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-4 flex items-center gap-2 text-gray-800">
                    <Icon name="Palette" size={20} />
                    Внешний вид
                  </h3>
                  <div className="space-y-3 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-normal text-gray-800 text-sm">Темная тема</p>
                        <p className="text-xs text-gray-500">Темное оформление</p>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-4 flex items-center gap-2 text-gray-800">
                    <Icon name="RefreshCw" size={20} />
                    Синхронизация
                  </h3>
                  <div className="space-y-3 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-blue-100">
                      <div>
                        <p className="font-normal text-gray-800 text-sm flex items-center gap-2">
                          Синхронизация данных
                          <Icon name="CloudUpload" size={14} className="text-blue-600" />
                        </p>
                        <p className="text-xs text-gray-500">Синхронизация между устройствами</p>
                      </div>
                      <Switch checked={syncEnabled} onCheckedChange={setSyncEnabled} />
                    </div>
                    {syncEnabled && (
                      <div className="p-4 rounded-lg bg-blue-50 ml-4 border border-blue-100">
                        <p className="text-xs font-medium text-gray-700 mb-2">Синхронизируются:</p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Icon name="Check" size={14} className="text-blue-600" />
                            История посещений
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Icon name="Check" size={14} className="text-blue-600" />
                            Закладки и папки
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Icon name="Check" size={14} className="text-blue-600" />
                            Настройки браузера
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-3 flex items-center gap-1">
                          <Icon name="Wifi" size={12} />
                          Синхронизировано только что
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;