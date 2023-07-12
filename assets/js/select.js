/* Copyright 2017, Chris Youderian, SimpleMaps, http://simplemaps.com
 Released under MIT license - https://opensource.org/licenses/MIT 
 */
(function (plugin) {

    // Rest of the code...


    // Start helper functions
    // IE8 support for index of
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (needle) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === needle) {
                    return i;
                }
            }
            return -1;
        };
    }

    // docReady in pure JavaScript, source: https://github.com/jfriend00/docReady/blob/master/docready.js, MIT
    (function (funcName, baseObj) {
        funcName = funcName || "docReady";
        baseObj = baseObj || window;
        var readyList = [];
        var readyFired = false;
        var readyEventHandlersInstalled = false;

        function ready() {
            if (! readyFired) {
                readyFired = true;
                for (var i = 0; i < readyList.length; i++) {
                    readyList[i].fn.call(window, readyList[i].ctx);
                }
                readyList = [];
            }
        }

        function readyStateChange() {
            if (document.readyState === "complete") {
                ready();
            }
        }

        baseObj[funcName] = function (callback, context) {
            if (readyFired) {
                setTimeout(function () {
                    callback(context);
                }, 1);
                return;
            } else {
                readyList.push({fn: callback, ctx: context});
            }

            if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
                setTimeout(ready, 1);
            } else if (! readyEventHandlersInstalled) {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", ready, false);
                    window.addEventListener("load", ready, false);
                } else {
                    document.attachEvent("onreadystatechange", readyStateChange);
                    window.attachEvent("onload", ready);
                } readyEventHandlersInstalled = true;
            }
        };
    })("docReady", window);
    // End helper functions

    window[plugin] = function () {
        return {map: false, on_shift: false, selected_color: false};
    }();

    docReady(function () {
        var me = window[plugin];
        var map = me.map ? me.map : simplemaps_usmap; // usmap is default
        var on_shift = me.on_shift;
        var selected_color = me.selected_color ? me.selected_color : map.mapdata.main_settings.state_hover_color;
        var selected = [];
        var max = me.max ? me.max : false;
        var original_mapdata = JSON.parse(JSON.stringify(map.mapdata));
        var main_settings = map.mapdata.main_settings;


        function check_mapdata(state) { // Make sure a color exists for each state
            if (! map.mapdata.state_specific[state]) {
                map.mapdata.state_specific[state] = {};
            }

            if (! original_mapdata.state_specific[state]) {
                original_mapdata.state_specific[state] = {};
                original_mapdata.state_specific[state].color = 'default';
            } else if (! original_mapdata.state_specific[state].color) {
                original_mapdata.state_specific[state].color = 'default';
            }
        }

        var deselect = function (state) {
            map.states[state].stop(); // Prevents fade time from interfering with deselect
            var index = selected.indexOf(state);
            if (index > -1) { // Deselect state
                selected.splice(index, 1);
                check_mapdata(state);
                map.mapdata.state_specific[state].color = original_mapdata.state_specific[state].color;
            }
            done(state);
        };

        var check_max = function (state) {
            if (me.max && selected.length >= me.max) {
                var first = selected[0];
                me.deselect(first);
            }
        };

        var select = function (state) {
            var index = selected.indexOf(state);
            if (index < 0) { // Make sure a state is selectable
                check_mapdata(state);
                check_max();
                map.mapdata.state_specific[state].color = me.selected_color;
                selected.push(state);
                done(state);
            }
        };

        var select_all = function () {
            for (var state in simplemaps_usmap_mapinfo.paths) {
                select(state);
            }
        };

        /* blue */
        document.querySelector('li#orange').addEventListener('click', function () {
            blue_select();
        });
        var blue_select = function () {
            for (var state in simplemaps_usmap_mapinfo.paths) {
                var ul = document.getElementById('selected-states-list');
                var li = document.createElement('li');
                if (state == "WA" || state == "OR" || state == "NV" || state == "CA") {
                    select(state);
                    li.textContent = state;
                    ul.appendChild(li);
                }
            }
        };
        /* Green */
        document.querySelector('li#green').addEventListener('click', function () {
            green_select();
        });
        var green_select = function () {

            for (var state in simplemaps_usmap_mapinfo.paths) {
                var ul = document.getElementById('selected-states-list');
                var li = document.createElement('li');
                if (state == "MT" || state == "ID" || state == "WY" || state == "SD" || state == "UT" || state == "CO" || state == "AZ" || state == "NM") {
                    select(state);
                    li.textContent = state;
                    ul.appendChild(li);
                }
            }
        };
        /* Red */
        document.querySelector('li#red').addEventListener('click', function () {
            red_select();
        });
        var red_select = function () {
            for (var state in simplemaps_usmap_mapinfo.paths) {
                var ul = document.getElementById('selected-states-list');
                var li = document.createElement('li');
                if (state == "ND" || state == "MN" || state == "WI" || state == "IL" || state == "IA" || state == "MO" || state == "NE" || state == "KS" || state == "TN" || state == "AL" || state == "MS" || state == "AR" || state == "LA" || state == "TX" || state == "OK") {
                    select(state);
                    li.textContent = state;
                    ul.appendChild(li);
                }
            }
        };
        /* yellow */
        document.querySelector('li#purple').addEventListener('click', function () {
            yellow_select();
        });
        var yellow_select = function () {
            for (var state in simplemaps_usmap_mapinfo.paths) {
                var ul = document.getElementById('selected-states-list');
                var li = document.createElement('li');
                if (state == "GA" || state == "SC" || state == "FL" || state == "VA" || state == "NC" || state == "WV" || state == "KY" || state == "IN" || state == "OH" || state == "VT" || state == "NJ" || state == "DE" || state == "DC" || state == "MD" || state == "RI" || state == "MA" || state == "MI" || state == "PA" || state == "NY" || state == "ME" || state == "NH" || state == "CT" || state == "HI" || state == "AK") {
                    select(state);
                    li.textContent = state;
                    ul.appendChild(li);
                }
            }
        };
        /* deslect */
        document.querySelector('span#deselect-Ok').addEventListener('click', function () {
            deselect_all()
            var ul = document.getElementById('selected-states-list');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        });
        var deselect_all = function () {
            var length = selected.length;
            for (var i = 1; i < length + 1; i++) {
                var id = length - i;
                var state = selected[id];
                deselect(state);
            }
        };

        function done(state) {
            map.refresh_state(state);
            me.selected = selected; // Update value
        }

        var upon_click = function (state, e) {

            if (me.on_shift) { // Select on shift+click
                var evt = e || w.event;
                var length = me.selected.length;
                var index = me.selected.indexOf(state);
                var last_state = me.selected[length - 1];
                if (length === 0) {
                    me.select(state);
                } else if (length > 0) {
                    if (evt.shiftKey) {
                        if (index > -1) {
                            me.deselect(state);
                        } else {
                            me.select(state);
                        }
                    } else {
                        me.deselect_all(last_state);
                        me.select(state);
                    }
                }

            } else { // Select on click
                var index = selected.indexOf(state);
                var ul = document.getElementById('selected-states-list');
                var li = document.createElement('li');
                if (index > -1) { // Deselect state
                    deselect(state);
                    ul.removeChild(ul.childNodes[index]);
                } else {
                    select(state);
                    li.textContent = state;
                    ul.appendChild(li);
                }

            }
        };

        map.plugin_hooks.click_state.push(upon_click);

        window[plugin] = function () {
            return {
                // Inputs
                map: map,
                on_shift: on_shift,
                selected_color: selected_color,
                max: max,
                // Outputs
                selected: selected,
                // Methods
                select: select,
                deselect: deselect,
                select_all: select_all,
                deselect_all: deselect_all
            };
        }();

        me = window[plugin];

    });

})('simplemaps_select');
