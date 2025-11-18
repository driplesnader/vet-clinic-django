from django.contrib import admin
from .models import Owner, Pet, Veterinarian, Appointment, Medication

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "phone", "registration_date")
    search_fields = ("first_name", "last_name", "phone")

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ("name", "species", "breed", "age", "weight", "owner")
    search_fields = ("name", "species", "breed")

@admin.register(Veterinarian)
class VeterinarianAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "speciality", "phone")
    search_fields = ("first_name", "last_name", "speciality")

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("owner_name", "owner_phone", "pet", "appointment_date", "veterinarian")
    list_filter = ("veterinarian", "appointment_date")
    search_fields = ("owner_name", "pet")

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ("name", "appointment", "dosage", "price")
    search_fields = ("name",)



