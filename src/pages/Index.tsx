import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

type TabType = "home" | "history" | "bookmarks" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const quickAccessSites = [
    { name: "Google", url: "google.com", icon: "Globe" },
    { name: "YouTube", url: "youtube.com", icon: "Video" },
    { name: "GitHub", url: "github.com", icon: "Code" },
    { name: "Twitter", url: "twitter.com", icon: "Twitter" },
    { name: "Reddit", url: "reddit.com", icon: "MessageSquare" },
    { name: "LinkedIn", url: "linkedin.com", icon: "Briefcase" },
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
    {
      name: "Развлечения",
      bookmarks: [
        { title: "YouTube", url: "youtube.com", icon: "Video" },
        { title: "Spotify", url: "spotify.com", icon: "Music" },
        { title: "Netflix", url: "netflix.com", icon: "Tv" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Icon name="Compass" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MintBrowser</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("home")}
              className="gap-2"
            >
              <Icon name="Home" size={18} />
              Главная
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("history")}
              className="gap-2"
            >
              <Icon name="Clock" size={18} />
              История
            </Button>
            <Button
              variant={activeTab === "bookmarks" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("bookmarks")}
              className="gap-2"
            >
              <Icon name="Star" size={18} />
              Закладки
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("settings")}
              className="gap-2"
            >
              <Icon name="Settings" size={18} />
              Настройки
            </Button>
          </div>
        </div>

        {activeTab === "home" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Поиск в интернете или введите адрес"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full shadow-md border-2 border-green-100 focus:border-green-400 transition-all"
                />
              </div>
              <Button size="lg" className="rounded-full h-14 px-8 shadow-md">
                <Icon name="ArrowRight" size={20} />
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Быстрый доступ</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickAccessSites.map((site) => (
                  <Card
                    key={site.name}
                    className="p-6 flex flex-col items-center gap-3 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Icon name={site.icon as any} className="text-green-600" size={24} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm text-gray-800">{site.name}</p>
                      <p className="text-xs text-gray-500">{site.url}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-white/90 backdrop-blur shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">История посещений</h2>
                <div className="flex gap-2">
                  <Input
                    placeholder="Поиск в истории..."
                    className="w-64"
                  />
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Trash2" size={16} />
                    Очистить
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-6">
                  {Array.from(new Set(historyItems.map(item => item.date))).map((date) => (
                    <div key={date}>
                      <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        {date}
                      </h3>
                      <div className="space-y-2">
                        {historyItems
                          .filter((item) => item.date === date)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                                <Icon name="Globe" className="text-green-600" size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate group-hover:text-green-600 transition-colors">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-500 truncate">{item.url}</p>
                              </div>
                              <span className="text-sm text-gray-400 flex-shrink-0">{item.time}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-white/90 backdrop-blur shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Закладки</h2>
                <Button className="gap-2">
                  <Icon name="Plus" size={18} />
                  Добавить папку
                </Button>
              </div>

              <div className="space-y-6">
                {bookmarkFolders.map((folder) => (
                  <div key={folder.name}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Icon name="Folder" className="text-white" size={18} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{folder.name}</h3>
                      <span className="text-sm text-gray-400">({folder.bookmarks.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-11">
                      {folder.bookmarks.map((bookmark, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer group bg-white"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Icon name={bookmark.icon as any} className="text-green-600" size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate text-sm group-hover:text-green-600 transition-colors">
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
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-white/90 backdrop-blur shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Настройки</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
                    <Icon name="Shield" size={20} />
                    Приватность и безопасность
                  </h3>
                  <div className="space-y-4 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">Блокировка рекламы</p>
                        <p className="text-sm text-gray-600">Автоматически блокировать всплывающую рекламу</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">Режим инкогнито по умолчанию</p>
                        <p className="text-sm text-gray-600">Не сохранять историю посещений</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">Защита от отслеживания</p>
                        <p className="text-sm text-gray-600">Блокировать трекеры сторонних сайтов</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
                    <Icon name="Palette" size={20} />
                    Внешний вид
                  </h3>
                  <div className="space-y-4 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">Темная тема</p>
                        <p className="text-sm text-gray-600">Включить темное оформление интерфейса</p>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">Компактный режим</p>
                        <p className="text-sm text-gray-600">Уменьшить размер элементов интерфейса</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
                    <Icon name="RefreshCw" size={20} />
                    Синхронизация
                  </h3>
                  <div className="space-y-4 ml-7">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors border-2 border-green-200">
                      <div>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          Синхронизация данных
                          <Icon name="CloudUpload" size={16} className="text-green-600" />
                        </p>
                        <p className="text-sm text-gray-600">Синхронизировать историю, закладки и настройки между устройствами</p>
                      </div>
                      <Switch checked={syncEnabled} onCheckedChange={setSyncEnabled} />
                    </div>
                    {syncEnabled && (
                      <div className="p-4 rounded-lg bg-white border border-green-200 ml-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Синхронизируются:</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Check" size={16} className="text-green-500" />
                            История посещений
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Закладки и папки
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Настройки браузера
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Check" size={16} className="text-green-500" />
                            Открытые вкладки
                          </div>
                        </div>
                        <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
                          <Icon name="Wifi" size={14} />
                          Последняя синхронизация: только что
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
