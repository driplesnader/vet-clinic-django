from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Owner, Pet, Veterinarian, Appointment, Medication


@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "phone", "registration_date")
    search_fields = ("first_name", "last_name", "phone")
    list_filter = ("registration_date",)
    ordering = ("last_name",)
    date_hierarchy = "registration_date"


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ("name", "species", "breed", "age", "weight", "owner")
    list_filter = ("species", "breed")
    search_fields = ("name", "owner__first_name", "owner__last_name")
    autocomplete_fields = ["owner"]


@admin.register(Veterinarian)
class VeterinarianAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "speciality", "phone")
    search_fields = ("first_name", "last_name", "speciality")
    list_filter = ("speciality",)
    ordering = ("last_name",)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("pet", "appointment_date", "veterinarian", "description")
    list_filter = ("appointment_date", "veterinarian__speciality")
    search_fields = (
        "pet",
        "veterinarian__first_name",
        "veterinarian__last_name",
        "description",
    )
    autocomplete_fields = ["veterinarian"]  # ✅ только ветеринар
    date_hierarchy = "appointment_date"



@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ("name", "dosage", "price", "appointment")
    search_fields = ("name", "appointment__pet__name")
    list_filter = ("appointment__veterinarian__speciality",)
    autocomplete_fields = ["appointment"]


