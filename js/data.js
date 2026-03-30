// DataManager - 数据管理模块
(function(global) {
    'use strict';

    const DataManager = {
        STORAGE_KEY: 'heart_river_data',

        normalizeData(data) {
            const normalized = (data && typeof data === 'object') ? data : {};
            return {
                projects: Array.isArray(normalized.projects) ? normalized.projects : [],
                recommendations: Array.isArray(normalized.recommendations) ? normalized.recommendations : []
            };
        },

        load() {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                return this.normalizeData(JSON.parse(data));
            }
            return this.normalizeData();
        },

        save(data) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.normalizeData(data)));
        },

        generateId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        // ========== 项目（规划） ==========

        addProject(project) {
            const data = this.load();
            project.id = this.generateId();
            project.nodes = [];
            project.color = project.color || '#007AFF';
            data.projects.push(project);
            this.save(data);
            return project;
        },

        updateProject(project) {
            const data = this.load();
            const index = data.projects.findIndex(function(p) { return p.id === project.id; });
            if (index !== -1) {
                data.projects[index] = project;
                this.save(data);
            }
            return project;
        },

        deleteProject(projectId) {
            const data = this.load();
            data.projects = data.projects.filter(function(p) { return p.id !== projectId; });
            this.save(data);
        },

        // ========== 节点 ==========

        addNode(projectId, node) {
            const data = this.load();
            const project = data.projects.find(function(p) { return p.id === projectId; });
            if (project) {
                node.id = this.generateId();
                node.order = project.nodes.length + 1;
                if (!node.color) {
                    node.color = project.color || '#007AFF';
                }
                project.nodes.push(node);
                this.save(data);
                return node;
            }
            return null;
        },

        updateNode(projectId, node) {
            const data = this.load();
            const project = data.projects.find(function(p) { return p.id === projectId; });
            if (project) {
                const index = project.nodes.findIndex(function(n) { return n.id === node.id; });
                if (index !== -1) {
                    project.nodes[index] = node;
                    this.save(data);
                }
                return node;
            }
            return null;
        },

        deleteNode(projectId, nodeId) {
            const data = this.load();
            const project = data.projects.find(function(p) { return p.id === projectId; });
            if (project) {
                project.nodes = project.nodes.filter(function(n) { return n.id !== nodeId; });
                project.nodes.forEach(function(n, i) { n.order = i + 1; });
                this.save(data);
            }
        },

        // ========== 种草 ==========

        addRecommendation(recommendation) {
            const data = this.load();
            recommendation.id = this.generateId();
            recommendation.createdAt = new Date().toISOString();
            data.recommendations.push(recommendation);
            this.save(data);
            return recommendation;
        },

        updateRecommendation(recommendation) {
            const data = this.load();
            const index = data.recommendations.findIndex(function(r) { return r.id === recommendation.id; });
            if (index !== -1) {
                data.recommendations[index] = recommendation;
                this.save(data);
            }
            return recommendation;
        },

        deleteRecommendation(recommendationId) {
            const data = this.load();
            data.recommendations = data.recommendations.filter(function(r) { return r.id !== recommendationId; });
            this.save(data);
        },

        getAllRecommendations() {
            const data = this.load();
            return data.recommendations || [];
        },

        getRecommendationsByCity() {
            const data = this.load();
            const recommendations = data.recommendations || [];
            const grouped = {};
            const t = global.t;
            recommendations.forEach(function(r) {
                const city = r.city || (typeof t === 'function' ? t('unknownCity') : '未知城市');
                if (!grouped[city]) {
                    grouped[city] = [];
                }
                grouped[city].push(r);
            });
            return grouped;
        },

        // ========== 导入导出 ==========

        importData(jsonData, merge) {
            const currentData = this.load();
            const imported = this.normalizeData(JSON.parse(jsonData));
            let nextData;

            if (merge && imported.projects) {
                nextData = {
                    projects: currentData.projects.concat(imported.projects),
                    recommendations: currentData.recommendations.concat(imported.recommendations)
                };
            } else {
                nextData = imported;
            }

            this.save(nextData);
            return nextData;
        },

        exportData() {
            return JSON.stringify(this.load(), null, 2);
        }
    };

    global.DataManager = DataManager;
})(window);