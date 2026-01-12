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
  },
  {
    id: "7",
    name: "Амстердам",
    country: "Нидерланды",
    lat: 52.3676,
    lng: 4.9041,
    costOfLiving: 88,
    safety: 88,
    healthcare: 95,
    education: 93,
    ecology: 90,
    population: "872 тыс.",
    language: "Голландский",
    description: "Велосипедная столица Европы с высокими зарплатами и развитой цифровой инфраструктурой.",
    costDetails: {
      housing: { rent1br: "€1500-2000", rent3br: "€2500-3500", utilities: "€150-200" },
      food: { meal: "€15-20", groceries: "€350-450", coffee: "€3.50" },
      transport: { monthly: "€96", taxi: "€2.50/км", gasoline: "€1.90/л" },
      taxes: { income: "37-49%", vat: "21%", corporate: "25%" }
    }
  },
  {
    id: "8",
    name: "Прага",
    country: "Чехия",
    lat: 50.0755,
    lng: 14.4378,
    costOfLiving: 58,
    safety: 85,
    healthcare: 80,
    education: 86,
    ecology: 78,
    population: "1.3 млн",
    language: "Чешский",
    description: "Красивый исторический город с доступными ценами и растущим IT-сектором.",
    costDetails: {
      housing: { rent1br: "€700-1100", rent3br: "€1400-2000", utilities: "€150-200" },
      food: { meal: "€10-14", groceries: "€250-350", coffee: "€2.50" },
      transport: { monthly: "€24", taxi: "€1.20/км", gasoline: "€1.50/л" },
      taxes: { income: "15-23%", vat: "21%", corporate: "19%" }
    }
  },
  {
    id: "9",
    name: "Стамбул",
    country: "Турция",
    lat: 41.0082,
    lng: 28.9784,
    costOfLiving: 48,
    safety: 68,
    healthcare: 72,
    education: 75,
    ecology: 65,
    population: "15.5 млн",
    language: "Турецкий",
    description: "Мегаполис на стыке Европы и Азии с бурно развивающейся экономикой.",
    costDetails: {
      housing: { rent1br: "₺8000-15000", rent3br: "₺15000-30000", utilities: "₺800-1200" },
      food: { meal: "₺150-300", groceries: "₺5000-8000", coffee: "₺50" },
      transport: { monthly: "₺500", taxi: "₺15/км", gasoline: "₺40/л" },
      taxes: { income: "15-40%", vat: "18%", corporate: "20%" }
    }
  },
  {
    id: "10",
    name: "Бангкок",
    country: "Таиланд",
    lat: 13.7563,
    lng: 100.5018,
    costOfLiving: 52,
    safety: 75,
    healthcare: 78,
    education: 72,
    ecology: 62,
    population: "10.7 млн",
    language: "Тайский",
    description: "Крупнейший город Юго-Восточной Азии с низкими расходами и развитой инфраструктурой.",
    costDetails: {
      housing: { rent1br: "฿12000-20000", rent3br: "฿25000-45000", utilities: "฿2000-3000" },
      food: { meal: "฿80-150", groceries: "฿8000-12000", coffee: "฿100" },
      transport: { monthly: "฿1500", taxi: "฿35/км", gasoline: "฿35/л" },
      taxes: { income: "0-35%", vat: "7%", corporate: "20%" }
    }
  },
  {
    id: "11",
    name: "Сингапур",
    country: "Сингапур",
    lat: 1.3521,
    lng: 103.8198,
    costOfLiving: 95,
    safety: 98,
    healthcare: 98,
    education: 95,
    ecology: 88,
    population: "5.7 млн",
    language: "Английский, Китайский, Малайский",
    description: "Финансовый центр Азии с высочайшим уровнем безопасности и инфраструктуры.",
    costDetails: {
      housing: { rent1br: "S$2500-3500", rent3br: "S$4500-7000", utilities: "S$150-250" },
      food: { meal: "S$8-15", groceries: "S$400-600", coffee: "S$5.00" },
      transport: { monthly: "S$120", taxi: "S$1.50/км", gasoline: "S$2.50/л" },
      taxes: { income: "0-22%", vat: "8%", corporate: "17%" }
    }
  },
  {
    id: "12",
    name: "Токио",
    country: "Япония",
    lat: 35.6762,
    lng: 139.6503,
    costOfLiving: 82,
    safety: 95,
    healthcare: 95,
    education: 92,
    ecology: 80,
    population: "14 млн",
    language: "Японский",
    description: "Технологическая столица мира с идеальной транспортной системой и безопасностью.",
    costDetails: {
      housing: { rent1br: "¥100000-150000", rent3br: "¥200000-350000", utilities: "¥15000-25000" },
      food: { meal: "¥1000-1500", groceries: "¥40000-60000", coffee: "¥400" },
      transport: { monthly: "¥10000", taxi: "¥80/км", gasoline: "¥160/л" },
      taxes: { income: "5-45%", vat: "10%", corporate: "23%" }
    }
  },
  {
    id: "13",
    name: "Сеул",
    country: "Южная Корея",
    lat: 37.5665,
    lng: 126.978,
    costOfLiving: 75,
    safety: 88,
    healthcare: 92,
    education: 95,
    ecology: 72,
    population: "9.7 млн",
    language: "Корейский",
    description: "Город высоких технологий с развитой стартап-экосистемой и быстрым интернетом.",
    costDetails: {
      housing: { rent1br: "₩800000-1500000", rent3br: "₩1500000-2500000", utilities: "₩150000-200000" },
      food: { meal: "₩8000-12000", groceries: "₩300000-450000", coffee: "₩4500" },
      transport: { monthly: "₩60000", taxi: "₩1000/км", gasoline: "₩1700/л" },
      taxes: { income: "6-45%", vat: "10%", corporate: "24%" }
    }
  },
  {
    id: "14",
    name: "Нью-Йорк",
    country: "США",
    lat: 40.7128,
    lng: -74.006,
    costOfLiving: 100,
    safety: 72,
    healthcare: 88,
    education: 90,
    ecology: 75,
    population: "8.3 млн",
    language: "Английский",
    description: "Финансовая столица мира с безграничными возможностями для бизнеса и карьеры.",
    costDetails: {
      housing: { rent1br: "$2500-3500", rent3br: "$4500-7000", utilities: "$150-250" },
      food: { meal: "$20-35", groceries: "$500-700", coffee: "$5.00" },
      transport: { monthly: "$127", taxi: "$3.00/км", gasoline: "$0.90/л" },
      taxes: { income: "4-10.9%", vat: "8.875%", corporate: "21%" }
    }
  },
  {
    id: "15",
    name: "Торонто",
    country: "Канада",
    lat: 43.6532,
    lng: -79.3832,
    costOfLiving: 80,
    safety: 85,
    healthcare: 92,
    education: 95,
    ecology: 85,
    population: "2.9 млн",
    language: "Английский, Французский",
    description: "Мультикультурный город с сильной экономикой и развитой системой образования.",
    costDetails: {
      housing: { rent1br: "C$1800-2500", rent3br: "C$3000-4500", utilities: "C$150-200" },
      food: { meal: "C$20-30", groceries: "C$400-600", coffee: "C$4.50" },
      transport: { monthly: "C$156", taxi: "C$2.00/км", gasoline: "C$1.50/л" },
      taxes: { income: "15-33%", vat: "13%", corporate: "26.5%" }
    }
  },
  {
    id: "16",
    name: "Мехико",
    country: "Мексика",
    lat: 19.4326,
    lng: -99.1332,
    costOfLiving: 50,
    safety: 62,
    healthcare: 70,
    education: 72,
    ecology: 58,
    population: "9.2 млн",
    language: "Испанский",
    description: "Крупнейший город Латинской Америки с богатой культурой и низкими ценами.",
    costDetails: {
      housing: { rent1br: "$400-700", rent3br: "$800-1400", utilities: "$50-80" },
      food: { meal: "$8-12", groceries: "$200-300", coffee: "$2.00" },
      transport: { monthly: "$15", taxi: "$0.50/км", gasoline: "$1.00/л" },
      taxes: { income: "1.92-35%", vat: "16%", corporate: "30%" }
    }
  },
  {
    id: "17",
    name: "Буэнос-Айрес",
    country: "Аргентина",
    lat: -34.6037,
    lng: -58.3816,
    costOfLiving: 42,
    safety: 65,
    healthcare: 75,
    education: 78,
    ecology: 70,
    population: "3 млн",
    language: "Испанский",
    description: "Париж Южной Америки с европейской архитектурой и низкой стоимостью жизни.",
    costDetails: {
      housing: { rent1br: "$300-500", rent3br: "$600-1000", utilities: "$50-100" },
      food: { meal: "$10-15", groceries: "$ 200-300", coffee: "$2.00" },
      transport: { monthly: "$12", taxi: "$0.80/км", gasoline: "$1.20/л" },
      taxes: { income: "5-35%", vat: "21%", corporate: "25-35%" }
    }
  },
  {
    id: "18",
    name: "Сидней",
    country: "Австралия",
    lat: -33.8688,
    lng: 151.2093,
    costOfLiving: 92,
    safety: 88,
    healthcare: 95,
    education: 95,
    ecology: 92,
    population: "5.3 млн",
    language: "Английский",
    description: "Крупнейший город Австралии с прекрасным климатом и высоким уровнем жизни.",
    costDetails: {
      housing: { rent1br: "A$2000-3000", rent3br: "A$3500-5500", utilities: "A$200-300" },
      food: { meal: "A$20-30", groceries: "A$500-700", coffee: "A$4.50" },
      transport: { monthly: "A$217", taxi: "A$2.50/км", gasoline: "A$1.80/л" },
      taxes: { income: "0-45%", vat: "10%", corporate: "30%" }
    }
  },
  {
    id: "19",
    name: "Лондон",
    country: "Великобритания",
    lat: 51.5074,
    lng: -0.1278,
    costOfLiving: 95,
    safety: 78,
    healthcare: 90,
    education: 95,
    ecology: 75,
    population: "9 млн",
    language: "Английский",
    description: "Глобальный финансовый центр с богатой историей и мультикультурной средой.",
    costDetails: {
      housing: { rent1br: "£1500-2500", rent3br: "£3000-5000", utilities: "£150-250" },
      food: { meal: "£15-25", groceries: "£350-500", coffee: "£3.50" },
      transport: { monthly: "£156", taxi: "£2.50/км", gasoline: "£1.50/л" },
      taxes: { income: "20-45%", vat: "20%", corporate: "25%" }
    }
  },
  {
    id: "20",
    name: "Париж",
    country: "Франция",
    lat: 48.8566,
    lng: 2.3522,
    costOfLiving: 90,
    safety: 72,
    healthcare: 95,
    education: 92,
    ecology: 78,
    population: "2.2 млн",
    language: "Французский",
    description: "Город моды и культуры с развитой инфраструктурой и богатым культурным наследием.",
    costDetails: {
      housing: { rent1br: "€1200-2000", rent3br: "€2500-4000", utilities: "€150-200" },
      food: { meal: "€15-25", groceries: "€350-500", coffee: "€3.50" },
      transport: { monthly: "€75", taxi: "€2.00/км", gasoline: "€1.80/л" },
      taxes: { income: "0-45%", vat: "20%", corporate: "25%" }
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
                    <SelectItem value="Нидерланды">Нидерланды</SelectItem>
                    <SelectItem value="Чехия">Чехия</SelectItem>
                    <SelectItem value="Турция">Турция</SelectItem>
                    <SelectItem value="Таиланд">Таиланд</SelectItem>
                    <SelectItem value="Сингапур">Сингапур</SelectItem>
                    <SelectItem value="Япония">Япония</SelectItem>
                    <SelectItem value="Южная Корея">Южная Корея</SelectItem>
                    <SelectItem value="США">США</SelectItem>
                    <SelectItem value="Канада">Канада</SelectItem>
                    <SelectItem value="Мексика">Мексика</SelectItem>
                    <SelectItem value="Аргентина">Аргентина</SelectItem>
                    <SelectItem value="Австралия">Австралия</SelectItem>
                    <SelectItem value="Великобритания">Великобритания</SelectItem>
                    <SelectItem value="Франция">Франция</SelectItem>
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