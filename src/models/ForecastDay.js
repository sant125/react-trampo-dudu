export class ForecastDay {
  constructor(date, minTempC, maxTempC, description, humidity, icon) {
    this.date = date;
    this.minTempC = minTempC;
    this.maxTempC = maxTempC;
    this.description = description;
    this.humidity = humidity;
    this.icon = icon;
  }

  getHumidityPercent() {
    return `${Math.round(this.humidity * 100)}%`;
  }
}
