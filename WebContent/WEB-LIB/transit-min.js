var transit = function() {
    return {
        initMap: function(e, t, n, r, i) {
            var s = {
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            $(e + "> #init").html("");
            $(e).append('<div id="timezone"></div>');
            $(e + "> #timezone").css({
                position: "absolute",
                bottom: "3%",
                right: "0.8%",
                "z-index": "99",
                "font-weight": "bold"
            });
            $(e).append('<div id="transitMap"></div>');
            $(e + "> #transitMap").css({
                position: "absolute",
                width: "100%",
                height: "100%"
            });
            if (r) {
                $(e).append('<div id="toggleLog">Start Logging</div>');
                $(e + "> #toggleLog").css({
                    position: "absolute",
                    bottom: "4%",
                    left: "1%",
                    "z-index": "99",
                    color: "#800000",
                    "-webkit-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                    "-moz-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                    "box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                    "background-color": "hsl(0, 0%, 90%)",
                    "border-radius": "10px",
                    padding: "10px",
                    "font-weight": "bold",
                    cursor: "pointer"
                });
                $(e + "> #toggleLog").click(function() {
                    transit.initTicker(e);
                    var t = e + "> #tickerDiv";
                    $(t).css("display", "inline");
                    $(t).fadeOut(5e3)
                });
                transit.initStatus(e)
            }
            var o = new google.maps.Map(document.getElementById("transitMap"), s);
            if (i) transit.initSearch(e, t, n, o);
            return o
        },
        initTicker: function(e) {
            $(e).append('<div id="tickerDiv"><span style="color:#800000"><strong>Transit Log</span>' + '<br /><br /></strong><div id="ticker"></div><br /><div id="tickerCtrl">' + '<span id="clear"><strong>Reset</strong></span> | ' + '<span id="stop"><strong>Stop logging</span></div></div>');
            var t = e + "> #tickerDiv";
            var n = t + "> #ticker";
            var r = t + "> #tickerCtrl";
            var i = r + "> #clear";
            var s = r + "> #stop";
            $(e + "> #toggleLog").css("display", "none");
            $(t).css({
                position: "absolute",
                bottom: "1%",
                left: "1%",
                width: "40%",
                "z-index": "99",
                "background-color": "hsl(0, 0%, 90%)",
                height: "38%",
                "-webkit-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "-moz-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "border-radius": "10px",
                padding: "10px",
                "text-align": "center",
                "overflow-y": "auto",
                "overflow-x": "auto",
                display: "none"
            });
            $(n).css({
                height: "75%",
                "overflow-y": "auto",
                "overflow-x": "auto",
                "text-align": "left",
                "line-height": "150%"
            });
            $(r).css({
                cursor: "pointer",
                color: "#800000"
            });
            $(i).click(function() {
                $(n).html("")
            });
            $(s).click(function() {
                $(t).remove();
                $(e + "> #toggleLog").css("display", "inline")
            });
            $(t).hover(function() {
                $(t).stop(true, true);
                $(t).css("display", "inline")
            },
            function() {
                $(t).fadeOut(5e3)
            })
        },
        initStatus: function(e) {
            $(e).append('<div id="status"></div>');
            $(e + "> #status").css({
                position: "absolute",
                bottom: "3%",
                right: "0.8%",
                "z-index": "99",
                "background-color": "hsl(0, 0%, 90%)",
                "-webkit-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "-moz-box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.3)",
                "border-radius": "5px",
                padding: "10px",
                display: "none"
            })
        },
        initSearch: function(e, t, n, r) {
            $("head").append('<link rel="stylesheet" ' + 'href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />');
            $.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js",
            function() {
                $(e).append('<input type="text" id="search" ' + 'placeholder="Search for a stop and select it from the dropdown.">');
                var i = e + "> #search";
                $(i).css({
                    position: "absolute",
                    width: "50%",
                    height: "13px",
                    top: "1%",
                    left: "25%",
                    "z-index": "99",
                    "border-radius": "5px",
                    padding: "5px"
                });
                $(i).autocomplete({
                    source: t,
                    select: function(e, t) {
                        var i = n[t.item.value];
                        var s = new google.maps.LatLng(i.x, i.y);
                        r.setZoom(15);
                        r.setCenter(s)
                    }
                });
                $(".ui-autocomplete").css({
                    "max-height": "50%",
                    "overflow-y": "auto",
                    "overflow-x": "hidden",
                    "padding-right": "20px"
                })
            })
        },
        initMarker: function(e, t, n, r) {
            var i = new google.maps.LatLng(e.x, e.y);
            var s = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: r,
                fillOpacity: .8,
                scale: 7
            };
            var o = {
                position: i,
                icon: s
            };
            o = new google.maps.Marker(o);
            return o
        },
        onMarkerMouseover: function(e, t, n, r, i) {
            if (i) {
                google.maps.event.clearListeners(n, "mouseover");
                google.maps.event.clearListeners(n, "mouseout");
                google.maps.event.addListener(n, "mouseover",
                function() {
                    $(e + "> #status").stop(true, true);
                    $(e + "> #status").css("display", "inline");
                    $(e + "> #status").html(r)
                });
                google.maps.event.addListener(n, "mouseout",
                function() {
                    $(e + "> #status").css("display", "none")
                })
            }
            if (typeof n.infoWindow != "undefined") {
                n.infoWindow.setContent(r)
            } else {
                n.infoWindow = new google.maps.InfoWindow({
                    content: r
                });
                google.maps.event.addListener(n, "click",
                function() {
                    n.infoWindow.open(t, n)
                });
                google.maps.event.addListener(t, "click",
                function() {
                    n.infoWindow.close()
                })
            }
        },
        overlayKml: function(e, t) {
            var n = {
                map: t
            };
            var r = new google.maps.KmlLayer(e, n)
        },
        kmlPromise: function(e) {
            return $.ajax({
                url: e,
                dataType: "xml",
                async: true
            })
        },
        jsonPromise: function(e) {
            return $.ajax({
                url: e,
                dataType: "json",
                async: true
            })
        },
        routeParser: function(e) {
            var t = {};
            var n = {};
            var r = new Array;
            var i = $("Document", e);
            i.find("Placemark > LineString > coordinates").each(function() {
                var e = transit.trim($(this).text()).split(" ");
                var n = new Array;
                var r = $(this).closest("Placemark").find("name").text().toLowerCase();
                for (eachPt in e) {
                    var i = transit.strip(e[eachPt]).split(",");
                    n.push({
                        x: parseFloat(i[1], 10),
                        y: parseFloat(i[0], 10)
                    })
                }
                t[transit.trim(r)] = n
            });
            i.find("Point").each(function() {
                var e = $(this).closest("Placemark");
                var t = transit.strip(e.find("Point").text()).split(",");
                var i = transit.trim(e.find("name").text()).toLowerCase();
                r.push(i);
                n[i] = {
                    x: parseFloat(t[1], 10),
                    y: parseFloat(t[0], 10)
                }
            });
            return {
                lines: t,
                points: n,
                stopnames: r
            }
        },
        vehicleParser: function(e) {
            var t = {};
            t.timezone = e.timezone;
            t.vehicles = e.vehicles;
            t.stopinterval = e.defaultstopinterval;
            return t
        },
        scheduler: function(e, t, n) {
            var r = {};
            var i = {};
            var s = new Array;
            var o = new Array;
            var u = e.stops;
            var a = e.stops.length;
            var f = u[0];
            var l = f.name;
            if (typeof f.departure == "undefined") throw new Error(e.name + " is missing its initial departure time at " + l);
            var c = transit.parseTime(f.departure.time, f.departure.day);
            var h = {};
            var p = t.points;
            var d = t.lines[e.route.toLowerCase()];
            if (typeof d == "undefined") throw new Error(e.name + "'s route " + e.route + " doesn't exist.");
            o.push(f.departure.time);
            i[c - c] = l;
            s.push(c - c);
            try {
                h[l] = transit.resolvePointToLine(d, p[l.toLowerCase()])
            } catch(v) {
                throw new Error("The stop " + l + " in vehicle " + e.name + "'s schedule wasn't found in its route.")
            }
            for (var m = 1; m < a - 1; m++) {
                var g = u[m];
                var y = u[m - 1];
                var b = g.name;
                if (typeof g.arrival == "undefined") {
                    var w = transit.parseTime(g.departure.time, g.departure.day) - c;
                    var E = w - transit.parseTime(n, 1);
                    g.arrival = {};
                    g.arrival.time = transit.secondsToHours(E + c).replace("+", "");
                    g.arrival.day = Math.ceil((E + c) / 86400)
                } else {
                    var E = transit.parseTime(g.arrival.time, g.arrival.day) - c
                }
                if (typeof g.departure == "undefined") {
                    var E = transit.parseTime(g.arrival.time, g.arrival.day) - c;
                    var w = E + transit.parseTime(n, 1);
                    g.departure = {};
                    g.departure.time = transit.secondsToHours(w + c).replace("+", "");
                    g.departure.day = Math.ceil((w + c) / 86400)
                } else {
                    var w = transit.parseTime(g.departure.time, g.departure.day) - c
                }
                o.push(g.arrival.time, g.departure.time);
                r[E] = b;
                i[w] = b;
                s.push(E, w);
                try {
                    h[b] = transit.resolvePointToLine(d, p[b.toLowerCase()])
                } catch(v) {
                    throw new Error("The stop " + b + " in vehicle " + e.name + "'s schedule wasn't found in its route.")
                }
            }
            var S = u[a - 1];
            var x = S.name;
            if (typeof S.arrival == "undefined") throw new Error(e.name + " is missing its final arrival time at " + x);
            var T = transit.parseTime(S.arrival.time, S.arrival.day) - c;
            r[T] = x;
            o.push(S.arrival.time);
            s.push(T);
            if (!transit.isSorted(s)) throw new Error(e.name + " seems to be going backwards in time.");
            try {
                h[x] = transit.resolvePointToLine(d, p[x.toLowerCase()])
            } catch(v) {
                throw new Error("The stop " + x + " in vehicle " + e.name + "'s schedule wasn't found in its route.")
            }
            var N = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
            e.color = N[Math.floor(Math.random() * N.length)];
            return {
                name: e.name,
                info: e.info,
                color: e.color,
                starts: c,
                baseinfo: transit.createBaseInfo(e.name, e.info, l, f.departure.time, x, S.arrival.time),
                route: d,
                stops: h,
                days: S.arrival.day - f.departure.day,
                arrivals: r,
                departures: i,
                traveltimes: s,
                traveltimesasstrings: o
            }
        },
        strip: function(e) {
            return e.replace(/\s+/g, "").replace(/\n/g, "")
        },
        trim: function(e) {
            return e.replace(/^\s+|\s+$/g, "")
        },
        isSorted: function(e) {
            for (var t = 0; t < e.length - 1; t++) {
                if (e[t] > e[t + 1]) return false
            }
            return true
        },
        resolvePointToLine: function(e, t) {
            if (t.x == e[0].x && t.y == e[0].y) return t;
            var n = transit.linearDist(e[0], t).toFixed(20);
            var r = e[0];
            for (var i = 1; i < e.length; i++) {
                if (t.x == e[i].x && t.y == e[i].y) return t;
                var s = transit.linearDist(e[i], t).toFixed(20);
                if (n > s) {
                    r = e[i];
                    n = s
                }
            }
            return r
        },
        haversine: function(e, t) {
            var n = 6371;
            if (typeof Number.prototype.toRad === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180
                }
            }
            var r = (t.x - e.x).toRad();
            var i = (t.y - e.y).toRad();
            var s = e.x.toRad();
            var o = t.x.toRad();
            var u = Math.sin(r / 2) * Math.sin(r / 2) + Math.sin(i / 2) * Math.sin(i / 2) * Math.cos(s) * Math.cos(o);
            var a = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
            var f = n * a;
            return f
        },
        linearDist: function(e, t) {
            return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
        },
        percentDist: function(e, t, n) {
            var r = {};
            var i = n / 100;
            r.x = (1 - i) * e.x + i * t.x;
            r.y = (1 - i) * e.y + i * t.y;
            return r
        },
        percentInRange: function(e, t, n) {
            return (n - e) / (t - e) * 100
        },
        pointsBetweenStops: function(e, t, n) {
            var r = transit.indexOfCoordsObjInList(e, t);
            var i = transit.indexOfCoordsObjInList(e, n);
            if (r > i) return e.slice(i, r + 1).reverse();
            else return e.slice(r, i + 1)
        },
        indexOfCoordsObjInList: function(e, t) {
            for (var n = 0; n < e.length; n++) {
                if (t.x == e[n].x && t.y == e[n].y) return n
            }
            return - 1
        },
        hashOfPercentDists: function(e) {
            var t = e[0];
            var n = e.length;
            var r = e[n - 1];
            var i = {
                0 : e[0]
            };
            var s = [0];
            var o = 0;
            var u = new Array;
            for (var a = 0; a < n - 1; a++) {
                o += transit.linearDist(e[a], e[a + 1]);
                s.push(o)
            }
            for (var a = 0; a < s.length; a++) {
                var f = transit.percentInRange(0, o, s[a]);
                u.push(f);
                i[f] = e[a]
            }
            return {
                percentages: u,
                hash: i
            }
        },
        enclosure: function(e) {
            var t = 0;
            var n = this.length - 1;
            var r;
            var i;
            while (t <= n) {
                r = (t + n) / 2 | 0;
                i = this[r];
                if (i < e) {
                    t = r + 1
                } else if (i > e) {
                    n = r - 1
                } else {
                    return r
                }
            }
            if (e > this[r]) {
                if (typeof this[r + 1] != "undefined") return [r, r + 1];
                else return - 1
            } else {
                if (typeof this[r - 1] != "undefined") return [r - 1, r];
                else return - 1
            }
        },
        parseTimeZone: function(e) {
            var t = (new Date).getTimezoneOffset();
            var n = e.split(":");
            n = n.map(function(e) {
                return parseInt(e, 10)
            });
            if (n.length < 3) n[2] = 0;
            if (n[0] < 0) {
                n[1] *= -1;
                n[2] *= -1
            }
            return n[0] * 3600 + n[1] * 60 + n[2] + t * 60
        },
        dayInTimezone: function(e) {
            var t = Math.ceil((transit.parseTime(transit.currTime(), 1) + transit.parseTimeZone(e)) / 86400) - 1;
            var n = (new Date).getDay();
            var r = n + t;
            var i = r < 0 ? 6 + r % 7 : r % 7;
            return i
        },
        parseTime: function(e, t) {
            var n = /^(?:2[0-3]|[01]?[0-9]):[0-5]?[0-9](:[0-5]?[0-9])?$/;
            if (!n.test(e)) throw new Error(e + " is not a valid timestring.");
            var r = e.split(":");
            r = r.map(function(e) {
                return parseInt(e, 10)
            });
            if (r.length < 3) r[2] = 0;
            return r[0] * 3600 + r[1] * 60 + r[2] + (t - 1) * 86400
        },
        currTime: function() {
            var e = new Date;
            return e.getHours().toString() + ":" + e.getMinutes().toString() + ":" + e.getSeconds().toString()
        },
        secondsToHours: function(e) {
            var t = Math.abs(e);
            var n = parseInt(t / 3600) % 24;
            var r = parseInt(t / 60) % 60;
            var i = t % 60;
            var s = (n < 10 ? "0" + n: n) + ":" + (r < 10 ? "0" + r: r) + ":" + (i < 10 ? "0" + i: i);
            if (e >= 0) return "+" + s;
            else return "-" + s
        },
        estimateCurrentPosition: function(e, t) {
            var n = e.arrivals;
            var r = e.departures;
            var i = e.traveltimes;
            var s = e.traveltimesasstrings;
            var o = e.days;
            var u = e.starts;
            var a = e.route;
            var f = e.stops;
            var l = new Array;
            var c = (new Date).getTimezoneOffset() * 60;
            var h = transit.currTime();
            for (var p = 1; p <= o + 1; p++) {
                var d = transit.enclosure.call(i, transit.parseTime(h, p) + transit.parseTimeZone(t) % 86400 - u);
                var v = {
                    stationaryAt: "",
                    departureTime: 0,
                    leaving: "",
                    approaching: "",
                    leftTime: 0,
                    approachTime: 0,
                    started: false,
                    completed: false,
                    justReached: false,
                    justLeft: false,
                    currentCoords: null
                };
                if (d[0] % 2 == 0 && d.length == 2) {
                    var m = i[d[0]];
                    var g = i[d[1]];
                    v.leftTime = s[d[0]];
                    v.approachTime = s[d[1]];
                    var y = r[m];
                    var b = n[g];
                    v.leaving = y;
                    v.approaching = b;
                    var w = f[y];
                    var E = f[b];
                    var S = transit.percentInRange(i[d[0]], i[d[1]], transit.parseTime(h, p) + transit.parseTimeZone(t) % 86400 - u);
                    var x = transit.pointsBetweenStops(a, w, E);
                    var T = transit.hashOfPercentDists(x);
                    var N = T.hash;
                    var C = T.percentages;
                    var k = transit.enclosure.call(C, S);
                    var L = C[k[0]];
                    var A = C[k[1]];
                    var O = transit.percentInRange(L, A, S);
                    v.currentCoords = transit.percentDist(N[L], N[A], O)
                } else {
                    if (d[0] % 2 != 0 && d.length == 2) {
                        v.stationaryAt = r[i[d[1]]];
                        v.departureTime = s[d[1]];
                        v.currentCoords = f[v.stationaryAt]
                    } else if (d > 0 && d < i.length - 1) {
                        if (d % 2 != 0) {
                            v.justReached = true;
                            v.stationaryAt = r[i[d + 1]];
                            v.departureTime = s[d + 1];
                            v.currentCoords = f[v.stationaryAt]
                        } else {
                            v.justLeft = true;
                            v.stationaryAt = r[i[d]];
                            v.approachingStop = n[i[d + 1]];
                            v.departureTime = s[d];
                            v.approachTime = s[d + 1];
                            v.currentCoords = f[v.stationaryAt]
                        }
                    } else if (d == i.length - 1) {
                        v.completed = true;
                        v.stationaryAt = n[i[d]];
                        v.currentCoords = f[v.stationaryAt]
                    } else if (d == 0) {
                        v.started = true;
                        v.stationaryAt = r[i[d]];
                        v.approachingStop = n[i[d + 1]];
                        v.approachTime = s[d + 1];
                        v.currentCoords = f[v.stationaryAt]
                    }
                }
                l.push(v)
            }
            return l
        },
        createBaseInfo: function(e, t, n, r, i, s) {
            return "<strong>Vehicle: </strong>" + e + "<br />" + (typeof t != "undefined" ? "<strong>Info: </strong>" + t + "<br />": "") + "<strong>Start: </strong>" + n + " (" + r + ")<br />" + "<strong>End: </strong>" + i + " (" + s + ")<br />"
        },
        createPositionInfo: function(e, t) {
            if (t.stationaryAt) {
                return e + "<strong>At: </strong>" + t.stationaryAt + "<br />" + "<strong>Departure: </strong>" + t.departureTime
            } else {
                return e + "<strong>Left: </strong>" + t.leaving + " (" + t.leftTime + ")" + "<br />" + "<strong>Approaching: </strong>" + t.approaching + " (" + t.approachTime + ")"
            }
        },
        writeLog: function(e, t, n) {
            var r = e + "> #tickerDiv";
            var i = r + "> #ticker";
            if (! ($(r).length > 0) || !(t.justReached || t.justLeft || t.started || t.completed)) return;
            $(r).show();
            $(r).stop(true, true);
            if (t.justReached) {
                $(i).append("<em>" + transit.currTime() + "</em> | " + "<strong>" + n.name + "</strong> just reached <strong>" + t.stationaryAt + "</strong>. " + "Departs at: <strong>" + t.departureTime + "</strong>.<br />")
            } else if (t.justLeft || t.started) {
                var s = t.started ? "just started from": "just left";
                $(i).append("<em>" + transit.currTime() + "</em> | " + "<strong>" + n.name + "</strong> " + s + " <strong>" + t.stationaryAt + "</strong>. " + "Next Stop: <strong>" + t.approachingStop + "</strong> at <strong>" + t.approachTime + "</strong>.<br />")
            } else if (t.completed) {
                $(i).append("<em>" + transit.currTime() + "</em> | " + "<strong>" + n.name + "</strong> just reached its destination at <strong>" + t.stationaryAt + "</strong>.<br />")
            }
            $(r).css("display", "inline");
            $(i).scrollTop($(i)[0].scrollHeight);
            $(r).fadeOut(5e3)
        },
        isMobileDevice: function() {
            var e = navigator.userAgent || navigator.vendor || window.opera;
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) return true;
            else return false
        },
        setInMotion: function(e, t, n, r, i, s, o, u) {
            var a = setInterval(function() {
                for (var t = 0; t < r; t++) {
                    var i = n[t];
                    if (typeof i.markers == "undefined") {
                        i.markers = new Array
                    }
                    var a = transit.estimateCurrentPosition(i, s);
                    for (var f = 0; f < a.length; f++) {
                        var l = a[f];
                        if (!l.currentCoords) {
                            if (typeof i.markers[f] != "undefined") {
                                i.markers[f].setMap(null);
                                delete i.markers[f]
                            }
                            continue
                        }
                        if (u) transit.writeLog(e, l, i);
                        if (l.completed) {
                            i.markers[f].setMap(null);
                            delete i.markers[f]
                        }
                        var c = transit.createPositionInfo(i.baseinfo, l);
                        if (typeof i.markers[f] == "undefined") {
                            var h = transit.initMarker(l.currentCoords, e, o, i.color);
                            h.setMap(o);
                            i.markers[f] = h
                        } else {
                            var p = new google.maps.LatLng(l.currentCoords.x, l.currentCoords.y);
                            i.markers[f].setPosition(p)
                        }
                        transit.onMarkerMouseover(e, o, i.markers[f], c, u)
                    }
                }
            },
            t)
        },
        callMain: function(e, t, n, r, i, s, o, u) {
            var a = r.timezone;
            var f = r.stopinterval;
            var l = transit.initMap(e, n.stopnames, n.points, s, o);
            transit.overlayKml(i, l);
            $("#timezone").append("UTC" + a + "/Local" + transit.secondsToHours(transit.parseTimeZone(a) % 86400));
            if (typeof u == "undefined") {
                var u = r.vehicles;
                var c = u.length;
                for (var h = 0; h < c; h++) {
                    try {
                        u[h] = transit.scheduler(u[h], n, f)
                    } catch(p) {
                        $(e + "> #init").html(p);
                        throw new Error(p)
                    }
                }
            } else {
                var c = u.length
            }
            transit.setInMotion(e, t, u, c, f, a, l, s)
        },
        initialize: function(e, t, n, r, i, s, o) {
            o = typeof o == "undefined" || o < 1 ? 1e3: o * 1e3;
            i = typeof i == "undefined" ? true: i;
            s = typeof s == "undefined" ? true: s;
            $(e).css({
                position: "relative",
                "font-family": '"Lucida Grande", "Lucida Sans Unicode",' + "Verdana, Arial, Helvetica, sans-serif",
                "font-size": "12px",
                "text-shadow": "hsla(0,0%,40%,0.5) 0 -1px 0, hsla(0,0%,100%,.6) 0 2px 1px",
                "background-color": "hsl(0, 0%, 90%)"
            });
            $(e).append("<div id='init' style='position:absolute;width:100%;" + "text-align:center;top:48%;font-weight:bold;z-index:99;'></div>");
            $(e + "> #init").html("Initialis(z)ing...");
            google.maps.event.addDomListener(window, "load",
            function() {
                var u = transit.kmlPromise(t);
                var a = transit.jsonPromise(r);
                u.success(function(t) {
                    a.success(function(r) {
                        var u = transit.routeParser(t);
                        var a = transit.vehicleParser(r);
                        transit.callMain(e, o, u, a, n, i, s)
                    }).fail(function() {
                        $(e + "> #init").html("Oh Shoot, there was an error loading the JSON file. " + "Check your file path or syntax.")
                    })
                }).fail(function() {
                    $(e + "> #init").html("Oh Shoot, there was an error loading the KML file.")
                })
            })
        }
    }
} ()