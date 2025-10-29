from django.db import models


class Owner(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Pet(models.Model):
    name = models.CharField(max_length=100, verbose_name="Кличка")
    species = models.CharField(max_length=50, verbose_name="Вид")
    breed = models.CharField(max_length=100, blank=True, null=True, verbose_name="Порода")
    age = models.IntegerField(verbose_name="Возраст")
    weight = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Вес (кг)")
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name="pets", verbose_name="Владелец")

    def __str__(self):
        return f"{self.name} ({self.species})"


class Veterinarian(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Имя")
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    speciality = models.CharField(max_length=100, verbose_name="Специальность")
    phone = models.CharField(max_length=20, verbose_name="Телефон")

    def __str__(self):
        return f"Доктор {self.first_name} {self.last_name} — {self.speciality}"


class Appointment(models.Model):
    owner_name = models.CharField(max_length=100, verbose_name="Имя владельца")
    owner_phone = models.CharField(max_length=20, verbose_name="Телефон")
    pet = models.CharField(max_length=100, verbose_name="Имя питомца")
    appointment_date = models.DateTimeField(verbose_name="Дата и время приёма")
    veterinarian = models.ForeignKey(
        Veterinarian,
        on_delete=models.SET_NULL,
        null=True,
        related_name="appointments",
        verbose_name="Ветеринар"
    )
    description = models.TextField(blank=True, null=True, verbose_name="Описание проблемы")

    def __str__(self):
        return f"Запись: {self.pet} к {self.veterinarian}"



class Medication(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name="medications", verbose_name="Приём")
    name = models.TextField(verbose_name="Название препарата")
    price = models.DecimalField(max_digits=7, decimal_places=2, verbose_name="Цена")
    dosage = models.CharField(max_length=100, verbose_name="Дозировка")
    side_effects = models.CharField(max_length=255, blank=True, null=True, verbose_name="Побочные эффекты")

    def __str__(self):
        return self.name
