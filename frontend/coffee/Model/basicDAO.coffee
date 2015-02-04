#basead in http://coffeescriptcookbook.com/chapters/classes_and_objects/type-function
@typeCheck = (obj) ->
	if obj == undefined or obj == null
		return String obj
	mapClassTypeInStr = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regexp',
		'[object Object]': 'object'
	}
	mapClassTypeInStr[Object.prototype.toString.call(obj)]

safeString = (unsafeStr) ->
	unsafeStr.match /\w*/

safeCallback = (fnCallback) ->
	if (fnCallback == undefined) or (typeCheck(fnCallback) is 'function')
		return fnCallback
	else
		throw new TypeError "#{fnCallback} isn't a function"

getClassFromStr = (strClassName) ->
	ClassName = safeString strClassName
	ClassFunction = new Function '', "return #{ClassName}"
	ClassFunction()

class BaseDAO
	constructor: ->
		@driver = undefined

	open: (strDriverDB, table, successCallback)->
		driverClass = getClassFromStr "#{strDriverDB}"
		try
			@driver = new driverClass safeCallback successCallback
		catch e
			if e instanceof ReferenceError
				console.log 'Reference Error: Driver Unknown'
			throw e
		
	close: (successCallback)->
		@driver?.close safeCallback successCallback

	getValue: (objToGet, successCallback)->
		@driver?.getValue "#{objToGet.id}", safeCallback successCallback

	setValue: (objToSet, successCallback)->
		objToSet.id ?= @driver?.nextId()
		@driver?.setValue "#{objToSet.id}", JSON.stringify objToSet.value, safeCallback successCallback

#publishing class
window.BaseDAO = BaseDAO
