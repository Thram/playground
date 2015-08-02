/**
 * Created by thram on 1/08/15.
 */
(function () {
    if (window.$t) {
        $t.registerAddOn('drawer', function (options) {
            options               = options || {};
            var _DrawerApi        = {},
                _el               = $t(this),
                _position         = options.position || 'left',
                _size             = options.size || 2,
                _type             = options.type || 'push',
                _isOpen           = options.open || false,
                _triggerEl        = options.trigger || $t('.handle'),
                _drawerSize       = '',
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
                return _DrawerApi;
            };

            _DrawerApi.close = function () {
                _container.removeClass(_containerClasses);
                _el.removeClass('open');
                return _DrawerApi;
            };
            $t.ready()(function () {
                _el.addClass('alive');
            });

            _DrawerApi.toggle = function () {
                _el.is(':visible') ? _DrawerApi.close() : _DrawerApi.open();
                return _DrawerApi;
            };

            if (_triggerEl) {
                _triggerEl.on('click touchstart', _DrawerApi.toggle);
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