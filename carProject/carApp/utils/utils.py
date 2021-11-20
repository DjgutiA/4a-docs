from datetime import datetime, timedelta


class RangeDate():
    def __init__(self, start_date, end_date):
        self.start_date = self.validate_date(start_date)
        self.end_date = self.validate_date(end_date)
        self.do_data()

    def validate_date(self, value_date):
        if isinstance(value_date, str):
            value_date = datetime.strptime(value_date, '')
        return value_date

    def do_data(self):
        data = []
        aux_date = self.start_date
        while aux_date <= self.end_date:
            data.append(aux_date)
            aux_date += timedelta(days=1)
        self.data = data
