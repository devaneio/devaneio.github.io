describe 'Jasmine its Ok', ->
	it 'True is True', ->
		expect(true).toBe(true)

describe 'basicDAO tester', ->

	beforeEach ->
		class FakeDriver
			@db: {}
			
			open: (@table,callback) ->
				if not @db[@table]?
					@db[@table] = []
				callback()
			
			close: (callback) ->
				callback()

			get: (id, callback) ->
				callback(@db[@table][id])
			
			set: (id, value, callback) ->
				@db[@table][id] = value
				callback {id:id, value: value}
			
			nextId: ->
				if @table?
					@db[@table].length
				else
					0

			toString: ->
				'[Object FakeDriver]'

		class FakeSingleClassModel
			@name: ''

			constructor: (name) ->
				@dao = new BaseDAO()
				@dao.open 'FakeDriver', 'faketable'

				if name
					@name = name
			
			setName: (newName) ->
				@name = newName
			
			getName: ->
				@name
			
			save:  (callback) ->
				@dao.setValue this, (objSaved) =>
					@id = objSaved.id
					callback @id

			recover: (id, callback) ->
				@dao.getValue {id: id}, (objRecover) =>
					@name = objRecover.name
					callback @name

		window.FakeDriver = FakeDriver
		window.FakeSingleClassModel = FakeSingleClassModel

	it "baseDAO can make Instance of a generic Driver", ->
		basicDAOObjectToTest = new BaseDAO()
		basicDAOObjectToTest.open('FakeDriver','notable')
		expect(basicDAOObjectToTest.driver.toString()).toEqual '[Object FakeDriver]'

	it "save and recover single data", ->
		myName = "Devaneios Sóbrios" 
		newid = -1
		anything = new FakeSingleClassModel(myName)
		anything.save (id)->
			newid=id
			anything.recover newid, (name)->
				expect(name).toEqual myName
