// MapManager - 地图管理模块
(function(global) {
    'use strict';

    var MapManager = {
        map: null,
        markers: [],
        polylines: [],
        cityBoundaryCache: {},
        selectedProjectId: null,
        locationMarker: null,
        lastSearchLocation: null,
        lastClickLocation: null,

        init() {
            if (typeof global.L === 'undefined') {
                var mapEl = document.getElementById('map');
                if (mapEl) {
                    mapEl.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#666;background:#f5f5f5;">' + t('mapLibraryLoadFailed') + '</div>';
                }
                this.map = null;
                return;
            }

            this.map = L.map('map', {
                center: [39.9042, 116.4074],
                zoom: 4,
                zoomControl: true
            });

            var tileConfig = global.MapTileConfig ? global.MapTileConfig.get() : { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', options: { attribution: '', maxZoom: 19 } };
            L.tileLayer(tileConfig.url, tileConfig.options).addTo(this.map);
        },

        clearMarkers() {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
                this.locationMarker = null;
            }
            this.lastSearchLocation = null;
            this.lastClickLocation = null;
            this.markers.forEach(function(m) { this.map.removeLayer(m); }.bind(this));
            this.markers = [];
            this.polylines.forEach(function(p) { this.map.removeLayer(p); }.bind(this));
            this.polylines = [];
        },

        normalizeCityName(cityName) {
            return (cityName || '').trim();
        },

        getPrefectureLevelCityName(address) {
            address = address || {};
            var normalize = this.normalizeCityName.bind(this);
            var country = normalize(address.country);
            var province = normalize(address.state);
            var county = normalize(address.county || address.city_district || address.district || address.suburb || address.town || address.village);
            var municipality = normalize(address.municipality);
            var city = normalize(address.city);
            var stateDistrict = normalize(address.state_district);

            var isDirectControlledMunicipality = function(name) {
                return ['北京市', '天津市', '上海市', '重庆市'].indexOf(name) !== -1;
            };
            var isPrefectureLevelName = function(name) {
                return /(市|地区|自治州|盟)$/.test(name);
            };
            var isProvinceLevelName = function(name) {
                return /(省|自治区|特别行政区)$/.test(name);
            };
            var isSameArea = function(a, b) {
                return !!a && !!b && a === b;
            };

            if (isDirectControlledMunicipality(city)) return city;
            if (isDirectControlledMunicipality(municipality)) return municipality;
            if (city && county && !isSameArea(city, county) && isPrefectureLevelName(city)) return city;
            if (municipality && county && !isSameArea(municipality, county) && isPrefectureLevelName(municipality)) return municipality;
            if (stateDistrict && !isProvinceLevelName(stateDistrict) && !isSameArea(stateDistrict, county)) return stateDistrict;
            if (city && isPrefectureLevelName(city) && !isSameArea(city, county)) return city;
            if (municipality && isPrefectureLevelName(municipality) && !isSameArea(municipality, county)) return municipality;
            return province || country || t('unknownCity');
        },

        getAreaNameFromAddress(address) {
            address = address || {};
            return this.normalizeCityName(
                address.county || address.city_district || address.district || address.suburb ||
                address.state_district || address.city || address.municipality || address.state || address.country || ''
            );
        },

        getCityBoundaryCacheKey(cityName) {
            return this.normalizeCityName(cityName).toLowerCase();
        },

        parseBoundaryGeoJson(boundaryGeoJson) {
            if (!boundaryGeoJson) return null;
            if (typeof boundaryGeoJson === 'string') {
                try {
                    return JSON.parse(boundaryGeoJson);
                } catch (error) {
                    console.warn('解析城市边界失败:', error);
                    return null;
                }
            }
            return boundaryGeoJson;
        },

        cacheCityBoundary(cityName, boundaryGeoJson) {
            var cacheKey = this.getCityBoundaryCacheKey(cityName);
            if (cacheKey && boundaryGeoJson) {
                this.cityBoundaryCache[cacheKey] = boundaryGeoJson;
            }
        },

        getCachedCityBoundary(cityName) {
            return this.cityBoundaryCache[this.getCityBoundaryCacheKey(cityName)] || null;
        },

        async fetchBoundaryByName(areaName) {
            var self = this;
            var normalizedName = this.normalizeCityName(areaName);
            if (!normalizedName || normalizedName === t('unknownCity')) return null;

            var cached = this.getCachedCityBoundary(normalizedName);
            if (cached) return cached;

            try {
                var response = await fetch(
                    'https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&q=' + encodeURIComponent(normalizedName)
                );
                var results = await response.json();
                var candidate = (results || []).find(function(item) {
                    return item && item.geojson && ['Polygon', 'MultiPolygon'].indexOf(item.geojson.type) !== -1 &&
                        (item.class === 'boundary' || item.type === 'administrative' || item.addresstype === 'administrative') &&
                        (item.display_name.startsWith(normalizedName) || item.display_name.includes(normalizedName));
                }) || (results || []).find(function(item) {
                    return item && item.geojson && ['Polygon', 'MultiPolygon'].indexOf(item.geojson.type) !== -1 &&
                        (item.class === 'boundary' || item.type === 'administrative');
                });

                if (candidate && candidate.geojson) {
                    this.cacheCityBoundary(normalizedName, candidate.geojson);
                    return candidate.geojson;
                }
            } catch (error) {
                console.error('获取 ' + normalizedName + ' 边界失败:', error);
            }
            return null;
        },

        async fetchCityBoundaryByName(cityName) {
            var self = this;
            var normalizedCity = this.normalizeCityName(cityName);
            if (!normalizedCity || normalizedCity === t('unknownCity')) return null;

            var cached = this.getCachedCityBoundary(normalizedCity);
            if (cached) return cached;

            var requestUrls = [
                'https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&city=' + encodeURIComponent(normalizedCity),
                'https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&q=' + encodeURIComponent(normalizedCity)
            ];

            for (var i = 0; i < requestUrls.length; i++) {
                try {
                    var response = await fetch(requestUrls[i]);
                    var results = await response.json();
                    var candidate = (results || []).find(function(item) {
                        return item && item.geojson && ['Polygon', 'MultiPolygon'].indexOf(item.geojson.type) !== -1 &&
                            (item.class === 'boundary' || item.type === 'administrative' || item.addresstype === 'city') &&
                            (self.getPrefectureLevelCityName(item.address) === normalizedCity || item.display_name.startsWith(normalizedCity));
                    }) || (results || []).find(function(item) {
                        return item && item.geojson && ['Polygon', 'MultiPolygon'].indexOf(item.geojson.type) !== -1 &&
                            (item.class === 'boundary' || item.type === 'administrative');
                    }) || (results || []).find(function(item) {
                        return item && item.geojson && ['Polygon', 'MultiPolygon'].indexOf(item.geojson.type) !== -1;
                    });

                    if (candidate && candidate.geojson) {
                        this.cacheCityBoundary(normalizedCity, candidate.geojson);
                        return candidate.geojson;
                    }
                } catch (error) {
                    console.error('获取 ' + normalizedCity + ' 边界失败:', error);
                }
            }
            return null;
        },

        async getAreaFromCoords(lat, lng) {
            try {
                var response = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng + '&zoom=14&addressdetails=1&polygon_geojson=1');
                var data = await response.json();
                return {
                    city: this.getPrefectureLevelCityName(data.address),
                    boundaryGeoJson: data.geojson || null
                };
            } catch (error) {
                console.error('获取区块边界失败:', error);
                return { city: t('unknownCity'), boundaryGeoJson: null };
            }
        },

        async getCityFromCoords(lat, lng) {
            try {
                var response = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng + '&zoom=10&addressdetails=1&polygon_geojson=1');
                var data = await response.json();
                var cityName = this.getPrefectureLevelCityName(data.address);
                var cityBoundary = await this.fetchCityBoundaryByName(cityName);
                return { city: cityName, boundaryGeoJson: cityBoundary || null };
            } catch (error) {
                console.error('获取城市信息失败:', error);
                return { city: t('unknownCity'), boundaryGeoJson: null };
            }
        },

        drawCityBoundary(cityName, color, boundaryGeoJson) {
            var geoJson = this.parseBoundaryGeoJson(boundaryGeoJson);
            if (!geoJson) return null;

            var layer = L.geoJSON(geoJson, {
                style: {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.42,
                    weight: 4,
                    opacity: 1,
                    className: 'city-area'
                }
            }).addTo(this.map);

            if (cityName) {
                layer.bindPopup('<strong>' + cityName + '</strong>');
            }

            this.polylines.push(layer);
            return layer;
        },

        showProject(project) {
            this.clearMarkers();
            this.selectedProjectId = project ? project.id : null;

            if (!project || !project.nodes || project.nodes.length === 0) {
                return;
            }

            var projectColor = project.color || '#007AFF';
            var latLngs = [];
            var self = this;

            project.nodes.forEach(function(node) {
                if (node.latitude && node.longitude) {
                    var latLng = [node.latitude, node.longitude];
                    latLngs.push(latLng);
                    var nodeColor = node.color || projectColor;

                    var marker = L.marker(latLng, {
                        icon: L.divIcon({
                            className: 'custom-marker',
                            html: '<span style="background:' + nodeColor + '">' + node.order + '</span>',
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        })
                    });

                    var popupContent = '<div class="node-popup" style="min-width: 180px; padding: 8px;">' +
                        '<div style="margin-bottom: 8px;"><strong style="font-size: 15px;">' + (node.placeName || t('unnamed')) + '</strong></div>' +
                        (node.plannedTime ? '<div style="font-size: 12px; color: #666; margin-bottom: 4px;">' + node.plannedTime + '</div>' : '') +
                        (node.remark ? '<div style="font-size: 12px; color: #888; margin-bottom: 8px;">' + node.remark + '</div>' : '') +
                        '<div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">' +
                        '<button class="popup-edit-btn" data-node-id="' + node.id + '" data-project-id="' + project.id + '" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">' + t('edit') + '</button>' +
                        '<button class="popup-delete-btn" data-node-id="' + node.id + '" data-project-id="' + project.id + '" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">' + t('deleteItem') + '</button>' +
                        '</div></div>';

                    marker.bindPopup(popupContent, { closeButton: false, maxWidth: 250 });
                    marker.addTo(this.map);
                    this.markers.push(marker);
                }
            }, this);

            if (latLngs.length > 1) {
                var polyline = L.polyline(latLngs, {
                    color: projectColor,
                    weight: 3,
                    opacity: 0.7,
                    dashArray: '10, 10'
                }).addTo(this.map);
                this.polylines.push(polyline);
            }

            if (latLngs.length > 0) {
                this.map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
            }
        },

        async searchPlace(query) {
            if (!query || query.trim().length < 2) return [];

            try {
                var response = await fetch(
                    'https://nominatim.openstreetmap.org/search?format=jsonv2&q=' + encodeURIComponent(query) + '&limit=10&addressdetails=1&polygon_geojson=1',
                    { headers: { 'User-Agent': 'HeartRiver/1.0' } }
                );
                var data = await response.json();
                var self = this;
                return data.map(function(item) {
                    var addr = item.address || {};
                    var mainName = '';
                    var subInfo = '';

                    if (item.name) {
                        mainName = item.name;
                        if (addr.house_number) {
                            subInfo = addr.road ? addr.road + addr.house_number : addr.house_number;
                        } else if (addr.city || addr.town) {
                            subInfo = [addr.city || addr.town, addr.district].filter(Boolean).join(' · ');
                        }
                    } else if (addr.house_number && addr.road) {
                        mainName = addr.road;
                        subInfo = addr.house_number;
                    } else if (addr.road) {
                        mainName = addr.road;
                        subInfo = [addr.city || addr.town, addr.district].filter(Boolean).join(' · ');
                    } else if (addr.city || addr.town) {
                        mainName = addr.city || addr.town;
                        subInfo = addr.district || '';
                    } else {
                        mainName = item.display_name.split(',')[0];
                        subInfo = item.display_name.split(',').slice(1, 3).join(', ');
                    }

                    return {
                        name: item.display_name,
                        mainName: mainName,
                        subInfo: subInfo,
                        lat: parseFloat(item.lat),
                        lon: parseFloat(item.lon),
                        type: item.type,
                        city: self.getPrefectureLevelCityName(addr),
                        areaName: self.getAreaNameFromAddress(addr),
                        boundaryGeoJson: item.geojson || null,
                        boundingbox: Array.isArray(item.boundingbox) ? item.boundingbox : null
                    };
                });
            } catch (error) {
                console.error('搜索失败:', error);
                return [];
            }
        },

        flyTo(lat, lon, zoom) {
            zoom = zoom !== undefined ? zoom : 12;
            this.map.flyTo([lat, lon], zoom, {
                animate: true,
                duration: 0.18,
                easeLinearity: 0.9,
                noMoveStart: true
            });
        },

        focusSearchResult(result) {
            if (!result) return;

            var geoJson = this.parseBoundaryGeoJson(result.boundaryGeoJson);
            if (geoJson) {
                var layer = L.geoJSON(geoJson);
                var bounds = layer.getBounds();
                if (bounds && bounds.isValid()) {
                    this.map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 0.2 });
                    return;
                }
            }

            if (Array.isArray(result.boundingbox) && result.boundingbox.length === 4) {
                var south = parseFloat(result.boundingbox[0]);
                var north = parseFloat(result.boundingbox[1]);
                var west = parseFloat(result.boundingbox[2]);
                var east = parseFloat(result.boundingbox[3]);
                if ([south, north, west, east].every(Number.isFinite)) {
                    var b = L.latLngBounds([[south, west], [north, east]]);
                    if (b.isValid()) {
                        this.map.fitBounds(b, { padding: [50, 50], animate: true, duration: 0.2 });
                        return;
                    }
                }
            }

            this.flyTo(result.lat, result.lon, 15);
        },

        getCurrentLocation(callback) {
            var self = this;
            if (!navigator.geolocation) {
                alert(t('browserLocationUnsupported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    self.showLocationMarker(lat, lng);
                    self.flyTo(lat, lng, 14);
                    if (callback) callback({ lat: lat, lng: lng });
                },
                function(error) {
                    console.error('定位失败:', error);
                    alert(t('locationFailed'));
                },
                { enableHighAccuracy: true }
            );
        },

        showLocationMarker(lat, lng) {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'location-marker',
                    html: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#007AFF" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                })
            }).addTo(this.map);

            this.locationMarker.bindPopup(t('currentLocation')).openPopup();
        },

        clearLocationMarker() {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
                this.locationMarker = null;
            }
        },

        showSearchMarker(lat, lng, name, options) {
            options = options || {};
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            var self = this;
            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'search-result-marker',
                    html: '<div class="search-marker-pin"><svg viewBox="0 0 24 24" width="28" height="36"><path fill="#FF6B6B" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg><div class="search-marker-label">' + name + '</div></div>',
                    iconSize: [28, 44],
                    iconAnchor: [14, 44]
                })
            }).addTo(this.map);

            this.lastSearchLocation = {
                lat: lat,
                lng: lng,
                name: name,
                city: options.city || '',
                areaName: options.areaName || '',
                boundaryGeoJson: options.boundaryGeoJson || null
            };

            var popupContent = '<div style="min-width: 180px; padding: 8px;">' +
                '<div style="margin-bottom: 10px;"><strong style="font-size: 15px;">' + name + '</strong></div>' +
                '<div style="display: flex; gap: 8px;">' +
                '<button class="search-marker-node-btn" data-lat="' + lat + '" data-lng="' + lng + '" data-name="' + name + '" style="flex: 1; padding: 8px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">' + t('addAsPlanNode') + '</button>' +
                '<button class="search-marker-recommend-btn" data-lat="' + lat + '" data-lng="' + lng + '" data-name="' + name + '" style="flex: 1; padding: 8px; background: #FF9F0A; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">' + t('addAsWishlist') + '</button>' +
                '</div></div>';

            this.locationMarker.bindPopup(popupContent, { closeButton: false, maxWidth: 240 });
        },

        showClickMarker(lat, lng, color) {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'click-marker',
                    html: '<svg viewBox="0 0 24 24" width="28" height="36"><path fill="' + color + '" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>',
                    iconSize: [28, 36],
                    iconAnchor: [14, 36]
                })
            }).addTo(this.map);

            this.lastClickLocation = { lat: lat, lng: lng };
        },

        // showRecommendations 在 app.js 中动态赋值
        showRecommendations: async function(options) {
            options = options || {};
            var shouldFitBounds = options.fitBounds === true;
            var self = this;
            this.clearMarkers();
            var recommendations = global.DataManager ? global.DataManager.getAllRecommendations() : [];
            var cities = {};
            var allBounds = [];

            var buildRecommendPopupContent = function(items) {
                var html = '<div style="min-width: 180px; padding: 8px;">';
                items.forEach(function(r, index) {
                    html += '<div style="' + (index > 0 ? 'border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;' : '') + '">' +
                        '<div style="margin-bottom: 8px;"><strong style="font-size: 15px;">' + r.name + '</strong></div>' +
                        (r.plannedTime ? '<div style="font-size: 12px; color: #666; margin-bottom: 4px;">' + r.plannedTime + '</div>' : '') +
                        (r.remark ? '<div style="font-size: 12px; color: #888; margin-bottom: 8px;">' + r.remark + '</div>' : '') +
                        '<div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">' +
                        '<button class="popup-edit-btn" data-recommend-id="' + r.id + '" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">' + t('edit') + '</button>' +
                        '<button class="popup-complete-btn" data-recommend-id="' + r.id + '" style="flex: 1; padding: 6px; background: #34C759; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">' + (r.completed ? t('unmarkDone') : t('markDone')) + '</button>' +
                        '<button class="popup-delete-btn" data-recommend-id="' + r.id + '" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">' + t('deleteItem') + '</button>' +
                        '</div></div>';
                });
                html += '</div>';
                return html;
            };

            recommendations.forEach(function(r) {
                if (!cities[r.city]) {
                    cities[r.city] = { items: [] };
                }
                cities[r.city].items.push(r);
            });

            for (var cityKey in cities) {
                if (!cities.hasOwnProperty(cityKey)) continue;
                var items = cities[cityKey].items;
                if (!items.length) continue;

                var exactBoundaryItem = items.find(function(r) { return r.boundaryMode === 'exact' && r.cityBoundaryGeoJson; });
                var storedBoundary = exactBoundaryItem
                    ? exactBoundaryItem.cityBoundaryGeoJson
                    : (function() {
                        var found = items.find(function(r) { return r.cityBoundaryGeoJson; });
                        return found ? found.cityBoundaryGeoJson : null;
                    })();
                var cityBoundary = exactBoundaryItem
                    ? storedBoundary
                    : (await self.fetchCityBoundaryByName(cityKey) || storedBoundary);
                var boundaryLayer = this.drawCityBoundary(cityKey, items[0].color, cityBoundary);
                if (boundaryLayer && typeof boundaryLayer.getBounds === 'function') {
                    boundaryLayer.bindPopup(buildRecommendPopupContent(items), { closeButton: false, maxWidth: 260 });
                    var boundaryBounds = boundaryLayer.getBounds();
                    if (boundaryBounds && boundaryBounds.isValid()) {
                        allBounds.push(boundaryBounds);
                    }
                }

                items.forEach(function(r) {
                    var marker = L.marker([r.latitude, r.longitude], {
                        icon: L.divIcon({
                            className: 'recommend-marker',
                            html: '<span style="color:' + (r.completed ? '#34C759' : '#FFD60A') + '">' + (r.completed ? '&#10003;' : '!') + '</span>',
                            iconSize: [22, 22],
                            iconAnchor: [11, 11]
                        })
                    });

                    marker.bindPopup(buildRecommendPopupContent([r]), { closeButton: false, maxWidth: 260 });
                    marker.addTo(this.map);
                    this.markers.push(marker);
                    allBounds.push(L.latLng(r.latitude, r.longitude));
                }, this);
            }

            if (shouldFitBounds && recommendations.length > 0 && allBounds.length > 0) {
                var bounds = L.latLngBounds(allBounds);
                this.map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    };

    global.MapManager = MapManager;
})(window);