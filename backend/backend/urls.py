"""
URL configuration for psf_interface project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/load_image/', views.load_image, name='load_image'),
  
    path('api/bead_extractor/mark/', views.bead_mark, name='bead_mark'),
    path('api/bead_extractor/extract/', views.bead_extract, name='bead_extract'),
    path('api/bead_extractor/average/', views.bead_average, name='bead_average'),
    
    path('api/psf_extractor/average_bead/', views.get_average_bead, name='get_average_bead'),
    path('api/psf_extractor/extract/', views.psf_extract, name='psf_average'),

    path('api/deconvolution/psf/', views.get_psf, name='get_psf'),
    path('api/deconvolution/voxel/', views.get_voxel, name='get_voxel'),
    path('api/deconvolution/run/', views.deconvolve_image, name='deconvolve_image'),

    
    path('api/cnn_deconv/preprocessing/', views.preprocess_image, name='preprocess_image'),
    path('api/cnn_deconv/deconv/', views.cnn_deconv_image, name='cnn_deconv_image'),


    path('api/hello_world/', views.hello_world, name='hello_world'),
    
]
