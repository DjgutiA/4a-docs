from django.http.response import JsonResponse
from rest_framework import generics, status
from carApp.models import Availability
from carApp.serializers import AvailabilitySerializer
from carApp.utils import RangeDate


class AvailabilitiesDetailView(generics.ListAPIView):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer


class AvailabilityCreateView(generics.CreateAPIView):
    serializer_class = AvailabilitySerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(self.request.data, list):
            kwargs["many"] = True
        return super(AvailabilityCreateView, self).get_serializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        list_date = RangeDate(
            request.data['start_date'], request.data['end_date']).data
        car = request.data['car']
        is_availability = request.data['is_availability']

        data = []
        key_field = []
        for date in list_date:
            data.append({
                'car': car,
                'date': date,
                'is_availability': is_availability,
                'key_field': '{}-{}'.format(car, date)
            })
            key_field.append('{}-{}'.format(car, date))

        for availability in Availability.objects.filter(car=car):
            if availability.key_field in key_field:
                return JsonResponse({'key_field': 'Availability with this car {} and this date {} already exists.'.format(availability.car_id, availability.date)}, status=status.HTTP_400_BAD_REQUEST)
        request._full_data = data
        return super().post(request, *args, **kwargs)


class AvailabilityUpdateView(generics.UpdateAPIView):
    serializer_class = AvailabilitySerializer
    queryset = Availability.objects.all()
    lookup_field = "id_availability"

    def get_serializer(self, *args, **kwargs):
        if isinstance(self.request.data, list):
            kwargs["many"] = True
        return super(AvailabilityUpdateView, self).get_serializer(*args, **kwargs)

    def update(self, request, *args, **kwargs):
        list_date = RangeDate(
            request.data['start_date'], request.data['end_date']).data
        car = request.data['car']
        is_availability = request.data['is_availability']

        data = []
        for date in list_date:
            data.append('{}-{}'.format(car, date))
        queryset = Availability.objects.filter(key_field__in=data)
        counter = 0
        for row in queryset:
            row.is_availability = is_availability
            row.save()
            counter += 1
        data = {
            'response': '{} Registros fueron actualizados a {}'.format(counter, is_availability)
        }
        return JsonResponse(data, status=status.HTTP_201_CREATED)


class AvailabilityDetailforCarView(generics.ListAPIView):
    serializer_class = AvailabilitySerializer

    def get_queryset(self):
        queryset = Availability.objects.filter(
            car=self.kwargs['car']).order_by('-date')
        return queryset
