import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import DGisMap from "@/components/DGisMap";

interface CostDetails {
  housing: { rent1br: string; rent3br: string; utilities: string };
  food: { meal: string; groceries: string; coffee: string };
  transport: { monthly: string; taxi: string; gasoline: string };
  taxes: { income: string; vat: string; corporate: string };
}

interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  costOfLiving: number;
  safety: number;
  healthcare: number;
  education: number;
  ecology: number;
  population: string;
  language: string;
  description: string;
  costDetails: CostDetails;
}

const cities: City[] = [
  {
    id: "1",
    name: "Лиссабон",
    country: "Португалия",
    lat: 38.7223,
    lng: -9.1393,
    costOfLiving: 65,
    safety: 85,
    healthcare: 78,
    education: 82,
    ecology: 88,
    population: "504 тыс.",
    language: "Португальский",
    description: "Столица Португалии с мягким климатом, развитой IT-индустрией и доступными ценами для Европы.",
    costDetails: {
      housing: { rent1br: "€800-1200", rent3br: "€1500-2200", utilities: "€80-120" },
      food: { meal: "€10-15", groceries: "€250-350", coffee: "€1.50" },
      transport: { monthly: "€40", taxi: "€0.50/км", gasoline: "€1.60/л" },
      taxes: { income: "14.5-48%", vat: "23%", corporate: "21%" }
    }
  },
  {
    id: "2",
    name: "Берлин",
    country: "Германия",
    lat: 52.52,
    lng: 13.405,
    costOfLiving: 78,
    safety: 82,
    healthcare: 95,
    education: 92,
    ecology: 85,
    population: "3.6 млн",
    language: "Немецкий",
    description: "Культурная столица Европы с сильной стартап-экосистемой и отличной социальной инфраструктурой.",
    costDetails: {
      housing: { rent1br: "€1000-1500", rent3br: "€2000-3000", utilities: "€150-200" },
      food: { meal: "€12-18", groceries: "€300-400", coffee: "€3.00" },
      transport: { monthly: "€49", taxi: "€2.00/км", gasoline: "€1.75/л" },
      taxes: { income: "14-45%", vat: "19%", corporate: "15%" }
    }
  },
  {
    id: "3",
    name: "Барселона",
    country: "Испания",
    lat: 41.3851,
    lng: 2.1734,
    costOfLiving: 72,
    safety: 75,
    healthcare: 88,
    education: 85,
    ecology: 82,
    population: "1.6 млн",
    language: "Испанский, Каталанский",
    description: "Средиземноморский мегаполис с развитой цифровой экономикой и высоким качеством жизни.",
    costDetails: {
      housing: { rent1br: "€900-1400", rent3br: "€1800-2500", utilities: "€100-150" },
      food: { meal: "€12-16", groceries: "€280-380", coffee: "€1.80" },
      transport: { monthly: "€40", taxi: "€1.10/км", gasoline: "€1.55/л" },
      taxes: { income: "19-47%", vat: "21%", corporate: "25%" }
    }
  },
  {
    id: "4",
    name: "Варшава",
    country: "Польша",
    lat: 52.2297,
    lng: 21.0122,
    costOfLiving: 55,
    safety: 80,
    healthcare: 75,
    education: 88,
    ecology: 72,
    population: "1.8 млн",
    language: "Польский",
    description: "Динамично развивающаяся столица с растущим рынком IT и доступными ценами.",
    costDetails: {
      housing: { rent1br: "€600-900", rent3br: "€1200-1800", utilities: "€100-150" },
      food: { meal: "€8-12", groceries: "€220-300", coffee: "€2.50" },
      transport: { monthly: "€25", taxi: "€0.80/км", gasoline: "€1.40/л" },
      taxes: { income: "12-32%", vat: "23%", corporate: "19%" }
    }
  },
  {
    id: "5",
    name: "Дубай",
    country: "ОАЭ",
    lat: 25.2048,
    lng: 55.2708,
    costOfLiving: 85,
    safety: 95,
    healthcare: 90,
    education: 85,
    ecology: 65,
    population: "3.3 млн",
    language: "Арабский, Английский",
    description: "Международный бизнес-хаб с нулевым подоходным налогом и высокими стандартами безопасности.",
    costDetails: {
      housing: { rent1br: "$1200-1800", rent3br: "$2500-4000", utilities: "$150-250" },
      food: { meal: "$15-25", groceries: "$400-600", coffee: "$5.00" },
      transport: { monthly: "$90", taxi: "$0.50/км", gasoline: "$0.60/л" },
      taxes: { income: "0%", vat: "5%", corporate: "0-9%" }
    }
  },
  {
    id: "6",
    name: "Тбилиси",
    country: "Грузия",
    lat: 41.7151,
    lng: 44.8271,
    costOfLiving: 45,
    safety: 82,
    healthcare: 68,
    education: 75,
    ecology: 78,
    population: "1.1 млн",
    language: "Грузинский",
    description: "Город с богатой историей, развивающейся IT-сферой и лояльной визовой политикой.",
    costDetails: {
      housing: { rent1br: "$300-500", rent3br: "$600-1000", utilities: "$50-80" },
      food: { meal: "$8-12", groceries: "$150-250", coffee: "$2.00" },
      transport: { monthly: "$10", taxi: "$0.30/км", gasoline: "$1.10/л" },
      taxes: { income: "20%", vat: "18%", corporate: "15%" }
    }
  }
];

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [budget, setBudget] = useState([70]);
  const [priority, setPriority] = useState("all");
  const [region, setRegion] = useState("all");

  const filteredCities = cities.filter(city => {
    if (region !== "all" && city.country !== region) return false;
    if (city.costOfLiving > budget[0]) return false;
    if (priority === "work" && city.education < 75) return false;
    if (priority === "family" && (city.safety < 75 || city.education < 75)) return false;
    if (priority === "startup" && (city.education < 80 || city.costOfLiving > 80)) return false;
    return true;
  });

  const getCostColor = (cost: number) => {
    if (cost < 60) return "bg-green-500";
    if (cost < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "text-green-400";
    if (rating >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <aside className="w-80 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Карта переезда</h1>
              <p className="text-sm text-muted-foreground">Найдите идеальное место для жизни</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Регион</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    <SelectItem value="Португалия">Португалия</SelectItem>
                    <SelectItem value="Германия">Германия</SelectItem>
                    <SelectItem value="Испания">Испания</SelectItem>
                    <SelectItem value="Польша">Польша</SelectItem>
                    <SelectItem value="ОАЭ">ОАЭ</SelectItem>
                    <SelectItem value="Грузия">Грузия</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Бюджет: {budget[0]}%</Label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={100}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Низкий</span>
                  <span>Высокий</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Приоритет</Label>
                <Tabs value={priority} onValueChange={setPriority}>
                  <TabsList className="grid grid-cols-2 bg-card">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="work">Работа</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-2 bg-card mt-2">
                    <TabsTrigger value="family">Семья</TabsTrigger>
                    <TabsTrigger value="startup">Стартап</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="pt-4 border-t border-sidebar-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Найдено городов</span>
                  <Badge variant="secondary">{filteredCities.length}</Badge>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0">
            <DGisMap cities={filteredCities} onCitySelect={setSelectedCity} selectedCity={selectedCity} />
          </div>

          

          {selectedCity && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 p-8 overflow-y-auto animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{selectedCity.name}</h2>
                    <p className="text-lg text-muted-foreground">{selectedCity.country}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCity(null)}>
                    <Icon name="X" size={24} />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 bg-card border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${getCostColor(selectedCity.costOfLiving)} flex items-center justify-center`}>
                        <Icon name="DollarSign" size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Стоимость жизни</p>
                        <p className="text-xl font-bold text-foreground">{selectedCity.costOfLiving}%</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-card border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                        <Icon name="Users" size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Население</p>
                        <p className="text-xl font-bold text-foreground">{selectedCity.population}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-card border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon name="MessageCircle" size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Язык</p>
                        <p className="text-sm font-semibold text-foreground">{selectedCity.language}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-card border-border mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Рейтинги показателей</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Безопасность", value: selectedCity.safety, icon: "Shield" },
                      { label: "Медицина", value: selectedCity.healthcare, icon: "Heart" },
                      { label: "Образование", value: selectedCity.education, icon: "GraduationCap" },
                      { label: "Экология", value: selectedCity.ecology, icon: "Leaf" }
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon name={metric.icon} size={18} className="text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{metric.label}</span>
                          </div>
                          <span className={`text-sm font-bold ${getRatingColor(metric.value)}`}>
                            {metric.value}/100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Home" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Жильё</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Аренда 1-комн.</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.housing.rent1br}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Аренда 3-комн.</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.housing.rent3br}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Коммунальные</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.housing.utilities}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="ShoppingCart" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Продукты</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Обед в ресторане</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.food.meal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Продукты в месяц</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.food.groceries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Кофе</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.food.coffee}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Car" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Транспорт</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Проездной</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.transport.monthly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Такси</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.transport.taxi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Бензин</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.transport.gasoline}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Receipt" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Налоги</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Подоходный</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.taxes.income}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">НДС</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.taxes.vat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Корпоративный</span>
                        <span className="text-sm font-medium text-foreground">{selectedCity.costDetails.taxes.corporate}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Описание</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedCity.description}</p>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;