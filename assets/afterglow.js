/*!
 * Afterglow - A minimal HTML5 video player
 * Version 1.1.0
 * https://github.com/moay/afterglow
 */

(function(window, document) {
    'use strict';

    var afterglow = {
        // Basic initialization function
        init: function() {
            var videos = document.querySelectorAll('video.afterglow');
            for (var i = 0; i < videos.length; i++) {
                this.initVideo(videos[i]);
            }
        },

        initVideo: function(video) {
            // Create basic wrapper structure
            var wrapper = document.createElement('div');
            wrapper.className = 'afterglow-wrapper';
            video.parentNode.insertBefore(wrapper, video);
            wrapper.appendChild(video);

            // Set up basic properties
            video.controls = false; // Disable native controls
            video.setAttribute('data-afterglow-initialized', 'true');

            // Make video responsive
            this.makeResponsive(video);
        },

        makeResponsive: function(video) {
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            afterglow.init();
        });
    } else {
        afterglow.init();
    }

    // Export to global scope
    window.afterglow = afterglow;

})(window, document);
