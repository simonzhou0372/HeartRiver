// Heart River - 应用主逻辑

(function() {
    'use strict';

    const I18n = {
        STORAGE_KEY: 'heart_river_lang',
        currentLang: 'zh',
        messages: {
            zh: {
                appTitle: 'Heart River - 旅行规划管理',
                appTagline: '规划与种草同屏管理',
                themeToggle: '切换主题',
                languageToggle: '切换语言',
                import: '导入',
                export: '导出',
                mapSearchPlaceholder: '搜索地点...',
                myLocation: '定位到我的位置',
                modeToggle: '切换模式',
                modePlan: '规划模式',
                modeWishlist: '种草模式',
                addNode: '添加节点',
                addWishlist: '添加种草',
                myPlans: '我的规划',
                newPlan: '新建规划',
                myWishlist: '我的种草',
                tabMap: '地图',
                tabList: '列表',
                tabWishlist: '种草',
                planName: '规划名称',
                planNamePlaceholder: '例如：春节云南之旅',
                startDate: '开始日期',
                endDate: '结束日期',
                selectDate: '选择日期',
                planColor: '规划颜色',
                remark: '备注',
                optionalRemark: '可选备注信息',
                cancel: '取消',
                save: '保存',
                placeName: '地点名称',
                placeNamePlaceholder: '例如：北京站',
                searchPlace: '搜索地点',
                latitudeAuto: '纬度（自动填充）',
                longitudeAuto: '经度（自动填充）',
                autoFillCoordinates: '通过搜索或地图点击自动填充',
                plannedTime: '计划时间',
                selectDateTime: '选择日期和时间',
                nodeColor: '节点颜色',
                confirmDeleteTitle: '确认删除',
                confirmDeletePlan: '确定要删除这个规划吗？',
                confirmDeletePlanForever: '确定要删除这个规划吗？删除后无法恢复。',
                confirmDeleteNode: '确定要删除这个节点吗？',
                confirmDeleteWishlist: '确定要删除这个种草吗？',
                delete: '删除',
                importData: '导入数据',
                importHint: '请选择 JSON 文件或将内容粘贴到下方',
                mergeExistingData: '合并到现有数据',
                wishlistName: '名称（留空使用城市名）',
                wishlistNamePlaceholder: '例如：故宫博物院',
                city: '城市',
                cityPlaceholder: '例如：北京市',
                color: '颜色',
                time: '时间',
                completed: '已完成',
                editPlan: '编辑规划',
                editNode: '编辑节点',
                editWishlist: '编辑种草',
                edit: '编辑',
                deleteItem: '删除',
                markDone: '标记完成',
                unmarkDone: '取消完成',
                emptyPlans: '还没有规划，点击上方按钮创建',
                emptyWishlist: '还没有种草，点击地图标记添加',
                itemCount: '{count} 项',
                nodeCount: '{count} 个节点',
                moreNodes: '...还有 {count} 个节点',
                unnamed: '未命名',
                currentLocation: '当前位置',
                selectedLocation: '选中位置',
                addAsPlanNode: '规划节点',
                addAsWishlist: '种草',
                browserLocationUnsupported: '您的浏览器不支持定位功能',
                locationFailed: '无法获取您的位置，请检查定位权限',
                selectPlanFirst: '请先在左侧选择一个规划',
                invalidJson: 'JSON 格式不正确，请检查后重试',
                mapUnavailable: '地图组件未加载成功，请检查应用是否能访问 Leaflet 资源。',
                mapLibraryLoadFailed: '地图组件加载失败。打包 APK 时请将 Leaflet 改为本地资源，或确认应用可访问外部 CDN。',
                unknownCity: '未知城市'
            },
            en: {
                appTitle: 'Heart River - Travel Planner',
                appTagline: 'Plan routes and save ideas in one place',
                themeToggle: 'Toggle theme',
                languageToggle: 'Switch language',
                import: 'Import',
                export: 'Export',
                mapSearchPlaceholder: 'Search places...',
                myLocation: 'Locate me',
                modeToggle: 'Switch mode',
                modePlan: 'Plan mode',
                modeWishlist: 'Wishlist mode',
                addNode: 'Add node',
                addWishlist: 'Add wishlist',
                myPlans: 'My plans',
                newPlan: 'New plan',
                myWishlist: 'My wishlist',
                tabMap: 'Map',
                tabList: 'List',
                tabWishlist: 'Wishlist',
                planName: 'Plan name',
                planNamePlaceholder: 'For example: Yunnan Spring Festival Trip',
                startDate: 'Start date',
                endDate: 'End date',
                selectDate: 'Select a date',
                planColor: 'Plan color',
                remark: 'Notes',
                optionalRemark: 'Optional notes',
                cancel: 'Cancel',
                save: 'Save',
                placeName: 'Place name',
                placeNamePlaceholder: 'For example: Beijing Railway Station',
                searchPlace: 'Search place',
                latitudeAuto: 'Latitude (auto-filled)',
                longitudeAuto: 'Longitude (auto-filled)',
                autoFillCoordinates: 'Filled automatically by search or map click',
                plannedTime: 'Planned time',
                selectDateTime: 'Select date and time',
                nodeColor: 'Node color',
                confirmDeleteTitle: 'Confirm deletion',
                confirmDeletePlan: 'Delete this plan?',
                confirmDeletePlanForever: 'Delete this plan? This action cannot be undone.',
                confirmDeleteNode: 'Delete this node?',
                confirmDeleteWishlist: 'Delete this wishlist item?',
                delete: 'Delete',
                importData: 'Import data',
                importHint: 'Choose a JSON file or paste the content below',
                mergeExistingData: 'Merge into existing data',
                wishlistName: 'Name (leave empty to use the city)',
                wishlistNamePlaceholder: 'For example: The Palace Museum',
                city: 'City',
                cityPlaceholder: 'For example: Beijing',
                color: 'Color',
                time: 'Time',
                completed: 'Completed',
                editPlan: 'Edit plan',
                editNode: 'Edit node',
                editWishlist: 'Edit wishlist',
                edit: 'Edit',
                deleteItem: 'Delete',
                markDone: 'Mark done',
                unmarkDone: 'Undo done',
                emptyPlans: 'No plans yet. Create one with the button above.',
                emptyWishlist: 'No wishlist items yet. Add one from the map.',
                itemCount: '{count} items',
                nodeCount: '{count} nodes',
                moreNodes: '...and {count} more nodes',
                unnamed: 'Untitled',
                currentLocation: 'Current location',
                selectedLocation: 'Selected location',
                addAsPlanNode: 'Plan node',
                addAsWishlist: 'Wishlist',
                browserLocationUnsupported: 'Your browser does not support geolocation.',
                locationFailed: 'Unable to get your location. Please check location permissions.',
                selectPlanFirst: 'Please select a plan in the sidebar first.',
                invalidJson: 'Invalid JSON format. Please check and try again.',
                mapUnavailable: 'The map component failed to load. Please check whether the app can access Leaflet resources.',
                mapLibraryLoadFailed: 'The map failed to load. When packaging as an APK, bundle Leaflet locally or make sure external CDN access is available.',
                unknownCity: 'Unknown city'
            }
        },

        init() {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            this.currentLang = saved === 'en' ? 'en' : 'zh';
            this.applyStaticTexts();
        },

        t(key, params = {}) {
            const locale = this.messages[this.currentLang] || this.messages.zh;
            const fallback = this.messages.zh;
            let template = locale[key] ?? fallback[key] ?? key;
            Object.entries(params).forEach(([paramKey, value]) => {
                template = template.replaceAll(`{${paramKey}}`, value);
            });
            return template;
        },

        toggleLanguage() {
            this.setLanguage(this.currentLang === 'zh' ? 'en' : 'zh');
        },

        setLanguage(lang) {
            this.currentLang = lang === 'en' ? 'en' : 'zh';
            localStorage.setItem(this.STORAGE_KEY, this.currentLang);
            this.applyStaticTexts();
            if (typeof App !== 'undefined' && App && typeof App.onLanguageChanged === 'function') {
                App.onLanguageChanged();
            }
        },

        applyStaticTexts() {
            document.documentElement.lang = this.currentLang === 'en' ? 'en' : 'zh-CN';
            document.title = this.t('appTitle');

            document.querySelectorAll('[data-i18n]').forEach((node) => {
                node.textContent = this.t(node.dataset.i18n);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
                node.placeholder = this.t(node.dataset.i18nPlaceholder);
            });

            document.querySelectorAll('[data-i18n-title]').forEach((node) => {
                node.title = this.t(node.dataset.i18nTitle);
            });

            const label = document.getElementById('languageToggleLabel');
            if (label) {
                label.textContent = this.currentLang === 'zh' ? 'EN' : '中';
            }
        }
    };

    const t = (key, params) => I18n.t(key, params);

    // =====================
    // 数据管理模块
    // =====================
    const DataManager = {
        STORAGE_KEY: 'heart_river_data',

        normalizeData(data) {
            const normalized = data && typeof data === 'object' ? data : {};
            return {
                projects: Array.isArray(normalized.projects) ? normalized.projects : [],
                recommendations: Array.isArray(normalized.recommendations) ? normalized.recommendations : []
            };
        },

        // 加载数据
        load() {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return this.normalizeData(JSON.parse(data));
            }
            return this.normalizeData();
        },

        // 保存数据
        save(data) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.normalizeData(data)));
        },

        // 生成UUID
        generateId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        // 添加规划工程
        addProject(project) {
            const data = this.load();
            project.id = this.generateId();
            project.nodes = [];
            project.color = project.color || '#007AFF';
            data.projects.push(project);
            this.save(data);
            return project;
        },

        // 更新规划工程
        updateProject(project) {
            const data = this.load();
            const index = data.projects.findIndex(p => p.id === project.id);
            if (index !== -1) {
                data.projects[index] = project;
                this.save(data);
            }
            return project;
        },

        // 删除规划工程
        deleteProject(projectId) {
            const data = this.load();
            data.projects = data.projects.filter(p => p.id !== projectId);
            this.save(data);
        },

        // 添加节点
        addNode(projectId, node) {
            const data = this.load();
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                node.id = this.generateId();
                node.order = project.nodes.length + 1;
                // 如果节点没有设置颜色，则继承工程颜色
                if (!node.color) {
                    node.color = project.color || '#007AFF';
                }
                project.nodes.push(node);
                this.save(data);
                return node;
            }
            return null;
        },

        // 更新节点
        updateNode(projectId, node) {
            const data = this.load();
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                const index = project.nodes.findIndex(n => n.id === node.id);
                if (index !== -1) {
                    project.nodes[index] = node;
                    this.save(data);
                }
                return node;
            }
            return null;
        },

        // 删除节点
        deleteNode(projectId, nodeId) {
            const data = this.load();
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                project.nodes = project.nodes.filter(n => n.id !== nodeId);
                // 重新排序
                project.nodes.forEach((n, i) => n.order = i + 1);
                this.save(data);
            }
        },

        // 导入数据
        importData(jsonData, merge) {
            const currentData = this.load();
            const imported = this.normalizeData(JSON.parse(jsonData));
            let nextData;

            if (merge && imported.projects) {
                nextData = {
                    projects: [...currentData.projects, ...imported.projects],
                    recommendations: [...currentData.recommendations, ...imported.recommendations]
                };
            } else {
                nextData = imported;
            }

            this.save(nextData);
            return nextData;
        },

        // 导出数据
        exportData() {
            return JSON.stringify(this.load(), null, 2);
        },

        // =====================
        // 种草功能
        // =====================

        // 添加种草
        addRecommendation(recommendation) {
            const data = this.load();
            recommendation.id = this.generateId();
            recommendation.createdAt = new Date().toISOString();
            data.recommendations.push(recommendation);
            this.save(data);
            return recommendation;
        },

        // 更新种草
        updateRecommendation(recommendation) {
            const data = this.load();
            const index = data.recommendations.findIndex(r => r.id === recommendation.id);
            if (index !== -1) {
                data.recommendations[index] = recommendation;
                this.save(data);
            }
            return recommendation;
        },

        // 删除种草
        deleteRecommendation(recommendationId) {
            const data = this.load();
            data.recommendations = data.recommendations.filter(r => r.id !== recommendationId);
            this.save(data);
        },

        // 获取所有种草
        getAllRecommendations() {
            const data = this.load();
            return data.recommendations || [];
        },

        // 按城市分组种草
        getRecommendationsByCity() {
            const data = this.load();
            const recommendations = data.recommendations || [];
            const grouped = {};
            recommendations.forEach(r => {
                const city = r.city || t('unknownCity');
                if (!grouped[city]) {
                    grouped[city] = [];
                }
                grouped[city].push(r);
            });
            return grouped;
        }
    };

    /* Object.assign(MapManager, {
        /* showRecommendations: async function() {
            this.clearMarkers();
            const recommendations = DataManager.getAllRecommendations();
            const cities = {};
            const allBounds = [];

            recommendations.forEach(r => {
                if (!cities[r.city]) {
                    cities[r.city] = { items: [] };
                }
                cities[r.city].items.push(r);
            });

            for (const city of Object.keys(cities)) {
                const items = cities[city].items;
                if (!items.length) continue;

                const storedBoundary = items.find(r => r.cityBoundaryGeoJson)?.cityBoundaryGeoJson || null;
                const cityBoundary = storedBoundary || await this.fetchCityBoundaryByName(city);
                const boundaryLayer = this.drawCityBoundary(city, items[0].color, cityBoundary);
                if (boundaryLayer && typeof boundaryLayer.getBounds === 'function') {
                    const boundaryBounds = boundaryLayer.getBounds();
                    if (boundaryBounds && boundaryBounds.isValid()) {
                        allBounds.push(boundaryBounds);
                    }
                }

                items.forEach(r => {
                    const marker = L.marker([r.latitude, r.longitude], {
                        icon: L.divIcon({
                            className: 'recommend-marker',
                            html: `<span style="color:${r.completed ? '#34C759' : '#FFD60A'}">${r.completed ? '✓' : '!'}</span>`,
                            iconSize: [22, 22],
                            iconAnchor: [11, 11]
                        })
                    });

                    const popupContent = `
                        <div style="min-width: 180px; padding: 8px;">
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 15px;">${r.name}</strong>
                                ${r.completed ? ' ✓' : ' ⏳'}
                            </div>
                            ${r.plannedTime ? `<div style="font-size: 12px; color: #666; margin-bottom: 4px;">⏰ ${r.plannedTime}</div>` : ''}
                            ${r.remark ? `<div style="font-size: 12px; color: #888; margin-bottom: 8px;">${r.remark}</div>` : ''}
                            <div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
                                <button class="popup-edit-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('edit')}</button>
                                <button class="popup-complete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #34C759; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${r.completed ? t('unmarkDone') : t('markDone')}</button>
                                <button class="popup-delete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('deleteItem')}</button>
                            </div>
                        </div>
                    `;

                    marker.bindPopup(popupContent);
                    marker.addTo(this.map);
                    this.markers.push(marker);
                    allBounds.push(L.latLng(r.latitude, r.longitude));
                });
            }

            if (recommendations.length > 0 && allBounds.length > 0) {
                const bounds = L.latLngBounds(allBounds);
                this.map.fitBounds(bounds, { padding: [50, 50] });
            }
        },

        getCityFromCoords: async function(lat, lng) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1&polygon_geojson=1`);
                const data = await response.json();
                const cityName = this.getPrefectureLevelCityName(data.address);

                if (data.geojson) {
                    this.cacheCityBoundary(cityName, data.geojson);
                }

                return {
                    city: cityName,
                    boundaryGeoJson: data.geojson || null
                };
            } catch (error) {
                console.error('获取城市信息失败:', error);
                return {
                    city: t('unknownCity'),
                    boundaryGeoJson: null
                };
            }
        }
    }); */

    // =====================
    // 地图管理模块
    // =====================
    const MapManager = {
        map: null,
        markers: [],
        polylines: [],
        cityBoundaryCache: {},
        selectedProjectId: null,
        locationMarker: null,

        // 初始化地图
        init() {
            if (typeof window.L === 'undefined') {
                const mapEl = document.getElementById('map');
                if (mapEl) {
                    mapEl.innerHTML = `
                        <div style="height:100%;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#666;background:#f5f5f5;">
                            ${t('mapLibraryLoadFailed')}
                        </div>
                    `;
                }
                this.map = null;
                return;
            }

            this.map = L.map('map', {
                center: [39.9042, 116.4074], // 默认北京
                zoom: 4,
                zoomControl: true
            });

            // 使用OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
        },

        // 清空标记
        clearMarkers() {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
                this.locationMarker = null;
            }
            this.lastSearchLocation = null;
            this.lastClickLocation = null;
            this.markers.forEach(m => this.map.removeLayer(m));
            this.markers = [];
            this.polylines.forEach(p => this.map.removeLayer(p));
            this.polylines = [];
        },

        normalizeCityName(cityName) {
            return (cityName || '').trim();
        },

        getPrefectureLevelCityName(address = {}) {
            const normalize = (value) => this.normalizeCityName(value);
            const country = normalize(address.country);
            const province = normalize(address.state);
            const county = normalize(address.county || address.city_district || address.district || address.suburb || address.town || address.village);
            const municipality = normalize(address.municipality);
            const city = normalize(address.city);
            const stateDistrict = normalize(address.state_district);

            const isDirectControlledMunicipality = (name) => ['北京市', '天津市', '上海市', '重庆市'].includes(name);
            const isPrefectureLevelName = (name) => /(市|地区|自治州|盟)$/.test(name);
            const isProvinceLevelName = (name) => /(省|自治区|特别行政区)$/.test(name);
            const isSameArea = (a, b) => !!a && !!b && a === b;

            if (isDirectControlledMunicipality(city)) return city;
            if (isDirectControlledMunicipality(municipality)) return municipality;

            if (city && county && !isSameArea(city, county) && isPrefectureLevelName(city)) {
                return city;
            }

            if (municipality && county && !isSameArea(municipality, county) && isPrefectureLevelName(municipality)) {
                return municipality;
            }

            if (stateDistrict && !isProvinceLevelName(stateDistrict) && !isSameArea(stateDistrict, county)) {
                return stateDistrict;
            }

            if (city && isPrefectureLevelName(city) && !isSameArea(city, county)) {
                return city;
            }

            if (municipality && isPrefectureLevelName(municipality) && !isSameArea(municipality, county)) {
                return municipality;
            }

            return province || country || t('unknownCity');
        },

        getAreaNameFromAddress(address = {}) {
            return this.normalizeCityName(
                address.county ||
                address.city_district ||
                address.district ||
                address.suburb ||
                address.state_district ||
                address.city ||
                address.municipality ||
                address.state ||
                address.country ||
                ''
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

        async getAreaFromCoords(lat, lng) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1&polygon_geojson=1`);
                const data = await response.json();
                return {
                    city: this.getPrefectureLevelCityName(data.address),
                    boundaryGeoJson: data.geojson || null
                };
            } catch (error) {
                console.error('获取区块边界失败:', error);
                return {
                    city: t('unknownCity'),
                    boundaryGeoJson: null
                };
            }
        },

        cacheCityBoundary(cityName, boundaryGeoJson) {
            const cacheKey = this.getCityBoundaryCacheKey(cityName);
            if (cacheKey && boundaryGeoJson) {
                this.cityBoundaryCache[cacheKey] = boundaryGeoJson;
            }
        },

        getCachedCityBoundary(cityName) {
            return this.cityBoundaryCache[this.getCityBoundaryCacheKey(cityName)] || null;
        },

        async fetchBoundaryByName(areaName) {
            const normalizedName = this.normalizeCityName(areaName);
            if (!normalizedName || normalizedName === t('unknownCity')) return null;

            const cached = this.getCachedCityBoundary(normalizedName);
            if (cached) return cached;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&q=${encodeURIComponent(normalizedName)}`
                );
                const results = await response.json();
                const candidate = (results || []).find(item => (
                    item &&
                    item.geojson &&
                    ['Polygon', 'MultiPolygon'].includes(item.geojson.type) &&
                    (item.class === 'boundary' || item.type === 'administrative' || item.addresstype === 'administrative') &&
                    (item.display_name.startsWith(normalizedName) || item.display_name.includes(normalizedName))
                )) || (results || []).find(item => (
                    item &&
                    item.geojson &&
                    ['Polygon', 'MultiPolygon'].includes(item.geojson.type) &&
                    (item.class === 'boundary' || item.type === 'administrative')
                ));

                if (candidate && candidate.geojson) {
                    this.cacheCityBoundary(normalizedName, candidate.geojson);
                    return candidate.geojson;
                }
            } catch (error) {
                console.error(`获取 ${normalizedName} 边界失败:`, error);
            }

            return null;
        },

        async fetchCityBoundaryByName(cityName) {
            const normalizedCity = this.normalizeCityName(cityName);
            if (!normalizedCity || normalizedCity === t('unknownCity')) return null;

            const cached = this.getCachedCityBoundary(normalizedCity);
            if (cached) return cached;

            const requestUrls = [
                `https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&city=${encodeURIComponent(normalizedCity)}`,
                `https://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&addressdetails=1&limit=8&q=${encodeURIComponent(normalizedCity)}`
            ];

            for (const url of requestUrls) {
                try {
                    const response = await fetch(url);
                    const results = await response.json();
                    const candidate = (results || []).find(item => (
                        item &&
                        item.geojson &&
                        ['Polygon', 'MultiPolygon'].includes(item.geojson.type) &&
                        (item.class === 'boundary' || item.type === 'administrative' || item.addresstype === 'city') &&
                        (
                            this.getPrefectureLevelCityName(item.address) === normalizedCity ||
                            item.display_name.startsWith(normalizedCity)
                        )
                    )) || (results || []).find(item => (
                        item &&
                        item.geojson &&
                        ['Polygon', 'MultiPolygon'].includes(item.geojson.type) &&
                        (item.class === 'boundary' || item.type === 'administrative')
                    )) || (results || []).find(item => item && item.geojson && ['Polygon', 'MultiPolygon'].includes(item.geojson.type));

                    if (candidate && candidate.geojson) {
                        this.cacheCityBoundary(normalizedCity, candidate.geojson);
                        return candidate.geojson;
                    }
                } catch (error) {
                    console.error(`获取 ${normalizedCity} 边界失败:`, error);
                }
            }

            return null;
        },

        drawCityBoundary(cityName, color, boundaryGeoJson) {
            const geoJson = this.parseBoundaryGeoJson(boundaryGeoJson);
            if (!geoJson) return null;

            const layer = L.geoJSON(geoJson, {
                style: {
                    color,
                    fillColor: color,
                    fillOpacity: 0.42,
                    weight: 4,
                    opacity: 1,
                    className: 'city-area'
                }
            }).addTo(this.map);

            if (cityName) {
                layer.bindPopup(`<strong>${cityName}</strong>`);
            }

            this.polylines.push(layer);
            return layer;
        },

        // 显示项目节点
        showProject(project) {
            this.clearMarkers();
            this.selectedProjectId = project ? project.id : null;

            if (!project || !project.nodes || project.nodes.length === 0) {
                return;
            }

            // 获取工程颜色
            const projectColor = project.color || '#007AFF';

            // 按顺序添加标记
            const latLngs = [];
            project.nodes.forEach((node, index) => {
                if (node.latitude && node.longitude) {
                    const latLng = [node.latitude, node.longitude];
                    latLngs.push(latLng);

                    // 使用节点颜色或继承工程颜色
                    const nodeColor = node.color || projectColor;

                    // 创建自定义标记
                    const marker = L.marker(latLng, {
                        icon: L.divIcon({
                            className: 'custom-marker',
                            html: `<span style="background:${nodeColor}">${node.order}</span>`,
                            iconSize: [32, 32],
                            iconAnchor: [16, 16]
                        })
                    });

                    // 添加弹出信息（带编辑和删除按钮）
                    const popupContent = `
                        <div class="node-popup" style="min-width: 180px; padding: 8px;">
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 15px;">${node.placeName || t('unnamed')}</strong>
                            </div>
                            ${node.plannedTime ? `<div style="font-size: 12px; color: #666; margin-bottom: 4px;">⏰ ${node.plannedTime}</div>` : ''}
                            ${node.remark ? `<div style="font-size: 12px; color: #888; margin-bottom: 8px;">${node.remark}</div>` : ''}
                            <div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
                                <button class="popup-edit-btn" data-node-id="${node.id}" data-project-id="${project.id}" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('edit')}</button>
                                <button class="popup-delete-btn" data-node-id="${node.id}" data-project-id="${project.id}" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('deleteItem')}</button>
                            </div>
                        </div>
                    `;
                    marker.bindPopup(popupContent, {
                        closeButton: false,
                        maxWidth: 250
                    });

                    marker.addTo(this.map);
                    this.markers.push(marker);
                }
            });

            // 绘制连接线（使用工程颜色）
            if (latLngs.length > 1) {
                const polyline = L.polyline(latLngs, {
                    color: projectColor,
                    weight: 3,
                    opacity: 0.7,
                    dashArray: '10, 10'
                }).addTo(this.map);
                this.polylines.push(polyline);
            }

            // 自动调整视图
            if (latLngs.length > 0) {
                this.map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
            }
        },

        // 搜索地点（使用Nominatim API）
        async searchPlace(query) {
            if (!query || query.trim().length < 2) return [];

            try {
                // 使用更详细的搜索参数
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=10&addressdetails=1&polygon_geojson=1`,
                    {
                        headers: {
                            'User-Agent': 'HeartRiver/1.0'
                        }
                    }
                );
                const data = await response.json();
                return data.map(item => {
                    // 解析地址详细信息，优先显示POI名称
                    const addr = item.address;
                    let mainName = '';  // 主行：实际地名
                    let subInfo = '';   // 次行：门牌号/地址

                    // 优先使用POI名称（如商场、医院、地铁站等）
                    if (item.name) {
                        mainName = item.name;
                        // 门牌号作为次行
                        if (addr.house_number) {
                            subInfo = addr.road ? `${addr.road}${addr.house_number}` : addr.house_number;
                        } else if (addr.city || addr.town) {
                            subInfo = [addr.city || addr.town, addr.district].filter(Boolean).join(' · ');
                        }
                    } else if (addr.house_number && addr.road) {
                        // 有门牌号和道路
                        mainName = addr.road;
                        subInfo = addr.house_number;
                    } else if (addr.road) {
                        // 只有道路
                        mainName = addr.road;
                        subInfo = [addr.city || addr.town, addr.district].filter(Boolean).join(' · ');
                    } else if (addr.city || addr.town) {
                        // 城市级
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
                        city: this.getPrefectureLevelCityName(addr),
                        areaName: this.getAreaNameFromAddress(addr),
                        boundaryGeoJson: item.geojson || null,
                        boundingbox: Array.isArray(item.boundingbox) ? item.boundingbox : null
                    };
                });
            } catch (error) {
                console.error('搜索失败:', error);
                return [];
            }
        },

        // 定位到指定位置
        flyTo(lat, lon, zoom = 12) {
            this.map.flyTo([lat, lon], zoom, {
                animate: true,
                duration: 0.18,
                easeLinearity: 0.9,
                noMoveStart: true
            });
        },

        focusSearchResult(result) {
            if (!result) return;

            const geoJson = this.parseBoundaryGeoJson(result.boundaryGeoJson);
            if (geoJson) {
                const layer = L.geoJSON(geoJson);
                const bounds = layer.getBounds();
                if (bounds && bounds.isValid()) {
                    this.map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 0.2 });
                    return;
                }
            }

            if (Array.isArray(result.boundingbox) && result.boundingbox.length === 4) {
                const south = parseFloat(result.boundingbox[0]);
                const north = parseFloat(result.boundingbox[1]);
                const west = parseFloat(result.boundingbox[2]);
                const east = parseFloat(result.boundingbox[3]);
                if ([south, north, west, east].every(Number.isFinite)) {
                    const bounds = L.latLngBounds([[south, west], [north, east]]);
                    if (bounds.isValid()) {
                        this.map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 0.2 });
                        return;
                    }
                }
            }

            this.flyTo(result.lat, result.lon, 15);
        },

        // 获取当前位置
        getCurrentLocation(callback) {
            if (!navigator.geolocation) {
                alert(t('browserLocationUnsupported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.showLocationMarker(latitude, longitude);
                    this.flyTo(latitude, longitude, 14);
                    if (callback) callback({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('定位失败:', error);
                    alert(t('locationFailed'));
                },
                { enableHighAccuracy: true }
            );
        },

        // 显示位置标记
        showLocationMarker(lat, lng) {
            // 移除旧标记
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            // 添加新标记
            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'location-marker',
                    html: `<svg viewBox="0 0 24 24" width="32" height="32">
                        <path fill="#007AFF" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                })
            }).addTo(this.map);

            // 添加弹出信息
            this.locationMarker.bindPopup(t('currentLocation')).openPopup();
        },

        clearLocationMarker() {
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
                this.locationMarker = null;
            }
        },

        // 显示搜索结果标记
        showSearchMarker(lat, lng, name, options = {}) {
            // 移除旧标记
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            // 添加新标记（搜索结果标记）
            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'search-result-marker',
                    html: `<div class="search-marker-pin">
                        <svg viewBox="0 0 24 24" width="28" height="36">
                            <path fill="#FF6B6B" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                        </svg>
                        <div class="search-marker-label">${name}</div>
                    </div>`,
                    iconSize: [28, 44],
                    iconAnchor: [14, 44]
                })
            }).addTo(this.map);

            // 存储搜索位置信息，供后续使用
            this.lastSearchLocation = {
                lat,
                lng,
                name,
                city: options.city || '',
                areaName: options.areaName || '',
                boundaryGeoJson: options.boundaryGeoJson || null
            };

            const popupContent = `
                <div style="min-width: 180px; padding: 8px;">
                    <div style="margin-bottom: 10px;">
                        <strong style="font-size: 15px;">${name}</strong>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="search-marker-node-btn" data-lat="${lat}" data-lng="${lng}" data-name="${name}" style="flex: 1; padding: 8px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">${t('addAsPlanNode')}</button>
                        <button class="search-marker-recommend-btn" data-lat="${lat}" data-lng="${lng}" data-name="${name}" style="flex: 1; padding: 8px; background: #FF9F0A; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">${t('addAsWishlist')}</button>
                    </div>
                </div>
            `;
            this.locationMarker.bindPopup(popupContent, {
                closeButton: false,
                maxWidth: 240
            });
        },

        // 显示点击位置的标记
        showClickMarker(lat, lng, color) {
            // 移除旧标记
            if (this.locationMarker) {
                this.map.removeLayer(this.locationMarker);
            }

            // 添加新标记（使用工程颜色）
            this.locationMarker = L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'click-marker',
                    html: `<svg viewBox="0 0 24 24" width="28" height="36">
                        <path fill="${color}" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                    </svg>`,
                    iconSize: [28, 36],
                    iconAnchor: [14, 36]
                })
            }).addTo(this.map);

            // 存储点击位置信息
            this.lastClickLocation = { lat, lng };

            // 点击标记打开添加节点模态框（不预设名称）
            this.locationMarker.on('click', () => {
                if (UIManager.activeProjectId) {
                    App.showNodeModalWithLocation(UIManager.activeProjectId, lat, lng, '');
                } else {
                    alert(t('selectPlanFirst'));
                }
            });
        },

        // 在点击位置添加节点（保留兼容）
        addNodeAtPosition(latlng, projectId) {
            const project = DataManager.load().projects.find(p => p.id === projectId);
            if (!project) return;

            // 打开添加节点模态框
            document.getElementById('latitude').value = latlng.lat.toFixed(4);
            document.getElementById('longitude').value = latlng.lng.toFixed(4);
            document.getElementById('nodeProjectId').value = projectId;
            document.getElementById('nodeId').value = '';
            document.getElementById('nodeModalTitle').textContent = t('addNode');
            document.getElementById('nodeModal').classList.add('show');
        },

        // 显示种草地点
        /* showRecommendations: async function() {
            this.clearMarkers();
            const recommendations = DataManager.getAllRecommendations();

            // 按城市分组计算边界
            const cities = {};
            recommendations.forEach(r => {
                if (!cities[r.city]) {
                    cities[r.city] = { items: [], bounds: null };
                }
                cities[r.city].items.push(r);
            });

            // 显示每个城市的标记和区域
            const allBounds = [];
            for (const city of Object.keys(cities)) {
                const items = cities[city].items;
                if (items.length === 0) continue;

                // 创建城市区域（取所有点的中心点和范围）
                let centerLat = 0, centerLng = 0;
                items.forEach(r => {
                    centerLat += r.latitude;
                    centerLng += r.longitude;
                });
                centerLat /= items.length;
                centerLng /= items.length;

                // 绘制城市半透明区域
                const circle = L.circle([centerLat, centerLng], {
                    radius: Math.max(30000, items.length * 15000), // 根据点数调整半径
                    color: items[0].color,
                    fillColor: items[0].color,
                    fillOpacity: 0.2,
                    weight: 2,
                    opacity: 0.6
                }).addTo(this.map);
                this.polylines.push(circle);

                // 为每个种草地点创建标记
                items.forEach((r, index) => {
                    const marker = L.marker([r.latitude, r.longitude], {
                        icon: L.divIcon({
                            className: 'recommend-marker',
                            html: `<span style="background:${r.color}">${r.completed ? '✓' : '!'}</span>`,
                            iconSize: [28, 28],
                            iconAnchor: [14, 14]
                        })
                    });

                    // 弹出框内容
                    const popupContent = `
                        <div style="min-width: 180px; padding: 8px;">
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 15px;">${r.name}</strong>
                                ${r.completed ? ' ✅' : ' ⚠️'}
                            </div>
                            ${r.plannedTime ? `<div style="font-size: 12px; color: #666; margin-bottom: 4px;">⏰ ${r.plannedTime}</div>` : ''}
                            ${r.remark ? `<div style="font-size: 12px; color: #888; margin-bottom: 8px;">${r.remark}</div>` : ''}
                            <div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
                                <button class="popup-edit-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('edit')}</button>
                                <button class="popup-complete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #34C759; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${r.completed ? t('unmarkDone') : t('markDone')}</button>
                                <button class="popup-delete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('deleteItem')}</button>
                            </div>
                        </div>
                    `;
                    marker.bindPopup(popupContent);
                    marker.addTo(this.map);
                    this.markers.push(marker);
                });
            });

            // 自动调整视图
            if (recommendations.length > 0) {
                const bounds = L.latLngBounds(recommendations.map(r => [r.latitude, r.longitude]));
                this.map.fitBounds(bounds, { padding: [50, 50] });
            }
        },

        // 通过地址获取城市信息
        async getCityFromCoords(lat, lng) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
                    {
                        headers: { 'User-Agent': 'HeartRiver/1.0' }
                    }
                );
                const data = await response.json();
                const addr = data.address;
                // 优先返回城市，然后是地区，然后是省份
                return addr.city || addr.town || addr.county || addr.state || t('unknownCity');
            } catch (error) {
                console.error('获取城市信息失败:', error);
                return t('unknownCity');
            }
        }
    */ };

    // =====================
    // UI管理模块
    // =====================
    Object.assign(MapManager, {
        showRecommendations: async function() {
            this.clearMarkers();
            const recommendations = DataManager.getAllRecommendations();
            const cities = {};
            const allBounds = [];

            recommendations.forEach(r => {
                if (!cities[r.city]) {
                    cities[r.city] = { items: [] };
                }
                cities[r.city].items.push(r);
            });

            for (const city of Object.keys(cities)) {
                const items = cities[city].items;
                if (!items.length) continue;

                const exactBoundaryItem = items.find(r => r.boundaryMode === 'exact' && r.cityBoundaryGeoJson);
                const storedBoundary = exactBoundaryItem
                    ? exactBoundaryItem.cityBoundaryGeoJson
                    : (items.find(r => r.cityBoundaryGeoJson)?.cityBoundaryGeoJson || null);
                const cityBoundary = exactBoundaryItem
                    ? storedBoundary
                    : (await this.fetchCityBoundaryByName(city) || storedBoundary);
                const boundaryLayer = this.drawCityBoundary(city, items[0].color, cityBoundary);
                if (boundaryLayer && typeof boundaryLayer.getBounds === 'function') {
                    const boundaryBounds = boundaryLayer.getBounds();
                    if (boundaryBounds && boundaryBounds.isValid()) {
                        allBounds.push(boundaryBounds);
                    }
                }

                items.forEach(r => {
                    const marker = L.marker([r.latitude, r.longitude], {
                        icon: L.divIcon({
                            className: 'recommend-marker',
                            html: `<span style="background:${r.color}">${r.completed ? '✓' : '!'}</span>`,
                            iconSize: [28, 28],
                            iconAnchor: [14, 14]
                        })
                    });

                    const popupContent = `
                        <div style="min-width: 180px; padding: 8px;">
                            <div style="margin-bottom: 8px;">
                                <strong style="font-size: 15px;">${r.name}</strong>
                                ${r.completed ? ' ✓' : ' ⏳'}
                            </div>
                            ${r.plannedTime ? `<div style="font-size: 12px; color: #666; margin-bottom: 4px;">⏰ ${r.plannedTime}</div>` : ''}
                            ${r.remark ? `<div style="font-size: 12px; color: #888; margin-bottom: 8px;">${r.remark}</div>` : ''}
                            <div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
                                <button class="popup-edit-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('edit')}</button>
                                <button class="popup-complete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #34C759; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${r.completed ? t('unmarkDone') : t('markDone')}</button>
                                <button class="popup-delete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('deleteItem')}</button>
                            </div>
                        </div>
                    `;

                    marker.bindPopup(popupContent);
                    marker.addTo(this.map);
                    this.markers.push(marker);
                    allBounds.push(L.latLng(r.latitude, r.longitude));
                });
            }

            if (recommendations.length > 0 && allBounds.length > 0) {
                const bounds = L.latLngBounds(allBounds);
                this.map.fitBounds(bounds, { padding: [50, 50] });
            }
        },

        getCityFromCoords: async function(lat, lng) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1&polygon_geojson=1`);
                const data = await response.json();
                const cityName = this.getPrefectureLevelCityName(data.address);
                const cityBoundary = await this.fetchCityBoundaryByName(cityName);

                return {
                    city: cityName,
                    boundaryGeoJson: cityBoundary || null
                };
            } catch (error) {
                console.error('获取城市信息失败:', error);
                return {
                    city: t('unknownCity'),
                    boundaryGeoJson: null
                };
            }
        }
    });

    const UIManager = {
        currentTab: 'map',
        activeProjectId: null,
        currentMode: 'recommend', // 'plan' 规划模式, 'recommend' 种草模式
        deleteCallback: null,

        // 初始化响应式
        initResponsive() {
            const width = window.innerWidth;
            if (width < 768) {
                document.getElementById('app').classList.add('app-mobile');
                this.showMobileTab('map');
            } else {
                document.getElementById('app').classList.remove('app-mobile');
            }
        },

        // 显示移动端标签页
        showMobileTab(tab) {
            this.currentTab = tab;
            const mapContainer = document.getElementById('mapContainer');
            const sidebar = document.getElementById('sidebar');
            const recommendSidebar = document.getElementById('recommendSidebar');

            // 更新按钮状态
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tab);
            });

            // 显示对应内容
            if (tab === 'map') {
                mapContainer.classList.add('show');
                mapContainer.style.display = 'block';
                sidebar.classList.remove('show');
                sidebar.style.display = 'none';
                recommendSidebar.classList.remove('show');
                recommendSidebar.style.display = 'none';
                setTimeout(() => MapManager.map && MapManager.map.invalidateSize(), 100);
            } else if (tab === 'list') {
                mapContainer.classList.remove('show');
                mapContainer.style.display = 'none';
                sidebar.classList.add('show');
                sidebar.style.display = 'flex';
                recommendSidebar.classList.remove('show');
                recommendSidebar.style.display = 'none';
            } else if (tab === 'recommend') {
                mapContainer.classList.remove('show');
                mapContainer.style.display = 'none';
                sidebar.classList.remove('show');
                sidebar.style.display = 'none';
                recommendSidebar.classList.add('show');
                recommendSidebar.style.display = 'flex';
                this.renderRecommendations();
            }
        },

        // 切换模式
        toggleMode() {
            this.currentMode = this.currentMode === 'plan' ? 'recommend' : 'plan';
            const buttons = document.querySelectorAll('.js-mode-toggle');
            const texts = document.querySelectorAll('.js-mode-text');

            // 切换桌面端侧边栏
            const sidebar = document.getElementById('sidebar');
            const recommendSidebar = document.getElementById('recommendSidebar');
            const width = window.innerWidth;

            if (this.currentMode === 'recommend') {
                buttons.forEach((btn) => btn.classList.add('active'));
                texts.forEach((text) => {
                    text.textContent = t('modeWishlist');
                });
                // 切换FAB图标
                document.getElementById('addNodeBtn').innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                `;
                document.getElementById('addNodeBtn').title = t('addWishlist');
                // 显示种草地点
                MapManager.showRecommendations({ fitBounds: true });
                // 切换侧边栏显示（仅桌面端）
                if (width >= 768) {
                    sidebar.style.display = 'none';
                    recommendSidebar.style.display = 'flex';
                    this.renderRecommendations();
                }
            } else {
                buttons.forEach((btn) => btn.classList.remove('active'));
                texts.forEach((text) => {
                    text.textContent = t('modePlan');
                });
                document.getElementById('addNodeBtn').innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                `;
                document.getElementById('addNodeBtn').title = t('addNode');
                // 显示规划节点
                if (this.activeProjectId) {
                    const data = DataManager.load();
                    const project = data.projects.find(p => p.id === this.activeProjectId);
                    if (project) {
                        MapManager.showProject(project);
                    }
                }
                // 切换侧边栏显示（仅桌面端）
                if (width >= 768) {
                    recommendSidebar.style.display = 'none';
                    sidebar.style.display = 'flex';
                }
            }
        },

        // 渲染种草列表
        renderRecommendations() {
            const grouped = DataManager.getRecommendationsByCity();
            const container = document.getElementById('recommendationsList');

            if (Object.keys(grouped).length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <p>${t('emptyWishlist')}</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = Object.keys(grouped).map(city => {
                const items = grouped[city];
                return `
                    <div class="city-group">
                        <div class="city-group-header">
                            <span class="city-group-title">${city}</span>
                            <span class="city-group-count">${t('itemCount', { count: items.length })}</span>
                        </div>
                        ${items.map(item => `
                            <div class="recommend-item" data-id="${item.id}">
                                <span class="recommend-color-dot" style="background:${item.color}"></span>
                                <div class="recommend-info">
                                    <div class="recommend-name">
                                        ${item.name}
                                        ${item.completed ? '<span class="status-icon">✅</span>' : '<span class="status-icon">⚠️</span>'}
                                    </div>
                                    ${item.plannedTime ? `<div class="recommend-time">${item.plannedTime}</div>` : ''}
                                </div>
                                <div class="recommend-actions">
                                    <button class="edit-recommend-btn" title="${t('edit')}">
                                        <svg viewBox="0 0 24 24" width="14" height="14">
                                            <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                        </svg>
                                    </button>
                                    <button class="delete-recommend-btn" title="${t('deleteItem')}">
                                        <svg viewBox="0 0 24 24" width="14" height="14">
                                            <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }).join('');

            // 绑定编辑事件
            container.querySelectorAll('.edit-recommend-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = e.target.closest('.recommend-item').dataset.id;
                    const recommendations = DataManager.getAllRecommendations();
                    const item = recommendations.find(r => r.id === id);
                    if (item) {
                        App.showRecommendModal(item);
                    }
                });
            });

            // 绑定删除事件
            container.querySelectorAll('.delete-recommend-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = e.target.closest('.recommend-item').dataset.id;
                    if (confirm(t('confirmDeleteWishlist'))) {
                        DataManager.deleteRecommendation(id);
                        this.renderRecommendations();
                        MapManager.showRecommendations();
                    }
                });
            });
        },

        // 显示种草模态框
        showRecommendModal(recommendation = null) {
            const modal = document.getElementById('recommendModal');
            const form = document.getElementById('recommendForm');
            const title = document.getElementById('recommendModalTitle');

            form.reset();
            form.dataset.boundaryGeoJson = '';
            form.dataset.boundaryMode = 'prefecture';
            document.getElementById('recommendId').value = '';
            document.getElementById('recommendLat').value = '';
            document.getElementById('recommendLng').value = '';

            if (recommendation) {
                title.textContent = t('editWishlist');
                document.getElementById('recommendId').value = recommendation.id;
                document.getElementById('recommendName').value = recommendation.name;
                document.getElementById('recommendCity').value = recommendation.city || '';
                document.getElementById('recommendLat').value = recommendation.latitude || '';
                document.getElementById('recommendLng').value = recommendation.longitude || '';
                document.getElementById('recommendColor').value = recommendation.color || '#FF6B6B';
                document.getElementById('recommendColorPreview').textContent = recommendation.color || '#FF6B6B';
                document.getElementById('recommendTime').value = recommendation.plannedTime || '';
                document.getElementById('recommendRemark').value = recommendation.remark || '';
                document.getElementById('recommendCompleted').checked = recommendation.completed || false;
                form.dataset.boundaryGeoJson = recommendation.cityBoundaryGeoJson || '';
                form.dataset.boundaryMode = recommendation.boundaryMode || 'prefecture';
            } else {
                title.textContent = t('addWishlist');
                document.getElementById('recommendColor').value = '#FF6B6B';
                document.getElementById('recommendColorPreview').textContent = '#FF6B6B';
            }

            modal.classList.add('show');
        },

        // 渲染规划列表
        renderProjects() {
            const data = DataManager.load();
            const container = document.getElementById('projectsList');

            if (data.projects.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"/>
                        </svg>
                        <p>${t('emptyPlans')}</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = data.projects.map(project => {
                const projectColor = project.color || '#007AFF';
                return `
                <div class="project-card ${this.activeProjectId === project.id ? 'active' : ''}"
                     data-id="${project.id}">
                    <div class="project-card-header">
                        <span class="project-card-title">
                            <span class="project-color-dot" style="background:${projectColor}"></span>
                            ${project.name}
                        </span>
                        <div class="project-card-actions">
                            <button class="edit-btn" title="${t('edit')}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </button>
                            <button class="delete-btn" title="${t('deleteItem')}">
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="project-card-info">
                        ${project.startDate} ~ ${project.endDate}
                        ${project.remark ? ' · ' + project.remark : ''}
                    </div>
                    <div class="project-card-nodes">
                        ${t('nodeCount', { count: project.nodes.length })}
                    </div>
                    ${project.nodes.length > 0 ? `
                        <div class="nodes-list">
                            ${project.nodes.slice(0, 3).map(node => {
                                const nodeColor = node.color || projectColor;
                                return `
                                <div class="node-item" data-node-id="${node.id}">
                                    <span class="node-order" style="background:${nodeColor}">${node.order}</span>
                                    <div class="node-info">
                                        <div class="node-name">${node.placeName || t('unnamed')}</div>
                                        ${node.plannedTime ? `<div class="node-time">${node.plannedTime}</div>` : ''}
                                    </div>
                                </div>`;
                            }).join('')}
                            ${project.nodes.length > 3 ? `<div class="node-item" style="color: var(--text-secondary);">${t('moreNodes', { count: project.nodes.length - 3 })}</div>` : ''}
                        </div>
                    ` : ''}
                </div>
            `}).join('');

            // 绑定事件
            container.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.project-card-actions')) return;
                    const projectId = card.dataset.id;
                    this.selectProject(projectId);
                });
            });

            container.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const projectId = e.target.closest('.project-card').dataset.id;
                    this.editProject(projectId);
                });
            });

            container.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const projectId = e.target.closest('.project-card').dataset.id;
                    this.confirmDelete(t('confirmDeletePlanForever'), () => {
                        DataManager.deleteProject(projectId);
                        if (this.activeProjectId === projectId) {
                            this.activeProjectId = null;
                            MapManager.showProject(null);
                        }
                        this.renderProjects();
                    });
                });
            });
        },

        // 选择规划
        selectProject(projectId) {
            this.activeProjectId = projectId;
            const data = DataManager.load();
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                MapManager.showProject(project);
                this.renderProjects();
            }
        },

        // 显示规划模态框
        showProjectModal(project = null) {
            const modal = document.getElementById('projectModal');
            const form = document.getElementById('projectForm');
            const title = document.getElementById('projectModalTitle');

            form.reset();
            document.getElementById('projectId').value = '';

            if (project) {
                title.textContent = t('editPlan');
                document.getElementById('projectId').value = project.id;
                document.getElementById('projectName').value = project.name;
                document.getElementById('startDate').value = project.startDate;
                document.getElementById('endDate').value = project.endDate;
                document.getElementById('projectColor').value = project.color || '#007AFF';
                document.getElementById('projectColorPreview').textContent = project.color || '#007AFF';
                document.getElementById('projectRemark').value = project.remark || '';
            } else {
                title.textContent = t('newPlan');
                document.getElementById('projectColor').value = '#007AFF';
                document.getElementById('projectColorPreview').textContent = '#007AFF';
            }

            modal.classList.add('show');

            // 同步日期到flatpickr
            setTimeout(() => {
                const startPicker = document.getElementById('startDate')._flatpickr;
                const endPicker = document.getElementById('endDate')._flatpickr;
                if (startPicker && project && project.startDate) {
                    startPicker.setDate(project.startDate);
                }
                if (endPicker && project && project.endDate) {
                    endPicker.setDate(project.endDate);
                }
            }, 100);
        },

        // 编辑规划
        editProject(projectId) {
            const data = DataManager.load();
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                this.showProjectModal(project);
            }
        },

        // 显示节点模态框
        showNodeModal(projectId, node = null) {
            const modal = document.getElementById('nodeModal');
            const form = document.getElementById('nodeForm');
            const title = document.getElementById('nodeModalTitle');

            form.reset();
            document.getElementById('nodeId').value = '';
            document.getElementById('nodeProjectId').value = projectId;

            // 获取工程颜色作为默认值
            const data = DataManager.load();
            const project = data.projects.find(p => p.id === projectId);
            const defaultColor = project ? (project.color || '#007AFF') : '#007AFF';

            if (node) {
                title.textContent = t('editNode');
                document.getElementById('nodeId').value = node.id;
                document.getElementById('placeName').value = node.placeName || '';
                document.getElementById('latitude').value = node.latitude || '';
                document.getElementById('longitude').value = node.longitude || '';
                document.getElementById('nodeTime').value = node.plannedTime || '';
                document.getElementById('nodeColor').value = node.color || defaultColor;
                document.getElementById('nodeColorPreview').textContent = node.color || defaultColor;
                document.getElementById('nodeRemark').value = node.remark || '';
            } else {
                title.textContent = t('addNode');
                document.getElementById('nodeColor').value = defaultColor;
                document.getElementById('nodeColorPreview').textContent = defaultColor;
            }

            modal.classList.add('show');

            // 同步日期时间到flatpickr
            setTimeout(() => {
                const timePicker = document.getElementById('nodeTime')._flatpickr;
                if (timePicker && node && node.plannedTime) {
                    timePicker.setDate(node.plannedTime);
                }
            }, 100);
        },

        // 确认删除
        confirmDelete(message, callback) {
            document.getElementById('confirmText').textContent = message;
            document.getElementById('confirmModal').classList.add('show');
            this.deleteCallback = callback;
        },

        // 切换主题
        toggleTheme() {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('heart_river_theme', newTheme);

            // 更新地图样式
            setTimeout(() => MapManager.map && MapManager.map.invalidateSize(), 100);
        },

        // 初始化主题
        initTheme() {
            const saved = localStorage.getItem('heart_river_theme');
            if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    };

    // =====================
    // 应用主模块
    // =====================
    const App = {
        init() {
            // 初始化主题
            I18n.init();
            UIManager.initTheme();

            // 初始化日期选择器
            this.initDatePickers();

            // 初始化地图
            MapManager.init();

            // 初始化响应式
            UIManager.initResponsive();
            window.addEventListener('resize', () => UIManager.initResponsive());

            // 渲染规划列表
            this.refreshUI();

            // 绑定事件
            this.bindEvents();

            if (UIManager.currentMode === 'recommend') {
                UIManager.currentMode = 'plan';
                UIManager.toggleMode();
            }
        },

        // 初始化日期选择器
        // Refresh visible UI after data or language changes
        refreshUI() {
            UIManager.renderProjects();
            UIManager.renderRecommendations();

            if (!MapManager.map) return;

            if (UIManager.currentMode === 'recommend') {
                MapManager.showRecommendations();
                return;
            }

            const data = DataManager.load();
            const project = data.projects.find((item) => item.id === UIManager.activeProjectId);
            MapManager.showProject(project || null);
        },

        onLanguageChanged() {
            this.initDatePickers();
            this.refreshUI();

            const addNodeBtn = document.getElementById('addNodeBtn');
            if (UIManager.currentMode === 'recommend') {
                document.querySelectorAll('.js-mode-text').forEach((text) => {
                    text.textContent = t('modeWishlist');
                });
                document.querySelectorAll('.js-mode-toggle').forEach((btn) => {
                    btn.classList.add('active');
                });
                addNodeBtn.title = t('addWishlist');
            } else {
                document.querySelectorAll('.js-mode-text').forEach((text) => {
                    text.textContent = t('modePlan');
                });
                document.querySelectorAll('.js-mode-toggle').forEach((btn) => {
                    btn.classList.remove('active');
                });
                addNodeBtn.title = t('addNode');
            }

            if (document.getElementById('projectModal').classList.contains('show')) {
                document.getElementById('projectModalTitle').textContent = document.getElementById('projectId').value
                    ? t('editPlan')
                    : t('newPlan');
            }

            if (document.getElementById('nodeModal').classList.contains('show')) {
                document.getElementById('nodeModalTitle').textContent = document.getElementById('nodeId').value
                    ? t('editNode')
                    : t('addNode');
            }

            if (document.getElementById('recommendModal').classList.contains('show')) {
                document.getElementById('recommendModalTitle').textContent = document.getElementById('recommendId').value
                    ? t('editWishlist')
                    : t('addWishlist');
            }
        },

        initDatePickers() {
            document.querySelectorAll('.date-picker, .date-time-picker').forEach((input) => {
                if (input._flatpickr) {
                    input._flatpickr.destroy();
                }
            });

            if (typeof window.flatpickr !== 'function') {
                document.querySelectorAll('.date-picker').forEach((input) => {
                    input.type = 'date';
                });
                document.querySelectorAll('.date-time-picker').forEach((input) => {
                    input.type = 'datetime-local';
                });
                return;
            }

            // 日期选择器（仅日期）
            const locale = I18n.currentLang === 'en' ? 'default' : 'zh';

            flatpickr('.date-picker', {
                locale,
                dateFormat: 'Y-m-d',
                allowInput: false,
                clickOpens: true,
                theme: 'material_blue'
            });

            // 日期时间选择器
            flatpickr('.date-time-picker', {
                locale,
                dateFormat: 'Y-m-d H:i',
                allowInput: false,
                clickOpens: true,
                enableTime: true,
                time_24hr: true,
                theme: 'material_blue'
            });
        },

        bindEvents() {
            // 主题切换
            document.getElementById('themeToggle').addEventListener('click', () => {
                UIManager.toggleTheme();
            });

            document.getElementById('languageToggle').addEventListener('click', () => {
                I18n.toggleLanguage();
            });

            // 移动端标签页
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    UIManager.showMobileTab(btn.dataset.tab);
                });
            });

            // 新建规划
            document.getElementById('addProjectBtn').addEventListener('click', () => {
                UIManager.showProjectModal();
            });

            // 取消规划表单
            document.getElementById('cancelProjectBtn').addEventListener('click', () => {
                document.getElementById('projectModal').classList.remove('show');
            });

            // 提交规划表单
            document.getElementById('projectForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const id = document.getElementById('projectId').value;
                const project = {
                    name: document.getElementById('projectName').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    color: document.getElementById('projectColor').value,
                    remark: document.getElementById('projectRemark').value
                };

                if (id) {
                    project.id = id;
                    const data = DataManager.load();
                    const existing = data.projects.find(p => p.id === id);
                    project.nodes = existing ? existing.nodes : [];
                    DataManager.updateProject(project);
                } else {
                    DataManager.addProject(project);
                }

                document.getElementById('projectModal').classList.remove('show');
                UIManager.renderProjects();
            });

            // 取消节点表单
            document.getElementById('cancelNodeBtn').addEventListener('click', () => {
                document.getElementById('nodeModal').classList.remove('show');
            });

            // 提交节点表单
            document.getElementById('nodeForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const nodeId = document.getElementById('nodeId').value;
                const projectId = document.getElementById('nodeProjectId').value;
                const node = {
                    placeName: document.getElementById('placeName').value,
                    latitude: parseFloat(document.getElementById('latitude').value),
                    longitude: parseFloat(document.getElementById('longitude').value),
                    plannedTime: document.getElementById('nodeTime').value,
                    color: document.getElementById('nodeColor').value,
                    remark: document.getElementById('nodeRemark').value
                };

                if (nodeId) {
                    node.id = nodeId;
                    const data = DataManager.load();
                    const project = data.projects.find(p => p.id === projectId);
                    if (project) {
                        const existingNode = project.nodes.find(n => n.id === nodeId);
                        node.order = existingNode ? existingNode.order : 1;
                        // 保留原节点颜色（如果表单颜色为空则使用原有颜色）
                        node.color = node.color || existingNode.color || project.color || '#007AFF';
                    }
                    DataManager.updateNode(projectId, node);
                } else {
                    DataManager.addNode(projectId, node);
                }

                document.getElementById('nodeModal').classList.remove('show');
                UIManager.renderProjects();

                // 更新地图
                const data = DataManager.load();
                const project = data.projects.find(p => p.id === projectId);
                if (project) {
                    MapManager.showProject(project);
                }
            });

            // 确认删除
            document.getElementById('confirmOkBtn').addEventListener('click', () => {
                document.getElementById('confirmModal').classList.remove('show');
                if (UIManager.deleteCallback) {
                    UIManager.deleteCallback();
                    UIManager.deleteCallback = null;
                }
            });

            document.getElementById('confirmCancelBtn').addEventListener('click', () => {
                document.getElementById('confirmModal').classList.remove('show');
                UIManager.deleteCallback = null;
            });

            // 导出
            document.getElementById('exportBtn').addEventListener('click', () => {
                const data = DataManager.exportData();
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'heart_river_data.json';
                a.click();
                URL.revokeObjectURL(url);
            });

            // 导入按钮
            document.getElementById('importBtn').addEventListener('click', () => {
                document.getElementById('importModal').classList.add('show');
            });

            document.getElementById('cancelImportBtn').addEventListener('click', () => {
                document.getElementById('importModal').classList.remove('show');
            });

            // 执行导入
            document.getElementById('doImportBtn').addEventListener('click', () => {
                const text = document.getElementById('importText').value;
                const merge = document.getElementById('mergeData').checked;
                try {
                    JSON.parse(text); // 验证JSON
                    DataManager.importData(text, merge);
                    document.getElementById('importModal').classList.remove('show');
                    document.getElementById('importText').value = '';
                    UIManager.renderProjects();
                    MapManager.showProject(null);
                } catch (e) {
                    alert(t('invalidJson'));
                }
            });

            // 点击地图移动搜索标记到当前位置
            if (MapManager.map) {
                MapManager.map.on('click', async (e) => {
                    const { lat, lng } = e.latlng;

                    if (UIManager.currentMode === 'recommend') {
                        MapManager.showClickMarker(lat, lng, '#FF6B6B');
                    } else {
                        // 规划模式
                        if (UIManager.activeProjectId) {
                            const data = DataManager.load();
                            const project = data.projects.find(p => p.id === UIManager.activeProjectId);
                            const defaultColor = project ? (project.color || '#007AFF') : '#007AFF';
                            MapManager.showClickMarker(lat, lng, defaultColor);
                        } else {
                            MapManager.showClickMarker(lat, lng, '#007AFF');
                        }
                    }
                });
            }

            // 悬浮按钮添加节点/种草
            document.getElementById('addNodeBtn').addEventListener('click', () => {
                if (UIManager.currentMode === 'recommend') {
                    // 种草模式：优先使用当前锚点位置
                    const anchor = MapManager.lastSearchLocation || MapManager.lastClickLocation;
                    if (anchor && Number.isFinite(anchor.lat) && Number.isFinite(anchor.lng)) {
                        App.showRecommendModalWithLocation(
                            anchor.lat,
                            anchor.lng,
                            anchor.name || t('selectedLocation'),
                            anchor
                        );
                        return;
                    }

                    UIManager.showRecommendModal();
                } else {
                    // 规划模式：添加节点
                    if (UIManager.activeProjectId) {
                        document.getElementById('nodeProjectId').value = UIManager.activeProjectId;
                        document.getElementById('nodeId').value = '';
                        document.getElementById('nodeModalTitle').textContent = t('addNode');
                        document.getElementById('nodeForm').reset();
                        document.getElementById('nodeModal').classList.add('show');
                    } else {
                        alert(t('selectPlanFirst'));
                    }
                }
            });

            // 模式切换按钮
            document.querySelectorAll('.js-mode-toggle').forEach((btn) => {
                btn.addEventListener('click', () => {
                    UIManager.toggleMode();
                });
            });

            // 地图搜索
            const mapSearchInput = document.getElementById('mapSearchInput');
            const mapSearchResults = document.getElementById('mapSearchResults');
            let searchTimeout;

            mapSearchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                // 减少延迟到150ms，更快响应
                searchTimeout = setTimeout(async () => {
                    const query = mapSearchInput.value;
                    if (query.length < 1) {
                        mapSearchResults.classList.remove('show');
                        return;
                    }
                    const results = await MapManager.searchPlace(query);
                    if (results.length > 0) {
                        mapSearchResults.innerHTML = results.map((r, index) => `
                            <div class="result-item" data-index="${index}" data-lat="${r.lat}" data-lon="${r.lon}">
                                <div class="result-main">${r.mainName || r.name.split(',')[0]}</div>
                                <div class="result-detail">${r.subInfo || r.name.split(',').slice(1,3).join(', ')}</div>
                            </div>
                        `).join('');
                        mapSearchResults.classList.add('show');

                        // 点击结果定位并显示标记
                        mapSearchResults.querySelectorAll('.result-item').forEach(item => {
                            item.addEventListener('click', () => {
                                const index = parseInt(item.dataset.index, 10);
                                const lat = parseFloat(item.dataset.lat);
                                const lon = parseFloat(item.dataset.lon);
                                const name = item.querySelector('.result-main').textContent;
                                const result = Number.isInteger(index) ? results[index] : null;
                                MapManager.focusSearchResult(result || { lat, lon });
                                MapManager.showSearchMarker(lat, lon, name, result || {});
                                mapSearchResults.classList.remove('show');
                            });
                        });
                    } else {
                        mapSearchResults.classList.remove('show');
                    }
                }, 300);
            });

            // 点击其他地方关闭搜索结果
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.map-search')) {
                    mapSearchResults.classList.remove('show');
                }
            });

            // 定位按钮
            document.getElementById('locationBtn').addEventListener('click', () => {
                if (!MapManager.map) {
                    alert(t('mapUnavailable'));
                    return;
                }
                MapManager.getCurrentLocation();
            });

            // 节点搜索 - 输入时自动搜索
            const nodeSearchBtn = document.getElementById('nodeSearchBtn');
            const nodePlaceNameInput = document.getElementById('placeName');
            const nodeSearchResults = document.getElementById('nodeSearchResults');
            let nodeSearchTimeout;

            // 保留搜索按钮
            nodeSearchBtn.addEventListener('click', () => {
                performNodeSearch();
            });

            // 输入时自动搜索
            nodePlaceNameInput.addEventListener('input', () => {
                clearTimeout(nodeSearchTimeout);
                nodeSearchTimeout = setTimeout(() => {
                    const query = nodePlaceNameInput.value;
                    if (query.length >= 1) {
                        performNodeSearch();
                    }
                }, 300);
            });

            async function performNodeSearch() {
                const query = nodePlaceNameInput.value;
                if (!query || query.length < 1) {
                    nodeSearchResults.classList.remove('show');
                    return;
                }
                const results = await MapManager.searchPlace(query);
                if (results.length > 0) {
                    nodeSearchResults.innerHTML = results.map(r => `
                        <div class="result-item" data-name="${r.mainName || r.name.split(',')[0]}" data-lat="${r.lat}" data-lon="${r.lon}">
                            <div class="result-main">${r.mainName || r.name.split(',')[0]}</div>
                            <div class="result-detail">${r.subInfo || r.name.split(',').slice(1,3).join(', ')}</div>
                        </div>
                    `).join('');
                    nodeSearchResults.classList.add('show');

                    nodeSearchResults.querySelectorAll('.result-item').forEach(item => {
                        item.addEventListener('click', () => {
                            document.getElementById('placeName').value = item.dataset.name;
                            document.getElementById('latitude').value = item.dataset.lat;
                            document.getElementById('longitude').value = item.dataset.lon;
                            nodeSearchResults.classList.remove('show');
                        });
                    });
                } else {
                    nodeSearchResults.classList.remove('show');
                }
            }

            // 颜色选择器预览更新
            document.getElementById('projectColor').addEventListener('input', (e) => {
                document.getElementById('projectColorPreview').textContent = e.target.value;
            });

            document.getElementById('nodeColor').addEventListener('input', (e) => {
                document.getElementById('nodeColorPreview').textContent = e.target.value;
            });

            // 种草颜色选择器预览
            document.getElementById('recommendColor').addEventListener('input', (e) => {
                document.getElementById('recommendColorPreview').textContent = e.target.value;
            });

            // 取消种草按钮
            document.getElementById('cancelRecommendBtn').addEventListener('click', () => {
                document.getElementById('recommendModal').classList.remove('show');
                MapManager.clearLocationMarker();
            });

            // 提交种草表单
            document.getElementById('recommendForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const id = document.getElementById('recommendId').value;
                const nameInput = document.getElementById('recommendName').value;
                const cityInput = document.getElementById('recommendCity').value;
                const recommendation = {
                    name: nameInput || cityInput || t('unnamed'), // 名称为空时使用城市名
                    city: cityInput,
                    latitude: parseFloat(document.getElementById('recommendLat').value) || 0,
                    longitude: parseFloat(document.getElementById('recommendLng').value) || 0,
                    color: document.getElementById('recommendColor').value,
                    plannedTime: document.getElementById('recommendTime').value,
                    remark: document.getElementById('recommendRemark').value,
                    completed: document.getElementById('recommendCompleted').checked,
                    cityBoundaryGeoJson: form.dataset.boundaryGeoJson || '',
                    boundaryMode: form.dataset.boundaryMode || 'prefecture'
                };

                if (id) {
                    recommendation.id = id;
                    DataManager.updateRecommendation(recommendation);
                } else {
                    DataManager.addRecommendation(recommendation);
                }

                document.getElementById('recommendModal').classList.remove('show');
                MapManager.clearLocationMarker();
                UIManager.renderRecommendations();
                if (UIManager.currentMode === 'recommend') {
                    MapManager.showRecommendations();
                }
            });

            // 绑定地图弹出框按钮事件（全局委托）
            document.addEventListener('click', (e) => {
                // 编辑按钮
                if (e.target.classList.contains('popup-edit-btn') && e.target.dataset.nodeId && e.target.dataset.projectId) {
                    const nodeId = e.target.dataset.nodeId;
                    const projectId = e.target.dataset.projectId;
                    const data = DataManager.load();
                    const project = data.projects.find(p => p.id === projectId);
                    const node = project ? project.nodes.find(n => n.id === nodeId) : null;
                    if (node) {
                        App.showNodeModal(projectId, node);
                    }
                }
                // 删除按钮
                if (e.target.classList.contains('popup-delete-btn')) {
                    // 检查是否是种草删除
                    if (e.target.dataset.recommendId) {
                        const recommendId = e.target.dataset.recommendId;
                        if (confirm(t('confirmDeleteWishlist'))) {
                            DataManager.deleteRecommendation(recommendId);
                            UIManager.renderRecommendations();
                            MapManager.showRecommendations();
                        }
                    } else {
                        // 节点删除
                        const nodeId = e.target.dataset.nodeId;
                        const projectId = e.target.dataset.projectId;
                        if (confirm(t('confirmDeleteNode'))) {
                            DataManager.deleteNode(projectId, nodeId);
                            UIManager.renderProjects();
                            const data = DataManager.load();
                            const project = data.projects.find(p => p.id === projectId);
                            if (project) {
                                MapManager.showProject(project);
                            }
                        }
                    }
                }

                // 种草编辑按钮
                if (e.target.classList.contains('popup-edit-btn') && e.target.dataset.recommendId) {
                    const recommendId = e.target.dataset.recommendId;
                    const recommendations = DataManager.getAllRecommendations();
                    const item = recommendations.find(r => r.id === recommendId);
                    if (item) {
                        App.showRecommendModal(item);
                    }
                }

                // 种草完成/取消完成按钮
                if (e.target.classList.contains('popup-complete-btn') && e.target.dataset.recommendId) {
                    const recommendId = e.target.dataset.recommendId;
                    const recommendations = DataManager.getAllRecommendations();
                    const item = recommendations.find(r => r.id === recommendId);
                    if (item) {
                        item.completed = !item.completed;
                        DataManager.updateRecommendation(item);
                        UIManager.renderRecommendations();
                        MapManager.showRecommendations();
                    }
                }

                if (e.target.classList.contains('search-marker-node-btn')) {
                    const lat = parseFloat(e.target.dataset.lat);
                    const lng = parseFloat(e.target.dataset.lng);
                    const name = e.target.dataset.name || '';
                    if (UIManager.activeProjectId) {
                        App.showNodeModalWithLocation(UIManager.activeProjectId, lat, lng, name);
                    } else {
                        alert(t('selectPlanFirst'));
                    }
                }

                if (e.target.classList.contains('search-marker-recommend-btn')) {
                    const lat = parseFloat(e.target.dataset.lat);
                    const lng = parseFloat(e.target.dataset.lng);
                    const name = e.target.dataset.name || '';
                    App.showRecommendModalWithLocation(lat, lng, name, MapManager.lastSearchLocation || {});
                }
            });
        },

        // 公开方法供外部调用
        showNodeModal(projectId, node) {
            UIManager.showNodeModal(projectId, node);
        },

        // 显示种草弹窗
        showRecommendModal(recommendation) {
            UIManager.showRecommendModal(recommendation);
        },

        showRecommendModalWithLocation(lat, lng, name, options = {}) {
            UIManager.showRecommendModal();
            document.getElementById('recommendName').value = name || '';
            document.getElementById('recommendLat').value = lat.toFixed(4);
            document.getElementById('recommendLng').value = lng.toFixed(4);
            const form = document.getElementById('recommendForm');
            document.getElementById('recommendCity').value = options.city || '';
            document.getElementById('recommendName').placeholder = options.city || '';

            const applyBoundary = (boundaryGeoJson, cityName) => {
                document.getElementById('recommendCity').value = cityName || document.getElementById('recommendCity').value;
                document.getElementById('recommendName').placeholder = cityName || document.getElementById('recommendName').placeholder;
                form.dataset.boundaryGeoJson = boundaryGeoJson ? JSON.stringify(boundaryGeoJson) : '';
                form.dataset.boundaryMode = 'exact';
            };

            if (options.boundaryGeoJson) {
                applyBoundary(options.boundaryGeoJson, options.city || '');
                return;
            }

            Promise.resolve()
                .then(() => options.areaName ? MapManager.fetchBoundaryByName(options.areaName) : null)
                .then((areaBoundary) => {
                    if (areaBoundary) {
                        applyBoundary(areaBoundary, options.city || options.areaName || '');
                        return null;
                    }
                    return options.city ? MapManager.fetchBoundaryByName(options.city) : null;
                })
                .then((cityBoundary) => {
                    if (cityBoundary) {
                        applyBoundary(cityBoundary, options.city || '');
                        return null;
                    }
                    return MapManager.getAreaFromCoords(lat, lng);
                })
                .then((areaInfo) => {
                    if (areaInfo) {
                        applyBoundary(areaInfo.boundaryGeoJson, areaInfo.city);
                    }
                });
        },

        showRecommendModalWithPrefectureBoundary(lat, lng, name) {
            UIManager.showRecommendModal();
            document.getElementById('recommendName').value = name || '';
            document.getElementById('recommendLat').value = lat.toFixed(4);
            document.getElementById('recommendLng').value = lng.toFixed(4);

            MapManager.getCityFromCoords(lat, lng).then((cityInfo) => {
                document.getElementById('recommendCity').value = cityInfo.city;
                document.getElementById('recommendName').placeholder = cityInfo.city;
                document.getElementById('recommendForm').dataset.boundaryGeoJson = cityInfo.boundaryGeoJson
                    ? JSON.stringify(cityInfo.boundaryGeoJson)
                    : '';
                document.getElementById('recommendForm').dataset.boundaryMode = 'prefecture';
            });
        },

        // 带位置信息的显示节点模态框
        showNodeModalWithLocation(projectId, lat, lng, name) {
            // 重置表单并预填位置信息
            const form = document.getElementById('nodeForm');
            form.reset();
            document.getElementById('nodeId').value = '';
            document.getElementById('nodeProjectId').value = projectId;
            document.getElementById('nodeModalTitle').textContent = t('addNode');

            // 预填位置信息
            document.getElementById('placeName').value = name || '';
            document.getElementById('latitude').value = lat.toFixed(4);
            document.getElementById('longitude').value = lng.toFixed(4);

            // 获取工程颜色作为默认值
            const data = DataManager.load();
            const project = data.projects.find(p => p.id === projectId);
            const defaultColor = project ? (project.color || '#007AFF') : '#007AFF';
            document.getElementById('nodeColor').value = defaultColor;
            document.getElementById('nodeColorPreview').textContent = defaultColor;

            document.getElementById('nodeModal').classList.add('show');
        }
    };

    // =====================
    // 启动应用
    // =====================
    MapManager.showRecommendations = async function(options = {}) {
        const shouldFitBounds = options.fitBounds === true;
        this.clearMarkers();
        const recommendations = DataManager.getAllRecommendations();
        const cities = {};
        const allBounds = [];
        const buildRecommendPopupContent = (items) => `
            <div style="min-width: 180px; padding: 8px;">
                ${items.map((r, index) => `
                    <div style="${index > 0 ? 'border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;' : ''}">
                        <div style="margin-bottom: 8px;">
                            <strong style="font-size: 15px;">${r.name}</strong>
                        </div>
                        ${r.plannedTime ? `<div style="font-size: 12px; color: #666; margin-bottom: 4px;">${r.plannedTime}</div>` : ''}
                        ${r.remark ? `<div style="font-size: 12px; color: #888; margin-bottom: 8px;">${r.remark}</div>` : ''}
                        <div style="display: flex; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
                            <button class="popup-edit-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('edit')}</button>
                            <button class="popup-complete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #34C759; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${r.completed ? t('unmarkDone') : t('markDone')}</button>
                            <button class="popup-delete-btn" data-recommend-id="${r.id}" style="flex: 1; padding: 6px; background: #FF3B30; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">${t('deleteItem')}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        recommendations.forEach(r => {
            if (!cities[r.city]) {
                cities[r.city] = { items: [] };
            }
            cities[r.city].items.push(r);
        });

        for (const city of Object.keys(cities)) {
            const items = cities[city].items;
            if (!items.length) continue;

            const exactBoundaryItem = items.find(r => r.boundaryMode === 'exact' && r.cityBoundaryGeoJson);
            const storedBoundary = exactBoundaryItem
                ? exactBoundaryItem.cityBoundaryGeoJson
                : (items.find(r => r.cityBoundaryGeoJson)?.cityBoundaryGeoJson || null);
            const cityBoundary = exactBoundaryItem
                ? storedBoundary
                : (await this.fetchCityBoundaryByName(city) || storedBoundary);
            const boundaryLayer = this.drawCityBoundary(city, items[0].color, cityBoundary);
            if (boundaryLayer && typeof boundaryLayer.getBounds === 'function') {
                boundaryLayer.bindPopup(buildRecommendPopupContent(items), {
                    closeButton: false,
                    maxWidth: 260
                });
                const boundaryBounds = boundaryLayer.getBounds();
                if (boundaryBounds && boundaryBounds.isValid()) {
                    allBounds.push(boundaryBounds);
                }
            }

            items.forEach(r => {
                const marker = L.marker([r.latitude, r.longitude], {
                    icon: L.divIcon({
                        className: 'recommend-marker',
                        html: `<span style="color:${r.completed ? '#34C759' : '#FFD60A'}">${r.completed ? '✓' : '!'}</span>`,
                        iconSize: [22, 22],
                        iconAnchor: [11, 11]
                    })
                });

                marker.bindPopup(buildRecommendPopupContent([r]), {
                    closeButton: false,
                    maxWidth: 260
                });
                marker.addTo(this.map);
                this.markers.push(marker);
                allBounds.push(L.latLng(r.latitude, r.longitude));
            });
        }

        if (shouldFitBounds && recommendations.length > 0 && allBounds.length > 0) {
            const bounds = L.latLngBounds(allBounds);
            this.map.fitBounds(bounds, { padding: [50, 50] });
        }
    };

    MapManager.showClickMarker = function(lat, lng, color) {
        this.lastClickLocation = { lat, lng, color, name: t('selectedLocation') };
        this.showSearchMarker(lat, lng, t('selectedLocation'), {});
    };

    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
})();
