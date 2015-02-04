(function() {
  var BaseDAO, getClassFromStr, safeCallback, safeString;

  this.typeCheck = function(obj) {
    var mapClassTypeInStr;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    mapClassTypeInStr = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    };
    return mapClassTypeInStr[Object.prototype.toString.call(obj)];
  };

  safeString = function(unsafeStr) {
    return unsafeStr.match(/\w*/);
  };

  safeCallback = function(fnCallback) {
    if ((fnCallback === void 0) || (typeCheck(fnCallback) === 'function')) {
      return fnCallback;
    } else {
      throw new TypeError("" + fnCallback + " isn't a function");
    }
  };

  getClassFromStr = function(strClassName) {
    var ClassFunction, ClassName;
    ClassName = safeString(strClassName);
    ClassFunction = new Function('', "return " + ClassName);
    return ClassFunction();
  };

  BaseDAO = (function() {
    function BaseDAO() {
      this.driver = void 0;
    }

    BaseDAO.prototype.open = function(strDriverDB, table, successCallback) {
      var driverClass, e;
      driverClass = getClassFromStr("" + strDriverDB);
      try {
        return this.driver = new driverClass(safeCallback(successCallback));
      } catch (_error) {
        e = _error;
        if (e instanceof ReferenceError) {
          console.log('Reference Error: Driver Unknown');
        }
        throw e;
      }
    };

    BaseDAO.prototype.close = function(successCallback) {
      var _ref;
      return (_ref = this.driver) != null ? _ref.close(safeCallback(successCallback)) : void 0;
    };

    BaseDAO.prototype.getValue = function(objToGet, successCallback) {
      var _ref;
      return (_ref = this.driver) != null ? _ref.getValue("" + objToGet.id, safeCallback(successCallback)) : void 0;
    };

    BaseDAO.prototype.setValue = function(objToSet, successCallback) {
      var _ref, _ref1;
      if (objToSet.id == null) {
        objToSet.id = (_ref = this.driver) != null ? _ref.nextId() : void 0;
      }
      return (_ref1 = this.driver) != null ? _ref1.setValue("" + objToSet.id, JSON.stringify(objToSet.value, safeCallback(successCallback))) : void 0;
    };

    return BaseDAO;

  })();

  window.BaseDAO = BaseDAO;

}).call(this);
