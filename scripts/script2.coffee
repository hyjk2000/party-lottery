nodes =
  wrapper: $('#wrapper')
  namesPanel: $('#namesPanel')
  resetBtn: $('#reset-btn')
  clickArea: $('#click-area')
  optionsBtn: $('#options-btn')
  optionsPanel: $('#optionsPanel')
  optionsForm: $('#options-form')
  optionsBrowserChk: $('.browser-compatibility-checks')
  options_names: $('#names')
  options_checkboxes: $('.fancyChkbox')
  options_removeAfterHit: $('#removeAfterHit')
  options_stopOnDemand: $('#stopOnDemand')
  options_lightTheme: $('#lightTheme')
  options_readOutNames: $('#readOutNames')
  options_optionCancel: $('#optionCancel')
  options_optionClear: $('#optionClear')



class Config
  instance = null

  defaults =
    names: ''
    nameRemovedIndexes: []
    removeAfterHit: true
    stopOnDemand: false
    lightTheme: false
    readOutNames: false

  constructor: ->
    return instance if instance?
    instance = this

    @settings = defaults
    return unless window.localStorage?
    for k,v of defaults
      loaded = window.localStorage[k]
      continue unless loaded?
      switch typeof v
        when 'object'
          @settings[k] = loaded.split ','
        when 'boolean'
          @settings[k] = !!loaded
        else
          @settings[k] = loaded

  save: ->
    return unless window.localStorage?
    for k,v of @settings
      switch typeof v
        when 'object'
          window.localStorage[k] = v.join(',')
        when 'boolean'
          window.localStorage[k] = v + 0
        else
          window.localStorage[k] = v



class Panel
  constructor: -> throw Error 'Unimplemented'
  init: -> throw Error 'Unimplemented'
  open: -> null
  close: -> null
  save: -> null
  resize: -> null



class NamesPanel extends Panel
  instance = null

  constructor: ->
    return instance if instance?
    instance = this

    @config = new Config()
    @optionsPanel = new OptionsPanel()
    @optionsPanel.init()
    @nameCount = 0
    @running = false
    @keepRunning = true
    @daemon

    nodes.resetBtn.click =>
      return if running or !confirm('确实要复位吗？')
      this.init true

    nodes.optionsBtn.click =>
      @optionsPanel.open()

    nodes.optionsForm.submit =>
      @optionsPanel.save()
      this.init true
      @optionsPanel.close()

    nodes.options_optionCancel.click =>
      @optionsPanel.init()
      @optionsPanel.close()

    $(window).resize ->
      $('.name').each ->
        aName = $(this)
        aName.css instance.calcNameSize(aName.text().length)

  init: (clearState=false) ->
    @running = @keepRunning = false
    $('.name').remove()
    nameList = @config.settings.names.replace(/[\s\,、，]+/g, ',').split(',')
    nameList = nameList.filter (aName) -> return aName != ''
    @nameCount = nameList.length

    if clearState
      @config.settings.nameRemovedIndexes = []
      @config.save()

    for aName,i in nameList
      nameDiv = $("<div class=\"name\">#{aName}</div>")
      nameDiv.css this.calcNameSize(aName.length)
      nameDiv.addClass 'removed' if "#{i}" in @config.settings.nameRemovedIndexes
      nameDiv.appendTo nodes.namesPanel

    if @nameCount < 2
      nodes.optionsBtn.addClass 'glow'
    else
      nodes.optionsBtn.removeClass 'glow'

  calcNameSize: (nameLength) ->
    nameLength = 3 if nameLength < 3
    magicDivide = Math.ceil(Math.sqrt @nameCount)
    nameWidth = $(window).width() / magicDivide
    nameHeight = $(window).height() / magicDivide
    nameFontSize = Math.min nameWidth * 0.8 / nameLength, nameHeight * 0.8
    result =
      'width': "#{nameWidth}px"
      'height': "#{nameHeight}px"
      'line-height': "#{nameHeight}px"
      'font-size': "#{nameFontSize}px"



class OptionsPanel extends Panel
  instance = null

  constructor: ->
    return instance if instance?
    instance = this

    @config = new Config()

    nodes.options_checkboxes.click ->
      thisChkbox = $(this).children 'input[type=checkbox]'
      if thisChkbox.prop 'checked'
        thisChkbox.prop 'checked', false
        $(this).removeClass 'on'
      else
        thisChkbox.prop 'checked', true
        $(this).addClass 'on'

  init: ->
    nodes.options_names.val @config.settings.names
    nodes.options_removeAfterHit.prop 'checked', @config.settings.removeAfterHit
    nodes.options_stopOnDemand.prop 'checked', @config.settings.stopOnDemand
    nodes.options_lightTheme.prop 'checked', @config.settings.lightTheme
    nodes.options_readOutNames.prop 'checked', @config.settings.readOutNames
    nodes.options_checkboxes.each ->
      thisChkbox = $(this).children 'input[type=checkbox]'
      if thisChkbox.prop 'checked'
        $(this).addClass 'on'
      else
        $(this).removeClass 'on'

  open: ->
    nodes.wrapper.addClass 'flip'

  close: ->
    nodes.wrapper.removeClass 'flip'



namesPanel = new NamesPanel()
namesPanel.init()
