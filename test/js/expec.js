(function() {
  describe('Jasmine its Ok', function() {
    return it('True is True', function() {
      return expect(true).toBe(true);
    });
  });

  describe('basicDAO tester', function() {
    beforeEach(function() {
      var FakeDriver, FakeSingleClassModel;
      FakeDriver = (function() {
        function FakeDriver() {}

        FakeDriver.db = {};

        FakeDriver.prototype.open = function(table, callback) {
          this.table = table;
          if (this.db[this.table] == null) {
            this.db[this.table] = [];
          }
          return callback();
        };

        FakeDriver.prototype.close = function(callback) {
          return callback();
        };

        FakeDriver.prototype.get = function(id, callback) {
          return callback(this.db[this.table][id]);
        };

        FakeDriver.prototype.set = function(id, value, callback) {
          this.db[this.table][id] = value;
          return callback({
            id: id,
            value: value
          });
        };

        FakeDriver.prototype.nextId = function() {
          if (this.table != null) {
            return this.db[this.table].length;
          } else {
            return 0;
          }
        };

        FakeDriver.prototype.toString = function() {
          return '[Object FakeDriver]';
        };

        return FakeDriver;

      })();
      FakeSingleClassModel = (function() {
        FakeSingleClassModel.name = '';

        function FakeSingleClassModel(name) {
          this.dao = new BaseDAO();
          this.dao.open('FakeDriver', 'faketable');
          if (name) {
            this.name = name;
          }
        }

        FakeSingleClassModel.prototype.setName = function(newName) {
          return this.name = newName;
        };

        FakeSingleClassModel.prototype.getName = function() {
          return this.name;
        };

        FakeSingleClassModel.prototype.save = function(callback) {
          return this.dao.setValue(this, (function(_this) {
            return function(objSaved) {
              _this.id = objSaved.id;
              return callback(_this.id);
            };
          })(this));
        };

        FakeSingleClassModel.prototype.recover = function(id, callback) {
          return this.dao.getValue({
            id: id
          }, (function(_this) {
            return function(objRecover) {
              _this.name = objRecover.name;
              return callback(_this.name);
            };
          })(this));
        };

        return FakeSingleClassModel;

      })();
      window.FakeDriver = FakeDriver;
      return window.FakeSingleClassModel = FakeSingleClassModel;
    });
    it("baseDAO can make Instance of a generic Driver", function() {
      var basicDAOObjectToTest;
      basicDAOObjectToTest = new BaseDAO();
      basicDAOObjectToTest.open('FakeDriver', 'notable');
      return expect(basicDAOObjectToTest.driver.toString()).toEqual('[Object FakeDriver]');
    });
    return it("save and recover single data", function() {
      var anything, myName, newid;
      myName = "Devaneios Sóbrios";
      newid = -1;
      anything = new FakeSingleClassModel(myName);
      return anything.save(function(id) {
        newid = id;
        return anything.recover(newid, function(name) {
          return expect(name).toEqual(myName);
        });
      });
    });
  });

}).call(this);
