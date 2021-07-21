import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Settings } from '../settings-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: Settings = new Settings;

  constructor(private _settingsService : SettingsService) { }

  ngOnInit(): void {
    this._settingsService.getSettings().subscribe(data => {
      this.settings.power_button = data.power_button;
      this.settings.interval = data.interval;
    })
  }

  turnOff() {
    this.settings.power_button = false;
    this._settingsService.changeSettings(this.settings);
  }

  turnOn() {
    this.settings.power_button = true;
    this._settingsService.changeSettings(this.settings);
  }

  changeInterval(form: NgForm) {
    this.settings.interval = form.value.newInterval;
    this._settingsService.changeSettings(this.settings);
  }

}
