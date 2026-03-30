// I18n - 国际化模块
(function(global) {
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

        t(key, params) {
            const locale = this.messages[this.currentLang] || this.messages.zh;
            const fallback = this.messages.zh;
            let template = locale[key] ?? fallback[key] ?? key;
            if (params) {
                Object.entries(params).forEach(([k, v]) => {
                    template = template.replaceAll(`{${k}}`, v);
                });
            }
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

            document.querySelectorAll('[data-i18n]').forEach(function(node) {
                node.textContent = this.t(node.dataset.i18n);
            }.bind(this));

            document.querySelectorAll('[data-i18n-placeholder]').forEach(function(node) {
                node.placeholder = this.t(node.dataset.i18nPlaceholder);
            }.bind(this));

            document.querySelectorAll('[data-i18n-title]').forEach(function(node) {
                node.title = this.t(node.dataset.i18nTitle);
            }.bind(this));

            const label = document.getElementById('languageToggleLabel');
            if (label) {
                label.textContent = this.currentLang === 'zh' ? 'EN' : '中';
            }
        }
    };

    // 兼容老的 `t` 函数（需要在 I18n 之后注入）
    // 将 t 函数挂到全局
    global.t = function(key, params) {
        return I18n.t(key, params);
    };

    global.I18n = I18n;
})(window);