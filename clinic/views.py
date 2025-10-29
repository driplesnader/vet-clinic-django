from django.shortcuts import render, redirect
from .models import Veterinarian
from .forms import AppointmentForm

def home(request):
    vets = Veterinarian.objects.all()
    form = AppointmentForm()

    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')

    return render(request, 'home.html', {'vets': vets, 'form': form})


def success(request):
    return render(request, 'success.html')


