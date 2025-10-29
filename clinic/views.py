from django.shortcuts import render, redirect
from .models import Veterinarian, Appointment
from .forms import AppointmentForm

def home(request):
    vets = Veterinarian.objects.all()

    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = AppointmentForm()

    return render(request, 'home.html', {'vets': vets, 'form': form})

def success(request):
    return render(request, 'success.html')



