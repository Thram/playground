/**
 * Created by thram on 1/08/15.
 */
(function () {
    if (window.$t) {
        $t.registerAddOn('drawer', function (options) {
            var _DrawerApi = {};
            options        = options || {};
            if (thram.toolbox.isDOMElement(this) || this.length > 0) {
                var _el               = $t(this),
                    _position         = options.position || 'left',
                    _size             = options.size || 2,
                    _type             = options.type || 'push',
                    _isOpen           = options.open || false,
                    _triggerEl        = options.trigger || $t('.handle'),
                    _drawerSize       = '',
                    _body             = $t('body'),
                    _container        = $t('.container'),
                    _containerClasses = 'drawer-open';

                switch (_position) {
                    case 'top':
                        _drawerSize = 'height-' + _size;
                        _containerClasses += (_type === 'slide' ? '' : ' translate-y-' + _size );
                        break;
                    case 'right':
                        _drawerSize = 'width-' + _size;
                        _containerClasses += (_type === 'slide' ? '' : ' translate-x--' + _size );
                        break;
                    case 'bottom':
                        _drawerSize = 'height-' + _size;
                        _containerClasses += (_type === 'slide' ? '' : ' translate-y--' + _size );
                        break;
                    case 'left':
                    default :
                        _drawerSize = 'width-' + _size;
                        _containerClasses += (_type === 'slide' ? '' : ' translate-x-' + _size );
                }
                _el.addClass(_position + ' ' + _drawerSize + (_isOpen ? 'open' : ''));

                _DrawerApi.open = function () {
                    _el.addClass('open');
                    options.type != 'slide' && _container.addClass(_containerClasses);
                    _body.addClass('overlay-on');
                    return _DrawerApi;
                };

                _DrawerApi.close = function () {
                    _container.removeClass(_containerClasses);
                    _el.removeClass('open');
                    _body.removeClass('overlay-on');
                    return _DrawerApi;
                };
                $t.ready()(function () {
                    _el.addClass('alive');
                });

                _DrawerApi.toggle = function (ev) {
                    ev.stopPropagation();
                    _el.is(':visible') ? _DrawerApi.close() : _DrawerApi.open();
                    return _DrawerApi;
                };

                if (_triggerEl) {
                    _triggerEl.on('click touchstart', _DrawerApi.toggle);
                    var _overlay = $t('.overlay');
                    _overlay && _overlay.on('click touchstart', _DrawerApi.close);
                }
            }

            return _DrawerApi;
        });

    } else {
        throw {
            code   : 'general',
            name   : "System Error",
            message: "Error detected. Please contact the system administrator."
        }
    }
})();