! function(n) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = n();
    else if ("function" == typeof define && define.amd) define([], n);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.leafletPip = n()
    }
}(function() {
    return function n(t, o, e) {
        function r(i, s) {
            if (!o[i]) {
                if (!t[i]) {
                    var u = "function" == typeof require && require;
                    if (!s && u) return u(i, !0);
                    if (a) return a(i, !0);
                    var c = new Error("Cannot find module '" + i + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var f = o[i] = {
                    exports: {}
                };
                t[i][0].call(f.exports, function(n) {
                    var o = t[i][1][n];
                    return r(o ? o : n)
                }, f, f.exports, n, t, o, e)
            }
            return o[i].exports
        }
        for (var a = "function" == typeof require && require, i = 0; i < e.length; i++) r(e[i]);
        return r
    }({
        1: [function(n, t) {
            var o = n("geojson-utils"),
                e = {
                    bassackwards: !1,
                    pointInLayer: function(n, t, r) {
                        "use strict";
                        n instanceof L.LatLng ? n = [n.lng, n.lat] : e.bassackwards && (n = n.concat().reverse());
                        var a = [];
                        return t.eachLayer(function(t) {
                            r && a.length || (t instanceof L.Polygon) && o.pointInPolygon({
                                type: "Point",
                                coordinates: n
                            }, t.toGeoJSON().geometry) && a.push(t)
                        }), a
                    }
                };
            t.exports = e
        }, {
            "geojson-utils": 2
        }],
        2: [function(n, t) {
            ! function() {
                function n(n) {
                    for (var t = [], o = [], e = 0; e < n[0].length; e++) t.push(n[0][e][1]), o.push(n[0][e][0]);
                    return t = t.sort(function(n, t) {
                        return n - t
                    }), o = o.sort(function(n, t) {
                        return n - t
                    }), [
                        [t[0], o[0]],
                        [t[t.length - 1], o[o.length - 1]]
                    ]
                }

                function o(n, t, o) {
                    for (var e = [
                            [0, 0]
                        ], r = 0; r < o.length; r++) {
                        for (var a = 0; a < o[r].length; a++) e.push(o[r][a]);
                        e.push(o[r][0]), e.push([0, 0])
                    }
                    for (var i = !1, r = 0, a = e.length - 1; r < e.length; a = r++) e[r][0] > t != e[a][0] > t && n < (e[a][1] - e[r][1]) * (t - e[r][0]) / (e[a][0] - e[r][0]) + e[r][1] && (i = !i);
                    return i
                }
                var e = this.gju = {};
                "undefined" != typeof t && t.exports && (t.exports = e), e.lineStringsIntersect = function(n, t) {
                    for (var o = [], e = 0; e <= n.coordinates.length - 2; ++e)
                        for (var r = 0; r <= t.coordinates.length - 2; ++r) {
                            var a = {
                                    x: n.coordinates[e][1],
                                    y: n.coordinates[e][0]
                                },
                                i = {
                                    x: n.coordinates[e + 1][1],
                                    y: n.coordinates[e + 1][0]
                                },
                                s = {
                                    x: t.coordinates[r][1],
                                    y: t.coordinates[r][0]
                                },
                                u = {
                                    x: t.coordinates[r + 1][1],
                                    y: t.coordinates[r + 1][0]
                                },
                                c = (u.x - s.x) * (a.y - s.y) - (u.y - s.y) * (a.x - s.x),
                                f = (i.x - a.x) * (a.y - s.y) - (i.y - a.y) * (a.x - s.x),
                                h = (u.y - s.y) * (i.x - a.x) - (u.x - s.x) * (i.y - a.y);
                            if (0 != h) {
                                var d = c / h,
                                    l = f / h;
                                d >= 0 && 1 >= d && l >= 0 && 1 >= l && o.push({
                                    type: "Point",
                                    coordinates: [a.x + d * (i.x - a.x), a.y + d * (i.y - a.y)]
                                })
                            }
                        }
                    return 0 == o.length && (o = !1), o
                }, e.pointInBoundingBox = function(n, t) {
                    return !(n.coordinates[1] < t[0][0] || n.coordinates[1] > t[1][0] || n.coordinates[0] < t[0][1] || n.coordinates[0] > t[1][1])
                }, e.pointInPolygon = function(t, r) {
                    for (var a = "Polygon" == r.type ? [r.coordinates] : r.coordinates, i = !1, s = 0; s < a.length; s++) e.pointInBoundingBox(t, n(a[s])) && (i = !0);
                    if (!i) return !1;
                    for (var u = !1, s = 0; s < a.length; s++) o(t.coordinates[1], t.coordinates[0], a[s]) && (u = !0);
                    return u
                }, e.pointInMultiPolygon = function(t, r) {
                    for (var a = "MultiPolygon" == r.type ? [r.coordinates] : r.coordinates, i = !1, s = !1, u = 0; u < a.length; u++) {
                        for (var c = a[u], f = 0; f < c.length; f++) i || e.pointInBoundingBox(t, n(c[f])) && (i = !0);
                        if (!i) return !1;
                        for (var f = 0; f < c.length; f++) s || o(t.coordinates[1], t.coordinates[0], c[f]) && (s = !0)
                    }
                    return s
                }, e.numberToRadius = function(n) {
                    return n * Math.PI / 180
                }, e.numberToDegree = function(n) {
                    return 180 * n / Math.PI
                }, e.drawCircle = function(n, t, o) {
                    for (var r = [t.coordinates[1], t.coordinates[0]], a = n / 1e3 / 6371, i = [e.numberToRadius(r[0]), e.numberToRadius(r[1])], o = o || 15, s = [
                            [r[0], r[1]]
                        ], u = 0; o > u; u++) {
                        var c = 2 * Math.PI * u / o,
                            f = Math.asin(Math.sin(i[0]) * Math.cos(a) + Math.cos(i[0]) * Math.sin(a) * Math.cos(c)),
                            h = i[1] + Math.atan2(Math.sin(c) * Math.sin(a) * Math.cos(i[0]), Math.cos(a) - Math.sin(i[0]) * Math.sin(f));
                        s[u] = [], s[u][1] = e.numberToDegree(f), s[u][0] = e.numberToDegree(h)
                    }
                    return {
                        type: "Polygon",
                        coordinates: [s]
                    }
                }, e.rectangleCentroid = function(n) {
                    var t = n.coordinates[0],
                        o = t[0][0],
                        e = t[0][1],
                        r = t[2][0],
                        a = t[2][1],
                        i = r - o,
                        s = a - e;
                    return {
                        type: "Point",
                        coordinates: [o + i / 2, e + s / 2]
                    }
                }, e.pointDistance = function(n, t) {
                    var o = n.coordinates[0],
                        r = n.coordinates[1],
                        a = t.coordinates[0],
                        i = t.coordinates[1],
                        s = e.numberToRadius(i - r),
                        u = e.numberToRadius(a - o),
                        c = Math.pow(Math.sin(s / 2), 2) + Math.cos(e.numberToRadius(r)) * Math.cos(e.numberToRadius(i)) * Math.pow(Math.sin(u / 2), 2),
                        f = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
                    return 6371 * f * 1e3
                }, e.geometryWithinRadius = function(n, t, o) {
                    if ("Point" == n.type) return e.pointDistance(n, t) <= o;
                    if ("LineString" == n.type || "Polygon" == n.type) {
                        var r, a = {};
                        r = "Polygon" == n.type ? n.coordinates[0] : n.coordinates;
                        for (var i in r)
                            if (a.coordinates = r[i], e.pointDistance(a, t) > o) return !1
                    }
                    return !0
                }, e.area = function(n) {
                    for (var t, o, e = 0, r = n.coordinates[0], a = r.length - 1, i = 0; i < r.length; a = i++) {
                        var t = {
                                x: r[i][1],
                                y: r[i][0]
                            },
                            o = {
                                x: r[a][1],
                                y: r[a][0]
                            };
                        e += t.x * o.y, e -= t.y * o.x
                    }
                    return e /= 2
                }, e.centroid = function(n) {
                    for (var t, o, r, a = 0, i = 0, s = n.coordinates[0], u = s.length - 1, c = 0; c < s.length; u = c++) {
                        var o = {
                                x: s[c][1],
                                y: s[c][0]
                            },
                            r = {
                                x: s[u][1],
                                y: s[u][0]
                            };
                        t = o.x * r.y - r.x * o.y, a += (o.x + r.x) * t, i += (o.y + r.y) * t
                    }
                    return t = 6 * e.area(n), {
                        type: "Point",
                        coordinates: [i / t, a / t]
                    }
                }, e.simplify = function(n, t) {
                    t = t || 20, n = n.map(function(n) {
                        return {
                            lng: n.coordinates[0],
                            lat: n.coordinates[1]
                        }
                    });
                    var o, e, r, a, i, s, u, c, f, h, d, l, y, g, M, p, x, v, P, b = Math.PI / 180 * .5,
                        m = new Array,
                        I = new Array,
                        T = new Array;
                    if (n.length < 3) return n;
                    for (o = n.length, h = 360 * t / (2 * Math.PI * 6378137), h *= h, r = 0, I[0] = 0, T[0] = o - 1, e = 1; e > 0;)
                        if (a = I[e - 1], i = T[e - 1], e--, i - a > 1) {
                            for (d = n[i].lng() - n[a].lng(), l = n[i].lat() - n[a].lat(), Math.abs(d) > 180 && (d = 360 - Math.abs(d)), d *= Math.cos(b * (n[i].lat() + n[a].lat())), y = d * d + l * l, s = a + 1, u = a, f = -1; i > s; s++) g = n[s].lng() - n[a].lng(), M = n[s].lat() - n[a].lat(), Math.abs(g) > 180 && (g = 360 - Math.abs(g)), g *= Math.cos(b * (n[s].lat() + n[a].lat())), p = g * g + M * M, x = n[s].lng() - n[i].lng(), v = n[s].lat() - n[i].lat(), Math.abs(x) > 180 && (x = 360 - Math.abs(x)), x *= Math.cos(b * (n[s].lat() + n[i].lat())), P = x * x + v * v, c = p >= y + P ? P : P >= y + p ? p : (g * l - M * d) * (g * l - M * d) / y, c > f && (u = s, f = c);
                            h > f ? (m[r] = a, r++) : (e++, I[e - 1] = u, T[e - 1] = i, e++, I[e - 1] = a, T[e - 1] = u)
                        } else m[r] = a, r++;
                    m[r] = o - 1, r++;
                    for (var w = new Array, s = 0; r > s; s++) w.push(n[m[s]]);
                    return w.map(function(n) {
                        return {
                            type: "Point",
                            coordinates: [n.lng, n.lat]
                        }
                    })
                }, e.destinationPoint = function(n, t, o) {
                    o /= 6371, t = e.numberToRadius(t);
                    var r = e.numberToRadius(n.coordinates[0]),
                        a = e.numberToRadius(n.coordinates[1]),
                        i = Math.asin(Math.sin(a) * Math.cos(o) + Math.cos(a) * Math.sin(o) * Math.cos(t)),
                        s = r + Math.atan2(Math.sin(t) * Math.sin(o) * Math.cos(a), Math.cos(o) - Math.sin(a) * Math.sin(i));
                    return s = (s + 3 * Math.PI) % (2 * Math.PI) - Math.PI, {
                        type: "Point",
                        coordinates: [e.numberToDegree(s), e.numberToDegree(i)]
                    }
                }
            }()
        }, {}]
    }, {}, [1])(1)
});