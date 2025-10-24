from django.shortcuts import render
from .models import Owner, Pet, Veterinarian, Appointment, Medication

def index(request):
    owners = Owner.objects.all()
    pets = Pet.objects.all()
    veterinarians = Veterinarian.objects.all()
    appointments = Appointment.objects.all()
    medications = Medication.objects.all()

    context = {
        'owners': owners,
        'pets': pets,
        'veterinarians': veterinarians,
        'appointments': appointments,
        'medications': medications,
    }

    return render(request, 'index.html', context)
