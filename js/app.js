// Heart River - 应用主逻辑
(function() {
    'use strict';

    // =====================
    // 应用主模块
    // =====================
    var App = {
        init() {
            I18n.init();
            UIManager.initTheme();
            this.initDatePickers();
            MapManager.init();
            UIManager.initResponsive();
            window.addEventListener('resize', function() { UIManager.initResponsive(); });
            this.refreshUI();
            this.bindEvents();

            if (UIManager.currentMode === 'recommend') {
                UIManager.currentMode = 'plan';
                UIManager.toggleMode();
            }
        },

        refreshUI() {
            UIManager.renderProjects();
            UIManager.renderRecommendations();

            if (!MapManager.map) return;

            if (UIManager.currentMode === 'recommend') {
                MapManager.showRecommendations();
                return;
            }

            var data = DataManager.load();
            var project = data.projects.find(function(item) { return item.id === UIManager.activeProjectId; });
            MapManager.showProject(project || null);
        },

        onLanguageChanged() {
            this.initDatePickers();
            this.refreshUI();

            var addNodeBtn = document.getElementById('addNodeBtn');
            if (UIManager.currentMode === 'recommend') {
                document.querySelectorAll('.js-mode-text').forEach(function(text) { text.textContent = t('modeWishlist'); });
                document.querySelectorAll('.js-mode-toggle').forEach(function(btn) { btn.classList.add('active'); });
                addNodeBtn.title = t('addWishlist');
            } else {
                document.querySelectorAll('.js-mode-text').forEach(function(text) { text.textContent = t('modePlan'); });
                document.querySelectorAll('.js-mode-toggle').forEach(function(btn) { btn.classList.remove('active'); });
                addNodeBtn.title = t('addNode');
            }

            if (document.getElementById('projectModal').classList.contains('show')) {
                document.getElementById('projectModalTitle').textContent = document.getElementById('projectId').value ? t('editPlan') : t('newPlan');
            }
            if (document.getElementById('nodeModal').classList.contains('show')) {
                document.getElementById('nodeModalTitle').textContent = document.getElementById('nodeId').value ? t('editNode') : t('addNode');
            }
            if (document.getElementById('recommendModal').classList.contains('show')) {
                document.getElementById('recommendModalTitle').textContent = document.getElementById('recommendId').value ? t('editWishlist') : t('addWishlist');
            }
        },

        initDatePickers() {
            document.querySelectorAll('.date-picker, .date-time-picker').forEach(function(input) {
                if (input._flatpickr) input._flatpickr.destroy();
            });

            if (typeof window.flatpickr !== 'function') {
                document.querySelectorAll('.date-picker').forEach(function(input) { input.type = 'date'; });
                document.querySelectorAll('.date-time-picker').forEach(function(input) { input.type = 'datetime-local'; });
                return;
            }

            var locale = I18n.currentLang === 'en' ? 'default' : 'zh';

            flatpickr('.date-picker', {
                locale: locale,
                dateFormat: 'Y-m-d',
                allowInput: false,
                clickOpens: true,
                theme: 'material_blue'
            });

            flatpickr('.date-time-picker', {
                locale: locale,
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
            document.getElementById('themeToggle').addEventListener('click', function() { UIManager.toggleTheme(); });

            document.getElementById('languageToggle').addEventListener('click', function() { I18n.toggleLanguage(); });

            // 移动端标签页
            document.querySelectorAll('.tab-btn').forEach(function(btn) {
                btn.addEventListener('click', function() { UIManager.showMobileTab(btn.dataset.tab); });
            });

            // 新建规划
            document.getElementById('addProjectBtn').addEventListener('click', function() { UIManager.showProjectModal(); });

            // 规划表单
            document.getElementById('cancelProjectBtn').addEventListener('click', function() {
                document.getElementById('projectModal').classList.remove('show');
            });

            document.getElementById('projectForm').addEventListener('submit', function(e) {
                e.preventDefault();
                var id = document.getElementById('projectId').value;
                var project = {
                    name: document.getElementById('projectName').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    color: document.getElementById('projectColor').value,
                    remark: document.getElementById('projectRemark').value
                };

                if (id) {
                    project.id = id;
                    var data = DataManager.load();
                    var existing = data.projects.find(function(p) { return p.id === id; });
                    project.nodes = existing ? existing.nodes : [];
                    DataManager.updateProject(project);
                } else {
                    DataManager.addProject(project);
                }

                document.getElementById('projectModal').classList.remove('show');
                UIManager.renderProjects();
            });

            // 节点表单
            document.getElementById('cancelNodeBtn').addEventListener('click', function() {
                document.getElementById('nodeModal').classList.remove('show');
            });

            document.getElementById('nodeForm').addEventListener('submit', function(e) {
                e.preventDefault();
                var nodeId = document.getElementById('nodeId').value;
                var projectId = document.getElementById('nodeProjectId').value;
                var node = {
                    placeName: document.getElementById('placeName').value,
                    latitude: parseFloat(document.getElementById('latitude').value),
                    longitude: parseFloat(document.getElementById('longitude').value),
                    plannedTime: document.getElementById('nodeTime').value,
                    color: document.getElementById('nodeColor').value,
                    remark: document.getElementById('nodeRemark').value
                };

                if (nodeId) {
                    node.id = nodeId;
                    var data = DataManager.load();
                    var project = data.projects.find(function(p) { return p.id === projectId; });
                    if (project) {
                        var existingNode = project.nodes.find(function(n) { return n.id === nodeId; });
                        node.order = existingNode ? existingNode.order : 1;
                        node.color = node.color || (existingNode ? existingNode.color : null) || project.color || '#007AFF';
                    }
                    DataManager.updateNode(projectId, node);
                } else {
                    DataManager.addNode(projectId, node);
                }

                document.getElementById('nodeModal').classList.remove('show');
                UIManager.renderProjects();

                var data2 = DataManager.load();
                var project2 = data2.projects.find(function(p) { return p.id === projectId; });
                if (project2) MapManager.showProject(project2);
            });

            // 确认删除
            document.getElementById('confirmOkBtn').addEventListener('click', function() {
                document.getElementById('confirmModal').classList.remove('show');
                if (UIManager.deleteCallback) {
                    UIManager.deleteCallback();
                    UIManager.deleteCallback = null;
                }
            });

            document.getElementById('confirmCancelBtn').addEventListener('click', function() {
                document.getElementById('confirmModal').classList.remove('show');
                UIManager.deleteCallback = null;
            });

            // 导出
            document.getElementById('exportBtn').addEventListener('click', function() {
                var data = DataManager.exportData();
                var blob = new Blob([data], { type: 'application/json' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'heart_river_data.json';
                a.click();
                URL.revokeObjectURL(url);
            });

            // 导入
            document.getElementById('importBtn').addEventListener('click', function() {
                document.getElementById('importModal').classList.add('show');
            });

            document.getElementById('cancelImportBtn').addEventListener('click', function() {
                document.getElementById('importModal').classList.remove('show');
            });

            document.getElementById('doImportBtn').addEventListener('click', function() {
                var text = document.getElementById('importText').value;
                var merge = document.getElementById('mergeData').checked;
                try {
                    JSON.parse(text);
                    DataManager.importData(text, merge);
                    document.getElementById('importModal').classList.remove('show');
                    document.getElementById('importText').value = '';
                    UIManager.renderProjects();
                    MapManager.showProject(null);
                } catch (e) {
                    alert(t('invalidJson'));
                }
            });

            // 地图点击
            if (MapManager.map) {
                MapManager.map.on('click', function(e) {
                    var lat = e.latlng.lat;
                    var lng = e.latlng.lng;

                    if (UIManager.currentMode === 'recommend') {
                        MapManager.showClickMarker(lat, lng, '#FF6B6B');
                    } else {
                        if (UIManager.activeProjectId) {
                            var data = DataManager.load();
                            var project = data.projects.find(function(p) { return p.id === UIManager.activeProjectId; });
                            var defaultColor = project ? (project.color || '#007AFF') : '#007AFF';
                            MapManager.showClickMarker(lat, lng, defaultColor);
                        } else {
                            MapManager.showClickMarker(lat, lng, '#007AFF');
                        }
                    }
                });
            }

            // 悬浮按钮
            document.getElementById('addNodeBtn').addEventListener('click', function() {
                if (UIManager.currentMode === 'recommend') {
                    var anchor = MapManager.lastSearchLocation || MapManager.lastClickLocation;
                    if (anchor && Number.isFinite(anchor.lat) && Number.isFinite(anchor.lng)) {
                        App.showRecommendModalWithLocation(anchor.lat, anchor.lng, anchor.name || t('selectedLocation'), anchor);
                        return;
                    }
                    UIManager.showRecommendModal();
                } else {
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

            // 模式切换
            document.querySelectorAll('.js-mode-toggle').forEach(function(btn) {
                btn.addEventListener('click', function() { UIManager.toggleMode(); });
            });

            // 地图搜索
            var mapSearchInput = document.getElementById('mapSearchInput');
            var mapSearchResults = document.getElementById('mapSearchResults');
            var searchTimeout;

            mapSearchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(async function() {
                    var query = mapSearchInput.value;
                    if (query.length < 1) {
                        mapSearchResults.classList.remove('show');
                        return;
                    }
                    var results = await MapManager.searchPlace(query);
                    if (results.length > 0) {
                        mapSearchResults.innerHTML = results.map(function(r, index) {
                            return '<div class="result-item" data-index="' + index + '" data-lat="' + r.lat + '" data-lon="' + r.lon + '">' +
                                '<div class="result-main">' + (r.mainName || r.name.split(',')[0]) + '</div>' +
                                '<div class="result-detail">' + (r.subInfo || r.name.split(',').slice(1, 3).join(', ')) + '</div></div>';
                        }).join('');
                        mapSearchResults.classList.add('show');

                        mapSearchResults.querySelectorAll('.result-item').forEach(function(item) {
                            item.addEventListener('click', function() {
                                var index = parseInt(item.dataset.index, 10);
                                var lat = parseFloat(item.dataset.lat);
                                var lon = parseFloat(item.dataset.lon);
                                var name = item.querySelector('.result-main').textContent;
                                var result = Number.isInteger(index) ? results[index] : null;
                                MapManager.focusSearchResult(result || { lat: lat, lon: lon });
                                MapManager.showSearchMarker(lat, lon, name, result || {});
                                mapSearchResults.classList.remove('show');
                            });
                        });
                    } else {
                        mapSearchResults.classList.remove('show');
                    }
                }, 300);
            });

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.map-search')) {
                    mapSearchResults.classList.remove('show');
                }
            });

            // 定位按钮
            document.getElementById('locationBtn').addEventListener('click', function() {
                if (!MapManager.map) {
                    alert(t('mapUnavailable'));
                    return;
                }
                MapManager.getCurrentLocation();
            });

            // 节点搜索
            var nodeSearchBtn = document.getElementById('nodeSearchBtn');
            var nodePlaceNameInput = document.getElementById('placeName');
            var nodeSearchResults = document.getElementById('nodeSearchResults');
            var nodeSearchTimeout;

            nodeSearchBtn.addEventListener('click', function() { performNodeSearch(); });

            nodePlaceNameInput.addEventListener('input', function() {
                clearTimeout(nodeSearchTimeout);
                nodeSearchTimeout = setTimeout(function() {
                    var query = nodePlaceNameInput.value;
                    if (query.length >= 1) performNodeSearch();
                }, 300);
            });

            async function performNodeSearch() {
                var query = nodePlaceNameInput.value;
                if (!query || query.length < 1) {
                    nodeSearchResults.classList.remove('show');
                    return;
                }
                var results = await MapManager.searchPlace(query);
                if (results.length > 0) {
                    nodeSearchResults.innerHTML = results.map(function(r) {
                        return '<div class="result-item" data-name="' + (r.mainName || r.name.split(',')[0]) + '" data-lat="' + r.lat + '" data-lon="' + r.lon + '">' +
                            '<div class="result-main">' + (r.mainName || r.name.split(',')[0]) + '</div>' +
                            '<div class="result-detail">' + (r.subInfo || r.name.split(',').slice(1, 3).join(', ')) + '</div></div>';
                    }).join('');
                    nodeSearchResults.classList.add('show');

                    nodeSearchResults.querySelectorAll('.result-item').forEach(function(item) {
                        item.addEventListener('click', function() {
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

            // 颜色选择器预览
            document.getElementById('projectColor').addEventListener('input', function(e) {
                document.getElementById('projectColorPreview').textContent = e.target.value;
            });

            document.getElementById('nodeColor').addEventListener('input', function(e) {
                document.getElementById('nodeColorPreview').textContent = e.target.value;
            });

            document.getElementById('recommendColor').addEventListener('input', function(e) {
                document.getElementById('recommendColorPreview').textContent = e.target.value;
            });

            // 种草表单
            document.getElementById('cancelRecommendBtn').addEventListener('click', function() {
                document.getElementById('recommendModal').classList.remove('show');
                MapManager.clearLocationMarker();
            });

            document.getElementById('recommendForm').addEventListener('submit', function(e) {
                e.preventDefault();
                var form = e.currentTarget;
                var id = document.getElementById('recommendId').value;
                var nameInput = document.getElementById('recommendName').value;
                var cityInput = document.getElementById('recommendCity').value;
                var recommendation = {
                    name: nameInput || cityInput || t('unnamed'),
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
                if (UIManager.currentMode === 'recommend') MapManager.showRecommendations();
            });

            // 全局按钮委托
            document.addEventListener('click', function(e) {
                // 节点编辑
                if (e.target.classList.contains('popup-edit-btn') && e.target.dataset.nodeId && e.target.dataset.projectId) {
                    var nodeId = e.target.dataset.nodeId;
                    var projectId = e.target.dataset.projectId;
                    var data = DataManager.load();
                    var project = data.projects.find(function(p) { return p.id === projectId; });
                    var node = project ? project.nodes.find(function(n) { return n.id === nodeId; }) : null;
                    if (node) App.showNodeModal(projectId, node);
                }

                // 节点/种草删除
                if (e.target.classList.contains('popup-delete-btn')) {
                    if (e.target.dataset.recommendId) {
                        var recommendId = e.target.dataset.recommendId;
                        if (confirm(t('confirmDeleteWishlist'))) {
                            DataManager.deleteRecommendation(recommendId);
                            UIManager.renderRecommendations();
                            MapManager.showRecommendations();
                        }
                    } else if (e.target.dataset.nodeId && e.target.dataset.projectId) {
                        var nodeId2 = e.target.dataset.nodeId;
                        var projectId2 = e.target.dataset.projectId;
                        if (confirm(t('confirmDeleteNode'))) {
                            DataManager.deleteNode(projectId2, nodeId2);
                            UIManager.renderProjects();
                            var data2 = DataManager.load();
                            var project2 = data2.projects.find(function(p) { return p.id === projectId2; });
                            if (project2) MapManager.showProject(project2);
                        }
                    }
                }

                // 种草编辑
                if (e.target.classList.contains('popup-edit-btn') && e.target.dataset.recommendId) {
                    var recId = e.target.dataset.recommendId;
                    var recs = DataManager.getAllRecommendations();
                    var item = recs.find(function(r) { return r.id === recId; });
                    if (item) App.showRecommendModal(item);
                }

                // 种草完成切换
                if (e.target.classList.contains('popup-complete-btn') && e.target.dataset.recommendId) {
                    var recId2 = e.target.dataset.recommendId;
                    var recs2 = DataManager.getAllRecommendations();
                    var item2 = recs2.find(function(r) { return r.id === recId2; });
                    if (item2) {
                        item2.completed = !item2.completed;
                        DataManager.updateRecommendation(item2);
                        UIManager.renderRecommendations();
                        MapManager.showRecommendations();
                    }
                }

                // 搜索标记添加节点
                if (e.target.classList.contains('search-marker-node-btn')) {
                    var lat2 = parseFloat(e.target.dataset.lat);
                    var lng2 = parseFloat(e.target.dataset.lng);
                    var name2 = e.target.dataset.name || '';
                    if (UIManager.activeProjectId) {
                        App.showNodeModalWithLocation(UIManager.activeProjectId, lat2, lng2, name2);
                    } else {
                        alert(t('selectPlanFirst'));
                    }
                }

                // 搜索标记添加种草
                if (e.target.classList.contains('search-marker-recommend-btn')) {
                    var lat3 = parseFloat(e.target.dataset.lat);
                    var lng3 = parseFloat(e.target.dataset.lng);
                    var name3 = e.target.dataset.name || '';
                    App.showRecommendModalWithLocation(lat3, lng3, name3, MapManager.lastSearchLocation || {});
                }
            });
        },

        // ========== 公开方法 ==========

        showNodeModal: function(projectId, node) {
            UIManager.showNodeModal(projectId, node);
        },

        showRecommendModal: function(recommendation) {
            UIManager.showRecommendModal(recommendation);
        },

        showRecommendModalWithLocation: function(lat, lng, name, options) {
            options = options || {};
            UIManager.showRecommendModal();
            document.getElementById('recommendName').value = name || '';
            document.getElementById('recommendLat').value = lat.toFixed(4);
            document.getElementById('recommendLng').value = lng.toFixed(4);
            var form = document.getElementById('recommendForm');
            document.getElementById('recommendCity').value = options.city || '';
            document.getElementById('recommendName').placeholder = options.city || '';

            var applyBoundary = function(boundaryGeoJson, cityName) {
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
                .then(function() { return options.areaName ? MapManager.fetchBoundaryByName(options.areaName) : null; })
                .then(function(areaBoundary) {
                    if (areaBoundary) { applyBoundary(areaBoundary, options.city || options.areaName || ''); return null; }
                    return options.city ? MapManager.fetchBoundaryByName(options.city) : null;
                })
                .then(function(cityBoundary) {
                    if (cityBoundary) { applyBoundary(cityBoundary, options.city || ''); return null; }
                    return MapManager.getAreaFromCoords(lat, lng);
                })
                .then(function(areaInfo) {
                    if (areaInfo) applyBoundary(areaInfo.boundaryGeoJson, areaInfo.city);
                });
        },

        showNodeModalWithLocation: function(projectId, lat, lng, name) {
            var form = document.getElementById('nodeForm');
            form.reset();
            document.getElementById('nodeId').value = '';
            document.getElementById('nodeProjectId').value = projectId;
            document.getElementById('nodeModalTitle').textContent = t('addNode');
            document.getElementById('placeName').value = name || '';
            document.getElementById('latitude').value = lat.toFixed(4);
            document.getElementById('longitude').value = lng.toFixed(4);

            var data = DataManager.load();
            var project = data.projects.find(function(p) { return p.id === projectId; });
            var defaultColor = project ? (project.color || '#007AFF') : '#007AFF';
            document.getElementById('nodeColor').value = defaultColor;
            document.getElementById('nodeColorPreview').textContent = defaultColor;

            document.getElementById('nodeModal').classList.add('show');
        }
    };

    // MapManager.showClickMarker 需要覆盖
    MapManager.showClickMarker = function(lat, lng, color) {
        this.lastClickLocation = { lat: lat, lng: lng, color: color, name: t('selectedLocation') };
        this.showSearchMarker(lat, lng, t('selectedLocation'), {});
    };

    window.App = App;

    document.addEventListener('DOMContentLoaded', function() {
        App.init();
    });
})();