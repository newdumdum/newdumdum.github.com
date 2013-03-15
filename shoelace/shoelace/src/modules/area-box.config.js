/**
 * @author ShiChunhua
 */
application.Core.addConfig("AreaBox", {
	boxId: 'provinceBox'
	,listBoxId: 'provinceListBox'
	,subBoxId: 'cityBox'
	,subListBoxId: 'cityListBox'
	,provinceItem: '<div class="item" data-item="table" data-province="#{province}" data-boxId="provinceBox" data-boxName="省份选择" data-event="AreaBox-SelectProvince">#{province} <span class="arrow"></span></div>'
	,cityItem: '<div class="item" data-item="table" data-city="#{city}" data-boxId="cityBox" data-boxName="城市选择" data-event="AreaBox-SelectOK">#{city}</div>'
});
