// UIManager - UI管理模块
(function(global) {
    'use strict';

    var UIManager = {
        currentTab: 'map',
        activeProjectId: null,
        currentMode: 'recommend',
        deleteCallback: null,

        initResponsive() {
            var width = window.innerWidth;
            if (width < 768) {
                document.getElementById('app').classList.add('app-mobile');
                this.showMobileTab('map');
            } else {
                document.getElementById('app').classList.remove('app-mobile');
            }
        },

        showMobileTab(tab) {
            this.currentTab = tab;
            var mapContainer = document.getElementById('mapContainer');
            var sidebar = document.getElementById('sidebar');
            var recommendSidebar = document.getElementById('recommendSidebar');

            document.querySelectorAll('.tab-btn').forEach(function(btn) {
                btn.classList.toggle('active', btn.dataset.tab === tab);
            });

            if (tab === 'map') {
                mapContainer.classList.add('show');
                mapContainer.style.display = 'block';
                sidebar.classList.remove('show');
                sidebar.style.display = 'none';
                recommendSidebar.classList.remove('show');
                recommendSidebar.style.display = 'none';
                var mapInst = global.MapManager && global.MapManager.map;
                if (mapInst) setTimeout(function() { mapInst.invalidateSize(); }, 100);
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

        toggleMode() {
            this.currentMode = this.currentMode === 'plan' ? 'recommend' : 'plan';
            var buttons = document.querySelectorAll('.js-mode-toggle');
            var texts = document.querySelectorAll('.js-mode-text');
            var sidebar = document.getElementById('sidebar');
            var recommendSidebar = document.getElementById('recommendSidebar');
            var width = window.innerWidth;

            if (this.currentMode === 'recommend') {
                buttons.forEach(function(btn) { btn.classList.add('active'); });
                texts.forEach(function(text) { text.textContent = t('modeWishlist'); });
                document.getElementById('addNodeBtn').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
                document.getElementById('addNodeBtn').title = t('addWishlist');
                if (global.MapManager && global.MapManager.showRecommendations) {
                    global.MapManager.showRecommendations({ fitBounds: true });
                }
                if (width >= 768) {
                    sidebar.style.display = 'none';
                    recommendSidebar.style.display = 'flex';
                    this.renderRecommendations();
                }
            } else {
                buttons.forEach(function(btn) { btn.classList.remove('active'); });
                texts.forEach(function(text) { text.textContent = t('modePlan'); });
                document.getElementById('addNodeBtn').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>';
                document.getElementById('addNodeBtn').title = t('addNode');
                if (this.activeProjectId && global.DataManager) {
                    var data = global.DataManager.load();
                    var project = data.projects.find(function(p) { return p.id === this.activeProjectId; }.bind(this));
                    if (project && global.MapManager) {
                        global.MapManager.showProject(project);
                    }
                }
                if (width >= 768) {
                    recommendSidebar.style.display = 'none';
                    sidebar.style.display = 'flex';
                }
            }
        },

        renderRecommendations() {
            if (!global.DataManager) return;
            var grouped = global.DataManager.getRecommendationsByCity();
            var container = document.getElementById('recommendationsList');
            var self = this;

            if (Object.keys(grouped).length === 0) {
                container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><p>' + t('emptyWishlist') + '</p></div>';
                return;
            }

            container.innerHTML = Object.keys(grouped).map(function(city) {
                var items = grouped[city];
                return '<div class="city-group">' +
                    '<div class="city-group-header"><span class="city-group-title">' + city + '</span><span class="city-group-count">' + t('itemCount', { count: items.length }) + '</span></div>' +
                    items.map(function(item) {
                        return '<div class="recommend-item" data-id="' + item.id + '">' +
                            '<span class="recommend-color-dot" style="background:' + item.color + '"></span>' +
                            '<div class="recommend-info"><div class="recommend-name">' + item.name + '</div>' +
                            (item.plannedTime ? '<div class="recommend-time">' + item.plannedTime + '</div>' : '') +
                            '</div><div class="recommend-actions">' +
                            '<button class="toggle-recommend-status-btn ' + (item.completed ? 'is-completed' : 'is-pending') + '" title="' + (item.completed ? t('unmarkDone') : t('markDone')) + '" aria-label="' + (item.completed ? t('unmarkDone') : t('markDone')) + '"><span class="status-icon">' + (item.completed ? '&#10003;' : '!') + '</span></button>' +
                            '<button class="edit-recommend-btn" title="' + t('edit') + '"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>' +
                            '<button class="delete-recommend-btn" title="' + t('deleteItem') + '"><svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>' +
                            '</div></div>';
                    }).join('') +
                    '</div>';
            }).join('');

            var app = global.App;
            container.querySelectorAll('.toggle-recommend-status-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var id = e.target.closest('.recommend-item').dataset.id;
                    var recommendations = global.DataManager.getAllRecommendations();
                    var item = recommendations.find(function(r) { return r.id === id; });
                    if (item) {
                        item.completed = !item.completed;
                        global.DataManager.updateRecommendation(item);
                        self.renderRecommendations();
                        if (global.MapManager && global.MapManager.showRecommendations) global.MapManager.showRecommendations();
                    }
                });
            });

            container.querySelectorAll('.edit-recommend-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var id = e.target.closest('.recommend-item').dataset.id;
                    var recommendations = global.DataManager.getAllRecommendations();
                    var item = recommendations.find(function(r) { return r.id === id; });
                    if (item && app) app.showRecommendModal(item);
                });
            });

            container.querySelectorAll('.delete-recommend-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var id = e.target.closest('.recommend-item').dataset.id;
                    if (confirm(t('confirmDeleteWishlist'))) {
                        global.DataManager.deleteRecommendation(id);
                        self.renderRecommendations();
                        if (global.MapManager && global.MapManager.showRecommendations) global.MapManager.showRecommendations();
                    }
                });
            });
        },

        showRecommendModal(recommendation) {
            recommendation = recommendation || null;
            var modal = document.getElementById('recommendModal');
            var form = document.getElementById('recommendForm');
            var title = document.getElementById('recommendModalTitle');

            form.reset();
            form.dataset.boundaryGeoJson = '';
            form.dataset.boundaryMode = 'prefecture';
            document.getElementById('recommendId').value = '';
            document.getElementById('recommendLat').value = '';
            document.getElementById('recommendLng').value = '';

            if (recommendation) {
                title.textContent = t('editWishlist');
                document.getElementById('recommendId').value = recommendation.id;
                document.getElementById('recommendName').value = recommendation.name || '';
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

        renderProjects() {
            if (!global.DataManager) return;
            var data = global.DataManager.load();
            var container = document.getElementById('projectsList');
            var self = this;

            if (data.projects.length === 0) {
                container.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"/></svg><p>' + t('emptyPlans') + '</p></div>';
                return;
            }

            container.innerHTML = data.projects.map(function(project) {
                var projectColor = project.color || '#007AFF';
                return '<div class="project-card ' + (self.activeProjectId === project.id ? 'active' : '') + '" data-id="' + project.id + '">' +
                    '<div class="project-card-header">' +
                    '<span class="project-card-title"><span class="project-color-dot" style="background:' + projectColor + '"></span>' + project.name + '</span>' +
                    '<div class="project-card-actions">' +
                    '<button class="edit-btn" title="' + t('edit') + '"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>' +
                    '<button class="delete-btn" title="' + t('deleteItem') + '"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>' +
                    '</div></div>' +
                    '<div class="project-card-info">' + (project.startDate || '') + (project.endDate ? ' ~ ' + project.endDate : '') + (project.remark ? ' · ' + project.remark : '') + '</div>' +
                    '<div class="project-card-nodes">' + t('nodeCount', { count: project.nodes.length }) + '</div>' +
                    (project.nodes.length > 0 ? '<div class="nodes-list">' +
                        project.nodes.slice(0, 3).map(function(node) {
                            var nodeColor = node.color || projectColor;
                            return '<div class="node-item" data-node-id="' + node.id + '">' +
                                '<span class="node-order" style="background:' + nodeColor + '">' + node.order + '</span>' +
                                '<div class="node-info"><div class="node-name">' + (node.placeName || t('unnamed')) + '</div>' +
                                (node.plannedTime ? '<div class="node-time">' + node.plannedTime + '</div>' : '') +
                                '</div></div>';
                        }).join('') +
                        (project.nodes.length > 3 ? '<div class="node-item" style="color: var(--text-secondary);">' + t('moreNodes', { count: project.nodes.length - 3 }) + '</div>' : '') +
                        '</div>' : '');
            }.bind(this)).join('');

            container.querySelectorAll('.project-card').forEach(function(card) {
                card.addEventListener('click', function(e) {
                    if (e.target.closest('.project-card-actions')) return;
                    self.selectProject(card.dataset.id);
                });
            });

            container.querySelectorAll('.edit-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    self.editProject(e.target.closest('.project-card').dataset.id);
                });
            });

            container.querySelectorAll('.delete-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var projectId = e.target.closest('.project-card').dataset.id;
                    self.confirmDelete(t('confirmDeletePlanForever'), function() {
                        global.DataManager.deleteProject(projectId);
                        if (self.activeProjectId === projectId) {
                            self.activeProjectId = null;
                            if (global.MapManager) global.MapManager.showProject(null);
                        }
                        self.renderProjects();
                    });
                });
            });
        },

        selectProject(projectId) {
            this.activeProjectId = projectId;
            if (!global.DataManager) return;
            var data = global.DataManager.load();
            var project = data.projects.find(function(p) { return p.id === projectId; });
            if (project) {
                if (global.MapManager) global.MapManager.showProject(project);
                this.renderProjects();
            }
        },

        showProjectModal(project) {
            project = project || null;
            var modal = document.getElementById('projectModal');
            var form = document.getElementById('projectForm');
            var title = document.getElementById('projectModalTitle');

            form.reset();
            document.getElementById('projectId').value = '';

            if (project) {
                title.textContent = t('editPlan');
                document.getElementById('projectId').value = project.id;
                document.getElementById('projectName').value = project.name || '';
                document.getElementById('startDate').value = project.startDate || '';
                document.getElementById('endDate').value = project.endDate || '';
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
            var self = this;
            setTimeout(function() {
                var startPicker = document.getElementById('startDate') && document.getElementById('startDate')._flatpickr;
                var endPicker = document.getElementById('endDate') && document.getElementById('endDate')._flatpickr;
                if (startPicker && project && project.startDate) startPicker.setDate(project.startDate);
                if (endPicker && project && project.endDate) endPicker.setDate(project.endDate);
            }, 100);
        },

        editProject(projectId) {
            if (!global.DataManager) return;
            var data = global.DataManager.load();
            var project = data.projects.find(function(p) { return p.id === projectId; });
            if (project) this.showProjectModal(project);
        },

        showNodeModal(projectId, node) {
            node = node || null;
            var modal = document.getElementById('nodeModal');
            var form = document.getElementById('nodeForm');
            var title = document.getElementById('nodeModalTitle');

            form.reset();
            document.getElementById('nodeId').value = '';
            document.getElementById('nodeProjectId').value = projectId;

            var defaultColor = '#007AFF';
            if (global.DataManager) {
                var data = global.DataManager.load();
                var project = data.projects.find(function(p) { return p.id === projectId; });
                if (project) defaultColor = project.color || '#007AFF';
            }

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

            setTimeout(function() {
                var timePicker = document.getElementById('nodeTime') && document.getElementById('nodeTime')._flatpickr;
                if (timePicker && node && node.plannedTime) timePicker.setDate(node.plannedTime);
            }, 100);
        },

        confirmDelete(message, callback) {
            document.getElementById('confirmText').textContent = message;
            document.getElementById('confirmModal').classList.add('show');
            this.deleteCallback = callback;
        },

        toggleTheme() {
            var html = document.documentElement;
            var current = html.getAttribute('data-theme');
            var newTheme = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('heart_river_theme', newTheme);
            setTimeout(function() {
                var mm = global.MapManager;
                if (mm && mm.map) mm.map.invalidateSize();
            }, 100);
        },

        initTheme() {
            var saved = localStorage.getItem('heart_river_theme');
            if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    };

    global.UIManager = UIManager;
})(window);