from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from accounts.models import User
from hotel import settings


class ModelBase(models.Model):
    id = models.BigAutoField(
        db_column='id',
        null=False,
        primary_key=True,
    )
    created_at = models.DateTimeField(
        db_column='dt_created_at',
        auto_now_add=True,
        null=False,
    )
    modified_at = models.DateTimeField(
        db_column='dt_modified_at',
        auto_now=True,
        null=False,
    )
    active = models.BooleanField(
        db_column='cs_active',
        default=True,
        null=False,
    )

    class Meta:
        abstract = True
        managed = True


class Room(ModelBase):
    class TypeRoom(models.IntegerChoices):
        SUITE = 1
        NORMAL = 2
        PREMIUM = 3

    daily_rate = models.DecimalField(
        db_column='nb_daily_rate',
        null=False,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )
    capacity = models.IntegerField(
        db_column='nb_capacity',
        null=False,
        blank=False,
        validators=[MinValueValidator(1)],
    )
    type_room = models.IntegerField(
        db_column='cs_room_type',
        choices=TypeRoom.choices,
        default=TypeRoom.NORMAL,
        null=False,
    )
    description = models.TextField(
        db_column='tx_description',
        max_length=255,
        null=False,
        blank=False,
    )

    class Meta:
        db_table = 'room'
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'

    def __str__(self):
        return f'R$ {self.daily_rate} - {self.type_room}'


class Reservation(ModelBase):
    daily_value = models.DecimalField(
        db_column='nb_daily_value',
        null=True,
        max_digits=10,
        decimal_places=2,
        blank=True,
        default=0,
        validators=[MinValueValidator(0)],
    )
    total_value = models.DecimalField(
        db_column='nb_total_value',
        null=True,
        max_digits=10,
        decimal_places=2,
        blank=True,
        default=0,
        validators=[MinValueValidator(0)],
    )
    dt_begin = models.DateField(
        db_column='dt_begin',
        null=False,
    )
    dt_end = models.DateField(
        db_column='dt_end',
        null=False,
    )
    room = models.ForeignKey(
        Room,
        db_column='id_room',
        on_delete=models.PROTECT,
        related_name='reservations',
        null=False,
        blank=False,
    )
    client = models.ForeignKey(
        User,
        db_column='id_client',
        on_delete=models.PROTECT,
        related_name='reservations',
        null=False,
        blank=False,
    )

    class Meta:
        db_table = 'reservation'
        verbose_name = 'Reservations'
        verbose_name_plural = 'Reservations'

    def __str__(self):
        return f'Reserva de {self.client.name} - Quarto {self.room.id} ({self.dt_begin} a {self.dt_end})'

    def save(self, *args, **kwargs):
        if not self.daily_value:
            self.daily_value = self.room.daily_rate
        if not self.total_value:
            days = max((self.dt_end - self.dt_begin).days, 1)
            self.total_value = self.room.daily_rate * days
        super().save(*args, **kwargs)


class Position(ModelBase):
    function = models.CharField(
        db_column='tx_function',
        null=False,
        max_length=40,
        blank=False,
    )
    max_salary = models.DecimalField(
        db_column='nb_max_salary',
        null=False,
        max_digits=10,
        decimal_places=2,
        blank=False,
        validators=[MinValueValidator(0)],
    )

    min_salary = models.DecimalField(
        db_column='nb_min_salary',
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        validators=[MinValueValidator(0)],
    )

    class Meta:
        db_table = 'position'
        verbose_name = 'Position'
        verbose_name_plural = 'Positions'

    def __str__(self):
        return self.function


class Employee(ModelBase):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employee_profile",
        null=False,
        blank=False,
    )
    salary = models.DecimalField(
        db_column='nb_salary',
        null=False,
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )

    level = models.IntegerField(
        db_column='nb_level',
        null=False,
        validators=[MaxValueValidator(5), MinValueValidator(1)],
    )

    position = models.ForeignKey(
        Position,
        db_column='id_position',
        on_delete=models.PROTECT,
        null=False,
        related_name='employees',
    )

    class Meta:
        db_table = 'employee'
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return self.user.username


class Check(ModelBase):
    class TypeCheck(models.IntegerChoices):
        CHECKIN = 1
        CHECKOUT = 2

    type = models.IntegerField(
        db_column='cs_type',
        choices=TypeCheck.choices,
        default=TypeCheck.CHECKIN,
        null=False,
    )
    employee = models.ForeignKey(
        Employee,
        db_column='id_employee',
        on_delete=models.PROTECT,
        null=False,
        related_name='checks',
    )
    reservation = models.ForeignKey(
        Reservation,
        db_column='id_reservation',
        on_delete=models.PROTECT,
        null=False,
        related_name='checks',
    )

    class Meta:
        db_table = 'check'
        verbose_name = 'Check'
        verbose_name_plural = 'Checks'

    def __str__(self):
        return f'Check {self.type} | Reserva: {self.reservation} | Employee: {self.employee.name}'


class Service(ModelBase):
    class TypeService(models.IntegerChoices):
        UPGRADE_SUITE = 1
        BREAKFAST = 2
        BAR = 3
        RESTAURANT = 4
        ROOM_SERVICE = 5
        PARKING = 6
        TRANSFER = 7
        SPA = 8
        RECREATION = 9
        OTHER = 10

    type = models.IntegerField(
        db_column='cs_type',
        choices=TypeService.choices,
        default=TypeService.OTHER,
        null=False,
    )
    value = models.DecimalField(
        db_column='nb_value',
        null=False,
        max_digits=10,
        decimal_places=2,
        blank=False,
    )
    description = models.TextField(
        db_column='tx_description',
        null=True,
        blank=True,
        max_length=240,
    )
    employee = models.ForeignKey(
        Employee,
        db_column='id_employee',
        on_delete=models.PROTECT,
        null=False,
        related_name='services',
    )
    reservation = models.ForeignKey(
        Reservation,
        db_column='id_reservation',
        on_delete=models.PROTECT,
        null=False,
        related_name='services',
    )

    class Meta:
        db_table = 'service'
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return f'Service {self.type} - {self.value}'


class PaymentMethod(ModelBase):
    name = models.CharField(
        db_column='tx_name',
        max_length=128,
        null=False,
        blank=False,
    )

    class Meta:
        db_table = 'payment_method'
        verbose_name = 'Payment_Method'
        verbose_name_plural = 'Payment_Methods'

    def __str__(self):
        return f'{self.name}'


class Payment(ModelBase):
    class TypePayment(models.IntegerChoices):
        HOSTING = 1
        SERVICE = 2

    total_payment = models.DecimalField(
        db_column='nb_total_payment',
        null=False,
        max_digits=10,
        decimal_places=2,
        blank=False,
    )
    type = models.IntegerField(
        db_column='cs_type',
        null=False,
        choices=TypePayment.choices,
        default=TypePayment.HOSTING,
        blank=False,
    )
    discount = models.DecimalField(
        db_column='nb_discount',
        decimal_places=2,
        null=False,
        max_digits=10,
        default=0,
    )
    value_payment = models.DecimalField(
        db_column='nb_value_payment',
        null=False,
        max_digits=10,
        decimal_places=2,
        blank=False,
    )
    payment_method = models.ForeignKey(
        PaymentMethod,
        db_column='id_payment_method',
        on_delete=models.PROTECT,
        null=False,
        related_name='payments',
    )

    employee = models.ForeignKey(
        Employee,
        db_column='id_employee',
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name='payments',
    )

    reservation = models.ForeignKey(
        Reservation,
        db_column='id_reservation',
        on_delete=models.PROTECT,
        null=False,
        blank=False,
        related_name='payments',
    )

    class Meta:
        db_table = 'payment'
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f'Payment {self.id} - {self.total_payment}'
