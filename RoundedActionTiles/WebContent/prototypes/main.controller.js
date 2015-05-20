jQuery.sap.require("controls.roundedActionTile.RoundedActionTile");

sap.ui.controller("prototypes.main", {
	
	tiles : [
				{
					title : "Tile 1",
					icon : "Chart-Tree-Map",
					options : [
								{
									title : "Add",
									icon : "add",
									cssClass: "exampleClass1",
									actionTag: "Tile 1 - Action 1"
								}, {
									title : "Browse",
									icon : "search",
									actionTag: "Tile 1 - Action 2"
								}
					]
				}, {
					title : "Tile 2",
					icon : "image-viewer",
					iconColor : "#54B345",
					options : [
								{
									icon : "add",
									actionTag: "Tile 2 - Action 1"
								}, {
									icon : "search",
									actionTag: "Tile 2 - Action 2"
								}
					]
				}, {
					title : "Tile 3",
					icon : "workflow-tasks",
					cssClass: "exampleClass1",
					options : [
								{
									icon : "add",
									actionTag: "Tile 3 - Action 1"
								}, {
									icon : "search",
									actionTag: "Tile 3 - Action 2"
								}, {
									icon : "delete",
									actionTag: "Tile 3 - Action 3"
								}
					]
				}, {
					title : "Tile 4",
					icon : "settings",
					options : [
								{
									icon : "employee",
									actionTag: "Tile 4 - Action 1"
								}, {
									icon : "add-photo",
									actionTag: "Tile 4 - Action 2"
								}, {
									icon : "addresses",
									actionTag: "Tile 4 - Action 3"
								}, {
									icon : "badge",
									actionTag: "Tile 4 - Action 4"
								}
					]
				}, {
					title : "Tile 5",
					icon : "duplicate",
					options : [
								{
									icon : "basket",
									actionTag: "Tile 5 - Action 1"
								}, {
									icon : "bar-code",
									actionTag: "Tile 5 - Action 2"
								}, {
									icon : "bookmark",
									actionTag: "Tile 5 - Action 3"
								}, {
									icon : "card",
									actionTag: "Tile 5 - Action 4"
								}, {
									icon : "cart",
									actionTag: "Tile 5 - Action 5"
								}
					]
				}, {
					title : "Tile 6",
					icon : "globe",
					iconColor : "#007cc0",
					cssClass : "defaultActionClass",
					options : [
								{
									icon : "search",
									actionTag: "Tile 6 - Action 1"
								}, {
									icon : "search",
									actionTag: "Tile 6 - Action 2"
								}, {
									icon : "search",
									actionTag: "Tile 6 - Action 3"
								}, {
									icon : "search",
									actionTag: "Tile 6 - Action 4"
								}, {
									icon : "search",
									actionTag: "Tile 6 - Action 5"
								}, {
									icon : "search",
									actionTag: "Tile 6 - Action 6"
								}
					]
				}, {
					title : "Tile 7",
					icon : "appointment",
					options : [
								{
									icon : "search",
									actionTag: "Tile 7 - Action 1"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 2"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 3"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 4"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 5"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 6"
								}, {
									icon : "search",
									actionTag: "Tile 7 - Action 7"
								}
					]
				}, {
					title : "Tile 8",
					icon : "manager"
				}
	],

	onBeforeShow : function(oEvent) {

		for ( var c in this.tiles) {
			var tileItem = new controls.RoundedActionTile();
			tileItem.setTitle(this.tiles[c]["title"]);
			tileItem.setIcon("sap-icon://" + this.tiles[c]["icon"]);
			if (this.tiles[c]["cssClass"])
				tileItem.setCssClass(this.tiles[c]["cssClass"]);
			if (this.tiles[c]["iconColor"])
				tileItem.setIconColor(this.tiles[c]["iconColor"]);
			if (this.tiles[c]["options"]) {
				tileItem.setTileOptions(this.tiles[c]["options"]);
			}

			this.tiles[c].object = tileItem;

			tileItem.attachPress({
				index : c
			}, this.showOptions, this);
			tileItem.attachActionPress(this.handleAction, this);

			this.getView().oTilesContainer.addTile(tileItem);
		}
	},

	showOptions : function(oEvent, oParams) {
		for ( var c in this.tiles) {
			this.tiles[c].object.showActions(false);
		}
		if(this.tiles[oParams.index]["options"])
			this.tiles[oParams.index].object.showActions(true);
		else
			this.handleAction(oEvent, oParams);
	},

	handleAction : function(oEvent, oParams) {
		if(oEvent.getParameter('action'))
			alert(oEvent.getParameter('action').actionTag);
		else
			alert(oEvent.getParameter('id'));
	}

});