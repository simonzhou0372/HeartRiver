// Config - 配置模块
(function(global) {
    'use strict';

    // 地图瓦片配置
    const MapTileConfig = {
        DEFAULT: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }
        },

        get() {
            const customUrl = localStorage.getItem('heart_river_tile_url');
            const customAttribution = localStorage.getItem('heart_river_tile_attribution');
            const customSubdomains = localStorage.getItem('heart_river_tile_subdomains');

            if (!customUrl) {
                return this.DEFAULT;
            }

            return {
                url: customUrl,
                options: {
                    attribution: customAttribution || this.DEFAULT.options.attribution,
                    maxZoom: 19,
                    subdomains: customSubdomains || undefined
                }
            };
        }
    };

    global.MapTileConfig = MapTileConfig;
})(window);