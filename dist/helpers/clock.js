"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockDate = (function () {
    function ClockDate(year, month, day, hour, minutes, seconds, milliseconds) {
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        this.Date = new Date(year, (month + 11) % 12, day, hour, minutes, seconds, milliseconds);
    }
    ClockDate.prototype.short = function () {
        return (this.Date.getDate()) + "/" + (this.Date.getMonth() + 1) + "/" + this.Date.getFullYear();
    };
    ClockDate.prototype.getTime = function () {
        return this.Date.getTime();
    };
    ClockDate.prototype.isBefore = function (date) {
        return this.getTime() < date.getTime();
    };
    ClockDate.prototype.isAfter = function (date) {
        return this.getTime() > date.getTime();
    };
    ClockDate.prototype.addDays = function (days) {
        return ClockDate.fromTicks(this.getTime() + days * 24 * 60 * 60 * 1000);
    };
    ClockDate.prototype.addHours = function (hours) {
        return ClockDate.fromTicks(this.getTime() + hours * 60 * 60 * 1000);
    };
    ClockDate.prototype.addMinutes = function (minutes) {
        return ClockDate.fromTicks(this.getTime() + minutes * 60 * 1000);
    };
    ClockDate.prototype.addSeconds = function (seconds) {
        return ClockDate.fromTicks(this.getTime() + seconds * 1000);
    };
    ClockDate.prototype.addMilliSeconds = function (milliseconds) {
        return ClockDate.fromTicks(this.getTime() + milliseconds);
    };
    ClockDate.fromTicks = function (ticks) {
        var now = new Date(ticks);
        return new ClockDate(now.getFullYear(), (now.getMonth() + 1) % 12, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    };
    return ClockDate;
}());
exports.ClockDate = ClockDate;
var Clock = (function () {
    function Clock() {
        this._timeDifference = 0;
    }
    Object.defineProperty(Clock, "Instance", {
        get: function () {
            if (Clock._instance == null) {
                Clock._instance = new Clock();
            }
            return Clock._instance;
        },
        enumerable: true,
        configurable: true
    });
    Clock.prototype.reset = function () {
        this._timeDifference = 0;
    };
    Clock.prototype.addDays = function (days) {
        this._timeDifference += days * 24 * 60 * 60 * 1000;
    };
    Clock.prototype.addHours = function (hours) {
        this._timeDifference += hours * 60 * 60 * 1000;
    };
    Clock.prototype.addMinutes = function (minutes) {
        this._timeDifference += minutes * 60 * 1000;
    };
    Clock.prototype.addSeconds = function (seconds) {
        this._timeDifference += seconds * 1000;
    };
    Clock.prototype.addMilliseconds = function (milliseconds) {
        this._timeDifference += milliseconds;
    };
    Clock.now = function () {
        return ClockDate.fromTicks(Date.now() + Clock.Instance._timeDifference);
    };
    return Clock;
}());
exports.Clock = Clock;
//# sourceMappingURL=clock.js.map