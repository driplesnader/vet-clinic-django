from django.shortcuts import render, redirect
from .models import Veterinarian
from .forms import AppointmentForm


def home(request):
    vets = Veterinarian.objects.all()
    return render(request, "home.html", {"vets": vets})


def vets_list(request):
    vets = Veterinarian.objects.all()
    return render(request, "doctors.html", {"vets": vets})  # ← ИЗМЕНИТЕ "vets.html" на "doctors.html"


def appointment_create(request):
    if request.method == "POST":
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("appointment_success")
    else:
        form = AppointmentForm()
    return render(request, "appointment_form.html", {"form": form})


def appointment_success(request):
    return render(request, "appointment_success.html")

def castration(request):
    return render(request, "services/castration.html")

def sterilization(request):
    return render(request, "services/sterilization.html")

def surgery(request):
    return render(request, "services/surgery.html")

def therapy(request):
    return render(request, "services/therapy.html")

