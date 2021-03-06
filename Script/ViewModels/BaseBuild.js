﻿var BaseBuild = Class.extend({
    init: function(data) {
        var self = this;
        if (data == null)
            data = {};

        ko.mapping.fromJS(data, {}, self);

        self.lowerStatus = ko.computed(function () {
            if(!this.status || this.status() == null)
                return 'unknown';
            if(this.isRunning && this.isRunning())
                return 'running';
            return this.status().toLowerCase();
        }, self);

        self.isRunning = ko.computed(function () {
            return this.running && this.running() && this.percentageComplete;
        }, self);

        self.hasProgress = ko.computed(function () {
            if (this.percentageComplete)
                return true;
            else
                return false;
        }, self);

        self.hasBranchName = ko.computed(function() {
            if (this.branchName)
                return true;
            else
                return false;
        }, self);

        self.description = ko.computed(function() {
            var description = '';
            if (this.branchName)
                description += this.branchName() + ' branch - ';

            if (this.number)
                description += '#' + this.number()

            return description;
        }, self);
    }
});
