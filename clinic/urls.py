from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("veterinarians/", views.vets_list, name="vets"),
    path("appointment/", views.appointment_create, name="appointment"),
    path("appointment/success/", views.appointment_success, name="appointment_success"),
    path("services/castration/", views.castration, name="castration"),      
    path("services/sterilization/", views.sterilization, name="sterilization"), 
    path("services/surgery/", views.surgery, name="surgery"),         
    path("services/therapy/", views.therapy, name="therapy"),         
]