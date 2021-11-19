from django.db import models


class Category(models.Model):
    id_category = models.AutoField(primary_key=True)
    name_category = models.CharField('Category', max_length=45, null=False)

    class Meta:
        db_table = "categories"
        verbose_name = "category"
        verbose_name_plural = "Categories"
        ordering = ["id_category"]
