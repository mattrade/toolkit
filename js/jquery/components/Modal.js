/**
 * @copyright   2010-2013, The Titon Project
 * @license     http://opensource.org/licenses/bsd-license.php
 * @link        http://titon.io
 */

(function($) {
    'use strict';

    Toolkit.Modal = Toolkit.Component.extend(function(nodes, options) {
        var element;

        this.component = 'Modal';
        this.version = '1.1.0';

        // Custom options
        this.options = options = this.setOptions(options);
        this.element = element = this.createElement();

        // List of elements to active modals
        this.nodes = nodes = $(nodes);

        // Currently active node
        this.node = null;

        // Modal body element
        this.elementBody = element.find(options.contentElement);

        // Blackout instance if options.blackout is true
        this.blackout = null;

        // Drag instance if options.draggable is true
        this.drag = null;

        // Cache requests
        this.cache = {};

        // Fullscreen
        if (options.fullScreen) {
            element.addClass(Toolkit.options.isPrefix + 'fullscreen');
            options.draggable = false;
        }

        // Draggable
        if (options.draggable && $.ui && $.ui.draggable) {
            var isPrefix = Toolkit.options.isPrefix;

            this.drag = element.draggable({
                appendTo: 'body',
                containment: 'window',
                cursor: 'grabbing',
                start: function(e, ui) {
                    ui.helper.addClass(isPrefix + 'dragging');
                },
                stop: function(e, ui) {
                    ui.helper.removeClass(isPrefix + 'dragging');
                }
            });

            element.addClass(isPrefix + 'draggable');
        }

        // Blackout
        if (options.blackout) {
            this.blackout = Toolkit.Blackout.factory();

            if (options.stopScroll) {
                this.blackout.element.on('hide.toolkit.blackout', function(e, hidden) {
                    if (hidden) {
                        $('body').css('overflow', '');
                    }
                });
            }
        }

        // Set events
        element.clickout(this.__hide.bind(this));
        nodes.clickout(this.__hide.bind(this));

        $(options.context || document)
            .on('click', nodes.selector, this.__show.bind(this));

        $(window).on('keydown', function(e) {
            if (e.keyCode === 27 /*esc*/ && element.is(':shown')) {
                this.hide();
            }
        }.bind(this));

        element
            .on('click', options.closeEvent, this.__hide.bind(this))
            .on('click', options.submitEvent, this.__submit.bind(this));

        this.fireEvent('init');
    }, {

        /**
         * Hide the modal and reset relevant values.
         */
        hide: function() {
            this.element.conceal();

            if (this.blackout) {
                this.blackout.hide();
            }

            this.fireEvent('hide');
        },

        /**
         * Position the modal in the center of the screen.
         *
         * @param {String|jQuery} content
         */
        position: function(content) {
            // AJAX is currently loading
            if (content === true) {
                return;
            }

            this.elementBody.html(content);
            this.fireEvent('load', content);

            // Hide blackout loading message
            if (this.blackout) {
                this.blackout.hideLoader();
            }

            // Reveal modal
            this.element.reveal();

            // Resize modal
            if (this.options.fullScreen) {
                this.element.find(this.options.contentElement)
                    .css('min-height', $(window).height());
            }

            this.fireEvent('show');
        },

        /**
         * Show the modal with the specific content.
         * If a node is passed, grab the modal AJAX URL or target element.
         * If content is passed, display it immediately.
         *
         * @param {jQuery} node
         * @param {String} [content]
         */
        show: function(node, content) {
            node = $(node);

            var options = this.options,
                ajax = options.ajax;

            // Get content
            if (content) {
                ajax = false;

            } else if (node) {
                content = this.readValue(node, options.getContent) || node.attr('href');

                if (content && content.match(/^#[a-z0-9_\-\.:]+$/i)) {
                    content = $(content).html();
                    ajax = false;
                }
            }

            if (!content) {
                return;
            }

            this.node = node;

            // Show blackout
            if (this.blackout) {
                this.blackout.show();
            }

            if (options.stopScroll) {
                $('body').css('overflow', 'hidden');
            }

            if (ajax) {
                if (this.cache[content]) {
                    this.position(this.cache[content]);
                } else {
                    this.requestData(content);
                }
            } else {
                this.position(content);
            }
        },

        /**
         * Event handler for hide().
         *
         * @private
         * @param {jQuery.Event} e
         */
        __hide: function(e) {
            e.preventDefault();

            this.hide();
        },

        /**
         * Event handler for show().
         *
         * @private
         * @param {jQuery.Event} e
         */
        __show: function(e) {
            e.preventDefault();

            if (this.enabled) {
                this.show(e.currentTarget);
            }
        },

        /**
         * Submit the form within the modal if it exists and re-render the modal with the response.
         *
         * @private
         * @param {jQuery.Event} e
         */
        __submit: function(e) {
            e.preventDefault();

            var button = $(e.target),
                form = this.elementBody.find('form:first');

            if (!form) {
                return;
            }

            this.fireEvent('submit', [button, form]);

            var options = {
                url: form.attr('action'),
                type: (form.attr('method') || 'post').toUpperCase()
            };

            if (window.FormData) {
                options.processData = false;
                options.contentType = false;
                options.data = new FormData(form[0]);
            } else {
                options.data = form.serialize();
            }

            this.requestData(options);
        }

    }, {
        animation: 'fade',
        className: '',
        context: null,
        ajax: true,
        draggable: false,
        blackout: true,
        fullScreen: false,
        stopScroll: true,
        getContent: 'data-modal',
        contentElement: '.modal-inner',
        closeElement: '.modal-close',
        closeEvent: '.modal-event-close',
        submitEvent: '.modal-event-submit',
        template: '<div class="modal">' +
            '<div class="modal-handle">' +
                '<div class="modal-inner"></div>' +
                '<a href="javascript:;" class="modal-close modal-event-close"><span class="x"></span></a>' +
            '</div>' +
        '</div>'
    });

    /**
     * Defines a component that can be instantiated through modal().
     */
    Toolkit.createComponent('modal', function(options) {
        return new Toolkit.Modal(this, options);
    }, true);

})(jQuery);