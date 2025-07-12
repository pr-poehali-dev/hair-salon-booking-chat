import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const services = [
    {
      id: "haircut",
      name: "Стрижка",
      price: "2000 ₽",
      duration: "60 мин",
      icon: "Scissors",
    },
    {
      id: "coloring",
      name: "Окрашивание",
      price: "4500 ₽",
      duration: "180 мин",
      icon: "Palette",
    },
    {
      id: "styling",
      name: "Укладка",
      price: "1500 ₽",
      duration: "45 мин",
      icon: "Wind",
    },
  ];

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      alert(
        `Запись подтверждена!\nУслуга: ${services.find((s) => s.id === selectedService)?.name}\nДата: ${selectedDate.toLocaleDateString("ru-RU")}\nВремя: ${selectedTime}`,
      );
      setIsBookingOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Scissors" size={24} className="text-primary" />
              <h1 className="text-2xl font-rubik font-bold text-primary">
                Beauty Studio
              </h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#home"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Главная
              </a>
              <a
                href="#services"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Услуги
              </a>
              <a
                href="#booking"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Запись
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                О мастере
              </a>
              <a
                href="#contacts"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Контакты
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-rubik font-bold text-primary mb-6">
                Ваша красота в надёжных руках
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Профессиональные услуги парикмахера с возможностью онлайн
                записи. Выберите удобное время и создайте свой неповторимый
                образ.
              </p>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 hover:scale-105 transition-transform"
                  >
                    Записаться онлайн
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-rubik">
                      Онлайн запись
                    </DialogTitle>
                    <DialogDescription>
                      Выберите услугу, дату и время для записи
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="service">Выберите услугу</Label>
                        <Select
                          value={selectedService}
                          onValueChange={setSelectedService}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Услуга" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} - {service.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Выберите время</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Ваше имя</Label>
                        <Input id="name" placeholder="Введите имя" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder="+7 (900) 000-00-00" />
                      </div>
                    </div>
                    <div>
                      <Label>Выберите дату</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0
                        }
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleBooking}
                    className="w-full mt-6"
                    size="lg"
                    disabled={
                      !selectedService || !selectedDate || !selectedTime
                    }
                  >
                    Подтвердить запись
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="animate-scale-in">
              <img
                src="/img/7c13fd3b-505d-434b-a54d-cf06bdc5a648.jpg"
                alt="Салон красоты"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-4xl font-rubik font-bold text-primary mb-4">
              Наши услуги
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Профессиональный уход за вашими волосами с использованием
              качественных материалов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name={service.icon}
                      size={32}
                      className="text-primary"
                    />
                  </div>
                  <CardTitle className="text-2xl font-rubik">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {service.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-primary mb-4">
                    {service.price}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      setSelectedService(service.id);
                      setIsBookingOpen(true);
                    }}
                  >
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h3 className="text-4xl font-rubik font-bold text-primary mb-6">
                О мастере
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Анна Иванова — профессиональный парикмахер с 8-летним опытом
                работы. Специализируется на современных техниках стрижки и
                окрашивания.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Award" size={20} className="text-primary" />
                  <span>Сертифицированный мастер</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Star" size={20} className="text-primary" />
                  <span>Более 500 довольных клиентов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Работаю ежедневно с 9:00 до 19:00</span>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <div className="bg-primary/5 rounded-2xl p-8 text-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name="User"
                    size={64}
                    className="text-primary-foreground"
                  />
                </div>
                <h4 className="text-2xl font-rubik font-semibold mb-2">
                  Анна Иванова
                </h4>
                <p className="text-muted-foreground">Мастер-парикмахер</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-4xl font-rubik font-bold text-primary mb-4">
              Контакты
            </h3>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h4 className="font-rubik font-semibold mb-2">Адрес</h4>
                <p className="text-muted-foreground">
                  г. Москва, ул. Примерная, д. 123
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} className="text-primary" />
                </div>
                <h4 className="font-rubik font-semibold mb-2">Телефон</h4>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow animate-fade-in">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h4 className="font-rubik font-semibold mb-2">Режим работы</h4>
                <p className="text-muted-foreground">
                  Пн-Сб: 9:00-19:00
                  <br />
                  Вс: выходной
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Scissors" size={24} />
            <h4 className="text-xl font-rubik font-bold">Beauty Studio</h4>
          </div>
          <p className="text-primary-foreground/80">
            © 2024 Beauty Studio. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
