from django.db import models



class Owner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    registration_date = models.DateTimeField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Pet(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)
    breed = models.CharField(max_length=100, blank=True, null=True)
    age = models.IntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name="pets")

    def __str__(self):
        return f"{self.name} ({self.species})"


class Veterinarian(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"


class Appointment(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="appointments")
    appointment_date = models.DateTimeField()
    veterinarian = models.ForeignKey(Veterinarian, on_delete=models.SET_NULL, null=True, related_name="appointments")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Appointment for {self.pet.name} on {self.appointment_date}"


class Medication(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name="medications")
    name = models.TextField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    dosage = models.CharField(max_length=100)
    side_effects = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

